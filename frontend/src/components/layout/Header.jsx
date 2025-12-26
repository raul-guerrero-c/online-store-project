// src/components/layout/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/components/header.css';
import { useCarrito } from '../../hooks/useCarrito.jsx';

// Encabezado principal de la aplicación.
// Incluye la marca y la navegación principal.
// En el enlace de "Carrito" se muestra un badge con la cantidad
// total de productos agregados.
export function Header() {
  const { totalArticulos } = useCarrito();

  const obtenerClaseLink = ({ isActive }) =>
    isActive
      ? 'encabezado__link encabezado__link--activo'
      : 'encabezado__link';

  return (
    <header className="encabezado">
      <div className="encabezado__contenido">
        <Link to="/" className="encabezado__marca">
          <span className="encabezado__logo">OnlineStore</span>
        </Link>

        <nav className="encabezado__nav">
          <NavLink to="/" className={obtenerClaseLink} end>
            Inicio
          </NavLink>

          <NavLink to="/productos" className={obtenerClaseLink}>
            Productos
          </NavLink>

          <NavLink to="/devoluciones" className={obtenerClaseLink}>
            Devoluciones
          </NavLink>

          <NavLink to="/carrito" className={obtenerClaseLink}>
            <span className="encabezado__carrito-texto">Carrito</span>
            {totalArticulos > 0 && (
              <span className="encabezado__carrito-badge">
                {totalArticulos}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
