// src/components/cart/ElementoCarrito.jsx
import React from 'react';
import '../../styles/components/elemento-carrito.css';

/**
 * Representa una fila dentro del carrito de compras.
 * Muestra una miniatura de la imagen, nombre, precio, cantidad y subtotal.
 */
export function ElementoCarrito({
  item,
  alIncrementar,
  alDecrementar,
  alEliminar,
}) {
  const manejarIncrementar = () => alIncrementar(item.idProducto);
  const manejarDecrementar = () => alDecrementar(item.idProducto);
  const manejarEliminar = () => alEliminar(item.idProducto);

  const subtotal = item.cantidad * item.precioUnidad;

  // Preferimos la imagen almacenada en el elemento del carrito; si no existe, mostramos nada
  const imagenSrc = item.imagen || '';

  return (
    <div className="elemento-carrito">
      <div className="elemento-carrito__cabecera">
        <div className="elemento-carrito__miniatura-contenedor">
          {imagenSrc && (
            <img
              src={imagenSrc}
              alt={item.nombre}
              className="elemento-carrito__miniatura"
              loading="lazy"
            />
          )}
        </div>

        <div className="elemento-carrito__info">
          <p className="elemento-carrito__nombre">{item.nombre}</p>
          <p className="elemento-carrito__fabricante">
            {item.fabricante}
          </p>
        </div>
      </div>

      <div className="elemento-carrito__detalle">
        <span className="elemento-carrito__precio-unitario">
          {item.moneda} {item.precioUnidad}
        </span>

        <div className="elemento-carrito__cantidad">
          <button
            type="button"
            className="elemento-carrito__boton-cantidad"
            onClick={manejarDecrementar}
          >
            -
          </button>
          <span className="elemento-carrito__cantidad-valor">
            {item.cantidad}
          </span>
          <button
            type="button"
            className="elemento-carrito__boton-cantidad"
            onClick={manejarIncrementar}
          >
            +
          </button>
        </div>

        <span className="elemento-carrito__subtotal">
          Subtotal: {item.moneda} {subtotal.toFixed(2)}
        </span>
      </div>

      <div className="elemento-carrito__acciones">
        <button
          type="button"
          className="elemento-carrito__boton-eliminar"
          onClick={manejarEliminar}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
