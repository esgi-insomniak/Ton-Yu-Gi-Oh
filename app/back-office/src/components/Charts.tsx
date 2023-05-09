import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

const Charts = (options: EChartsOption) => {
  return <ReactECharts option={options.options} style={{ height: '720px'}} />;
};

export default Charts;
