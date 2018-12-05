import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';

import turfCombine from '@turf/combine';
import shpjs from 'shpjs';
import bbox from '@turf/bbox';

import carto from '../utils/carto';
import trackEvent from '../utils/track-event'; // eslint-disable-line
import RadiusMode from '../utils/radius-mode';

import generateIntersectionSQL from '../queries/intersection';
import generateRadiusSQL from '../queries/radius';

import layerGroups from '../layer-groups';
import drawStyles from '../layers/draw-styles';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';
import highlightedFeature from '../layers/highlighted-feature';

import bkQnMhBoundarySource from '../sources/bk-qn-mh-boundary';
import bkQnMhBoundaryLayer from '../layers/bk-qn-mh-boundary';
import choroplethsSource from '../sources/choropleths';
import subduedNtaLabels from '../layers/subdued-nta-labels';

const selectedFillLayer = selectedFeatures.fill;
const combine = turfCombine;

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    rectangle: false,
    polygon: false,
    trash: false,
  },
  styles: drawStyles,
  modes: Object.assign({
    draw_radius: RadiusMode,
  }, MapboxDraw.modes),
});

export default Controller.extend({
  queryParams: ['lastreport'],
  lastreport: 'demographic',

  selection: service(),
  mapMouseover: service(),
  metrics: service(),

  layerGroups,
  sources,

  bkQnMhBoundarySource,
  bkQnMhBoundaryLayer,
  subduedNtaLabels,
  choroplethsSource,

  zoom: 12.25,
  center: [-73.9868, 40.724],
  mode: 'direct-select',

  isDrawing: false,
  drawMode: null,

  selectedFillLayer,
  highlightedFeature,

  selectedChoropleth: 'population',


  summaryLevel: alias('selection.summaryLevel'),

  @computed('selection.current')
  selectedSource(current) {
    return {
      type: 'geojson',
      data: current,
    };
  },

  fitBounds() {
    const map = this.get('map');
    const FC = this.get('selection').current;
    map.fitBounds(bbox(FC), {
      padding: 40,
    });
  },

  actions: {
    // allows geometry to be selected by clicking on shape on map
    handleClick(e) {
      if (!this.get('isDrawing')) {
        const selection = this.get('selection');
        const { summaryLevel } = selection;

        let layers = [];

        switch (summaryLevel) { // eslint-disable-line
          case 'tracts':
            layers = ['census-tracts-fill'];
            break;
          case 'blocks':
            layers = ['census-blocks-fill'];
            break;
          case 'ntas':
            layers = ['neighborhood-tabulation-areas-fill'];
            break;
          case 'pumas':
            layers = ['nyc-pumas-selection-fill'];
            break;
        }

        const [found] = e.target.queryRenderedFeatures(
          e.point,
          { layers },
        );


        if (found) {
          selection.handleSelectedFeatures([found]);
        }
      }
    },

    handleDrawButtonClick(type) {
      const isDrawing = this.get('isDrawing');
      const map = this.get('selection').currentMapInstance;
      if (isDrawing) {
        draw.trash();
        this.set('isDrawing', false);
        this.set('drawMode', null);
      } else {
        map.addControl(draw, 'top-left');
        this.set('drawMode', type);

        if (type === 'polygon') {
          draw.changeMode('draw_polygon');
        }
        if (type === 'radius') draw.changeMode('draw_radius');

        this.set('isDrawing', true);
        this.get('metrics').trackEvent(
          'GoogleAnalytics',
          { eventCategory: 'Draw', eventAction: `Draw ${type} Start`, eventLabel: this.get('selection').summaryLevel },
        );
      }
    },

    handleDrawCreate(e) {
      // delete the drawn geometry
      draw.deleteAll();

      const selection = this.get('selection');
      const { summaryLevel } = selection;

      const { geometry } = e.features[0];

      geometry.crs = {
        type: 'name',
        properties: {
          name: 'EPSG:4326',
        },
      };

      let SQL;
      if (geometry.type === 'Polygon') {
        SQL = generateIntersectionSQL(summaryLevel, geometry);
      } else {
        const { radius } = e.features[0].properties;
        SQL = generateRadiusSQL(summaryLevel, geometry, radius);
      }

      carto.SQL(SQL, 'geojson', 'post')
        .then((FC) => {
          selection.handleSelectedFeatures(FC.features);

          this.get('metrics').trackEvent('GoogleAnalytics', {
            eventCategory: 'Draw',
            eventAction: 'Draw Create',
            eventLabel: this.get('selection').summaryLevel,
            eventValue: FC.features.length,
          });
        });
    },

    handleDrawModeChange(e) {
      const isDrawing = e.mode === 'draw_polygon' || e.mode === 'draw_radius';
      // delay setting isDrawing boolean so that polygon-closing click won't be handled
      setTimeout(() => {
        this.set('isDrawing', isDrawing);
        if (!isDrawing) {
          const map = this.get('selection').currentMapInstance;
          this.set('drawMode', null);
          map.removeControl(draw);
        }
      }, 200);
    },

    handleMousemove(e) {
      if (!this.get('isDrawing')) {
        const mapMouseover = this.get('mapMouseover');
        mapMouseover.highlighter(e);
      }
    },

    handleSummaryLevelToggle(summaryLevel) {
      this.get('selection').handleSummaryLevelToggle(summaryLevel);
    },

    handleMapLoad(map) {
      this.set('map', map);

      // setup controls
      const navigationControl = new mapboxgl.NavigationControl();
      const geoLocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      map.addControl(navigationControl, 'top-left');
      map.addControl(new mapboxgl.ScaleControl({ unit: 'imperial' }), 'bottom-left');
      map.addControl(geoLocateControl, 'top-left');

      this.set('selection.currentMapInstance', map);
      if (window) {
        window.map = map;
      }

      if (this.get('selection.selectedCount')) {
        this.fitBounds(map);
      }

      // remove default neighborhood names
      map.removeLayer('place_suburb');
      map.removeLayer('place_city_large');
    },

    addedfile(file) {
      const reader = new FileReader();
      // const selection = this.get('selection');
      // const { summaryLevel } = selection;

      let buffer;
      reader.onload = (event) => {
        buffer = event.target.result;

        shpjs(buffer).then((geojson) => {
          let combined;
          this.set('customVisualOverlayData', geojson);
          combined = combine(geojson);
          combined = combined.features[0].geometry;
          combined.crs = {
            type: 'name',
            properties: {
              name: 'EPSG:4326',
            },
          };
          if (combined.type === 'MultiPolygon' || combined.type === 'MultiLineString') {
            this.set('customVisualOverlayLines', true);
          } if (combined.type === 'MultiPoint') {
            this.set('customVisualOverlayPoints', true);
          }

          // const SQL = generateIntersectionSQL(summaryLevel, combined);
          // carto.SQL(SQL, 'geojson', 'post')
          //   .then((FC) => {
          //     selection.handleSelectedFeatures(FC.features);
          //     this.fitBounds();
          //   })
          //   .catch(() => {
          //     alert('Something went wrong with this Shapefile. Try to simplify the geometries.'); // eslint-disable-line
          //   });
        }).catch(() => {
          alert('Something went wrong with this Shapefile. Check that it is valid'); // eslint-disable-line
        });
      };
      reader.readAsArrayBuffer(file);
    },

    removedfile() {
      this.set('customVisualOverlayData', null);
    },
  },
});
