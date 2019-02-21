import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';

const profiles = [
  'demographic',
  'economic',
  'social',
  'housing',
  'census',
];

const modes = [
  'change',
  'current',
];

const profileIDs = [
  18249, // Block Multi // these only get census profiles
  4035, // Tract Multi
  18250, // NTA Multi
  18251, // PUMA Multi
  15599, // Block Single // these only get census profiles
  3256, // Tract Single
  1259, // NTA Single
  900, // PUMA Single
];

// Generates URLs representing different combos of states, listed above
// this is a map/reduce exercise that creates a uniq combo of 3 sets, 
// generates urls from those, then flattens the resulting 3d matrix
const URLs = profileIDs
    // map all the combinations of the 3 sets
  .map(id =>
    modes.map(mode =>
      profiles.map((profile) => {
        // block data only have census profiles, so skip
        if ((id === 18249 || id === 15599) && profile !== 'census') return;
        return `/profile/${id}/${profile}?reliability=true&mode=${mode}&charts=false`;
    })))
    // flatten the 3-dimensional matrix
  .reduce((acc, curr) =>
      acc.concat(curr.reduce((accNest, currNest) =>
        accNest.concat(currNest), [])), [])
    // filter out undefineds
  .filter(Boolean);

module('Acceptance | data tables sniff test', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting assorted profiles, checking for content changes', async function(assert) {
    for (const url of URLs) {
      console.log(url);
      await visit(url);
      await percySnapshot(url, { scope: '#profile-content' });
      assert.ok(true);
    }
  });
});
