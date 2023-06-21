import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  </AuthProvider>
);