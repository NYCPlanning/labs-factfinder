import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import numeral from 'numeral';// eslint-disable-line
import mungeBarChartData from '../utils/munge-bar-chart-data';
import { transition } from 'd3-transition'; // eslint-disable-line

const { get } = Ember;

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

  didRender() {
    if (this.get('data')) {
      this.createChart();
    }
  },

  debouncedDidResize(width) {
    this.set('width', width);
    this.updateChart();
  },

  createChart() {
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
      const percent = get(d, 'percent');
      const percentM = get(d, 'percent_m');
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

      selectAll(`.${get(d, 'classValue')}`)
        .classed('highlight', true);
    };

    const handleMouseOut = (d) => {
      selectAll(`.${get(d, 'classValue')}`)
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
    const textWidth = width * 0.35;

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);


    const rawData = mungeBarChartData(config, data);
    const y = scaleBand()
      .domain(rawData.map(d => get(d, 'group')))
      .range([0, height])
      .paddingOuter(0)
      .paddingInner(0.1);

    const x = scaleLinear()
      .domain([0, this.get('xMax') ? this.get('xMax') : max(rawData, d => get(d, 'percent'))])
      .range([textWidth, width]);


    // add bar text

    const groupLabels = svg.selectAll('.typelabel')
      .data(rawData, d => get(d, 'group'));

    groupLabels.enter().append('text')
      .attr('class', 'label typelabel')
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'top')
      .attr('x', 0)
      .attr('width', textWidth);

    groupLabels.transition().duration(300)
      .attr('y', d => y(get(d, 'group')) + y.bandwidth() + -14)
      .text(d => `${get(d, 'group')}`);

    groupLabels.exit().remove();


    // draw axes

    const bottomAxis = axisBottom()
      .scale(x)
      .ticks(5)
      .tickFormat(format('.0%'));

    svg.select('.axis-bottom')
      .attr('transform', translation(0, height + 4))

      .call(bottomAxis);


    // draw bars

    const bars = svg.selectAll('.buildingsbar')
      .data(rawData, d => get(d, 'group'));

    bars.enter()
      .append('rect')
      .attr('class', d => `buildingsbar ${get(d, 'classValue')}`)
      .attr('fill', (d) => {
        if (get(d, 'color')) return get(d, 'color');
        return '#60acbf';
      })
      .attr('x', x(0))
      .attr('width', d => x(get(d, 'percent')) - textWidth)
      .attr('y', d => y(get(d, 'group')))
      .attr('height', y.bandwidth())

      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', (d) => {
        handleMouseOver(d);
      })
      .on('mouseout', handleMouseOut);


    bars.transition().duration(300)
      .attr('x', x(0))
      .attr('width', d => x(get(d, 'percent')) - textWidth);

    bars.exit().remove();


    // draw MOE

    const moebars = svg.selectAll('.moebar')
      .data(rawData, d => get(d, 'group'));


    const xFunctionMOE = (d) => {
      if (get(d, 'percent_m') > get(d, 'percent')) return x(0);
      return x(get(d, 'percent')) - x(get(d, 'percent_m')) - -textWidth;
    };

    const widthFunctionMOE = (d) => {
      const defaultWidth = (x(get(d, 'percent_m')) - textWidth) * 2;
      if (get(d, 'percent_m') > get(d, 'percent')) {
        const newWidth = defaultWidth - (x(get(d, 'percent_m') - get(d, 'percent')) - textWidth);
        return newWidth;
      }
      return defaultWidth;
    };

    moebars.enter()
      .append('rect')
      .attr('class', d => `moebar ${get(d, 'classValue')}`)
      .attr('fill', (d) => {
        if (get(d, 'color')) return get(d, 'color');
        return '#2e6472';
      })
      .attr('opacity', 0.4)
      .attr('x', xFunctionMOE)
      .attr('y', d => y(get(d, 'group')) + (y.bandwidth() / 2) + -3)
      .attr('height', 6)
      .attr('width', widthFunctionMOE);

    moebars.transition().duration(300)
      .attr('x', xFunctionMOE)
      .attr('width', widthFunctionMOE);

    moebars.exit().remove();


    // draw Comparison MOE

    const comparisonMOEbars = svg.selectAll('.comparisonMoebar')
      .data(rawData, d => get(d, 'group'));

    const xFunctionComparisonMOE = d => x(get(d, 'comparison_percent'))
      - x(get(d, 'comparison_percent_m')) -
      -textWidth;

    const widthFunctionComparisonMOE = d => (x(get(d, 'comparison_percent_m')) - textWidth) * 2;
    comparisonMOEbars.enter()
      .append('rect')
      .attr('class', d => `comparisonMoebar ${get(d, 'classValue')}`)
      .attr('fill', (d) => {
        if (get(d, 'color')) return get(d, 'color');
        return '#000000';
      })
      .attr('opacity', 1)
      .attr('x', xFunctionComparisonMOE)
      .attr('y', d => y(get(d, 'group')) + (y.bandwidth() / 2) + -0.5)
      .attr('height', 1)
      .attr('width', widthFunctionComparisonMOE);

    comparisonMOEbars.transition().duration(300)
      .attr('x', xFunctionComparisonMOE)
      .attr('width', widthFunctionComparisonMOE);

    comparisonMOEbars.exit().remove();


    // draw comparison dots

    const comparisonBars = svg.selectAll('.comparisonbar')
      .data(rawData, d => get(d, 'group'));

    const cxFunction = d => x(get(d, 'comparison_percent'));
    comparisonBars.enter()
      .append('circle')
      .attr('fill', '#FFF')
      .attr('stroke', '#000')
      .attr('class', d => `comparisonbar ${get(d, 'classValue')}`)
      .attr('cx', cxFunction)
      .attr('cy', d => y(get(d, 'group')) + (y.bandwidth() / 2))
      .attr('r', 2.5);

    comparisonBars.transition().duration(300)
      .attr('cx', cxFunction);

    comparisonBars.exit().remove();
  },
});

export default HorizontalBar;
