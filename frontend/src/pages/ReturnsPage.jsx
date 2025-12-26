// src/pages/ReturnsPage.jsx
import React from 'react';
import { usePedidos } from '../hooks/usePedidos.js';
import { ListaPedidos } from '../components/returns/ListaPedidos.jsx';

// Página para gestionar devoluciones simuladas.
// Muestra los pedidos registrados y permite marcar líneas como devueltas.
export function ReturnsPage() {
  const { pedidos, marcarLineaComoDevuelta } = usePedidos();

  const manejarMarcarLineaDevuelta = (idPedido, idLinea) => {
    marcarLineaComoDevuelta(idPedido, idLinea);
  };

  return (
    <section className="returns-page">
      <header className="returns-page__header">
        <h1 className="returns-page__title">Devoluciones</h1>
        <p className="returns-page__subtitle">
          Aquí puedes simular devoluciones de pedidos previamente confirmados.
          Cada línea devuelta se marca visualmente y el estado del pedido se
          actualiza.
        </p>
      </header>

      <div className="returns-page__content">
        <ListaPedidos
          pedidos={pedidos}
          alMarcarLineaDevuelta={manejarMarcarLineaDevuelta}
        />
      </div>
    </section>
  );
}
