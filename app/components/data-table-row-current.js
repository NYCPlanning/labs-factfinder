/* eslint-disable */
import Ember from 'ember';
import { computed } from 'ember-decorators/object';

export default Ember.Component.extend({
  mode: 'current',
  reliability: false,
  comparison: true,

  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  @computed('rowconfig')
  getClassNames(rowconfig) {
    const classes = [];

    if (rowconfig.highlight) {
      classes.push('row-highlight');
    }

    if (rowconfig.indent) {
      classes.push(`row-indent-x${rowconfig.indent}`);
    }

    return classes.join(' ');
  },

//selected current data
  @computed('data.sum','rowconfig')
  selectedSum(sum, rowconfig) {
    sum = parseFloat(sum);
    return decimalFormat(sum, rowconfig.decimal);
  },

  @computed('data.sum','data.m','rowconfig')
  selectedSumMoE(sum,m,rowconfig) {
    sum = parseFloat(sum);
    m = parseFloat(m);
    if (sum > 0) {
      return decimalFormat(m, rowconfig.decimal) ;
    } else {
      return "";
    }
  },

  @computed('data.sum','data.cv')
  selectedCV(sum,cv) {
    sum = parseFloat(sum);
    cv = parseFloat(cv);
    if (sum > 0) {
      return decimalOnePlace(cv);
    } else {
      return "";
    }
  },

  @computed('data.sum','data.percent')
  selectedPercent(sum,percent) {
    sum = parseFloat(sum);
    percent = parseFloat(percent);
    if (sum > 0) {
      return decimalOnePlacePercent(percent);
    } else {
      return "";
    }
  },

  @computed('data.sum','data.percent_m')
  selectedPercentM(sum,percent_m) {
    sum = parseFloat(sum);
    percent_m = parseFloat(percent_m);
    if (sum > 0) {
      return decimalOnePlacePercent(percent_m);
    } else {
      return "";
    }
  },

//comparison current data
  @computed('data.comparison_sum','rowconfig')
  comparisonSum(sum, rowconfig) {
    sum = parseFloat(sum);
    return decimalFormat(sum, rowconfig.decimal);
  },

  @computed('data.comparison_sum','data.comparison_m','rowconfig')
  comparisonSumMoE(sum,m,rowconfig) {
    sum = parseFloat(sum);
    m = parseFloat(m);
    if (sum > 0) {
      m = parseFloat(m);
      return decimalFormat(m, rowconfig.decimal) ;
    } else {
      return "";
    }
  },

  @computed('data.comparison_sum','data.comparison_cv')
  comparisonCV(sum,cv) {
    sum = parseFloat(sum);
    cv = parseFloat(cv);
    if (sum > 0) {
      return decimalOnePlace(cv);
    } else {
      return "";
    }
  },

  @computed('data.comparison_sum','data.comparison_percent')
  comparisonPercent(sum,percent) {
    sum = parseFloat(sum);
    percent = parseFloat(percent);
    if (sum > 0) {
      return decimalOnePlacePercent(percent);
    } else {
      return "";
    }
  },

  @computed('data.comparison_sum','data.comparison_percent_m')
  comparisonPercentM(sum,percent_m) {
    sum = parseFloat(sum);
    percent_m = parseFloat(percent_m);
    if (sum > 0) {
      return decimalOnePlacePercent(percent_m);
    } else {
      return "";
    }
  },

  @computed('data.sum','data.comparison_sum', 'rowconfig')
  differenceSum(sum,comparison_sum,rowconfig) {
    sum = parseFloat(sum);
    comparison_sum = parseFloat(comparison_sum);
    var difference = sum - comparison_sum;
    if (isNaN(sum) || isNaN(comparison_sum)) {
      return "";
    } else {
      return decimalFormatAll(difference, rowconfig.decimal);
    }
  },


  @computed('data.percent','data.comparison_percent')
  differencePercent(percent,comparison_percent) {
    percent = parseFloat(percent);
    comparison_percent = parseFloat(comparison_percent);
    var difference = (percent - comparison_percent) * 100;
    if (isNaN(percent) || isNaN(comparison_percent)) {
      return "";
    } else {
      return difference.toFixed(1);
    }
  },

});

export function decimalFormat(number, decimal) { //for number >=0
  if ((number > 0) || (number === 0)) {
    var x;
    if(decimal === 1) {
      x = number.toFixed(1);
    } else if (decimal === 2) {
      x = number.toFixed(2);
    } else {
     x =  number.toFixed(0);
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return ""
  }
}

export function decimalFormatAll(number, decimal) { //for all numbers
    var x;
    if(isNaN(number)){
      return "";
    } else {
    if(decimal === 1) {
      x = number.toFixed(1);
    } else if (decimal === 2) {
      x = number.toFixed(2);
    } else {
     x =  number.toFixed(0);
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  }


export function decimalOnePlace(number) {
  number = parseFloat(number);
  if (isNaN(number)) {
    return ""
  } else {
    return number.toFixed(1);
  }
}

export function decimalOnePlacePercent(number) {
  number = parseFloat(number);
  if (isNaN(number)) {
    return ""
  } else {
    return (number*100).toFixed(1) +"%";
  }
}
