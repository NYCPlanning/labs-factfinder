import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';
import bbox from 'npm:@turf/bbox';
import lineDistance from 'npm:@turf/line-distance';
import carto from '../utils/carto';
import trackEvent from '../utils/track-event'; // eslint-disable-line


import generateIntersectionSQL from '../queries/intersection';
import generateRadiusSQL from '../queries/radius';

import layerGroups from '../layer-groups';
import drawStyles from '../layers/draw-styles';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';
import highlightedFeature from '../layers/highlighted-feature';

import bkQnMhBoundarySource from '../sources/bk-qn-mh-boundary';
import bkQnMhBoundaryLayer from '../layers/bk-qn-mh-boundary';
import subduedNtaLabels from '../layers/subdued-nta-labels';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;

const { alias } = Ember.computed;

const RadiusMode = MapboxDraw.modes.draw_line_string;

function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) return false;
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}

function createVertex(parentId, coordinates, path, selected) {
  return {
    type: 'Feature',
    properties: {
      meta: 'vertex',
      parent: parentId,
      coord_path: path,
      active: (selected) ? 'true' : 'false',
    },
    geometry: {
      type: 'Point',
      coordinates,
    },
  };
}

RadiusMode.clickAnywhere = function(state, e) {
  if (state.currentVertexPosition === 1) {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    return this.changeMode('simple_select', { featureIds: [state.line.id] });
  }
  this.updateUIClasses({ mouse: 'add' });
  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  if (state.direction === 'forward') {
    state.currentVertexPosition++;
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }
};

// https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js/39006388#39006388
function createGeoJSONCircle(center, radiusInKm, points) {
    if(!points) points = 64;

    var coords = {
        latitude: center[1],
        longitude: center[0]
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    var distanceY = km/110.574;

    var theta, x, y;
    for(var i=0; i<points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return {
      "type": "Feature",
      "geometry": {
          "type": "Polygon",
          "coordinates": [ret]
      },
      "properties": {},
    }
};

RadiusMode.onStop = function(state) {
  // doubleClickZoom.enable(this);
  this.activateUIButton();

  // check to see if we've deleted this feature
  if (this.getFeature(state.line.id) === undefined) return;

  //remove last added coordinate
  // state.line.removeCoordinate(`${state.currentVertexPosition}`);
  if (state.line.isValid()) {
    console.log(state.line)

    const lineGeoJson = state.line.toGeoJSON()
    // reconfigure the geojson line into a geojson point with a radius property
    const pointWithRadius = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: lineGeoJson.geometry.coordinates[state.direction === 'forward' ? lineGeoJson.geometry.coordinates.length - 2 : 1],
      },
      properties: {
        radius: (lineDistance(lineGeoJson) * 1000).toFixed(1),
      },
    };

    this.map.fire('draw.create', {
      features: [pointWithRadius],
    });
  } else {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode('simple_select', {}, { silent: true });
  }
};

RadiusMode.toDisplayFeatures = function(state, geojson, display) {
  const isActiveLine = geojson.properties.id === state.line.id;
  geojson.properties.active = (isActiveLine) ? 'true': 'false';
  if (!isActiveLine) return display(geojson);
  // Only render the line if it has at least one real coordinate
  if (geojson.geometry.coordinates.length < 2) return;
  geojson.properties.meta = 'feature';

  display(createVertex(
    state.line.id,
    geojson.geometry.coordinates[state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1],
    `${state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1}`,
    false
  ));

  display(geojson);

  // create custom feature for radius circlemarker
  const center = geojson.geometry.coordinates[state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1];
  const radiusInKm = lineDistance(geojson);
  const circleFeature = createGeoJSONCircle(center, radiusInKm);
  circleFeature.properties.meta = 'radius';

  display(circleFeature);
};


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

export default Ember.Controller.extend({
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

    handleDrawButtonClick(type) {
      const drawMode = this.get('drawMode');
      const map = this.get('selection').currentMapInstance;
      if (drawMode) {
        draw.trash();
        this.set('drawMode', false);
      } else {
        map.addControl(draw, 'top-left');

        if (type === 'polygon') draw.changeMode('draw_polygon');
        if (type === 'radius') draw.changeMode('draw_radius');

        this.set('drawMode', true);
        this.get('metrics').trackEvent(
          'GoogleAnalytics',
          { eventCategory: 'Draw', eventAction: 'Draw Start', eventLabel: this.get('selection').summaryLevel },
        );
      }
    },

    handleDrawCreate(e) {
      console.log(e)
      console.log('DRAW CREATE', e.features)

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

      let SQL;
      if (geometry.type === 'Polygon') SQL = generateIntersectionSQL(summaryLevel, geometry);
      if (geometry.type === 'Point') {
        const radius = e.features[0].properties.radius;
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

      // remove default neighborhood names
      map.removeLayer('place-neighbourhood');
    },
  },
});
