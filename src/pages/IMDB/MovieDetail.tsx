import { Image, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const MovieDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) navigate(-1);
  const { movie } = state;

  return (
    <Layout>
      <div className="my-10">
        <Typography.Title>{movie.Title}</Typography.Title>
        <div className="flex justify-between">
          {' '}
          <Image alt="" src={movie.Poster} className="rounded-md" />
          <div className="flex  flex-col ml-4 space-y-4">
            <Typography.Text>
              <span className="text-bold text-yellow-500">Description:</span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nam
              nihil asperiores, eius, autem sint omnis quaerat id esse
              voluptatem unde voluptatum quam natus perspiciatis obcaecati cum,
              beatae a non.
            </Typography.Text>

            <Typography.Text>
              {' '}
              <span className="text-bold text-yellow-500">Data:</span>
              {movie.Year}
            </Typography.Text>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetail;
