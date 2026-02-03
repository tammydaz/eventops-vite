import React from 'react';
import { createRoot } from 'react-dom/client';
import { initializeBlock } from '@airtable/blocks/ui';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  initializeBlock(() => root.render(<App />));
}
