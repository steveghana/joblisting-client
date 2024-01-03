import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { Avatar, Box, Chip, CircularProgress, IconButton, InputProps, Typography } from '@mui/material';
import { useField } from 'formik';
import { ContactPageOutlined, Contacts } from '@mui/icons-material';
import { IDev } from '../../../types/devs';
import { useParams } from 'react-router';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.mode === 'light' ? lighten(theme.palette.primary.light, 0.85) : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});
type IGroup = {
  label: string;
  data: IDev[];
} & InputProps;

// const userList = [
//   { id: 1, name: "name 1" },
//   { id: 2, name: "name 2" },
//   { id: 3, name: "name 3" },
//   { id: 4, name: "name 4" },
//   { id: 5, name: "name 5" },
// ];
export default function RenderGroup({ label, data, ...props }: IGroup) {
  const { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const [field, meta, helpers] = useField(props!.name as string);
  const nameString = `${data[0]?.firstName || ''} ${data[0]?.lastName || ''}`;
  const [value, setValue] = React.useState<string[] | []>(id ? [nameString] : []);
  //   const [options, setOptions] = React.useState<readonly Film[]>([]);
  const options = data.map((option) => {
    const firstLetter = option.firstName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const handleOnChange = (_: any, value: any) => {
    helpers.setValue(value);
  };
  const loading = open && options.length === 0;
  return (
    <>
      <Autocomplete
        options={options.map((option) => `${option?.firstName} ${option?.lastName}`)}
        onChange={handleOnChange}
        // value={value}
        defaultValue={value}
        multiple
        id="tags-filled"
        loading={loading}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
        }
        renderInput={(params) => <TextField {...params} label={label} placeholder="Search" />}
      />
    </>
  );
}
