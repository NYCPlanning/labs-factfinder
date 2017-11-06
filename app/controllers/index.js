import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';

import layerGroups from '../layer-groups';
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
  styles: [
    // ACTIVE (being drawn)
    // line stroke
    {
      id: 'gl-draw-line',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#D96B27',
        'line-dasharray': [0.2, 2],
        'line-width': 4,
      },
    },
    // polygon fill
    {
      id: 'gl-draw-polygon-fill',
      type: 'fill',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      paint: {
        'fill-color': '#D20C0C',
        'fill-outline-color': '#D20C0C',
        'fill-opacity': 0.1,
      },
    },
    // polygon outline stroke
    // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
    {
      id: 'gl-draw-polygon-stroke-active',
      type: 'line',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#D96B27',
        'line-dasharray': [0.2, 2],
        'line-width': 4,
      },
    },
    // vertex point halos
    {
      id: 'gl-draw-polygon-and-line-vertex-halo-active',
      type: 'circle',
      filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
      paint: {
        'circle-radius': 7,
        'circle-color': '#FFF',
      },
    },
    // vertex points
    {
      id: 'gl-draw-polygon-and-line-vertex-active',
      type: 'circle',
      filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
      paint: {
        'circle-radius': 6,
        'circle-color': '#D96B27',
      },
    },

    // INACTIVE (static, already drawn)
    // line stroke
    {
      id: 'gl-draw-line-static',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#000',
        'line-width': 3,
      },
    },
    // polygon fill
    {
      id: 'gl-draw-polygon-fill-static',
      type: 'fill',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
      paint: {
        'fill-color': '#000',
        'fill-outline-color': '#000',
        'fill-opacity': 0.1,
      },
    },
    // polygon outline
    {
      id: 'gl-draw-polygon-stroke-static',
      type: 'line',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#000',
        'line-width': 3,
      },
    },
  ],
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
    handleClick(event) {
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
          event.target.queryRenderedFeatures(
            event.point,
            { layers },
          );


        if (found) {
          selection.handleSelectedFeature([found]);
        }
      }
    },

    handleDrawCreate(e) {
      console.log('created', e.features);
      draw.deleteAll();
    },

    handleDrawModeChange(e) {
      console.log('modechange', e);

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
