import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

/**
  * @param { fn(Source POJO) } setSource - (Required) Ember Action function that accepts a Source POJO. It will
  * set the selected Explorer source to the passed Source.
  * @param { [] } sources - array of Source objects
*/
export default class SourceSelectDropdownComponent extends Component {
  @service()
  metrics;
  
  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'toggle_data_source',
      'toggle' : this.open ? 'Opened' : 'Closed',
    });
    this.metrics.trackEvent('GoogleAnalytics', {
      eventCategory: 'Data Source',
      eventAction: 'Toggle Menu',
      eventLabel: this.open ? 'Opened' : 'Closed',
    });
  }

  @action closeMenu() {
    if (this.open) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'toggle_data_source',
        'toggle' : 'Closed',
      });
      this.metrics.trackEvent('GoogleAnalytics', {
        eventCategory: 'Data Source',
        eventAction: 'Toggle Menu',
        eventLabel: 'Closed',
      });
    }
    this.open = false;
  }

  get source() {
    return this.args.sources.find(source => source.selected);
  }

  get censusSources() {
    return this.args.sources.filter(source => source.type === 'census');
  }

  get acsSources() {
    return this.args.sources.filter(source => source.type === 'acs');
  }

  get showACS() {
    if(['districts', 'blocks', 'ccds'].includes(this.args.geotype)) {
      return false;
    }
    return true;
  }

  get showDistrictACSWarning() {
      return this.args.geotype === 'districts';
  }

  get showCCDACSWarning() {
    return this.args.geotype === 'ccds';
  }
}
