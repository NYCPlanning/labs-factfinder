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

@computed('data2.sum','rowconfig')
selectedEarlySum(sum, rowconfig) {
  sum = parseFloat(sum);
  return decimalFormat(sum, rowconfig.decimal);
},

@computed('data2.m','rowconfig')
selectedEarlySumM(m, rowconfig) {
  return decimalFormat(m, rowconfig.decimal);
},

@computed('data2.cv','rowconfig')
selectedEarlySumCV(cv, rowconfig) {
  return decimalFormat(cv, rowconfig.decimal);
},

@computed('data2.sum','data2.percent')
selectedEarlyPercent(sum,percent) {
  sum = parseFloat(sum);
  percent = parseFloat(percent);
  if (sum > 0) {
    return decimalOnePlacePercent(percent);
  } else {
    return "";
  }
},

@computed('data2.sum','data2.percent_m')
selectedEarlyPercentM(sum,percent_m) {
  sum = parseFloat(sum);
  percent_m = parseFloat(percent_m);
  if (sum > 0) {
    return decimalOnePlacePercent(percent_m);
  } else {
    return "";
  }
},

@computed('data2.sum','data.sum','rowconfig')
selectedCurrentSum(sum2, sum,rowconfig) {
  sum2 = parseFloat(sum2);
  sum = parseFloat(sum);
  if ((sum2 > 0) || (sum2 === 0)) {
    return decimalFormat(sum, rowconfig.decimal);
  } else {
    return "";
  }
},

@computed('data.m','rowconfig')
selectedCurrentSumM(m, rowconfig) {
  return decimalFormat(m, rowconfig.decimal);
},

@computed('data.cv','rowconfig')
selectedCurrentSumCV(cv, rowconfig) {
  return decimalFormat(cv, rowconfig.decimal);
},

@computed('data2.sum', 'data.sum','data.percent')
selectedCurrentPercent(sum2,sum,percent) {
  sum2 = parseFloat(sum2);
  sum = parseFloat(sum);
  percent = parseFloat(percent);
  if ((sum2 > 0) || (sum2 === 0)) {
    if (sum > 0) {
      return decimalOnePlacePercent(percent);
    } else {
      return "";
    }
  } else {
    return "";
  }
},

@computed('data.sum','data.percent_m')
selectedCurrentPercentM(sum,percent_m) {
  sum = parseFloat(sum);
  percent_m = parseFloat(percent_m);
  if (sum > 0) {
    return decimalOnePlacePercent(percent_m);
  } else {
    return "";
  }
},

@computed('data2.sum','data.sum', 'rowconfig')
change(sum2,sum,rowconfig) {
  sum2 = parseFloat(sum2);
  sum = parseFloat(sum);
  if (isNaN(sum2) || isNaN(sum)) {
    return "";
  } else {
    var difference = sum - sum2;
    return decimalFormatAll(difference, rowconfig.decimal, true);
  }
},

@computed('data2.sum', 'data2.m', 'data.m', 'rowconfig')
changeMOE(sum2, m2, m, rowconfig) {
  sum2 = parseFloat(sum2);
  m = parseFloat(m);
  m2 = parseFloat(m2);

  if (isNaN(m) && !isNaN(m2)) m=0;
  if (!isNaN(m) && isNaN(m2)) m2=0;

  if ((sum2 > 0) || (sum2 === 0)) {
    if (isNaN(m2) || isNaN(m)) {
      return "";
    } else {
      var x = (((m2/1.645)* (m2/1.645))
      + ((m/1.645)* (m/1.645)));
      if ((x > 0) || (x === 0)) {
        var changeM = Math.sqrt(x) * 1.645
        return decimalFormat(changeM, rowconfig.decimal) ;
      } else {
        return "";
      }
    }
  } else {
    return "";
  }
},

@computed('data2.sum', 'data.sum')
changePercent(sum2, sum) {
  sum = parseFloat(sum);
  sum2 = parseFloat(sum2);
  if (sum2 > 0) {
    var x = (sum - sum2)/sum2;
    return decimalOnePlacePercent(x, true)
  } else {
    return "";
  }
},

@computed('data.sum', 'data2.sum', 'data.m', 'data2.m')
  changePercentMOE(sum, sum2, m, m2) {
    sum = parseFloat(sum);
    sum2 = parseFloat(sum2);
    m = parseFloat(m);
    m2 = parseFloat(m2);
    if (sum2 > 0) {
    const moe = Math.abs(sum / sum2)
      * Math.sqrt((Math.pow((m / 1.645), 2) / Math.pow(sum, 2))
      + (Math.pow((m2 / 1.645), 2) / Math.pow(sum2, 2))) * 1.645;
    return decimalOnePlacePercent(moe);
  } else {
    return "";
  }
  },

  // @computed('data2.comparison_sum','data.comparison_sum', 'rowconfig')
  // comparisonDifferenceChangeSum(sum2,sum,rowconfig) {
  //   sum2 = parseFloat(sum2);
  //   sum = parseFloat(sum);
  //   if (isNaN(sum2) || isNaN(sum)) {
  //     return "";
  //   } else {
  //     var difference = sum - sum2;
  //     return decimalFormatAll(difference, rowconfig.decimal);
  //   }
  // },
  //
  // @computed('data2.comparison_sum', 'data2.comparison_m', 'data.comparison_m', 'rowconfig')
  // comparisonDifferenceChangeSumMoE(sum2, m2, m, rowconfig) {
  //   sum2 = parseFloat(sum2);
  //   m = parseFloat(m);
  //   m2 = parseFloat(m2);
  //   if ((sum2 > 0) || (sum2 === 0)) {
  //   if (isNaN(m2) || isNaN(m)) {
  //       return "";
  //     } else {
  //       var x = (((m2/1.645)* (m2/1.645))
  //       + ((m/1.645)* (m/1.645)));
  //       if ((x > 0) || (x === 0)) {
  //         var changeM = Math.sqrt(x)
  //         return decimalFormat(changeM, rowconfig.decimal) ;
  //       } else {
  //         return "";
  //       }
  //     }
  //   } else {
  //     return "";
  //   }
  // },

  // @computed('data2.comparison_sum', 'data.comparison_sum')
  // comparisonDifferenceChangePercent(sum2, sum) {
  //   sum = parseFloat(sum);
  //   sum2 = parseFloat(sum2);
  //   if (sum2 > 0) {
  //     var x = (sum - sum2)/sum2;
  //     return decimalOnePlacePercent(x)
  //   } else {
  //     return "";
  //   }
  // },
  //
  // @computed('data.comparison_sum', 'data2.comparison_sum', 'data.comparison_m', 'data2.comparison_m')
  //   comparisonDifferenceChangePercentMOE(sum, sum2, m, m2) {
  //     sum = parseFloat(sum);
  //     sum2 = parseFloat(sum2);
  //     m = parseFloat(m);
  //     m2 = parseFloat(m2);
  //     if (sum2 > 0) {
  //     const moe = Math.abs(sum / sum2)
  //       * Math.sqrt((Math.pow((m / 1.645), 2) / Math.pow(sum, 2))
  //       + (Math.pow((m2 / 1.645), 2) / Math.pow(sum2, 2))) * 1.645;
  //     return decimalOnePlacePercent(moe);
  //   } else {
  //     return "";
  //   }
  //   },

  // @computed('data.comparison_sum', 'data2.comparison_sum', 'data.sum', 'data2.sum', 'rowconfig')
  //   longTermDifference(comparisonSum, comparisonSum2, sum, sum2,rowconfig) {
  //     sum = parseFloat(sum);
  //     sum2 = parseFloat(sum2);
  //     comparisonSum = parseFloat(comparisonSum);
  //     comparisonSum2 = parseFloat(comparisonSum2);
  //     if ((sum2 > 0) || (sum2 === 0)) {
  //       const x = ( sum - sum2 ) - (comparisonSum - comparisonSum2);
  //       return decimalFormatAll(x,rowconfig.decimal);
  //     } else {
  //       return "";
  //     }
  // },
  //
  // @computed('data2.sum', 'data.comparison_m', 'data2.comparison_m', 'data.m', 'data2.m', 'rowconfig')
  // longTermDifferenceMOE(sum2, comparisonM, comparisonM2, m, m2, rowconfig) {
  //   sum2 = parseFloat(sum2);
  //   comparisonM = parseFloat(comparisonM);
  //   comparisonM2 = parseFloat(comparisonM2);
  //   m = parseFloat(m);
  //   m2 = parseFloat(m2);
  //
  //     if ((sum2 > 0) || (sum2 === 0)) {
  //   const bd = Math.sqrt((Math.pow((m2 / 1.645), 2)) + (Math.pow((m / 1.645), 2)));
  //   const bl = Math.sqrt((Math.pow((comparisonM2 / 1.645), 2))
  //     + (Math.pow((comparisonM / 1.645), 2)));
  //   const moe = Math.sqrt((Math.pow((bd / 1.645), 2)) + (Math.pow((bl / 1.645), 2)));
  //   if (isNaN(moe)) {
  //     return "";
  //   } else {
  //   return decimalFormatAll(moe, rowconfig.decimal);
  // }
  // } else {
  //   return "";
  // }
  // },
  //
  // @computed('data.comparison_sum', 'data2.comparison_sum', 'data.sum', 'data2.sum')
  // longTermDifferencePercent(comparisonSum, comparisonSum2, sum, sum2) {
  //   sum = parseFloat(sum);
  //   sum2 = parseFloat(sum2);
  //   comparisonSum = parseFloat(comparisonSum);
  //   comparisonSum2 = parseFloat(comparisonSum2);
  //     if ((sum2 > 0) && (comparisonSum2 > 0)) {
  //       const x = ((sum - sum2)/sum2) - ((comparisonSum - comparisonSum2)/comparisonSum2);
  //       if (isNaN (x)) {
  //         return "";
  //       } else {
  //       return decimalOnePlace(x * 100);
  //       }
  //     }
  //     else {
  //       return ""
  //     }
  //
  // },
  //
  // @computed('data.sum', 'data2.sum', 'data.m', 'data2.m', 'data.comparison_sum', 'data2.comparison_sum', 'data.comparison_m', 'data2.comparison_m')
  //   longTermDifferencePercentMOE(sum, sum2, m, m2, comparisonSum, comparisonSum2, comparisonM, comparisonM2) {
  //     sum = parseFloat(sum);
  //     sum2 = parseFloat(sum2);
  //     m = parseFloat(m);
  //     m2 = parseFloat(m2);
  //     comparisonSum = parseFloat(comparisonSum);
  //     comparisonSum2 = parseFloat(comparisonSum2);
  //     comparisonM = parseFloat(comparisonM);
  //     comparisonM2 = parseFloat(comparisonM2);
  //     if ((sum2 > 0) && (comparisonSum2 > 0)) {
  //     const bg = Math.abs(sum / sum2)
  //       * Math.sqrt((Math.pow((m / 1.645), 2) / Math.pow(sum, 2))
  //       + (Math.pow((m2 / 1.645), 2) / Math.pow(sum2, 2))) * 1.645;
  //     const bn = Math.abs(comparisonSum / comparisonSum2)
  //       * Math.sqrt((Math.pow((comparisonM / 1.645), 2) / Math.pow(comparisonSum, 2))
  //       + (Math.pow((comparisonM2 / 1.645), 2) / Math.pow(comparisonSum2, 2))) * 1.645;
  //
  //     const moe = Math.sqrt((Math.pow((bg / 1.645), 2)) + (Math.pow((bn / 1.645), 2)));
  //
  //     return decimalOnePlace(moe * 100);
  //   } else {
  //     return "";
  //   }
  // },

    @computed('selectedEarlyPercent', 'selectedCurrentPercent')
    changePercentagePoint(selectedEarlyPercent, selectedCurrentPercent) {
      return decimalOnePlace(selectedCurrentPercent - selectedEarlyPercent, true)
    },

    @computed('selectedEarlyPercentM', 'selectedCurrentPercentM')
    changePercentagePointMOE(selectedEarlyPercentM, selectedCurrentPercentM) {
      const divisor = 1.645;
      const sumOfSquares = (((parseFloat(selectedEarlyPercentM) / divisor) ** 2) + ((parseFloat(selectedCurrentPercentM) / divisor) ** 2));
      const difference = Math.sqrt(sumOfSquares);

      if (isNaN(parseFloat(selectedEarlyPercentM)) || isNaN(parseFloat(selectedCurrentPercentM))) {
        return null;
      }

      return difference.toFixed(1);
    },

    @computed('change','changeMOE')
    changeInsignificant(change,changeMOE) {
      return differenceInsignificance(change,changeMOE);
    },

    @computed('changePercent', 'changePercentMOE')
    changePercentInsignificant(changePercent, changePercentMOE) {
      return differenceInsignificance(changePercent, changePercentMOE);
    },

    @computed('changePercentagePoint', 'changePercentagePointMOE')
    changePercentagePointInsignificant(changePercentagePoint, changePercentagePointMOE) {
      return differenceInsignificance(changePercentagePoint, changePercentagePointMOE);
    },
});

function differenceInsignificance(value, moe) {
  const insignificant = moe >= Math.abs(parseFloat(value))
  return insignificant;
}

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

export function decimalFormatAll(number, decimal, isChange) { //for all numbers
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

      let string = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // prepend + sign if isChange is true
      if ((x > 0) && isChange)string = `+${string}`;
      return string
    }
  }


export function decimalOnePlace(number, isChange) {
  number = parseFloat(number);
  if (isNaN(number)) {
    return ""
  } else {
    let string = number.toFixed(1);

    // prepend + sign if isChange is true
    if ((number > 0) && isChange)string = `+${string}`;
    return string
  }
}

export function decimalOnePlacePercent(number, isChange) {
  number = parseFloat(number);
  if (isNaN(number)) {
    return ""
  } else {
    let string = (number*100).toFixed(1);

    // prepend + sign if isChange is true
    if ((number > 0) && isChange)string = `+${string}`;
    return `${string}%`;
  }
}
