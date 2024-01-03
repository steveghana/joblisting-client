// JobFilters.tsx
import React, { useRef } from 'react';
import { Box, TextField, Button, Typography, Grid, Card, FormControlLabel, Checkbox } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { IJobs } from '../../../../types';

interface JobFiltersProps {
  filters: {
    [x: string]: IJobs[];
  }[];
  onChange: (newFilters: Record<string, any>) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onChange }) => {
  const [openStates, setOpenStates] = React.useState([true, true, true]);
  const initialCheckboxes = Array.from({ length: filters.length }, (_, index) => ({
    id: `checkbox${index + 1}`,
    checked: false,
  }));
  const [checkboxes, setCheckboxes] = React.useState(initialCheckboxes);
  const handleButtonClick = (index: number) => {
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>, checkboxId: string | number) => {
    event.stopPropagation();
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => (checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox)),
    );
    onChange({ ...filters, [event.target.name]: event.target.checked });
  };

  const handleToggleAll = () => {
    setCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => ({ ...checkbox, checked: false })));
  };
  return (
    <Grid
      lg={2.5}
      md={4}
      xs={12}
      m={1}
      item
      // border={"1px solid grey"}
      width={'100%'}
    >
      <Card variant="outlined" sx={{ p: 1 }}>
        <Typography variant="subtitle1">Filter By</Typography>
        {filters.map((item, index) => (
          <Box key={index}>
            <Box display={'flex'} gap={1} onClick={() => handleButtonClick(index)} alignItems={'center'}>
              {openStates[index] ? <ArrowDropUp /> : <ArrowDropDown color="info" />}

              <Typography variant="caption">Team</Typography>
            </Box>
            <Box
              //   my={1}
              px={2}
              gap={2}
              alignItems={'center'}
              sx={{ display: openStates[index] ? 'flex' : 'none' }}
            >
              <FormControlLabel
                label={Object.keys(item)[0]}
                name={Object.keys(item)[0]}
                control={<Checkbox checked={checkboxes[index].checked} onChange={(e) => handleFilterChange(e, index)} />}
              />
              <Typography variant="caption">{item[Object.keys(item)[0]].length}</Typography>
            </Box>
          </Box>
        ))}
        <Button onClick={handleToggleAll} variant="outlined" sx={{ my: 1 }} fullWidth>
          <Typography color={'grey'}>Clear all</Typography>
        </Button>
      </Card>
    </Grid>
  );
};

export default JobFilters;
