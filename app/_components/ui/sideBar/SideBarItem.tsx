'use client';

import { COLORS } from '@/app/_constants';
import { useMenuContext } from '@/app/_hooks';
import { RouteType } from '@/app/routers/type';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IProps {
  item: RouteType;
}

const SideBarItem = ({ item }: IProps) => {
  const { setIsMenuOpen } = useMenuContext();

  const pathname = usePathname();
  const isActive = pathname === item.path;

  return item.sideBarProps && item.path ? (
    <ListItemButton
      onClick={() => setIsMenuOpen(false)}
      component="div"
      sx={{
        fontWeight: isActive ? 600 : 400,
        color: isActive ? COLORS.primary500 : COLORS.gray500,
        borderRadius: 2,
        columnGap: 1,
      }}
    >
      <Link
        href={item.path}
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          width: '100%',
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
      </Link>
    </ListItemButton>
  ) : null;
};

export default SideBarItem;
