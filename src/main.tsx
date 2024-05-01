import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
