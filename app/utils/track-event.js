import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default function trackEvent(eventCategory, incAction, incLabel, incValue) {
  return (target, name, desc) => {
    const descriptor = desc;
    const originalValue = descriptor.value;

    descriptor.value = function(...args) {
      originalValue.call(this, ...args);

      if (!this.get('metrics')) {
        this.set('metrics', service());
      }

      let eventAction = incAction;
      let eventLabel = incLabel;
      let eventValue = incValue;

      // allow getting prop names for values
      if (eventAction) {
        const actionIdentifier = this.get(eventAction);

        if (!isEmpty(actionIdentifier)) {
          eventAction = actionIdentifier;
        }
      }

      if (eventLabel) {
        const labelIdentifier = this.get(eventLabel);
        if (!isEmpty(labelIdentifier)) {
          eventLabel = labelIdentifier;
        }
      }

      if (eventValue) {
        const valueIdentifier = this.get(eventValue);
        if (!isEmpty(valueIdentifier)) {
          eventValue = valueIdentifier;
        }
      }

      this.get('metrics').trackEvent(
        'GoogleAnalytics',
        {
          eventCategory, eventAction, eventLabel, eventValue,
        },
      );
    };

    return descriptor;
  };
}
