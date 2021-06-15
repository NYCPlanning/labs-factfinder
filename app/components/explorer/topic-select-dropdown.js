import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


/**
  * @param { Object[] } topics - array of Topic objects. See controller for an exampl
*/
export default class TopicSelectDropdownComponent extends Component {
  @tracked open = false;

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
}
