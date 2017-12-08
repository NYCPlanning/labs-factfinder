import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';
import carto from 'ember-jane-maps/utils/carto';
import bbox from 'npm:@turf/bbox';

import generateIntersectionSQL from '../queries/intersection';
import layerGroups from '../layer-groups';
import drawStyles from '../layers/draw-styles';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';
import highlightedFeature from '../layers/highlighted-feature';

import bkQnMhBoundarySource from '../sources/bk-qn-mh-boundary';
import bkQnMhBoundaryLayer from '../layers/bk-qn-mh-boundary';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;

const { alias } = Ember.computed;

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    rectangle: false,
    polygon: false,
    trash: false,
  },
  styles: drawStyles,
});

export default Ember.Controller.extend({
  queryParams: ['lastreport'],
  lastreport: 'demographic',

  selection: service(),
  mapMouseover: service(),

  layerGroups,
  sources,
  bkQnMhBoundarySource,
  bkQnMhBoundaryLayer,
  zoom: 12.25,
  center: [-73.9868, 40.724],
  mode: 'direct-select',

  drawMode: false,

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

  fitBounds(map) {
    const FC = this.get('selection').current;
    map.fitBounds(bbox(FC), {
      padding: 40,
    });
  },

  actions: {
    handleClick(e) {
      if (!this.get('drawMode')) {
        const selection = this.get('selection');
        const summaryLevel = selection.summaryLevel;

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

        const [found] =
          e.target.queryRenderedFeatures(
            e.point,
            { layers },
          );


        if (found) {
          selection.handleSelectedFeatures([found]);
        }
      }
    },

    handleDrawButtonClick() {
      const drawMode = this.get('drawMode');
      const map = this.get('selection').currentMapInstance;
      if (drawMode) {
        draw.trash();
        this.set('drawMode', false);
      } else {
        map.addControl(draw, 'top-left');
        draw.changeMode('draw_polygon');
        this.set('drawMode', true);
      }
    },

    handleDrawCreate(e) {
      // delete the drawn geometry
      draw.deleteAll();

      const selection = this.get('selection');
      const summaryLevel = selection.summaryLevel;

      const geometry = e.features[0].geometry;
      geometry.crs = {
        type: 'name',
        properties: {
          name: 'EPSG:4326',
        },
      };

      const intersectionSQL = generateIntersectionSQL(summaryLevel, geometry);
      carto.SQL(intersectionSQL, 'geojson', 'post')
        .then((FC) => {
          selection.handleSelectedFeatures(FC.features);
        });
    },

    handleDrawModeChange(e) {
      const drawMode = e.mode === 'draw_polygon';
      // delay setting drawMode boolean so that polygon-closing click won't be handled
      setTimeout(() => {
        this.set('drawMode', drawMode);
        if (!drawMode) {
          const map = this.get('selection').currentMapInstance;
          map.removeControl(draw);
        }
      }, 200);
    },

    handleMousemove(e) {
      if (!this.get('drawMode')) {
        const mapMouseover = this.get('mapMouseover');
        mapMouseover.highlighter(e);
      }
    },

    handleSummaryLevelToggle(summaryLevel) {
      this.get('selection').handleSummaryLevelToggle(summaryLevel);
    },

    handleMapLoad(map) {
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
    },
  },
});
