import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';
import carto from 'ember-jane-maps/utils/carto';

import generateIntersectionSQL from '../queries/intersection';
import layerGroups from '../layer-groups';
import drawStyles from '../layers/draw-styles';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';
import highlightedFeature from '../layers/highlighted-feature';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;

const { alias } = Ember.computed;

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    rectangle: true,
    polygon: true,
    trash: false,
  },
  styles: drawStyles,
});

export default Ember.Controller.extend({
  selection: service(),
  mapMouseover: service(),

  layerGroups,
  sources,
  zoom: 12,
  center: [-73.916016, 40.697299],
  mode: 'direct-select',

  drawMode: false,

  selectedFillLayer,
  highlightedFeature,

  summaryLevel: alias('selection.summaryLevel'),

  @computed('selection.current')
  selectedSource(current) {
    return {
      type: 'geojson',
      data: current,
    };
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
            layers = ['nyc-pumas-fill'];
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
      this.set('drawMode', drawMode);
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
      map.addControl(draw, 'top-left');
    },
  },
});
