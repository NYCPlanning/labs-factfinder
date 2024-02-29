import { get } from '@ember/object';
import { select, selectAll } from 'd3-selection';
import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisRight, axisBottom } from 'd3-axis';
import { transition } from 'd3-transition'; // eslint-disable-line
import { format } from 'd3-format';
import numeral from 'numeral';

import HorizontalBar from './horizontal-bar';

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
        .attr('transform', translation(margin.left, 15));

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
    const data = this.get('data');
    const isPrevious = this.get('mode') === 'previous';
    console.log(`data (in population pyramid decennial)`, data);
    function getByMode(row, maleFemale, variable) {
      console.log(
        `row (in population pyramid decennial): `,
        row,
        `maleFemale (in population pyramid decennial): `,
        maleFemale,
        `variable (in population pyramid decennial):`,
        variable
      );
      const variableAsSuffix = variable[0].toUpperCase() + variable.slice(1,variable.length);
      const variableFullname = isPrevious ? 'previous' + variableAsSuffix : variable;

      return row[maleFemale][variableFullname];
    }

    // get the largest of largest (percent + percentMarginOfError)
    const maxValue = max([
      max([
        max(data, row => getByMode(row, 'male', 'percent')),
        max(data, row => getByMode(row, 'female', 'percent')),
      ]),
      max([
        max(data, row => getByMode(row, 'male', 'comparisonPercent')),
        max(data, row => getByMode(row, 'female', 'comparisonPercent')),
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
      const percent = getByMode(d, type, 'percent');
      const estimate = getByMode(d, type, 'sum');

      return `
        The ${type} population aged ${yAxisFormat(get(d, 'group'))}
        is estimated at ${numeral(percent).format('0.0%')} of the total population,
        or ${numeral(estimate).format('0,0')} people.
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
          .html('Hover over bars for details about each age group');
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


    // draw main bars
    const leftBars = svg.select('.male')
      .attr('transform', translation(pointA, 0))
      .selectAll('.bar.male')
      .data(data, d => get(d, 'group'));

    const rightBars = svg.select('.female')
      .attr('transform', translation(pointB, 0))
      .selectAll('.bar.female')
      .data(data, d => get(d, 'group'));

    const handleBars = (selection, type) => {
      const widthFunction = d => xScale(getByMode(d, type, 'percent'));

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

    // comparison dots
    const leftComparisons = svg.select('.male')
      .attr('transform', `${translation(pointA, 0)}scale(-1,1)`)
      .selectAll('.comparison.male')
      .data(data, d => get(d, 'group'));

    const rightComparisons = svg.select('.female')
      .selectAll('.comparison.female')
      .data(data, d => get(d, 'group'));

    const handleComparisons = (selection, type) => {
      const cxFunction = d => xScale(getByMode(d, type, 'comparisonPercent'));
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
