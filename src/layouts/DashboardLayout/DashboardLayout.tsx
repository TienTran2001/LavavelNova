import Box from '@mui/material/Box';
import TopBarComponent from '../../components/TopBar';
import SideBarComponent from '../../components/SideBar';
import COLORS from '../../utils/colors';
import SIZES from '../../utils/sizes';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <>
      <Box sx={{ height: '2000px' }}>
        <SideBarComponent />
        <TopBarComponent />
        <Box
          component={'main'}
          sx={{
            pt: 10,
            backgroundColor: COLORS.gray100,
            ml: SIZES.sideBar,
            minHeight: '100vh',
            height: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
