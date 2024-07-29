import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { theme } from './utils/theme.ts';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { MenuProvider } from './contexts/menuContext.tsx';
import { AppProvider } from './contexts/appContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
