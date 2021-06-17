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
        if (cur.type === 'subtopic' && cur.selected) {
          return prev += 1;
        }

        return prev += cur.children.filter((child) => child.selected).length;
      }, 0);
  }

  get isAllTopicsSelected() {
    return this.args.topics.reduce((prev, cur) => {
      if (cur.type === 'subtopic') {
        return prev.concat([cur.selected]);
      }

      return prev.concat(cur.children.map(child => child.selected));
    }, []).every(cur => cur);
  }

  @action toggleOpen() {
    this.open = !this.open;
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
        const newSelectedValue = !topic.selected;

        return {
          ...topic,
          selected: newSelectedValue,
          children: this.toggleChildren(topic.children, newSelectedValue),
        };
      }

      if (topic.children && topic.children.length > 0) {
        return {
          ...topic,
          children: this.toggleTopicInList(topic.children, itemId),
        }
      }

      return topic;
    });
  }

  @action onListItemToggle(itemId) {
    const newNestedListItems = this.toggleTopicInList(this.args.topics, itemId);

    this.args.setTopics(newNestedListItems);
  }

  @action toggleAllTopics() {
    const newSelectedValue = !this.isAllTopicsSelected;

    const newNestedListItems = this.args.topics.map(topic => {
      return {
        ...topic,
        selected: newSelectedValue,
        children: this.toggleChildren(topic.children, newSelectedValue),
      };
    });

    this.args.setTopics(newNestedListItems);
  }
}
