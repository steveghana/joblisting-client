import { AccountCircle, Send } from '@mui/icons-material';
import { ListItem, ListItemIcon, MenuItem } from '@mui/material';
interface IRowAction {
  close: () => void;
  actionString: string;
}
export const Email = () => (
  <MenuItem key={1} onClick={close} sx={{ m: 0 }}>
    <ListItemIcon>
      <Send />
    </ListItemIcon>
    Send Email
  </MenuItem>
);
function RowAction({ close, actionString }: IRowAction) {
  const ActionObj = {
    ['Send Email']: <Email />,
  };
  return <>{ActionObj[actionString as keyof typeof ActionObj]}</>;
}

export default RowAction;
