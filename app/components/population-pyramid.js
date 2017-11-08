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
    console.log('chartData', data)

    // get the largest value + moe
    const maxValue = max([
      max(data, d => d.male.percent + d.male.percent_m),
      max(data, d => d.female.percent + d.female.percent_m),
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
      console.log('tooltip', d)
      const percent = d[`${type}Percent`];
      const percentM = d[`${type}PercentM`];
      const estimate = d[type];
      const moe = d[`${type}moe`];

      return `
        The ${type} population aged ${yAxisFormat(d.group)}
        is estimated at ${numeral(percent).format('0.0%')}±${numeral(percentM).format('0.0%')} of the total population
        (${numeral(estimate).format('0,0')}±${numeral(moe).format('0,0')}).
      `;
    };

    let timer;

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

    const xScale = scaleLinear()
      .domain([0, maxValue])
      .range([0, regionWidth])
      .nice();

    const yScale = scaleBand()
      .domain(data.map(d => d.group))
      .range([height, 0])
      .paddingInner(0.2);

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

    const leftComparisons = svg.select('.male')
      .attr('transform', `${translation(pointA, 0)}scale(-1,1)`)
      .selectAll('.comparison.male')
      .data(data, d => d.group);

    const rightComparisons = svg.select('.female')
      .selectAll('.comparison.female')
      .data(data, d => d.group);

    const leftComparisonMOEs = svg.select('.male')
      .selectAll('.comparisonmoe.left')
      .data(data, d => d.group);

    // const rightComparisonMOEs = svg.select('.female')
    //   .selectAll('.comparisonmoe.right')
    //   .data(data, d => d.group);


    // const rightComparison = svg.select('.female')
    //   .attr('transform', `${translation(pointA, 0)}scale(-1,1)`)
    //   .selectAll('.comparison.female')
    //   .data(data, d => d.group);


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

    leftBarGroup.enter()
      .append('rect')
      .attr('class', d => `bar male ${d.group}`)
      .attr('x', 0)
      .attr('y', d => yScale(d.group))
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(d.male.percent))
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', (d) => {
        handleMouseOver(d, 'male');
      })
      .on('mouseout', handleMouseOut);

    leftBarGroup.transition().duration(300)
      .attr('width', d => xScale(d.male.percent))

    leftBarGroup.exit().remove();

    rightBarGroup.enter()
      .append('rect')
      .attr('class', d => `bar female ${d.group}`)
      .attr('x', 0)
      .attr('y', d => yScale(d.group))
      .attr('width', d => xScale(d.female.percent))
      .attr('height', yScale.bandwidth())
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', (d) => {
        handleMouseOver(d, 'female');
      })
      .on('mouseout', handleMouseOut);

    rightBarGroup.transition().duration(300)
      .attr('width', d => xScale(d.female.percent))

    rightBarGroup.exit().remove();

    leftMOEs.enter()
      .append('rect')
      .attr('alighnment-baseline', 'middle')
      .attr('class', d => `moe left ${d.group}`)
      .attr('x', d => xScale(d.male.percent) - xScale(d.male.percent_m))
      .attr('y', d => yScale(d.group) + (yScale.bandwidth() / 2) + -1.5)
      .attr('height', 3)
      .attr('width', d => xScale(d.male.percent_m) * 2);

    leftMOEs.transition().duration(300)
      .attr('x', d => xScale(d.male.percent) - xScale(d.male.percent_m))
      .attr('width', d => xScale(d.male.percent_m) * 2);

    rightMOEs.enter()
      .append('rect')
      .attr('class', d => `moe right ${d.group}`)
      .attr('x', d => xScale(d.female.percent) - xScale(d.female.percent_m))
      .attr('y', d => yScale(d.group) + (yScale.bandwidth() / 2) + -1.5)
      .attr('height', 3)
      .attr('width', d => xScale(d.female.percent_m) * 2);

    rightMOEs.transition().duration(300)
      .attr('x', d => xScale(d.female.percent) - xScale(d.female.percent_m))
      .attr('width', d => xScale(d.female.percent_m) * 2);


    leftComparisons.enter()
      .append('circle')
      .attr('class', d => `comparison male ${d.group}`)
      .attr('cx', d => xScale(d.male.comparison_percent))
      .attr('cy', d => yScale(d.group) + (yScale.bandwidth() / 2)) // yScale.step()
      .attr('r', 3)

    leftComparisons.exit().remove();

    rightComparisons.enter()
      .append('circle')
      .attr('class', d => `comparison female ${d.group}`)
      .attr('cx', d => xScale(d.female.comparison_percent))
      .attr('cy', d => yScale(d.group) + (yScale.bandwidth() / 2)) // yScale.step()
      .attr('r', 3)

    leftComparisons.exit().remove();

    leftComparisonMOEs.enter()
      .append('rect')
      .attr('alighnment-baseline', 'middle')
      .attr('class', d => `comparisonmoe left ${d.group}`)
      .attr('x', d => xScale(d.male.comparison_percent) - xScale(d.male.comparison_percent_m))
      .attr('y', d => yScale(d.group) + (yScale.bandwidth() / 2) + -1.5)
      .attr('height', 1)
      .attr('width', d => xScale(d.male.comparison_percent_m) * 2);
    //
    // rightComparisonMOEs.enter()
    //   .append('rect')
    //   .attr('alighnment-baseline', 'middle')
    //   .attr('class', d => `comparisonmoe left ${d.group}`)
    //   .attr('x', d => xScale(d.female.comparison_percent) - xScale(d.female.comparison_percent_m))
    //   .attr('y', d => yScale(d.group) + (yScale.bandwidth() / 2) + -1.5)
    //   .attr('height', 1)
    //   .attr('width', d => xScale(d.female.comparison_percent_m) * 2);
  },
});
