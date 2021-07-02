import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import sourcesDefault from '../sources-config';
import censusTopicsDefault from '../topics-config/census';
import acsTopicsDefault from '../topics-config/acs';

export default class ExplorerController extends Controller {
  showCharts = true;

  @tracked sources = sourcesDefault;

  topic = null;

  @tracked showReliability = false;

  @tracked disaggregate = false;

  @tracked compareTo = null;

  @tracked decennialTopics = censusTopicsDefault;

  // To be converted to acsTopics
  @tracked acsTopics = acsTopicsDefault;

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
}
