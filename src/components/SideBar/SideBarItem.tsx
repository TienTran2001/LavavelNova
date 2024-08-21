import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink } from 'react-router-dom';
import useMenuContext from '../../hooks/useMenuContext';
import { RouteType } from '../../routers/type';
import COLORS from '../../utils/colors';

interface IProps {
  item: RouteType;
}

const SideBarItem = ({ item }: IProps) => {
  const { setIsMenuOpen } = useMenuContext();
  return item.sideBarProps && item.path ? (
    <ListItemButton
      onClick={() => setIsMenuOpen(false)}
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
