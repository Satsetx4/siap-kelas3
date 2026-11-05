import { MotionConfig } from 'motion/react';
import { RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { router } from './router';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Analytics />
      </ErrorBoundary>
    </MotionConfig>
  );
}
