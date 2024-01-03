// ===========================|| DASHBOARD - ACTIVE DEVELOPER HOURS CHART ||=========================== //

const chartData = {
  chart: {
    type: 'area',
    height: 300, // Increase the height for a more detailed view
  },
  options: {
    chart: {
      sparkline: {
        enabled: false, // Disable sparkline for a detailed line chart
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#5E72E4'], // Adjust color to fit your theme
    fill: {
      type: 'gradient', // Use gradient for a smooth transition between data points
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 0, // Start the axis from 0
      title: {
        text: 'Clocked Hours',
      },
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return 'Clocked Hours';
          },
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [
    {
      name: 'Clocked Hours',
      data: [45, 66, 41, 89, 25, 44, 9, 54],
    },
  ],
};

export default chartData;
