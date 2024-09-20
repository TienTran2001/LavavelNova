'use client';

import createEmotionCache from '@/app/_utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const baseOption = useMemo(() => ({}), []);
  const theme = useMemo(
    () => createTheme(baseOption as ThemeOptions),
    [baseOption]
  );

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CacheProvider>
  );
}
