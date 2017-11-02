import { select, selectAll } from 'd3-selection';
import { sum, max } from 'd3-array';
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
    bottom: 20,
    left: 10,
    middle: 28,
  },
  height: 286,

  createChart: function createChart() {
    let svg = this.get('svg');
    const margin = this.get('margin');
    const el = this.$();
    const elWidth = el.width();
    const height = this.get('height') - margin.top - margin.bottom;
    const width = elWidth - margin.left - margin.right;

    if (!svg) {
      svg = select(el.get(0)).append('svg')
        .attr('class', 'age-chart')
        .attr('width', margin.left + width + margin.right)
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
    const data = this.get('data');

    const totalMale = sum(data, d => d.male);
    const totalFemale = sum(data, d => d.female);
    const totalPop = totalMale + totalFemale;

    // get the largest value + moe
    const maxValue = max([
      max(data, d => d.male + d.malemoe),
      max(data, d => d.female + d.femalemoe),
    ]);

    const formatLabel = (value) => {
      if (value < 1000) return parseInt(value, 10);
      return numeral(value).format('0.0a');
    };

    const yAxisFormat = (variable) => {
      if (variable === 'pop0t5') return 'Under 5';
      if (variable === 'pop85pl') return '85 & Over';
      const range = variable.split('pop')[1].split('t');
      return `${range[0]}-${range[1]}`;
    };

    const toolTip = (d, type) => {
      const estimate = d[type];
      const moe = d[`${type}moe`];
      return `
        The ${type} population aged ${yAxisFormat(d.group)}
        is estimated at ${numeral(estimate).format('0,0')} ±${formatLabel(moe)},
        ${numeral(estimate / totalPop).format('0.0%')} of the total population
      `;
    };

    const handleMouseOver = (d, type) => {
      selectAll('.age-chart-tooltip')
        .html(toolTip(d, type));

      selectAll(`.bar.${type}.${d.group}`)
        .classed('highlight', true);
    };

    const handleMouseOut = (d) => {
      selectAll('.age-chart-tooltip')
        .html('Hover over bars for details about each age cohort');

      selectAll(`.bar.${d.group}`)
        .classed('highlight', false);
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

    const xScale = scaleLinear()
      .domain([0, maxValue])
      .range([0, regionWidth])
      .nice();

    const xScalePercent = scaleLinear()
      .domain([0, (maxValue / totalPop)])
      .range([0, regionWidth])
      .nice();

    const yScale = scaleBand()
      .domain(data.map(d => d.group))
      .range([height, 0], 0.1);

    const yAxisLeft = axisRight()
      .scale(yScale)
      .tickSize(4, 0)
      .tickPadding(margin.middle - 4)
      .tickFormat(yAxisFormat);

    const xAxisRight = axisBottom()
      .scale(xScalePercent)
      .ticks(4)
      .tickFormat(format('.0%'));

    const xAxisLeft = axisBottom()
      .scale(xScalePercent.copy().range([pointA, 0]))
      .ticks(4)
      .tickFormat(format('.0%'));

    const leftBarGroup = svg.select('.male')
      .attr('transform', `${translation(pointA, 0)}scale(-1,1)`)
      .selectAll('.bar.male')
      .data(data, d => d.group);

    const rightBarGroup = svg.select('.female')
      .attr('transform', translation(pointB, 0))
      .selectAll('.bar.female')
      .data(data, d => d.group);

    const leftMOEs = svg.select('.male')
      .selectAll('.moe.left')
      .data(data, d => d.group);

    const rightMOEs = svg.select('.female')
      .selectAll('.moe.right')
      .data(data, d => d.group);

    // DRAW AXES
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

    // update top labels positioning
    svg.select('.label-male')
      .text(`Male | ${numeral(totalMale).format('0,0')}`)
      .attr('text-anchor', 'end')
      .attr('x', (width / 2) - margin.middle)
      .attr('y', -8);

    svg.select('.label-female')
      .text(`Female | ${numeral(totalFemale).format('0,0')}`)
      .attr('text-anchor', 'start')
      .attr('x', (width / 2) + margin.middle)
      .attr('y', -8);

    leftBarGroup.enter()
      .append('rect')
      .attr('class', d => `bar male ${d.group}`)
      .attr('x', 0)
      .attr('y', d => yScale(d.group))
      .attr('height', yScale.step() - 3)
      .attr('width', d => xScale(d.male))
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', (d) => {
        handleMouseOver(d, 'male');
      })
      .on('mouseout', handleMouseOut);

    leftBarGroup.transition().duration(300)
      .attr('width', d => xScale(d.male))
      .attr('height', yScale.step() - 3);

    leftBarGroup.exit().remove();

    rightBarGroup.enter()
      .append('rect')
      .attr('class', d => `bar female ${d.group}`)
      .attr('x', 0)
      .attr('y', d => yScale(d.group))
      .attr('width', d => xScale(d.female))
      .attr('height', yScale.step() - 3)
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', (d) => {
        handleMouseOver(d, 'female');
      })
      .on('mouseout', handleMouseOut);

    rightBarGroup.transition().duration(300)
      .attr('width', d => xScale(d.female))
      .attr('height', yScale.step() - 3);

    rightBarGroup.exit().remove();

    leftMOEs.enter()
      .append('rect')
      .attr('class', d => `moe left ${d.group}`)
      .attr('x', d => xScale(d.male) - xScale(d.malemoe))
      .attr('y', d => yScale(d.group) + 4)
      .attr('height', 3)
      .attr('width', d => xScale(d.malemoe) * 2);

    leftMOEs.transition().duration(300)
      .attr('x', d => xScale(d.male) - xScale(d.malemoe))
      .attr('width', d => xScale(d.malemoe) * 2);

    rightMOEs.enter()
      .append('rect')
      .attr('class', d => `moe right ${d.group}`)
      .attr('x', d => xScale(d.female) - xScale(d.femalemoe))
      .attr('y', d => yScale(d.group) + 4)
      .attr('height', 3)
      .attr('width', d => xScale(d.femalemoe) * 2);

    rightMOEs.transition().duration(300)
      .attr('x', d => xScale(d.female) - xScale(d.femalemoe))
      .attr('width', d => xScale(d.femalemoe) * 2);
  },
});
