import React from 'react';
import Charts from '@/components/Charts';

const Dashboard = () => {
  const gridOptions = {
    top: 8,
    bottom: 20,
    left: 36,
    right: 36,
  };

  const xAxisOptions = {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };

  const yAxisOptions = {
    type: 'value',
  };

  const seriesOptions = [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ];
  
  return (
    <React.Fragment>
      <h1 className="text-dark">Dashboard</h1>
      <div>
        <Charts
          grid={gridOptions}
          xAxis={xAxisOptions}
          yAxis={yAxisOptions}
          series={seriesOptions}
        />
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
