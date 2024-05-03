import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

function Home() {
  return (
    <Layout>
      <div>
        <Link to={'/coincap'}>Coin Cap</Link>
      </div>
    </Layout>
  );
}

export default Home;
