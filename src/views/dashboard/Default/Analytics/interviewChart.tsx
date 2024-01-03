import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from '../chart-data/bajaj-area-chart';
import { themePalette } from '../../../../themes/schemes/palette';

// ===========================|| DASHBOARD DEFAULT - INTERVIEW TREND AREA CHART CARD ||=========================== //

const InterviewTrendAreaChartCard = () => {
  const theme = useTheme();
  const customization = useSelector((state: any) => state.customization);
  const { navType } = customization;

  const orangeDark = themePalette.primary[800];

  useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light',
      },
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  return (
    <Card sx={{ bgcolor: 'secondary.main' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: themePalette.warning.main }}>
                Total Interviews
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: themePalette.primary.light }}>
                120
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: themePalette.primary.light }}>
            Trend Over Time
          </Typography>
        </Grid>
      </Grid>
      <Chart {...chartData} />
    </Card>
  );
};

export default InterviewTrendAreaChartCard;
