import ListItemButton from '@mui/material/ListItemButton';
import { RouteType } from '../../routers/type';
import ListItemIcon from '@mui/material/ListItemIcon';
import COLORS from '../../utils/colors';
import { NavLink } from 'react-router-dom';

interface IProps {
  item: RouteType;
}

const SideBarItem = ({ item }: IProps) => {
  return item.sideBarProps && item.path ? (
    <ListItemButton
      component={(props) => (
        <NavLink
          {...props}
          to={item.path}
          style={({ isActive }) => {
            return isActive
              ? {
                  color: COLORS.primary500,
                  fontWeight: 800,
                }
              : {};
          }}
        />
      )}
      // component={Link}
      // to={item.path}
      sx={{
        fontWeight: 400,
        color: COLORS.gray500,
        borderRadius: 2,
        columnGap: 1,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          width: '24px',
          height: '24px',
          padding: '3px',
        }}
      >
        {item.sideBarProps.icon && item.sideBarProps.icon}
      </ListItemIcon>
      {item.sideBarProps.displayName}
    </ListItemButton>
  ) : null;
};

export default SideBarItem;
