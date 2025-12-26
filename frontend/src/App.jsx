// src/App.jsx
import React from 'react';
import { AppRouter } from './routes/AppRouter.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CarritoProvider } from './hooks/useCarrito.jsx';

// Componente raíz de la aplicación.
// Define el layout general y envuelve todo con el CarritoProvider
// para que el carrito sea accesible desde cualquier página.
export function App() {
  return (
    <CarritoProvider>
      <div className="app-layout">
        <Header />
        <main className="app-layout__main">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </CarritoProvider>
  );
}

export default App;
