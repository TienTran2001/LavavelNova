import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import SideBarComponent from '~/components/SideBar';
import TopBarComponent from '~/components/TopBar';
import useMenuContext from '~/hooks/useMenuContext';
import COLORS from '~/utils/colors';
import SIZES from '~/utils/sizes';

const DashboardLayout = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenuContext();

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <Box>
        <div className={`${isMenuOpen ? '' : 'sidebar-cs'} `}>
          <SideBarComponent />
        </div>
        <TopBarComponent />
        <Box
          component={'main'}
          sx={{
            backgroundColor: COLORS.gray100,
            // ml: SIZES.sideBar,
            minHeight: '100vh',
            height: '100%',
            paddingX: 6,
            paddingTop: `calc(32px + ${SIZES.heightTopHeader})`,
            paddingBottom: 4,
          }}
          className="2xl:ml-[240px] ml-0"
        >
          <Box
            maxWidth={SIZES.container}
            width="100%"
            mx="auto"
            minHeight={'70vh'}
          >
            <Outlet />
          </Box>
          <Box component="footer" sx={{ textAlign: 'center', mt: '39px' }}>
            <Typography
              sx={{ fontWeight: 400, color: COLORS.gray500, fontSize: 12 }}
              component="p"
            >
              Powered by <span className="text-primary/500">Laravel Nova</span>{' '}
              · v4.0.3 (Silver Surfer)
            </Typography>
            <Typography
              component="p"
              sx={{ fontWeight: 400, color: COLORS.gray500, fontSize: 12 }}
            >
              © 2022 Laravel LLC · by Taylor Otwell and David Hemphill.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
