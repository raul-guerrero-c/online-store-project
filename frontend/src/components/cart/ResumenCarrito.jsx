// src/components/cart/ResumenCarrito.jsx
import React from 'react';
import '../../styles/components/resumen-carrito.css';

/**
 * Muestra el resumen del carrito:
 * número total de artículos, importe total y acciones principales.
 */
export function ResumenCarrito({
  totalArticulos,
  totalGeneral,
  moneda,
  alConfirmarCompra,
  alVaciarCarrito,
}) {
  const manejarConfirmarCompra = () => {
    alConfirmarCompra();
  };

  const manejarVaciar = () => {
    alVaciarCarrito();
  };

  return (
    <aside className="resumen-carrito">
      <h2 className="resumen-carrito__titulo">Resumen del carrito</h2>

      <p className="resumen-carrito__dato">
        <strong>Artículos:</strong> {totalArticulos}
      </p>

      <p className="resumen-carrito__dato">
        <strong>Total:</strong> {moneda} {totalGeneral}
      </p>

      <div className="resumen-carrito__acciones">
        <button
          type="button"
          className="resumen-carrito__boton resumen-carrito__boton--primario"
          onClick={manejarConfirmarCompra}
          disabled={totalArticulos === 0}
        >
          Confirmar compra
        </button>

        <button
          type="button"
          className="resumen-carrito__boton resumen-carrito__boton--secundario"
          onClick={manejarVaciar}
          disabled={totalArticulos === 0}
        >
          Vaciar carrito
        </button>
      </div>
    </aside>
  );
}
