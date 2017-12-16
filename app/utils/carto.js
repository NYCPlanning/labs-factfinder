import fetch from 'fetch';
import { Promise } from 'rsvp';

const cartoDomain = 'planninglabs.carto.com';

const buildTemplate = (layergroupid, type) => { // eslint-disable-line
  return `https://${cartoDomain}/api/v1/map/${layergroupid}/{z}/{x}/{y}.${type}`;
};

const buildSqlUrl = (cleanedQuery, type = 'json') => { // eslint-disable-line
  return `https://${cartoDomain}/api/v2/sql?q=${cleanedQuery}&format=${type}`;
};

const carto = {
  SQL(query, format = 'json', method = 'get') {
    const cleanedQuery = query.replace('\n', '');
    const url = buildSqlUrl(cleanedQuery, format, method);

    let fetchOptions = {};

    if (method === 'post') {
      fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `q=${cleanedQuery}&format=${format}`,
      };
    }

    return fetch(url, fetchOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not found');
      })
      .then((d) => { // eslint-disable-line
        return format === 'json' ? d.rows : d;
      });
  },

  getVectorTileTemplate(sourceLayers) {
    const CartoCSS = '#layer { polygon-fill: #FFF; }';
    const layers = sourceLayers.map((sourceLayer) => {
      const { id, sql } = sourceLayer;
      return {
        id,
        type: 'mapnik',
        options: {
          cartocss_version: '2.3.0',
          cartocss: CartoCSS,
          sql,
        },
      };
    });

    const params = {
      version: '1.3.0',
      layers,
    };

    return new Promise((resolve, reject) => {
      fetch(`https://${cartoDomain}/api/v1/map`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .catch(err => reject(err))
        .then(response => response.json())
        .then((json) => {
          resolve(buildTemplate(json.layergroupid, 'mvt'));
        });
    });
  },
};

export { buildSqlUrl };
export default carto;
