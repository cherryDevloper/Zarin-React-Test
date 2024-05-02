import React, { lazy } from 'react';
import Home from '../pages/home';

export type RouteConfig = {
  path: string;
  element: React.ReactNode;
};

const CoinCap = lazy(() => import('../pages/coincap'));
const IMDB = lazy(() => import('../pages/IMDB'));

export const routes: RouteConfig[] = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/coinCap',
    element: <CoinCap />,
  },
  {
    path: '/IMDB',
    element: <IMDB />,
  },
];
