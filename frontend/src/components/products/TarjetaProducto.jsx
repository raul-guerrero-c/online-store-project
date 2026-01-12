// src/components/products/TarjetaProducto.jsx
import React from 'react';
import '../../styles/components/tarjeta-producto.css';

/**
 * Tarjeta visual de un producto dentro del catálogo.
 * Muestra imagen, nombre, precio, fabricante y un botón para agregar al carrito.
 */
export function TarjetaProducto({ producto, alAgregarAlCarrito, alVerDetalle }) {
  const manejarAgregar = () => {
    alAgregarAlCarrito(producto);
  };

  const manejarVerDetalle = () => {
    alVerDetalle(producto.id);
  };

  return (
    <article className="tarjeta-producto">
      <div className="tarjeta-producto__imagen-contenedor">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="tarjeta-producto__imagen"
          loading="lazy"
        />
        <span className="tarjeta-producto__categoria">
          {producto.categoria}
        </span>
      </div>

      <div className="tarjeta-producto__contenido">
        <h2 className="tarjeta-producto__titulo">{producto.nombre}</h2>
        <p className="tarjeta-producto__fabricante">
          {producto.fabricante}
        </p>
        <p className="tarjeta-producto__descripcion">
          {producto.descripcionCorta}
        </p>
      </div>

      <div className="tarjeta-producto__pie">
        <div className="tarjeta-producto__precio-contenedor">
          <span className="tarjeta-producto__precio">
            {producto.moneda} {producto.precio}
          </span>
          <span className="tarjeta-producto__stock">
            Stock: {producto.stock}
          </span>
        </div>

        <div className="tarjeta-producto__acciones">
          <button
            type="button"
            className="tarjeta-producto__boton tarjeta-producto__boton--secundario"
            onClick={manejarVerDetalle}
          >
            Ver detalle
          </button>
          <button
            type="button"
            className="tarjeta-producto__boton tarjeta-producto__boton--primario"
            onClick={manejarAgregar}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
