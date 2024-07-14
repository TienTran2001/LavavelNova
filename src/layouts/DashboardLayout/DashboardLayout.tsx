import Box from '@mui/material/Box';
import TopBarComponent from '../../components/TopBar';
import SideBarComponent from '../../components/SideBar';
import COLORS from '../../utils/colors';
import SIZES from '../../utils/sizes';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <>
      <Box>
        <SideBarComponent />
        <TopBarComponent />
        <Box
          component={'main'}
          sx={{
            backgroundColor: COLORS.gray100,
            ml: SIZES.sideBar,
            minHeight: '100vh',
            height: '100%',
            paddingX: 6,
            paddingTop: `calc(32px + ${SIZES.heightTopHeader})`,
            paddingBottom: 4,
          }}
        >
          <Box maxWidth={SIZES.container} mx="auto">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
