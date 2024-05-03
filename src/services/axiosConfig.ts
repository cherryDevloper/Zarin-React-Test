import axios, { AxiosInstance } from 'axios';

//  OMDB (IMDB data)
const omdbApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_OMDB_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//  CoinCap (crypto data)
const coincapApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COINCAP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { omdbApi, coincapApi };
