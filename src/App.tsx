import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RouteConfig, routes } from './routes';
import Home from './pages/home';
import Loading from './components/Loading';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route: RouteConfig) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
