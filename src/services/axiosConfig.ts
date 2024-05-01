import axios, { AxiosInstance } from 'axios';

//  OMDB (IMDB data)
const omdbApi: AxiosInstance = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//  CoinCap (crypto data)
const coincapApi: AxiosInstance = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { omdbApi, coincapApi };
