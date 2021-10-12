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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'toggle_select_topics',
      'toggle' : this.open ? 'Opened' : 'Closed',
    });
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Select Topics',
      eventAction: 'Toggle Menu',
      eventLabel: this.open ? 'Opened' : 'Closed',
    });
  }

  @action closeMenu() {
    if (this.open) {
      window.dataLayer = window.dataLayer || [];
      if (this.isAllTopicsSelected === "selected") {
        window.dataLayer.push({
          'event' : 'toggle_select_topics',
          'toggle' : 'Closed',
          'selected_topics' : 'All Topics Selected'
        });
        this.get('metrics').trackEvent('GoogleAnalytics', {
          eventCategory: 'Select Topics',
          eventAction: 'Toggle Menu',
          eventLabel: 'All Topics Selected',
        });
      } else if (this.isAllTopicsSelected === "unselected") {
        window.dataLayer.push({
          'event' : 'toggle_select_topics',
          'toggle' : 'Closed',
          'selected_topics' : 'No Topics Selected'
        });
        this.get('metrics').trackEvent('GoogleAnalytics', {
          eventCategory: 'Select Topics',
          eventAction: 'Toggle Menu',
          eventLabel: 'No Topics Selected',
        });
      } else {
        var selectedTopics = [];
        this.args.topics.forEach(topic => {
          if ((topic.type === "subtopic") && (topic.selected === "selected")) {
            selectedTopics.push(topic.id);
          }
          topic.children.forEach(subtopic => {
            if (subtopic.selected === "selected") {
              selectedTopics.push(subtopic.id);
            }
          });
        });
        window.dataLayer.push({
          'event' : 'toggle_select_topics',
          'toggle' : 'Closed',
          'selected_topics' : selectedTopics
        });
        this.get('metrics').trackEvent('GoogleAnalytics', {
          eventCategory: 'Select Topics',
          eventAction: 'Toggle Menu',
          eventLabel: selectedTopics.join(','),
        });
      }

    }
    this.open = false;
    
  }
}
