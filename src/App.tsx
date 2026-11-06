import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { router } from './router';

export default function App() {
  useEffect(() => {
    // Analitik dimuat setelah halaman tampil agar tidak menahan render awal.
    const muat = () => { import('@vercel/analytics/react').catch(() => { /* abaikan */ }); };
    const id = window.setTimeout(muat, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </MotionConfig>
  );
}
