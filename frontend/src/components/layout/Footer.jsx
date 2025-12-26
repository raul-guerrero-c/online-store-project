// src/components/layout/Footer.jsx
import React from 'react';

// Pie de página simple con el año actual.
export function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        © {anioActual} TiendaOnline. Todos los derechos reservados.
      </p>
    </footer>
  );
}
