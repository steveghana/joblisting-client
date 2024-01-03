import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <>
      <Typography>React.js</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </>
  );
}
interface ISkills {
  progress: number;
  label: string;
  color: string;
}
export default function DevSkillsProgress(props: { color: string | undefined; progress: any }) {
  //   const [progress, setProgress] = React.useState(10);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel color={props.color as any} value={props.progress || 10} />
    </Box>
  );
}
