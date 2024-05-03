import { Movie } from '../pages/IMDB/types';

const LOCALSTORAGE_KEY = 'favorite_movies'; // Key used for LocalStorage

/**
 * Add a movie to LocalStorage as a favorite
 *
 * @param {Movie} data - Movie to be added
 */
export const addFavoriteToLocalStorage = (data: Movie) => {
  const existingFavorites = localStorage.getItem(LOCALSTORAGE_KEY);
  const favorites: Movie[] = existingFavorites
    ? JSON.parse(existingFavorites)
    : [];

  // Check if the movie is already a favorite
  const isAlreadyFavorite = favorites.some(
    (item) => item.imdbID === data.imdbID,
  );

  if (!isAlreadyFavorite) {
    favorites.push(data);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favorites));
  }
};

/**
 * Remove a movie from LocalStorage if it's a favorite
 *
 * @param {string} imdbID - IMDb ID of the movie to be removed
 */
export const removeFavoriteFromLocalStorage = (imdbID: string) => {
  const existingFavorites = localStorage.getItem(LOCALSTORAGE_KEY);
  const favorites: Movie[] = existingFavorites
    ? JSON.parse(existingFavorites)
    : [];

  // Filter out the movie to be removed
  const updatedFavorites = favorites.filter((item) => item.imdbID !== imdbID);

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedFavorites));
};

/**
 * Check if a movie is a favorite
 *
 * @param {string} imdbID - IMDb ID of the movie to check
 * @returns {boolean} - Whether the movie is in the favorites list
 */
export const isFavoriteInLocalStorage = (imdbID: string): boolean => {
  const existingFavorites = localStorage.getItem(LOCALSTORAGE_KEY);
  const favorites: Movie[] = existingFavorites
    ? JSON.parse(existingFavorites)
    : [];

  return favorites.some((item) => item.imdbID === imdbID);
};
