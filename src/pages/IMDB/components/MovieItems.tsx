import { Button, Image } from 'antd';
import { Movie } from '../types';
import { useNavigate } from 'react-router-dom';
import {
  addFavoriteToLocalStorage,
  isFavoriteInLocalStorage,
  removeFavoriteFromLocalStorage,
} from '../../../utils/localStorageUtils';
import { useEffect, useState } from 'react';

interface Props {
  movie: Movie;
}

const MovieItems = ({ movie }: Props) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isFavoriteInLocalStorage(movie.imdbID));
  }, [movie.imdbID]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteFromLocalStorage(movie.imdbID);
    } else {
      addFavoriteToLocalStorage(movie);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      {' '}
      <div
        key={movie.imdbID}
        className="border p-4 flex flex-col items-center space-y-4"
      >
        <Image
          src={movie.Poster}
          width={300}
          height={400}
          alt={movie.Title}
          className="w-full h-auto min-w-[300px] min-h-[300px]"
          placeholder={
            <Image
              className="min-w-[300px] min-h-[300px]"
              height={300}
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
              width={200}
            />
          }
        />
        <h3>
          {movie.Title}-<span>{movie.Year}</span>
        </h3>

        <div className="flex space-x-4">
          <Button
            onClick={() =>
              navigate('movieDetail', {
                state: {
                  movie,
                } as { movie: Movie },
              })
            }
          >
            View More
          </Button>
          <Button
            className={!isFavorite ? 'bg-gray-100' : 'bg-pink-200'}
            onClick={handleToggleFavorite}
          >
            ❤️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieItems;
