import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/fredoka';
import '@fontsource/andika/400.css';
import '@fontsource/andika/700.css';
import '@fontsource/scheherazade-new/400.css';
import '@fontsource/scheherazade-new/700.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
