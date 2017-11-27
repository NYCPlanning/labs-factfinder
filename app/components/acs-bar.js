import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import numeral from 'numeral';

import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

const HorizontalBar = Ember.Component.extend(ResizeAware, {
  // necessary to get tests to pass https://github.com/mike-north/ember-resize/issues/43
  resizeService: Ember.inject.service('resize'),

  classNameBindings: ['loading'],
  classNames: ['horizontal-bar'],

  height: 400,
  xMax: null,
  resizeWidthSensitive: true,
  resizeHeightSensitive: true,
  loading: false,
  barLabel: true,

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
    const barLabel = this.get('barLabel');


    let timer;

    // mouse event handlers
    const handleMouseOver = (d) => {
      clearTimeout(timer);
      // selectAll('.age-chart-tooltip')
      //   .html(toolTip(d));

      console.log(d);

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

    const margin = {
      top: 0,
      right: barLabel ? 50 : 0,
      bottom: 0,
      left: 0,
    };
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

      const barLabels = svg.selectAll('.barlabel')
        .data(rawData, d => d.group);

      barLabels.enter().append('text')
        .attr('class', 'label barlabel')
        .attr('text-anchor', 'left')
        .attr('alignment-baseline', 'top');

      barLabels.transition().duration(300)
        .attr('x', d => x(d.sum) + 6)
        .attr('y', d => y(d.group) + (y.bandwidth() / 2) + -2)
        .text((d) => { // eslint-disable-line
          return barLabel ? `${numeral(d.sum).format('0,0')}` : '';
        });

      barLabels.exit().remove();

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
        .attr('width', d => x(d.percent))

      bars.exit().remove();

      // draw MOE

      // const moebars = svg.selectAll('.moebar')
      //   .data(rawData, d => d.group);
      //
      // moebars.enter()
      //   .append('rect')
      //   .attr('class', d => `.moebars ${d.classValue}`)
      //   .attr('fill', (d) => {
      //     if (d.color) return d.color;
      //     return '#60acbf';
      //   })
      //   .attr('x', 0)
      //   .attr('width', d => x(d.sum))
      //   .attr('y', d => y(d.group))
      //   .attr('height', y.bandwidth() - 14)
      //   .attr('rx', 2)
      //   .attr('ry', 2);
      //
      //
      // moebars.transition().duration(300)
      //   .attr('width', d => x(d.sum));
      //
      // moebars.exit().remove();

    });
  },
});

export default HorizontalBar;
