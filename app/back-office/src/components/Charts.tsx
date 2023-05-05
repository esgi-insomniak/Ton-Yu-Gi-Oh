import React from 'react';
import ReactECharts from 'echarts-for-react';

const Charts = (...props: any) => {

    const options = {
        grid: props[0].grid,
        xAxis: props[0].xAxis,
        yAxis: props[0].yAxis,
        series: props[0].series,
        tooltip: {
          trigger: 'axis',
        },
      };
    
      return <ReactECharts option={options} />;
};

export default Charts;

