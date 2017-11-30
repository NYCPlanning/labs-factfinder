import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import numeral from 'numeral';// eslint-disable-line
import mungeBarChartData from '../utils/munge-bar-chart-data';

const translation = (x, y) => `translate(${x},${y})`;

const HorizontalBar = Ember.Component.extend(ResizeAware, {
  // necessary to get tests to pass https://github.com/mike-north/ember-resize/issues/43
  resizeService: Ember.inject.service('resize'),

  classNameBindings: ['loading'],
  classNames: ['horizontal-bar'],

  margin: {
    top: 10,
    right: 10,
    bottom: 120,
    left: 10,
  },
  height: 800,
  xMax: null,
  resizeWidthSensitive: true,
  resizeHeightSensitive: true,
  loading: false,

  getBarChartData(d, config) {
    return config.map(({ property, label }) =>
      ({
        percent: d[property].percent,
        sum: d[property].sum,
        moe: d[property].m,
        percent_m: d[property].percent_m,
        comparison_percent: d[property].comparison_percent,
        comparison_percent_m: d[property].comparison_percent_m,
        group: label,
        classValue: property,
      }));
  },

  didRender() {
    this.createChart();
  },

  debouncedDidResize(width) {
    this.set('width', width);
    this.updateChart();
  },

  createChart: function createChart() {
    let svg = this.get('svg');

    if (!svg) {
      const el = this.$();
      svg = select(el.get(0)).append('svg')
        .attr('class', 'chart');

      svg.append('g')
        .attr('class', 'axis axis-bottom');
    }

    this.set('svg', svg);
    this.updateChart();
  },

  updateChart: function updateChart() {
    const svg = this.get('svg');
    const data = this.get('data');
    const config = this.get('config');

    // tooltip renderer
    const toolTip = (d) => {
      const percent = d.percent;
      const percentM = d.percent_m;
      return `
        The estimated is ${numeral(percent).format('0.0%')} <small>(±${numeral(percentM).format('0.0%')})</small>
      `;
    };

    let timer;

    // mouse event handlers
    const handleMouseOver = (d) => {
      clearTimeout(timer);
      selectAll(`#${this.elementId} .age-chart-tooltip`)
        .html(toolTip(d));

      selectAll(`.${d.classValue}`)
        .classed('highlight', true);
    };

    const handleMouseOut = (d) => {
      selectAll(`.${d.classValue}`)
        .classed('highlight', false);
      timer = setTimeout(() => {
        selectAll(`#${this.elementId} .age-chart-tooltip`)
          .html('Hover over bars for more detail');
      }, 400);
    };


    const el = this.$();
    const elWidth = el.width();

    const margin = this.get('margin');
    const height = this.get('height') - margin.top - margin.bottom;
    const width = elWidth - margin.left - margin.right;
    const textWidth = width / 2;

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    Promise.resolve(data).then((raw) => {
      const rawData = mungeBarChartData(config, raw);
      const y = scaleBand()
        .domain(rawData.map(d => d.group))
        .range([0, height])
        .paddingOuter(0)
        .paddingInner(0.1);

      const x = scaleLinear()
        .domain([0, this.get('xMax') ? this.get('xMax') : max(rawData, d => d.percent)])
        .range([textWidth, width]);

      // add bar text
      const groupLabels = svg.selectAll('.typelabel')
        .data(rawData, d => d.group);

      groupLabels.enter().append('text')
        .attr('class', 'label typelabel')
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'top')
        .attr('x', (width / 2) - 10)
        .attr('width', textWidth);

      groupLabels.transition().duration(300)
        .attr('y', d => y(d.group) + y.bandwidth() + -14)
        .text(d => `${d.group}`);

      groupLabels.exit().remove();

      // DRAW AXES
      const bottomAxis = axisBottom()
        .scale(x)
        .ticks(5)
        .tickFormat(format('.0%'));


      svg.select('.axis-bottom')
        .attr('transform', translation(0, height))

        .call(bottomAxis);

      // update positioning and text of top-labels


      // draw bars

      const bars = svg.selectAll('.buildingsbar')
        .data(rawData, d => d.group);

      bars.enter()
        .append('rect')
        .attr('class', d => `buildingsbar ${d.classValue}`)
        .attr('fill', (d) => {
          if (d.color) return d.color;
          return '#60acbf';
        })
        .attr('x', x(0))
        .attr('width', d => x(d.percent) - textWidth)
        .attr('y', d => y(d.group))
        .attr('height', y.bandwidth() - 14)


        .attr('rx', 2)
        .attr('ry', 2)
        .on('mouseover', (d) => {
          handleMouseOver(d);
        })
        .on('mouseout', handleMouseOut);


      bars.transition().duration(300)
        .attr('x', x(0))
        .attr('width', d => x(d.percent) - textWidth);

      bars.exit().remove();

      // draw MOE

      const moebars = svg.selectAll('.moebar')
        .data(rawData, d => d.group);


      const xFunctionMOE = (d) => {
        if (d.percent_m > d.percent) return x(0);
        return x(d.percent) - x(d.percent_m) - -textWidth;
      };

      const widthFunctionMOE = (d) => {
        const defaultWidth = (x(d.percent_m) - textWidth) * 2;
        if (d.percent_m > d.percent) {
          const newWidth = defaultWidth - (x(d.percent_m - d.percent) - textWidth);
          return newWidth;
        }
        return defaultWidth;
      };


      moebars.enter()
        .append('rect')
        .attr('class', d => `moebar ${d.classValue}`)
        .attr('fill', (d) => {
          if (d.color) return d.color;
          return '#2e6472';
        })
        .attr('opacity', 0.4)
        .attr('x', xFunctionMOE)
        .attr('y', d => y(d.group) + (y.bandwidth() / 2) + -10)
        .attr('height', 6)
        .attr('width', widthFunctionMOE);

      moebars.transition().duration(300)
        .attr('x', xFunctionMOE)
        .attr('width', widthFunctionMOE);

      moebars.exit().remove();


      // draw Comparison MOE

      const comparisonMOEbars = svg.selectAll('.comparisonMoebar')
        .data(rawData, d => d.group);


      const xFunctionComparisonMOE = d => x(d.comparison_percent)
      - x(d.comparison_percent_m) -
      -textWidth;

      const widthFunctionComparisonMOE = d => (x(d.comparison_percent_m) - textWidth) * 2;
      comparisonMOEbars.enter()
        .append('rect')
        .attr('class', d => `comparisonMoebar ${d.classValue}`)
        .attr('fill', (d) => {
          if (d.color) return d.color;
          return '#000000';
        })
        .attr('opacity', 1)
        .attr('x', xFunctionComparisonMOE)
        .attr('y', d => y(d.group) + (y.bandwidth() / 2) + -7)
        .attr('height', 1)
        .attr('width', widthFunctionComparisonMOE);


      comparisonMOEbars.transition().duration(300)
        .attr('x', xFunctionComparisonMOE)
        .attr('width', widthFunctionComparisonMOE);


      comparisonMOEbars.exit().remove();


      // draw comparison dots


      const comparisonBars = svg.selectAll('.comparisonbar')
        .data(rawData, d => d.group);


      const cxFunction = d => x(d.comparison_percent);
      comparisonBars.enter()
        .append('circle')
        .attr('fill', '#FFF')
        .attr('stroke', '#000')
        .attr('class', d => `comparisonbar ${d.classValue}`)
        .attr('cx', cxFunction)
        .attr('cy', d => y(d.group) + (y.bandwidth() / 2) + -6.5)// yScale.step()
        .attr('r', 2.5);

      comparisonBars.transition().duration(300)
        .attr('cx', cxFunction);

      comparisonBars.exit().remove();
    });
  },
});

export default HorizontalBar;
