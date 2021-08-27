import { action } from '@ember/object';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

import acsTopicsDefault from '../topics-config/acs';
import censusTopicsDefault from '../topics-config/census';
import sourcesDefault from '../sources-config';

import fetchExplorerModel from '../utils/fetch-explorer-model';

export default class ExplorerController extends Controller {
  queryParams = [
    {
      sourceId: 'source',
    },
    'censusTopics',
    'acsTopics',
    'compareTo',
    'showReliability',
    'showCharts'
  ];

  @tracked showCharts = true;

  @tracked sourceId = 'decennial-current';

  @tracked censusTopics = 'populationDensity,sexAndAge,mutuallyExclusiveRaceHispanicOrigin,housingOccupancy';

  @tracked acsTopics = 'demo-sexAndAge,demo-mutuallyExclusiveRaceHispanicOrigin,demo-hispanicSubgroup,demo-asianSubgroup';

  @tracked showReliability = false;

  @tracked disaggregate = false;

  // The comparison geography ID.
  // Must match ID of one option in comparisonGeoOptions.
  // Default "0" maps to NYC.
  @tracked compareTo = "0";

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

  toggleChildren = (children, selectedValue) => {
    return children.map(child => {
      return {
        ...child,
        selected: selectedValue,
        children: this.toggleChildren(child.children, selectedValue),
      }
    });
  }

  toggleTopicInList = (topics, itemId) => {
    return topics.map((topic) => {
      if (topic.id === itemId) {
        return {
          ...topic,
          selected: "selected",
          children: this.toggleChildren(topic.children, "selected"),
        };
      }

      if (topic.children && topic.children.length > 0) {
        const newChildren = this.toggleTopicInList(topic.children, itemId);
        let newSelectedValue = "indeterminate";

        if (newChildren.every(child => child.selected === "selected")) {
          newSelectedValue = "selected";
        }
        if (newChildren.every(child => child.selected === "unselected")) {
          newSelectedValue = "unselected";
        }

        return {
          ...topic,
          selected: newSelectedValue,
          children: newChildren
        }
      }

      return topic;
    });
  }

  get comparisonGeo() {
    if (this.model.comparisonGeoOptions) {
      return this.model.comparisonGeoOptions.findBy('geoid', this.compareTo);
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

    this.transitionToRoute('explorer', this.model.selectionOrGeoid, { queryParams: { source: id }});
  }

  // returns either 'current', 'previous' or 'change'
  get mode() {
    return this.source.mode;
  }

  get topicsIdList() {
    const rawTopicsList = this.source.type === 'census' ? this.censusTopics : this.acsTopics;

    if (rawTopicsList === 'all'){
      if (this.source.type === 'census') {
        return censusTopicsDefault.map(topic => topic.id);
      }

      return acsTopicsDefault.reduce((topicsIdList, curTopic) => {
        return topicsIdList.concat(curTopic.children.map(subtopic => subtopic.id));
      }, []);
    } else if (rawTopicsList === 'none') {
      return [];
    } else {
      return rawTopicsList.split(',');
    }
  }

  get topics() {
    if (Array.isArray(this.topicsIdList)) {
      if (this.source.type === 'census') {
        return this.topicsIdList.reduce((topicsIdList, curTopicId) => {
          return this.toggleTopicInList(topicsIdList, curTopicId);
        }, censusTopicsDefault);
      }
  
      return this.topicsIdList.reduce((topicsIdList, curTopicId) => {
        return this.toggleTopicInList(topicsIdList, curTopicId);
      }, acsTopicsDefault);
    }

    return [];
  }

  set topics(newTopics) {
    const qpKey = this.source.type === 'census' ? 'censusTopics' : 'acsTopics';

    this.transitionToRoute('explorer', this.model.selectionOrGeoid, { queryParams: { [qpKey]: newTopics }});
  }

  get isAllTopicsSelected() {
    const { topics } = this;

    if (topics.every(topic => topic.selected === "selected")) {
      return "selected";
    }

    if (topics.every(topic => topic.selected === "unselected")) {
      return "unselected";
    }

    return "indeterminate";
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

  @action toggleTopic(topic) {
    if (topic.type === 'subtopic') {
        if (this.topicsIdList.includes(topic.id)) {
          this.topics = this.topicsIdList.filter(topicId => topicId !== topic.id);
        } else {
          this.topics = this.topicsIdList.concat([topic.id]);
        }
    }

    if (topic.type === 'topic') {
      const topicChildrenIds = topic.children.map(subtopic => subtopic.id);

      if (topic.selected === "selected" || topic.selected === "indeterminate") {
        this.topics = this.topicsIdList.filter(topicId => !topicChildrenIds.includes(topicId));
      } else {
        this.topics = this.topicsIdList.concat(topicChildrenIds);
      }
    }
  }

  @action toggleAllTopics() {
    this.topics = this.isAllTopicsSelected === "unselected" ? "all" : "none";
  }

  // acceptable controlId values include: 'showReliability', 'showCharts', 'disaggregate'
  @action toggleBooleanControl(controlId) {
    let { [controlId]: currentControlValue } = this;

    this.transitionToRoute('explorer', this.model.selectionOrGeoid, { queryParams: {
      [controlId]: !currentControlValue,
    }});
  }

  @task({ restartable: true }) *reloadExplorerModel() {
    yield this.store.unloadAll('row');

    const newExplorerModel = yield fetchExplorerModel(this.store, this.model.selectionOrGeoid, this.compareTo);

    this.model = newExplorerModel;
  }

  @action updateCompareTo(geoid) {
    // TODO: Figure out how to reload the model on compareTo queryParam update, instead of
    // manually firing off the Task here.
    this.reloadExplorerModel.perform();

    this.transitionToRoute('explorer', this.model.selectionOrGeoid, { queryParams: { compareTo: geoid }});
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
