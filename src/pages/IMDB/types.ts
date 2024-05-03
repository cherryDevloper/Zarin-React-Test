export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDBResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}


export type MovieType = 'movie' | 'series' | 'episode';
