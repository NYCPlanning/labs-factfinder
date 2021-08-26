import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { nest } from 'd3-collection';



export default class ComparisonAreaSelectorComponent extends Component {
  @service()
  selection;

  @service()
  metrics;

  get nestedComparisonGeoOptions() {
    return nest()
      .key(d => d.typelabel)
      .entries(this.args.comparisonGeoOptions)
      .map(d => ({
        groupName: d.key,
        options: d.values,
      }));
  }

  @action updateProperty({ geoid, label }) {
    this.metrics.trackEvent('GoogleAnalytics', {
      eventCategory: 'Profile Settings',
      eventAction: 'Selected Comparison Area',
      eventLabel: label,
    });

    this.args.onSelect(geoid)
  }
}
