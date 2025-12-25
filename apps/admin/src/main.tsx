import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';
import '@fontsource/jetbrains-mono/400.css';

import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
