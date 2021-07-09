import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import sourcesDefault from '../sources-config';
import censusTopicsDefault from '../topics-config/census';
import acsTopicsDefault from '../topics-config/acs';

export default class ExplorerController extends Controller {
  queryParams = ['compareTo'];

  showCharts = true;

  @tracked sources = sourcesDefault;

  topic = null;

  @tracked showReliability = false;

  @tracked disaggregate = false;

  // Default "0" maps to NYC
  @tracked compareTo = "0";

  @tracked decennialTopics = censusTopicsDefault;

  // To be converted to acsTopics
  @tracked acsTopics = acsTopicsDefault;

  @tracked geoOptions = null;

  get selectedGeo() {
    if (this.geoOptions) {
      return this.geoOptions.findBy('geoid', this.compareTo);
    }

    return null;
  }

  get source() {
    return this.sources.find(source => source.selected);
  }

  // returns either 'current' or 'change'
  get mode() {
    if (this.source.changeOverTime) return 'change';

    return 'current';
  }

  @action setSources(newSources) {
    this.sources = newSources;
  }

  get topics() {
    if (this.source.type === 'census') {
      return this.decennialTopics;
    }

    // this.source === 'acs'
    return this.acsTopics;
  }

  set topics(newTopics) {
    if (this.source.type === 'census') {
      this.decennialTopics = newTopics;
    }
    if (this.source.type === 'acs') {
      this.acsTopics = newTopics;
    }
  }

  @action setTopics(newTopics) {
    this.topics = newTopics;
  }

  @action updateCompareTo(geoid) {
    this.transitionToRoute('explorer', { queryParams: { compareTo: geoid }});
  }
}
