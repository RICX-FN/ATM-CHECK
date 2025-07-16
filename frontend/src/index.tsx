import React from 'react';
import ReactDOM from 'react-dom/client';
import ATMRoutes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ATMRoutes />
    </BrowserRouter>

  </React.StrictMode>
);