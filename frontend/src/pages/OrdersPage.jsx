import React, { useEffect } from 'react';
import { usePedidos } from '../hooks/usePedidos.js';
import '../styles/components/tarjeta-pedido.css';

export function OrdersPage() {
  const { pedidos, estaCargando, error, cargarPedidos } = usePedidos();

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

  const formatearImporte = (valor) => {
    const n = Number(valor);
    return Number.isNaN(n) ? valor : n.toFixed(2);
  };

  return (
    <section className="orders-page">
      <header className="orders-page__header">
        <h1 className="orders-page__title">Órdenes</h1>
        <p className="orders-page__subtitle">Listado de pedidos creados en el sistema.</p>
        <div className="orders-page__acciones">
          <button type="button" onClick={cargarPedidos} className="boton">Actualizar</button>
        </div>
      </header>

      <div className="orders-page__content">
        {estaCargando && <p>Cargando órdenes...</p>}
        {error && <p className="orders-page__error">Ocurrió un error: {error}</p>}

        {!estaCargando && !error && pedidos.length === 0 && (
          <p>No hay órdenes registradas.</p>
        )}

        {!estaCargando && !error && pedidos.length > 0 && (
          <div className="orders-page__lista">
            {pedidos.map((pedido) => (
              <article key={pedido.id} className="tarjeta-pedido">
                <header className="tarjeta-pedido__encabezado">
                  <h2 className="tarjeta-pedido__titulo">{pedido.orderCode || `Pedido ${pedido.id}`}</h2>
                  <div className="tarjeta-pedido__meta">
                    <span>{pedido.orderDate ? new Date(pedido.orderDate).toLocaleString() : ''}</span>
                    <span className="tarjeta-pedido__estado">{pedido.status}</span>
                  </div>
                </header>

                <div className="tarjeta-pedido__detalle">
                  <p><strong>Total:</strong> {pedido.currency} {formatearImporte(pedido.totalAmount)}</p>

                  <div className="tarjeta-pedido__lineas">
                    {pedido.items && pedido.items.map((linea) => (
                      <div key={linea.id} className="tarjeta-pedido__linea">
                        <div className="tarjeta-pedido__miniatura-contenedor">
                          {/* Aquí podríamos mostrar una miniatura si tuviéramos la URL */}
                        </div>

                        <div className="tarjeta-pedido__linea-contenido">
                          <p className="tarjeta-pedido__linea-nombre">Producto ID: {linea.productId}</p>
                          <p className="tarjeta-pedido__linea-detalle">Cantidad: {linea.quantity} · Precio unitario: {linea.unitPrice} · Subtotal: {formatearImporte(linea.subtotal)}</p>
                        </div>

                        <div className="tarjeta-pedido__linea-acciones">
                          {/* acciones futuras: ver detalle, devolver */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
