// src/components/products/BuscadorProductos.jsx
import React from 'react';
import '../../styles/components/buscador-productos.css';

/**
 * Componente de entrada de texto para buscar productos.
 * Se limita a recibir el valor y el manejador de cambio desde el contenedor.
 */
export function BuscadorProductos({ terminoBusqueda, alCambiarBusqueda }) {
  return (
    <div className="buscador-productos">
      <label className="buscador-productos__etiqueta" htmlFor="busqueda">
        Buscar productos
      </label>
      <input
        id="busqueda"
        type="search"
        className="buscador-productos__campo"
        placeholder="Buscar por nombre, descripción, categoría o fabricante..."
        value={terminoBusqueda}
        onChange={alCambiarBusqueda}
      />
    </div>
  );
}
