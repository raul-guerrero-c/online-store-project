// src/components/returns/ListaPedidos.jsx
import React from 'react';
import '../../styles/components/lista-pedidos.css';
import { TarjetaPedido } from './TarjetaPedido.jsx';

/**
 * Lista de pedidos que renderiza una TarjetaPedido por cada uno.
 */
export function ListaPedidos({ pedidos, alMarcarLineaDevuelta }) {
  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="lista-pedidos lista-pedidos--vacia">
        <p className="lista-pedidos__texto-vacio">
          No hay pedidos registrados. Realiza una compra desde el carrito para
          poder simular devoluciones.
        </p>
      </div>
    );
  }

  return (
    <div className="lista-pedidos">
      {pedidos.map((pedido) => (
        <div key={pedido.idPedido} className="lista-pedidos__item">
          <TarjetaPedido
            pedido={pedido}
            alMarcarLineaDevuelta={alMarcarLineaDevuelta}
          />
        </div>
      ))}
    </div>
  );
}
