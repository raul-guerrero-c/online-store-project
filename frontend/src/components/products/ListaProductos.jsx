// src/components/products/ListaProductos.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/lista-productos.css';
import { TarjetaProducto } from './TarjetaProducto.jsx';

/**
 * Lista de productos en formato grid.
 * Recibe un array de productos y una función para agregar al carrito.
 */
export function ListaProductos({ productos, alAgregarAlCarrito }) {
  const navegar = useNavigate();

  const manejarVerDetalle = (idProducto) => {
    navegar(`/productos/${idProducto}`);
  };

  if (!productos || productos.length === 0) {
    return (
      <div className="lista-productos lista-productos--vacia">
        <p className="lista-productos__mensaje-vacio">
          No se encontraron productos con los criterios actuales de búsqueda y
          filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="lista-productos">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="lista-productos__item"
        >
          <TarjetaProducto
            producto={producto}
            alAgregarAlCarrito={alAgregarAlCarrito}
            alVerDetalle={manejarVerDetalle}
          />
        </div>
      ))}
    </div>
  );
}
