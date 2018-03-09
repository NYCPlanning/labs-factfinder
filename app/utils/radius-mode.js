// custom mapbopx-gl-draw mode that modifies draw_line_string
// shows a center point, radius line, and circle polygon while drawing
// forces draw.create on creation of second vertex

import MapboxDraw from 'mapbox-gl-draw';
import numeral from 'numeral';
import lineDistance from 'npm:@turf/line-distance';

const RadiusMode = MapboxDraw.modes.draw_line_string;

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

// create a circle-like polygon given a center point and radius
// https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js/39006388#39006388
function createGeoJSONCircle(center, radiusInKm, parentId, points = 64) {
  const coords = {
    latitude: center[1],
    longitude: center[0],
  };

  const km = radiusInKm;

  const ret = [];
  const distanceX = km / (111.320 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  let theta;
  let x;
  let y;
  for (let i = 0; i < points; i += 1) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [ret],
    },
    properties: {
      parent: parentId,
    },
  };
}

function getDisplayMeasurements(feature) {
  // should log both metric and standard display strings for the current drawn feature


  // metric calculation
  const drawnLength = (lineDistance(feature) * 1000); // meters

  let metricUnits = 'm';
  let metricFormat = '0,0';
  let metricMeasurement;

  let standardUnits = 'feet';
  let standardFormat = '0,0';
  let standardMeasurement;

  metricMeasurement = drawnLength;
  if (drawnLength >= 1000) { // if over 1000 meters, upgrade metric
    metricMeasurement = drawnLength / 1000;
    metricUnits = 'km';
    metricFormat = '0.00';
  }

  standardMeasurement = drawnLength * 3.28084;
  if (standardMeasurement >= 5280) { // if over 5280 feet, upgrade standard
    standardMeasurement /= 5280;
    standardUnits = 'mi';
    standardFormat = '0.00';
  }

  const displayMeasurements = {
    metric: `${numeral(metricMeasurement).format(metricFormat)} ${metricUnits}`,
    standard: `${numeral(standardMeasurement).format(standardFormat)} ${standardUnits}`,
  };

  return displayMeasurements;
}

const doubleClickZoom = {
  enable: (ctx) => {
    setTimeout(() => {
      // First check we've got a map and some context.
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return;
      // Now check initial state wasn't false (we leave it disabled if so)
      if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
};

RadiusMode.clickAnywhere = function(state, e) {
  // this ends the drawing after the user creates a second point, triggering this.onStop
  if (state.currentVertexPosition === 1) {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    return this.changeMode('simple_select', { featureIds: [state.line.id] });
  }
  this.updateUIClasses({ mouse: 'add' });
  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  if (state.direction === 'forward') {
    state.currentVertexPosition += 1; // eslint-disable-line
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }

  return null;
};

// creates the final geojson point feature with a radius property
// triggers draw.create
RadiusMode.onStop = function(state) {
  doubleClickZoom.enable(this);

  this.activateUIButton();

  // check to see if we've deleted this feature
  if (this.getFeature(state.line.id) === undefined) return;

  // remove last added coordinate
  state.line.removeCoordinate('0');
  if (state.line.isValid()) {
    const lineGeoJson = state.line.toGeoJSON();
    // reconfigure the geojson line into a geojson point with a radius property
    const pointWithRadius = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: lineGeoJson.geometry.coordinates[0],
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
  geojson.properties.active = (isActiveLine) ? 'true' : 'false';
  if (!isActiveLine) return display(geojson);

  // Only render the line if it has at least one real coordinate
  if (geojson.geometry.coordinates.length < 2) return null;
  geojson.properties.meta = 'feature';

  // displays center vertex as a point feature
  display(createVertex(
    state.line.id,
    geojson.geometry.coordinates[state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1],
    `${state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1}`,
    false,
  ));

  // displays the line as it is drawn
  display(geojson);

  const displayMeasurements = getDisplayMeasurements(geojson);

  // create custom feature for the current pointer position
  const currentVertex = {
    type: 'Feature',
    properties: {
      meta: 'currentPosition',
      radiusMetric: displayMeasurements.metric,
      radiusStandard: displayMeasurements.standard,
      parent: state.line.id,
    },
    geometry: {
      type: 'Point',
      coordinates: geojson.geometry.coordinates[1],
    },
  };
  display(currentVertex);

  // create custom feature for radius circlemarker
  const center = geojson.geometry.coordinates[0];
  const radiusInKm = lineDistance(geojson, 'kilometers');
  const circleFeature = createGeoJSONCircle(center, radiusInKm, state.line.id);
  circleFeature.properties.meta = 'radius';

  display(circleFeature);

  return null;
};

export default RadiusMode;
