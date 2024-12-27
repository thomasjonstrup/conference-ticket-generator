import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Supports weights 200-900
import '@fontsource-variable/inconsolata/wdth.css';
import './sass/style.scss';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
