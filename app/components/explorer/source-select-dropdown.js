import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SourceSelectDropdownComponent extends Component {
  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
  }

  get source() {
    return this.args.sources.find(source => source.selected);
  }

  toggleSourceInList = (sources, sourceId) => {
    return sources.map((source) => {
      if (source.id === sourceId) {
        return {
          ...source,
          selected: true,
        };
      }

      return {
        ...source,
        selected: false,
      }
    });
  }

  @action onSourceToggle(sourceId) {
    const newSources = this.toggleSourceInList(this.args.sources, sourceId);

    this.args.setSources(newSources);
  }
}
