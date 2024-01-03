import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './Analytics/devsCard';
import PopularCard from './Analytics/PopularCard';
import TotalOrderLineChartCard from './Analytics/hoursCard';
import TotalIncomeDarkCard from './Analytics/monthRolesCard';
import TotalIncomeLightCard from './Analytics/scheduedInterviewsCard';
import TotalGrowthBarChart from './Analytics/rolesChart';
import { gridSpacing } from '../../../store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
        {/* <Grid mt={1} container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
