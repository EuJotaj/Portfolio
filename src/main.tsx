import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Aplicativo } from '@/aplicativo/Aplicativo';
import '@/estilos/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Aplicativo />
  </StrictMode>
);
