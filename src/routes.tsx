import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

import SucursalesListView from './views/sucursales/SucursalesListView';
import PerfilesView from './views/sucursales/PerfilesView';
import HorarioView from './views/sucursales/HorarioView';

import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';

import { createBrowserHistory } from 'history';
import { access } from 'fs';
const history = createBrowserHistory();

const routes = [
  {
    path: 'app',
    element: <DashboardLayout history={history} />,
    children: [
      {
        path: 'sucursales',
        element: <SucursalesListView empresa={'smart-fit'} />
      },
      {
        path: 'perfiles',
        element: <PerfilesView/>
      },
      {
        path: 'horario',
        element: <HorarioView/>
      },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },

      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
