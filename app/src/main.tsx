import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Outlet } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Outlet />
    <App />
  </StrictMode>,
);