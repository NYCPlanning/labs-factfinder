import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModifyTablesMenuComponent extends Component {
  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
  }

  @action closeMenu() {
    this.open = false;
  }
}
