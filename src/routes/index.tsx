import React, { lazy } from 'react';
import Home from '../pages/home';
import MovieDetail from '../pages/IMDB/MovieDetail';
import App from '../App';

export type RouteConfig = {
  path: string;
  element: React.ReactNode;

  children?: [{ index?: boolean; path: string; element: React.ReactNode }];
};

const CoinCap = lazy(() => import('../pages/coincap'));
const IMDB = lazy(() => import('../pages/IMDB/TopMovies'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Home />,
  },
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
  {
    path: '/IMDB/movieDetail',
    element: <MovieDetail />,
  },
];
