// src/pages/CartPage.jsx
import React from 'react';
import { useCarrito } from '../hooks/useCarrito.jsx';
import { usePedidos } from '../hooks/usePedidos.js';
import { ElementoCarrito } from '../components/cart/ElementoCarrito.jsx';
import { ResumenCarrito } from '../components/cart/ResumenCarrito.jsx';

// Página del carrito de compras.
// Muestra los productos agregados, permite modificar cantidades
// y simular la confirmación del pedido registrando un pedido ficticio.
export function CartPage() {
  const {
    itemsCarrito,
    totalArticulos,
    totalGeneral,
    quitarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
  } = useCarrito();

  const { registrarPedidoDesdeCarrito } = usePedidos();

  const manejarIncrementar = (idProducto) => {
    const item = itemsCarrito.find((i) => i.idProducto === idProducto);
    if (!item) return;
    actualizarCantidad(idProducto, item.cantidad + 1);
  };

  const manejarDecrementar = (idProducto) => {
    const item = itemsCarrito.find((i) => i.idProducto === idProducto);
    if (!item) return;
    actualizarCantidad(idProducto, item.cantidad - 1);
  };

  const manejarEliminar = (idProducto) => {
    quitarDelCarrito(idProducto);
  };

  const manejarConfirmarCompra = async () => {
    if (itemsCarrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }

    const moneda =
      itemsCarrito.length > 0 ? itemsCarrito[0].moneda : 'USD';

    try {
      const idPedido = await registrarPedidoDesdeCarrito(
        itemsCarrito,
        totalGeneral,
        moneda
      );

      alert(
        `Compra confirmada.\n\nID de pedido: ${idPedido}\nArtículos: ${totalArticulos}\nTotal: ${moneda} ${totalGeneral.toFixed(
          2
        )}\n\nEste pedido estará disponible en la sección de "Órdenes" para su revisión.`
      );

      vaciarCarrito();
    } catch (e) {
      console.error('Error creando pedido:', e);
      alert(`No se pudo confirmar la compra: ${e.message || e}`);
    }
  };

  const moneda =
    itemsCarrito.length > 0 ? itemsCarrito[0].moneda : 'USD';

  return (
    <section className="cart-page">
      <header className="cart-page__header">
        <h1 className="cart-page__title">Carrito de compras</h1>
        <p className="cart-page__subtitle">
          Revisa los productos seleccionados, ajusta las cantidades y simula la
          confirmación del pedido.
        </p>
      </header>

      <div className="cart-page__content">
        {itemsCarrito.length === 0 ? (
          <p className="cart-page__placeholder">
            El carrito está vacío. Agrega productos desde la sección
            &quot;Productos&quot;.
          </p>
        ) : (
          <div className="cart-page__layout">
            <div className="cart-page__lista">
              {itemsCarrito.map((item) => (
                <ElementoCarrito
                  key={item.idProducto}
                  item={item}
                  alIncrementar={manejarIncrementar}
                  alDecrementar={manejarDecrementar}
                  alEliminar={manejarEliminar}
                />
              ))}
            </div>

            <ResumenCarrito
              totalArticulos={totalArticulos}
              totalGeneral={totalGeneral}
              moneda={moneda}
              alConfirmarCompra={manejarConfirmarCompra}
              alVaciarCarrito={vaciarCarrito}
            />
          </div>
        )}
      </div>
    </section>
  );
}
