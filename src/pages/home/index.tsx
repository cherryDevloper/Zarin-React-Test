import { Link } from 'react-router-dom';
import GlassMorphismBackground from '../../components/GlassMorphismBackground';

function Home() {
  return (
    <GlassMorphismBackground>
      <div className="space-y-6">
        <h1 className="text-3xl text-bold">Hello, Zarin Express!</h1>
        <span className="text-xl">Welcome aboard to my project! 😊</span>
        <p>
          To see the tasks I've completed, please click on the links below.👇
        </p>
      </div>
      <div className="p-4 m-8 flex space-x-8">
        <Link
          to={'/coincap'}
          className="border p-4 bg-blue-400 flex items-center rounded-md shadow-md text-white "
        >
          CoinCap
        </Link>
        <Link
          to={'/IMDB'}
          className="border p-4 bg-blue-400 flex items-center rounded-md shadow-md  text-white"
        >
          IMDB
        </Link>
      </div>
    </GlassMorphismBackground>
  );
}

export default Home;
