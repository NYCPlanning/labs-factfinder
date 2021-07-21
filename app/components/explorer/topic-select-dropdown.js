import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


/**
  * @param { Object[] } topics - array of Topic objects.
  * If explorer selected source is acs, then `topics` has
  * TWO levels of nesting of Topic objects (Topics and Subtopics).
  * If explorer selected source is decennial, then `topics` is a
  * 1D array of subtopics.
  * See controller for an example.
*/
export default class TopicSelectDropdownComponent extends Component {
  @tracked open = false;

  get numSelected() {
    return this.args.topics.reduce((prev, cur) => {
        if (cur.type === 'subtopic' && (cur.selected === "selected")) {
          return prev += 1;
        }

        return prev += cur.children.filter((child) => (child.selected === "selected")).length;
      }, 0);
  }

  get isAllTopicsSelected() {
    const { topics } = this.args;

    if (topics.every(topic => topic.selected === "selected")) {
      return "selected";
    }

    if (topics.every(topic => topic.selected === "unselected")) {
      return "unselected";
    }

    return "indeterminate";
  }

  @action toggleOpen() {
    this.open = !this.open;
  }
}
