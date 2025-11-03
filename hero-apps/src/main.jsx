import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={(
        <div className="min-h-screen grid place-items-center bg-slate-900 text-slate-100">
          <span className="loading loading-spinner loading-lg" aria-label="Loading" />
        </div>
      )}
    />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#0f172a',
          color: '#f8fafc',
          borderRadius: '1rem',
          paddingInline: '1.25rem',
          paddingBlock: '0.85rem',
        },
      }}
    />
  </StrictMode>,
);
