import Ember from 'ember';

const { isArray } = Array;
const { get } = Ember;

const operations = ['divide', 'subtract', 'add', 'multiply'];
const operators = {
  divide(a, b = 1) { return a / b; },
  add(a, b) { return a + b; },
  multiply(a, b) { return a * b; },
  subtract(a, b) { return a - b; },
};

const isOperator = function(step) {
  return operations.any(op => op === step);
};

const calculator = function(data) {
  const { procedure } = this;

  // impute values
  procedure.forEach((step, i) => {
    if (isArray(step)) {
      procedure[i] = calculator.bind({ procedure: step })(data);
      return;
    }

    if (!isOperator(step)) {
      procedure[i] = get(data, `${step}.sum`);
    }
  });

  const [firstValue] = procedure;

  return procedure
    .reduce((accumulator, step, i, array) => {
      if (!isOperator(step)) {
        return accumulator;
      }

      const first = array[i - 1];
      const second = array[i + 1];

      return operators[step](first, second);
    }, firstValue);
};

export default calculator;
