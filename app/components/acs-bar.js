import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get, getWithDefault } from '@ember/object';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import numeral from 'numeral';// eslint-disable-line
import mungeBarChartData from '../utils/munge-bar-chart-data';
import { transition } from 'd3-transition'; // eslint-disable-line

const translation = (x, y) => `translate(${x},${y})`;
const margin = {
  top: 10,
  right: 10,
  bottom: 60,
  left: 10,
};

export default Component.extend(ResizeAware, {
  // necessary to get tests to pass https://github.com/mike-north/ember-resize/issues/43
  resizeService: service('resize'),

  classNameBindings: ['loading'],
  classNames: ['acs-bar callout'],


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
    const isDecennial = this.get('survey') === 'census'
    const mode = this.get('mode');

    const el = this.$();
    const elWidth = el.width();

    const rawData = mungeBarChartData(config, data, mode);
    const additionalHeight = (rawData.length > 7) ? (16 * (rawData.length - 7)) : 0;

    const height = this.get('height') - margin.top - margin.bottom + additionalHeight;
    const width = elWidth - margin.left - margin.right;
    const textWidth = width * 0.35;

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const y = scaleBand()
      .domain(rawData.map(d => get(d, 'group')))
      .range([0, height])
      .paddingOuter(0)
      .paddingInner(0.1);

    // function to limit the maximum value to 100%
    function limitMax(newMax) {
      if (newMax > 1) return 1;
      return newMax;
    }

    const xMax = max([
      max(rawData, d => get(d, 'percent') + getWithDefault(d, 'percentMarginOfError', 0)),
      max(rawData, d => get(d, 'comparisonPercent') + getWithDefault(d, 'comparisonPercentMarginOfError', 0)),
    ]);

    const x = scaleLinear()
      .domain([0, limitMax(xMax)])
      .range([textWidth, width]);

    /* eslint-disable */

    // wrap bar type label text to multiple lines
    function wrap(textElements, wrapWidth) {
      textElements.each(function() {
        const wrapText = select(this);

        const words = wrapText.text().split(/\s+/).reverse();
        let line = [];
        let lineNumber = 0;
        const lineHeight = 0.8;
        const yPosition = wrapText.attr('y');
        let tspan = wrapText.text(null)
          .append('tspan')
          .attr('x', 0)
          .attr('y', yPosition)
          .attr('dy', 0);

        let word;
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node().getComputedTextLength() > wrapWidth) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = wrapText.append('tspan')
              .attr('x', 0)
              .attr('y', yPosition)
              .attr('dy', () => {
                const value = ((lineNumber += 1) * lineHeight);
                return `${value}em`;
              })
              .text(word);
          }
        }

        if (lineNumber == 1) {
          wrapText.attr('y', yPosition - 4)
          wrapText.selectAll('tspan').attr('y', yPosition - 4)
        }
        if (lineNumber == 2) {
          wrapText.attr('y', yPosition - 8)
          wrapText.selectAll('tspan').attr('y', yPosition - 8)
        }
      });
    }

    /* eslint-enable */

    // add bar type label text
    // start by deleting all existing labels on every update
    svg.selectAll('.typelabel').remove();

    const groupLabels = svg.selectAll('.typelabel')
      .data(rawData, d => get(d, 'group'));

    groupLabels.enter().append('text')
      .attr('class', 'label typelabel')
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'top')
      .attr('x', 0)
      .attr('width', textWidth)
      .attr('y', d => y(get(d, 'group')) + y.bandwidth() + -9)
      .text(d => `${get(d, 'group')}`)
      .call(wrap, textWidth);

    // draw axes

    const bottomAxis = axisBottom()
      .scale(x)
      .ticks(5)
      .tickFormat(format('.0%'))
      .tickSizeOuter([0]);

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
      .attr('ry', 2);

    bars.transition().duration(300)
      .attr('x', x(0))
      .attr('width', d => x(get(d, 'percent')) - textWidth);

    bars.exit().remove();


    // draw MOE
    if (!isDecennial) {
      const moebars = svg.selectAll('.moebar')
        .data(rawData, d => get(d, 'group'));
  
  
      const xFunctionMOE = (d) => {
        if (get(d, 'percentMarginOfError') > get(d, 'percent')) return x(0);
        return x(get(d, 'percent')) - x(get(d, 'percentMarginOfError')) - -textWidth;
      };
  
      const widthFunctionMOE = (d) => {
        const defaultWidth = (x(get(d, 'percentMarginOfError')) - textWidth) * 2;
        const axesWidth = width - textWidth;
        const barWidth = x(get(d, 'percent')) - textWidth;
        if (get(d, 'percentMarginOfError') > get(d, 'percent')) {
          const newWidth = defaultWidth - (x(get(d, 'percentMarginOfError') - get(d, 'percent')) - textWidth);
          return newWidth;
        }
        // if the percentage bar + the MOE bar extend past 100% on the x axes, modify width of MOE bar
        if (barWidth + (defaultWidth * 0.5) > axesWidth) {
          const gapWidth = axesWidth - barWidth;
          const shortenedWidth = (defaultWidth * 0.5) + gapWidth;
          return shortenedWidth;
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
  
      const xFunctionComparisonMOE = d => x(get(d, 'comparisonPercent'))
        - x(get(d, 'comparisonPercentMarginOfError'))
        - -textWidth;
  
      const widthFunctionComparisonMOE = d => (x(get(d, 'comparisonPercentMarginOfError')) - textWidth) * 2;
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
    }

    // draw comparison dots

    const comparisonBars = svg.selectAll('.comparisonbar')
      .data(rawData, d => get(d, 'group'));

    const cxFunction = d => x(get(d, 'comparisonPercent'));
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
