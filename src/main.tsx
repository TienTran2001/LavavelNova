import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
