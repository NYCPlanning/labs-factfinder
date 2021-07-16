import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import sourcesDefault from '../sources-config';
import censusTopicsDefault from '../topics-config/census';
import acsTopicsDefault from '../topics-config/acs';

export default class ExplorerController extends Controller {
  queryParams = [
    {
      sourceId: 'source',
    },
    'compareTo',
    'showReliability',
    'showCharts'
  ];

  @tracked showCharts = true;

  @tracked sourceId = 'decennial-2020';

  @tracked showReliability = false;

  @tracked disaggregate = false;

  // Default "0" maps to NYC
  @tracked compareTo = "0";

  @tracked decennialTopics = censusTopicsDefault;

  // To be converted to acsTopics
  @tracked acsTopics = acsTopicsDefault;

  @tracked geoOptions = null;

  toggleSourceInList(sourceId) {
    return sourcesDefault.map((source) => {
      if (source.id === sourceId) {
        return {
          ...source,
          selected: true,
        };
      }

      return {
        ...source,
        selected: false,
      }
    });
  }

  get selectedGeo() {
    if (this.geoOptions) {
      return this.geoOptions.findBy('geoid', this.compareTo);
    }

    return null;
  }

  get sources() {
    if (this.sourceId) {
      return this.toggleSourceInList(this.sourceId);
    }

    return sourcesDefault;
  }

  get source() {
    return this.sources.find(source => source.selected);
  }

  set source(newSource) {
    const { id } = newSource;

    this.transitionToRoute('explorer', { queryParams: { source: id }});
  }

  // returns either 'current' or 'change'
  get mode() {
    if (this.source.changeOverTime) return 'change';

    return 'current';
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

  get selectedCount() {
    return this.model.selection.features.length;
  }

  get sortedLabels() {
    const { features } = this.model.selection;

    const bronx = features.filter(d => d.properties.borocode === '2');
    const brooklyn = features.filter(d => d.properties.borocode === '3');
    const manhattan = features.filter(d => d.properties.borocode === '1');
    const queens = features.filter(d => d.properties.borocode === '4');
    const statenisland = features.filter(d => d.properties.borocode === '5');

    return [
      {
        label: 'Bronx',
        features: bronx,
      },
      {
        label: 'Brooklyn',
        features: brooklyn,
      },
      {
        label: 'Manhattan',
        features: manhattan,
      },
      {
        label: 'Queens',
        features: queens,
      },
      {
        label: 'Staten Island',
        features: statenisland,
      },
    ];
  }

  @action setSource(newSource) {
    this.source = newSource;
  }

  @action setTopics(newTopics) {
    this.topics = newTopics;
  }

  // acceptable controlId values include: 'showReliability', 'showCharts', 'disaggregate'
  @action toggleBooleanControl(controlId) {
    let { [controlId]: currentControlValue } = this;

    this.transitionToRoute('explorer', { queryParams: {
      [controlId]: !currentControlValue,
    }});
  }

  @action updateCompareTo(geoid) {
    this.transitionToRoute('explorer', { queryParams: { compareTo: geoid }});
  }

  @action toggleReliability() {
    this.showReliability = !this.showReliability;
    /*global Promise*/
    return new Promise(resolve => {
      setTimeout(function() {
        resolve("slow")
      }, 1)
    })
  }
}
