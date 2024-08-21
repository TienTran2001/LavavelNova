import CssBaseline from '@mui/material/CssBaseline';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { MenuProvider } from './contexts/menuContext.tsx';
import './index.scss';
import { theme } from './utils/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MenuProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MenuProvider>
  </ThemeProvider>
);
