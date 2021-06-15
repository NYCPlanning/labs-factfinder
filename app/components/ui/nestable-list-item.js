import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NestableListItemComponent extends Component {
  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
  }

  get hasChildren() {
    if (this.args.item && this.args.item.children) {
      return this.args.item.children.length > 0;
    }

    return false;
  }
}
