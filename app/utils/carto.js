import fetch from 'fetch';
import { Promise } from 'rsvp';

const cartoUsername = 'planninglabs';

const buildTemplate = (config, type='mvt') => { // eslint-disable-line
  const protocol = location.protocol.slice(0, -1); // eslint-disable-line
  const { layergroupid } = config;
  const { subdomains, url } = config.cdn_url.templates[protocol];
  const subdomain = subdomains[Math.floor(Math.random() * subdomains.length)];
  const renderedUrl = url.replace('{s}', subdomain);

  return `${renderedUrl}/${cartoUsername}/api/v1/map/${layergroupid}/{z}/{x}/{y}.${type}`;
};

const buildSqlUrl = (cleanedQuery, format = 'json', method) => { // eslint-disable-line
  let url = `https://${cartoUsername}.carto.com/api/v2/sql`;
  url += method === 'get' ? `?q=${cleanedQuery}&format=${format}` : '';
  return url;
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
      fetch(`https://${cartoUsername}.carto.com/api/v1/map`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .catch(err => reject(err))
        .then(response => response.json())
        .then((json) => {
          resolve(buildTemplate(json));
        });
    });
  },
};

export { buildSqlUrl };
export default carto;
