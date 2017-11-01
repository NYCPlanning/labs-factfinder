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
    right: 24,
    bottom: 20,
    left: 24,
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

  handleMouseOver(d) {
    selectAll(`.bar-label.group${d.group}`)
      .attr('opacity', 1);

    selectAll(`.bar.group${d.group}`)
      .attr('stroke-width', 1);
  },

  handleMouseOut(d) {
    selectAll('.bar-label')
      .attr('opacity', 0);

    selectAll(`.bar.group${d.group}`)
      .attr('stroke-width', 0);
  },

  updateChart() {
    const svg = this.get('svg');
    const data = this.get('data');

    const totalMale = sum(data, d => d.male);
    const totalFemale = sum(data, d => d.female);
    const totalPop = totalMale + totalFemale;
    const maxValue = max([max(data, d => d.male), max(data, d => d.female)]);

    const barLabel = d => `${numeral(d).format('0.0a')} (${numeral(d / totalPop).format('0.0%')})`;

    const el = this.$();
    const elWidth = el.width();

    const margin = this.get('margin');

    const height = this.get('height') - margin.top - margin.bottom;
    const width = elWidth - margin.left - margin.right;

    const regionWidth = (width / 2) - margin.middle;
    const pointA = regionWidth;
    const pointB = width - regionWidth;

    const yAxisFormat = (variable) => {
      if (variable === 'pop0t5') return 'Under 5';
      if (variable === 'pop85pl') return '85 & Over';
      const range = variable.split('pop')[1].split('t');
      return `${range[0]}-${range[1]}`;
    };

    svg
      .attr('width', margin.left + width + margin.right)
      .attr('height', margin.top + height + margin.bottom);

    svg.select('.padding-group')
      .attr('transform', translation(margin.left, margin.top));

    const xScale = scaleLinear()
      .domain([0, maxValue])
      .range([0, regionWidth - margin.right])
      .nice();

    const xScalePercent = scaleLinear()
      .domain([0, (maxValue / totalPop)])
      .range([0, regionWidth])
      .nice();

    const yScale = scaleBand()
      .domain(data.map(function(d) { return d.group; }))
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
      .selectAll('.bar.left')
      .data(data, d => d.group);

    const rightBarGroup = svg.select('.female')
      .attr('transform', translation(pointB, 0))
      .selectAll('.bar.right')
      .data(data, d => d.group);

    const leftMOEs = svg.selectAll('.moe.left')
      .data(data, d => d.group);

    const rightMOEs = svg.select('.female')
      .selectAll('.moe.left')
      .data(data, d => d.group);

    const leftBarLabels = svg.selectAll('.bar-label.left')
      .data(data, d => d.group);

    const rightBarLabels = svg.select('.female')
      .selectAll('.bar-label.right')
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
      .attr('class', d => `bar left group${d.group}`)
      .attr('x', 0)
      .attr('y', function(d) { return yScale(d.group); })
      .attr('height', yScale.step() - 3)
      .attr('width', function(d) { return xScale(d.male); })
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('stroke', '#4f4f4f')
      .attr('stroke-width', 0)
      .on('mouseover', this.handleMouseOver)
      .on('mouseout', this.handleMouseOut);

    leftBarGroup.transition().duration(300)
      .attr('y', function(d) { return yScale(d.group); })
      .attr('width', function(d) { return xScale(d.male); })
      .attr('height', yScale.step() - 3);

    rightBarGroup.enter()
      .append('rect')
      .attr('class', d => `bar right group${d.group}`)
      .attr('x', 0)
      .attr('y', function(d) { return yScale(d.group); })
      .attr('width', function(d) { return xScale(d.female); })
      .attr('height', yScale.step() - 3)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('stroke', '#4f4f4f')
      .attr('stroke-width', 0)
      .on('mouseover', this.handleMouseOver)
      .on('mouseout', this.handleMouseOut);


    rightBarGroup.transition().duration(300)
      .attr('y', function(d) { return yScale(d.group); })
      .attr('width', function(d) { return xScale(d.female); })
      .attr('height', yScale.step() - 3);

    leftMOEs.enter()
      .append('rect')
      .attr('class', d => `moe left group${d.group}`)
      .attr('x', d => regionWidth - xScale(d.male) - xScale(d.malemoe))
      .attr('y', d => yScale(d.group) + 4)
      .attr('height', 3)
      .attr('width', d => xScale(d.malemoe) * 2);

    rightMOEs.enter()
      .append('rect')
      .attr('class', d => `moe right group${d.group}`)
      .attr('x', d => xScale(d.female) - xScale(d.femalemoe))
      .attr('y', d => yScale(d.group) + 4)
      .attr('height', 3)
      .attr('width', d => xScale(d.femalemoe) * 2);


    leftBarLabels.enter()
      .append('text')
      .text(d => barLabel(d.male))
      .attr('alignment-baseline', 'middle')
      .attr('opacity', '0')
      .attr('text-anchor', 'end')
      .attr('class', d => `bar-label left group${d.group}`)
      .attr('x', d => regionWidth - xScale(d.male) - 2)
      .attr('y', d => yScale(d.group) + (yScale.step() / 2));

    leftBarLabels.transition().duration(300)
      .attr('x', d => regionWidth - xScale(d.male) - 2)
      .attr('y', d => yScale(d.group) + (yScale.step() / 2));

    rightBarLabels.enter()
      .append('text')
      .text(d => barLabel(d.female))
      .attr('alignment-baseline', 'middle')
      .attr('opacity', 0)
      .attr('text-anchor', 'start')
      .attr('class', d => `bar-label right group${d.group}`)
      .attr('x', d => xScale(d.female) + 2)
      .attr('y', d => yScale(d.group) + (yScale.step() / 2));

    rightBarLabels.transition().duration(300)
      .attr('x', d => xScale(d.female) + 2)
      .attr('y', d => yScale(d.group) + (yScale.step() / 2));


    leftBarGroup.exit().remove();
    rightBarGroup.exit().remove();
    leftBarLabels.exit().remove();
    rightBarLabels.exit().remove();
  },
});
