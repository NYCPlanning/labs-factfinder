import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
  * @param { fn(Source POJO) } setSource - (Required) Ember Action function that accepts a Source POJO. It will
  * set the selected Explorer source to the passed Source.
  * @param { [] } sources - array of Source objects
*/
export default class SourceSelectDropdownComponent extends Component {
  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'login',
      'loginMethod' : 'email' // this should be replaced with an actual login method
    });
  }

  @action closeMenu() {
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
    if(['districts', 'blocks'].includes(this.args.geotype)) {
      return false;
    }
    return true;
  }
}
