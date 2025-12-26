// src/components/returns/TarjetaPedido.jsx
import React from 'react';
import '../../styles/components/tarjeta-pedido.css';
import { obtenerProductoPorId } from '../../data/productos.js';

/**
 * Muestra la información de un pedido:
 * - datos generales (id, fecha, estado, total)
 * - líneas del pedido con miniaturas y opción para marcar devolución.
 */
export function TarjetaPedido({ pedido, alMarcarLineaDevuelta }) {
  const fecha = new Date(pedido.fecha);
  const formatoFecha = fecha.toLocaleString();

  const manejarDevolverLinea = (idLinea) => {
    alMarcarLineaDevuelta(pedido.idPedido, idLinea);
  };

  return (
    <article className="tarjeta-pedido">
      <header className="tarjeta-pedido__encabezado">
        <h2 className="tarjeta-pedido__titulo">
          Pedido {pedido.idPedido}
        </h2>
        <p className="tarjeta-pedido__detalle">
          <span className="tarjeta-pedido__fecha">
            Fecha: {formatoFecha}
          </span>
          <span className="tarjeta-pedido__estado">
            Estado: {pedido.estado}
          </span>
        </p>
        <p className="tarjeta-pedido__total">
          Total: {pedido.moneda} {pedido.total.toFixed(2)}
        </p>
      </header>

      <div className="tarjeta-pedido__lineas">
        {pedido.lineas.map((linea) => {
          const producto = obtenerProductoPorId(linea.idProducto);

          return (
            <div
              key={linea.idLinea}
              className={`tarjeta-pedido__linea${
                linea.devuelto
                  ? ' tarjeta-pedido__linea--devuelta'
                  : ''
              }`}
            >
              <div className="tarjeta-pedido__linea-contenido">
                <div className="tarjeta-pedido__miniatura-contenedor">
                  {producto && (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="tarjeta-pedido__miniatura"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="tarjeta-pedido__linea-info">
                  <p className="tarjeta-pedido__linea-nombre">
                    {linea.nombre}
                  </p>
                  <p className="tarjeta-pedido__linea-detalle">
                    Cantidad: {linea.cantidad} · Precio unidad:{' '}
                    {linea.moneda} {linea.precioUnidad.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="tarjeta-pedido__linea-acciones">
                {linea.devuelto ? (
                  <span className="tarjeta-pedido__etiqueta-devuelto">
                    Devuelto
                  </span>
                ) : (
                  <button
                    type="button"
                    className="tarjeta-pedido__boton-devolver"
                    onClick={() => manejarDevolverLinea(linea.idLinea)}
                  >
                    Simular devolución
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
