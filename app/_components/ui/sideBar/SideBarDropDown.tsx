'use client';

import SideBarItem from '@/app/_components/ui/sideBar/SideBarItem';
import { COLORS } from '@/app/_constants';
import { RouteType } from '@/app/routers/type';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface IProps {
  item: RouteType;
}

const SideBarDropDown = ({ item }: IProps) => {
  const pathname = usePathname();
  const checkOpen = pathname.startsWith(`/admin/${item.state}`);

  const [dropdown, setDropDow] = useState(checkOpen);

  return item.sideBarProps ? (
    <>
      <ListItemButton
        onClick={() => setDropDow(!dropdown)}
        component={'div'}
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
        <ListItemText
          disableTypography
          primary={<Typography>{item.sideBarProps.displayName}</Typography>}
        />
        <ExpandLessIcon
          className={`transition-all ${dropdown ? 'rotate-180' : ''}`}
        />
      </ListItemButton>
      <Collapse in={dropdown} timeout="auto">
        <List>
          {item.child?.map((route, index) =>
            route.sideBarProps ? (
              route.child ? (
                <SideBarDropDown key={index} item={route} />
              ) : (
                <SideBarItem key={index} item={route} />
              )
            ) : null
          )}
        </List>
      </Collapse>
    </>
  ) : null;
};

export default SideBarDropDown;
