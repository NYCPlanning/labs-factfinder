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
  margin: {
    top: 25,
    right: 10,
    bottom: 50,
    left: 10,
    middle: 28,
  },
  height: 316,

  createChart: function createChart() {
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

      svg.append('text')
        .attr('class', 'label-male');

      svg.append('text')
        .attr('class', 'label-female');
    }

    this.set('svg', svg);
    this.updateChart();
  },

  updateChart() {
    const svg = this.get('svg');
    const data = this.get('data.pyramidData');
    const totals = this.get('data.totals');

    // get the largest of largest (percent + percent_moe)
    const maxValue = max([
      max([
        max(data, d => d.male.percent + d.male.percent_m),
        max(data, d => d.female.percent + d.female.percent_m),
      ]),
      max([
        max(data, d => d.male.comparison_percent + d.male.comparison_percent_m),
        max(data, d => d.female.comparison_percent + d.female.comparison_percent_m),
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
      const percent = d[type].percent;
      const percentM = d[type].percent_m;
      const estimate = d[type].sum;
      const moe = d[type].m;

      return `
        The ${type} population aged ${yAxisFormat(d.group)}
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

      selectAll(`.bar.${type}.${d.group}`)
        .classed('highlight', true);
    };

    const handleMouseOut = (d) => {
      selectAll(`.bar.${d.group}`)
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
      .domain(data.map(d => d.group))
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

    const totalMalePercent = totals.male.percent;
    const totalFemalePercent = totals.female.percent;
    const totalMalePercentM = totals.male.percent_m;
    const totalFemalePercentM = totals.female.percent_m;

    svg.select('.label-male')
      .text(`Male | ${numeral(totalMalePercent).format('0.0%')}±${numeral(totalMalePercentM).format('0.0%')}`)
      .attr('text-anchor', 'end')
      .attr('x', (width / 2) - margin.middle)
      .attr('y', -8);

    svg.select('.label-female')
      .text(`Female | ${numeral(totalFemalePercent).format('0.0%')}±${numeral(totalFemalePercentM).format('0.0%')}`)
      .attr('text-anchor', 'start')
      .attr('x', (width / 2) + margin.middle)
      .attr('y', -8);

    // draw main bars
    const leftBars = svg.select('.male')
      .attr('transform', `${translation(pointA, 0)}scale(-1,1)`)
      .selectAll('.bar.male')
      .data(data, d => d.group);

    const rightBars = svg.select('.female')
      .attr('transform', translation(pointB, 0))
      .selectAll('.bar.female')
      .data(data, d => d.group);

    const handleBars = (selection, type) => {
      const widthFunction = d => xScale(d[type].percent);

      selection.enter()
        .append('rect')
        .attr('class', d => `bar ${type} ${d.group}`)
        .attr('x', 0)
        .attr('y', d => yScale(d.group))
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
      .data(data, d => d.group);

    const rightMOEs = svg.select('.female')
      .selectAll('.moe.female')
      .data(data, d => d.group);

    const handleMOEs = (selection, type) => {
      const xFunction = (d) => {
        if (d[type].percent_m > d[type].percent) return 0;
        return xScale(d[type].percent) - xScale(d[type].percent_m);
      };

      const widthFunction = (d) => {
        const defaultWidth = xScale(d[type].percent_m) * 2;
        if (d[type].percent_m > d[type].percent) {
          const newWidth = (defaultWidth - (xScale(d[type].percent_m - d[type].percent)));
          return newWidth;
        }
        return defaultWidth;
      };

      selection.enter()
        .append('rect')
        .attr('alighnment-baseline', 'middle')
        .attr('class', d => `moe ${type} ${d.group}`)
        .attr('x', xFunction)
        .attr('y', d => yScale(d.group) + (yScale.bandwidth() / 2) + -3)
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
      .data(data, d => d.group);

    const rightComparisonMOEs = svg.select('.female')
      .selectAll('.comparisonmoe.female')
      .data(data, d => d.group);

    const handleComparisonMOEs = (selection, type) => {
      const xFunction = (d) => { // eslint-disable-line
        return xScale(d[type].comparison_percent) - xScale(d[type].comparison_percent_m);
      };
      const widthFunction = d => xScale(d[type].comparison_percent_m) * 2;

      selection.enter()
        .append('rect')
        .attr('class', d => `comparisonmoe ${type} ${d.group}`)
        .attr('x', xFunction)
        .attr('y', d => yScale(d.group) + (yScale.bandwidth() / 2) + -0.5)
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
      .data(data, d => d.group);

    const rightComparisons = svg.select('.female')
      .selectAll('.comparison.female')
      .data(data, d => d.group);

    const handleComparisons = (selection, type) => {
      const cxFunction = d => xScale(d[type].comparison_percent);
      selection.enter()
        .append('circle')
        .attr('class', d => `comparison ${type} ${d.group}`)
        .attr('cx', cxFunction)
        .attr('cy', d => yScale(d.group) + (yScale.bandwidth() / 2)) // yScale.step()
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
