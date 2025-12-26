// src/components/cart/ElementoCarrito.jsx
import React from 'react';
import '../../styles/components/elemento-carrito.css';
import { obtenerProductoPorId } from '../../data/productos.js';

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
  const producto = obtenerProductoPorId(item.idProducto);

  const manejarIncrementar = () => alIncrementar(item.idProducto);
  const manejarDecrementar = () => alDecrementar(item.idProducto);
  const manejarEliminar = () => alEliminar(item.idProducto);

  const subtotal = item.cantidad * item.precioUnidad;

  return (
    <div className="elemento-carrito">
      <div className="elemento-carrito__cabecera">
        <div className="elemento-carrito__miniatura-contenedor">
          {producto && (
            <img
              src={producto.imagen}
              alt={producto.nombre}
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
          {item.moneda} {item.precioUnidad.toFixed(2)}
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
