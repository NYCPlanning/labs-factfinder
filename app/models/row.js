import DS from 'ember-data';
import { computed } from 'ember-decorators/object';

// for number >=0
export function decimalFormat(number, decimal) {
  if ((number > 0) || (number === 0)) {
    let x;
    if (decimal === 1) {
      x = number.toFixed(1);
    } else if (decimal === 2) {
      x = number.toFixed(2);
    } else {
      x = number.toFixed(0);
    }

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return '';
}

// for all numbers
export function decimalFormatAll(number, decimal) {
  let x;
  if (isNaN(number)) {
    return '';
  }

  if (decimal === 1) {
    x = number.toFixed(1);
  } else if (decimal === 2) {
    x = number.toFixed(2);
  } else {
    x = number.toFixed(0);
  }

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function decimalOnePlace(number) {
  const floated = parseFloat(number);
  if (isNaN(floated)) {
    return '';
  }

  return floated.toFixed(1);
}

export function decimalOnePlacePercent(number) {
  const floated = parseFloat(number);
  if (isNaN(floated)) {
    return '';
  }

  return `${(floated * 100).toFixed(1)}%`;
}

export default DS.Model.extend({
  base: DS.attr('number'),
  base_join: DS.attr('number'),
  base_m: DS.attr('number'),
  base_sum: DS.attr('number'),
  base_year: DS.attr('number'),
  cartodb_id: DS.attr('number'),
  category: DS.attr('string'),
  comparison_base_join: DS.attr('number'),
  comparison_base_m: DS.attr('number'),
  comparison_base_sum: DS.attr('number'),
  comparison_base_year: DS.attr('number'),
  comparison_cv: DS.attr('number'),
  comparison_m: DS.attr('number'),
  comparison_percent: DS.attr('number'),
  comparison_percent_m: DS.attr('number'),
  comparison_sum: DS.attr('number'),
  cv: DS.attr('number'),
  dataset: DS.attr('string'), // year
  infltnfctr10to16: DS.attr('number'),
  m: DS.attr('number'),
  notinprofile: DS.attr('boolean'),
  percent: DS.attr('number'),
  percent_m: DS.attr('number'),
  percent_significant: DS.attr('boolean'),
  producttype: DS.attr('string'),
  profile: DS.attr('string'),
  release_year: DS.attr('string'),
  significant: DS.attr('boolean'),
  sum: DS.attr('number'),
  unittype: DS.attr('string'),
  variable: DS.attr('string'),
  variablename: DS.attr('string'),

  @computed('sum', 'cv')
  selectedCV(sum, cv) {
    const floatedSum = parseFloat(sum);
    const floatedCv = parseFloat(cv);

    if (floatedSum > 0) {
      return decimalOnePlace(floatedCv);
    }

    return '';
  },

  @computed('sum', 'percent')
  selectedPercent(sum, percent) {
    const floatedSum = parseFloat(sum);
    const floatedPercent = parseFloat(percent);

    if (floatedSum > 0) {
      return decimalOnePlacePercent(floatedPercent);
    }

    return '';
  },

  @computed('sum', 'percent_m')
  selectedPercentM(sum, percentM) {
    const floatedSum = parseFloat(sum);
    const floatedZ = parseFloat(percentM);
    if (floatedSum > 0) {
      return decimalOnePlacePercent(floatedZ);
    }

    return '';
  },

  @computed('comparison_sum', 'comparison_cv')
  comparisonCV(sum, cv) {
    const floatedSum = parseFloat(sum);
    const floatedCv = parseFloat(cv);

    if (floatedSum > 0) {
      return decimalOnePlace(floatedCv);
    }

    return '';
  },

  @computed('comparison_sum', 'comparison_percent')
  comparisonPercent(sum, percent) {
    const floatedSum = parseFloat(sum);
    const floatedPercent = parseFloat(percent);

    if (floatedSum > 0) {
      return decimalOnePlacePercent(floatedPercent);
    }

    return '';
  },

  @computed('comparison_sum', 'comparison_percent_m')
  comparisonPercentM(sum, percentM) {
    const floatedSum = parseFloat(sum);
    const floatedZ = parseFloat(percentM);
    if (floatedSum > 0) {
      return decimalOnePlacePercent(floatedZ);
    }

    return '';
  },

  @computed('percent', 'comparison_percent')
  differencePercent(percent, comparisonPercent) {
    const floatedPercent = parseFloat(percent);
    const floatedComparison = parseFloat(comparisonPercent);
    const difference = (floatedPercent - floatedComparison) * 100;

    if (isNaN(floatedPercent) || isNaN(floatedComparison)) {
      return '';
    }

    return difference.toFixed(1);
  },

  @computed('sum', 'm')
  selectedSumMoE(sum, m) {
    const floatedSum = parseFloat(sum);
    const floatedM = parseFloat(m);

    if (floatedSum > 0) {
      return floatedM;
    }

    return null;
  },

  @computed('data.comparison_sum', 'data.comparison_m')
  comparisonSumMoE(sum, m) {
    const floatedSum = parseFloat(sum);
    const floatedM = parseFloat(m);

    if (floatedSum > 0) {
      return floatedM;
    }

    return null;
  },

  @computed('data.sum', 'data.comparison_sum')
  differenceSum(sum, comparisonSum) {
    const floatedSum = parseFloat(sum);
    const floatedComparison = parseFloat(comparisonSum);
    const difference = floatedSum - floatedComparison;

    if (isNaN(floatedSum) || isNaN(floatedComparison)) {
      return '';
    }

    return decimalFormatAll(difference);
  },
});
