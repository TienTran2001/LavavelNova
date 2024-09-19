import { brandName, logo } from '@/app/_assets';
import SideBarDropDown from '@/app/_components/ui/sideBar/SideBarDropDown';
import SideBarItem from '@/app/_components/ui/sideBar/SideBarItem';
import { COLORS, SIZES } from '@/app/_constants';
import appRoutes from '@/app/routers/appRouter';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';

const SideBarComponent = () => {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: SIZES.sideBar,
          '& .MuiDrawer-paper': {
            borderRight: 0,
            width: SIZES.sideBar,
            backgroundColor: COLORS.gray100,
          },
        }}
      >
        <Toolbar
          variant="dense"
          disableGutters
          sx={{ minHeight: SIZES.heightTopHeader, backgroundColor: 'white' }}
        >
          <Stack direction="row" spacing="9px" padding={'0 24px'}>
            <Image src={logo} alt="logo" />
            <Image src={brandName} alt="brand name" />
          </Stack>
        </Toolbar>
        <List disablePadding sx={{ p: '20px 12px' }}>
          {appRoutes.map((route, index) =>
            route.sideBarProps ? (
              route.child ? (
                <SideBarDropDown key={index} item={route} />
              ) : (
                <SideBarItem key={index} item={route} />
              )
            ) : null
          )}
        </List>
      </Drawer>
    </>
  );
};

export default SideBarComponent;
