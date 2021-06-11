import Component from '@ember/component';

export default class NestableListItemComponent extends Component {
  open = false;

  get hasChildren() {
    if (this.item && this.item.children) {
      return this.item.children.length > 0;
    }

    return false;
  }
}
