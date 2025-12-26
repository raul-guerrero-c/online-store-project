// src/components/products/FiltrosProductos.jsx
import React from 'react';
import '../../styles/components/filtros-productos.css';

/**
 * Componente para seleccionar filtros de categoría y fabricante.
 * Recibe las opciones y los manejadores desde el contenedor.
 */
export function FiltrosProductos({
  categorias,
  fabricantes,
  categoriaSeleccionada,
  fabricanteSeleccionado,
  alCambiarCategoria,
  alCambiarFabricante,
  alLimpiarFiltros,
}) {
  return (
    <div className="filtros-productos">
      <div className="filtros-productos__grupo">
        <label
          className="filtros-productos__etiqueta"
          htmlFor="filtro-categoria"
        >
          Categoría
        </label>
        <select
          id="filtro-categoria"
          className="filtros-productos__select"
          value={categoriaSeleccionada}
          onChange={alCambiarCategoria}
        >
          <option value="todas">Todas</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="filtros-productos__grupo">
        <label
          className="filtros-productos__etiqueta"
          htmlFor="filtro-fabricante"
        >
          Fabricante
        </label>
        <select
          id="filtro-fabricante"
          className="filtros-productos__select"
          value={fabricanteSeleccionado}
          onChange={alCambiarFabricante}
        >
          <option value="todos">Todos</option>
          {fabricantes.map((fabricante) => (
            <option key={fabricante} value={fabricante}>
              {fabricante}
            </option>
          ))}
        </select>
      </div>

      <div className="filtros-productos__grupo filtros-productos__grupo--acciones">
        <button
          type="button"
          className="filtros-productos__boton-limpiar"
          onClick={alLimpiarFiltros}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
