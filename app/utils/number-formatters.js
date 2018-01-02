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

export default decimalFormat;
