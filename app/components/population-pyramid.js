import { get } from '@ember/object';
import { select, selectAll } from 'd3-selection';
import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisRight, axisBottom } from 'd3-axis';
import { transition } from 'd3-transition'; // eslint-disable-line
import { format } from 'd3-format';
import numeral from 'numeral';

import HorizontalBar from '../components/horizontal-bar';

const translation = (x, y) => `translate(${x},${y})`;

export default HorizontalBar.extend({

  classNames: ['population-pyramid callout'],

  margin: {
    top: 10,
    right: 10,
    bottom: 123,
    left: 10,
    middle: 28,
  },
  height: 375,

  createChart() {
    let svg = this.get('svg');
    const margin = this.get('margin');
    const el = this.$();
    const height = this.get('height') - margin.top - margin.bottom;

    if (!svg) {
      svg = select(el.get(0)).append('svg')
        .attr('class', 'age-chart')
        .attr('width', '100%')
        .attr('height', margin.top + height + margin.bottom)
        .append('g')
        .attr('class', 'padding-group')
        .attr('transform', translation(margin.left, margin.top));

      svg.append('g')
        .attr('class', 'male');

      svg.append('g')
        .attr('class', 'female');

      svg.append('g')
        .attr('class', 'axis x-axis-left');

      svg.append('g')
        .attr('class', 'axis x-axis-right');

      svg.append('g')
        .attr('class', 'axis y-axis-left');
    }

    this.set('svg', svg);
    this.updateChart();
  },

  updateChart() {
    const svg = this.get('svg');
    const data = this.get('data.pyramidData');

    // get the largest of largest (percent + percent_moe)
    const maxValue = max([
      max([
        max(data, d => get(d, 'male.percent') + get(d, 'male.percent_m')),
        max(data, d => get(d, 'female.percent') + get(d, 'female.percent_m')),
      ]),
      max([
        max(data, d => get(d, 'male.comparison_percent') + get(d, 'male.comparison_percent_m')),
        max(data, d => get(d, 'female.comparison_percent') + get(d, 'female.comparison_percent_m')),
      ]),
    ]);

    const yAxisFormat = (variable) => {
      if (variable === 'pop0t5') return 'Under 5';
      if (variable === 'pop85pl') return '85 & Over';
      const range = variable.split('pop')[1].split('t');
      return `${range[0]}-${range[1]}`;
    };

    // tooltip renderer
    const toolTip = (d, type) => {
      const percent = get(d, `${type}.percent`);
      const percentM = get(d, `${type}.percent_m`);
      const estimate = get(d, `${type}.sum`);
      const moe = get(d, `${type}.m`);

      return `
        The ${type} population aged ${yAxisFormat(get(d, 'group'))}
        is estimated at ${numeral(percent).format('0.0%')} <small>(±${numeral(percentM).format('0.0%')})</small> of the total population,
        or ${numeral(estimate).format('0,0')} <small>(±${numeral(moe).format('0,0')})</small> people.
      `;
    };

    let timer;

    // mouse event handlers
    const handleMouseOver = (d, type) => {
      clearTimeout(timer);
      selectAll('.age-chart-tooltip')
        .html(toolTip(d, type));

      selectAll(`.bar.${type}.${get(d, 'group')}`)
        .classed('highlight', true);
    };

    const handleMouseOut = (d) => {
      selectAll(`.bar.${get(d, 'group')}`)
        .classed('highlight', false);
      timer = setTimeout(() => {
        selectAll('.age-chart-tooltip')
          .html('Hover over bars for details about each age cohort');
      }, 400);
    };

    const el = this.$();
    const elWidth = el.width();

    const margin = this.get('margin');

    const height = this.get('height') - margin.top - margin.bottom;
    const width = elWidth - margin.left - margin.right;

    const regionWidth = (width / 2) - margin.middle;
    const pointA = regionWidth;
    const pointB = width - regionWidth;

    svg
      .attr('width', margin.left + width + margin.right)
      .attr('height', margin.top + height + margin.bottom);

    svg.select('.padding-group')
      .attr('transform', translation(margin.left, margin.top));

    // set x and y scale

    const xScale = scaleLinear()
      .domain([0, maxValue])
      .range([0, regionWidth])
      .nice();

    const yScale = scaleBand()
      .domain(data.map(d => get(d, 'group')))
      .range([height, 0])
      .paddingInner(0.2);

    // DRAW AXES

    const yAxisLeft = axisRight()
      .scale(yScale)
      .tickSize(4, 0)
      .tickPadding(margin.middle - 4)
      .tickFormat(yAxisFormat);

    const xAxisRight = axisBottom()
      .scale(xScale)
      .ticks(4)
      .tickFormat(format('.0%'));

    const xAxisLeft = axisBottom()
      .scale(xScale.copy().range([pointA, 0]))
      .ticks(4)
      .tickFormat(format('.0%'));

    svg.select('.y-axis-left')
      .attr('transform', translation(pointA, 0))
      .call(yAxisLeft)
      .selectAll('text')
      .style('text-anchor', 'middle');

    svg.select('.x-axis-left')
      .attr('transform', translation(0, height))
      .call(xAxisLeft);

    svg.select('.x-axis-right')
      .attr('transform', translation(pointB, height))
      .call(xAxisRight);

    // update positioning and text of top-labels

    // draw main bars
    const leftBars = svg.select('.male')
      .attr('transform', `${translation(pointA, 0)}scale(-1,1)`)
      .selectAll('.bar.male')
      .data(data, d => get(d, 'group'));

    const rightBars = svg.select('.female')
      .attr('transform', translation(pointB, 0))
      .selectAll('.bar.female')
      .data(data, d => get(d, 'group'));

    const handleBars = (selection, type) => {
      const widthFunction = d => xScale(get(d, `${type}.percent`));

      selection.enter()
        .append('rect')
        .attr('class', d => `bar ${type} ${get(d, 'group')}`)
        .attr('x', 0)
        .attr('y', d => yScale(get(d, 'group')))
        .attr('height', yScale.bandwidth())
        .attr('width', widthFunction)
        .attr('rx', 2)
        .attr('ry', 2)
        .on('mouseover', (d) => {
          handleMouseOver(d, type);
        })
        .on('mouseout', handleMouseOut);

      selection.transition()
        .duration(300)
        .attr('width', widthFunction);

      selection.exit().remove();
    };

    handleBars(leftBars, 'male');
    handleBars(rightBars, 'female');
    // end draw main bars

    // margin of error bars
    const leftMOEs = svg.select('.male')
      .selectAll('.moe.male')
      .data(data, d => get(d, 'group'));

    const rightMOEs = svg.select('.female')
      .selectAll('.moe.female')
      .data(data, d => get(d, 'group'));

    const handleMOEs = (selection, type) => {
      const xFunction = (d) => {
        if (get(d, `${type}.percent_m`) > get(d, `${type}.percent`)) return 0;
        return xScale(get(d, `${type}.percent`)) - xScale(get(d, `${type}.percent_m`));
      };

      const widthFunction = (d) => {
        const defaultWidth = xScale(get(d, `${type}.percent_m`)) * 2;
        if (get(d, `${type}.percent_m`) > get(d, `${type}.percent`)) {
          const newWidth = (defaultWidth - (xScale(get(d, `${type}.percent_m`) - get(d, `${type}.percent`))));
          return newWidth;
        }
        return defaultWidth;
      };

      selection.enter()
        .append('rect')
        .attr('alighnment-baseline', 'middle')
        .attr('class', d => `moe ${type} ${get(d, 'group')}`)
        .attr('x', xFunction)
        .attr('y', d => yScale(get(d, 'group')) + (yScale.bandwidth() / 2) + -3)
        .attr('height', 6)
        .attr('width', widthFunction);

      selection.transition()
        .duration(300)
        .attr('x', xFunction)
        .attr('width', widthFunction);

      selection.exit().remove();
    };

    handleMOEs(leftMOEs, 'male');
    handleMOEs(rightMOEs, 'female');
    // end margin of error bars


    // comparison MOE bars
    const leftComparisonMOEs = svg.select('.male')
      .selectAll('.comparisonmoe.male')
      .data(data, d => get(d, 'group'));

    const rightComparisonMOEs = svg.select('.female')
      .selectAll('.comparisonmoe.female')
      .data(data, d => get(d, 'group'));

    const handleComparisonMOEs = (selection, type) => {
      const xFunction = (d) => { // eslint-disable-line
        return xScale(get(d, `${type}.comparison_percent`)) - xScale(get(d, `${type}.comparison_percent_m`));
      };
      const widthFunction = d => xScale(get(d, `${type}.comparison_percent_m`)) * 2;

      selection.enter()
        .append('rect')
        .attr('class', d => `comparisonmoe ${type} ${get(d, 'group')}`)
        .attr('x', xFunction)
        .attr('y', d => yScale(get(d, 'group')) + (yScale.bandwidth() / 2) + -0.5)
        .attr('height', 1)
        .attr('width', widthFunction);

      selection.transition().duration(300)
        .attr('x', xFunction)
        .attr('width', widthFunction);

      selection.exit().remove();
    };

    handleComparisonMOEs(leftComparisonMOEs, 'male');
    handleComparisonMOEs(rightComparisonMOEs, 'female');
    // end comparison MOE bars

    // comparison dots
    const leftComparisons = svg.select('.male')
      .attr('transform', `${translation(pointA, 0)}scale(-1,1)`)
      .selectAll('.comparison.male')
      .data(data, d => get(d, 'group'));

    const rightComparisons = svg.select('.female')
      .selectAll('.comparison.female')
      .data(data, d => get(d, 'group'));

    const handleComparisons = (selection, type) => {
      const cxFunction = d => xScale(get(d, `${type}.comparison_percent`));
      selection.enter()
        .append('circle')
        .attr('class', d => `comparison ${type} ${get(d, 'group')}`)
        .attr('cx', cxFunction)
        .attr('cy', d => yScale(get(d, 'group')) + (yScale.bandwidth() / 2)) // yScale.step()
        .attr('r', 2.5);

      selection.transition().duration(300)
        .attr('cx', cxFunction);

      selection.exit().remove();
    };

    handleComparisons(leftComparisons, 'male');
    handleComparisons(rightComparisons, 'female');
    // end comparison dots
  },
});
