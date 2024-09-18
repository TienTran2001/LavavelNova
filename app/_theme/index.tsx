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
    </CacheProvider>
  );
}
