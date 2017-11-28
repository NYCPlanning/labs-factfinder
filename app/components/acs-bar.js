import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { transition } from 'd3-transition'; // eslint-disable-line


const HorizontalBar = Ember.Component.extend(ResizeAware, {
  // necessary to get tests to pass https://github.com/mike-north/ember-resize/issues/43
  resizeService: Ember.inject.service('resize'),

  classNameBindings: ['loading'],
  classNames: ['horizontal-bar'],

  margin: {
    top: 10,
    right: 10,
    bottom: 100,
    left: 10,
  },
  height: 800,
  xMax: null,
  resizeWidthSensitive: true,
  resizeHeightSensitive: true,
  loading: false,

  data: [],

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
    }

    this.set('svg', svg);
    this.updateChart();
  },

  updateChart: function updateChart() {
    const svg = this.get('svg');
    const data = this.get('data');

    let timer;

    // mouse event handlers
    const handleMouseOver = (d) => {
      clearTimeout(timer);
      // selectAll('.age-chart-tooltip')
      //   .html(toolTip(d));

      selectAll(`.${d.classValue}`)
        .classed('highlight', true);
    };

    const handleMouseOut = (d) => {
      selectAll(`.${d.classValue}`)
        .classed('highlight', false);
      timer = setTimeout(() => {
        // selectAll('.age-chart-tooltip')
        //   .html('Hover over bars for details about each age cohort');
      }, 400);
    };


    const el = this.$();
    const elWidth = el.width();

    const margin = this.get('margin');
    const height = this.get('height') - margin.top - margin.bottom;
    const width = elWidth - margin.left - margin.right;

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    Promise.resolve(data).then((rawData) => {
      const y = scaleBand()
        .domain(rawData.map(d => d.group))
        .range([0, height])
        .paddingOuter(0)
        .paddingInner(0.1);

      const x = scaleLinear()
        .domain([0, this.get('xMax') ? this.get('xMax') : max(rawData, d => d.percent)])
        .range([0, width]);

      const groupLabels = svg.selectAll('.typelabel')
        .data(rawData, d => d.group);

      groupLabels.enter().append('text')
        .attr('class', 'label typelabel')
        .attr('text-anchor', 'left')
        .attr('alignment-baseline', 'top')
        .attr('x', 0);

      groupLabels.transition().duration(300)
        .attr('y', d => y(d.group) + y.bandwidth() + -3)
        .text((d) => {
          if (d.percent) return `${d.group} | ${(d.percent * 100).toFixed(1)} %`;
          return `${d.group}`;
        });

      groupLabels.exit().remove();

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
        .attr('x', 0)
        .attr('width', d => x(d.percent))
        .attr('y', d => y(d.group))
        .attr('height', y.bandwidth() - 14)


        .attr('rx', 2)
        .attr('ry', 2)
        .on('mouseover', (d) => {
          handleMouseOver(d);
        })
        .on('mouseout', handleMouseOut);


      bars.transition().duration(300)
        .attr('width', d => x(d.percent));

      bars.exit().remove();

      // draw MOE

      const moebars = svg.selectAll('.moebar')
        .data(rawData, d => d.group);


      const xFunctionMOE = (d) => {
        if (d.percent_m > d.percent) return 0;
        return x(d.percent) - x(d.percent_m);
      };

      const widthFunctionMOE = (d) => {
        const defaultWidth = x(d.percent_m) * 2;
        if (d.percent_m > d.percent) {
          const newWidth = (defaultWidth - (x(d.percent_m - d.percent)));
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
        .attr('width', widthFunctionMOE);

      moebars.exit().remove();


      // draw Comparison MOE

      const comparisonMOEbars = svg.selectAll('.comparisonMoebar')
        .data(rawData, d => d.group);


      const xFunctionComparisonMOE = d => x(d.comparison_percent) - x(d.comparison_percent_m);

      const widthFunctionComparisonMOE = d => x(d.comparison_percent_m) * 2;
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
