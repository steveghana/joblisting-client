const chartData: any = {
  type: 'area',
  height: 95,
  options: {
    chart: {
      id: 'interviews-chart',
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: 'Number of Interviews',
      },
      marker: {
        show: false,
      },
    },
  },
  // categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
  series: [
    {
      name: 'Number of Interviews',
      data: [0, 5, 3, 8, 2, 4, 6], // Sample data for the number of interviews
    },
  ],
};

export default chartData;
