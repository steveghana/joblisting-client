import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from '../../../../components/Skeleton/TotalGrowthBarChart';
import MainCard from '../../../../components/MainCard';
import { gridSpacing } from '../../../../store/constant';

// chart data
import chartData from '../chart-data/total-growth-bar-chart';
import { themePalette } from '../../../../themes/schemes/palette';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }: { isLoading: boolean }) => {
  const [value, setValue] = useState('today');
  const theme = useTheme();
  const customization = useSelector((state: any) => state.customization);

  const { navType } = customization;
  const { primary } = themePalette.text;
  const darkLight = themePalette.primary.light;
  const grey200 = themePalette.grey[700];
  const grey500 = themePalette.grey[500];

  const primary200 = themePalette.success.dark;
  const primaryDark = themePalette.warning.dark;
  const secondaryMain = themePalette.secondary.dark;
  const secondaryLight = themePalette.info.lighter; //inactive

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        theme: 'light',
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle1">Roles and Vacancies</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default TotalGrowthBarChart;
