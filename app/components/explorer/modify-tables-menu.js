import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModifyTablesMenuComponent extends Component {
  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'toggle_modify_tables',
      'toggle' : this.open ? 'Opened' : 'Closed',
    });
  }

  @action closeMenu() {
    if (this.open) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'toggle_modify_tables',
        'toggle' : 'Closed',
      });
    }
    this.open = false;
  }

  get isAcsDataSource() {
    return this.args.sources.find(source => source.selected).type === "acs";
  }
}
