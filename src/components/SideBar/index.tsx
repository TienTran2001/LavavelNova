import logo from '../../../public/logo.svg';
import { brandName } from '../../assets';
import Drawer from '@mui/material/Drawer';
import SIZES from '../../utils/sizes';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import COLORS from '../../utils/colors';
import appRoutes from '../../routers/appRoutes';
import SideBarItem from './SideBarItem';
import SideBarDropDown from './SideBarDropDown';

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
            <img src={logo} alt="logo" />
            <img src={brandName} alt="brand name" />
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
