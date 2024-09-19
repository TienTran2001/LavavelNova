'use client';

import SideBarComponent from '@/app/_components/ui/sideBar/SideBar';
import TopBarComponent from '@/app/_components/ui/topBar/TopBar';
import { COLORS, SIZES } from '@/app/_constants';
import { useMenuContext } from '@/app/_hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AdminLayoutWrap = ({ children }: { children: React.ReactNode }) => {
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
            {children}
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

export default AdminLayoutWrap;
