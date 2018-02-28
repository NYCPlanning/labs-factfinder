import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

export default {
  type: 'geojson',
  data: `${SupportServiceHost}/choropleth`,
};
