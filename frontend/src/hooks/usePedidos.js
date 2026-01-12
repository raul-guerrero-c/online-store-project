import { useState } from "react";
import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  crearDevolucion,
} from "../services/ordersApi.js";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoActual, setPedidoActual] = useState(null);
  const [estaCargando, setEstaCargando] = useState(false);
  const [error, setError] = useState(null);

  async function cargarPedidos() {
    try {
      setEstaCargando(true);
      setError(null);
      const data = await obtenerPedidos();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setEstaCargando(false);
    }
  }

  async function cargarPedidoPorId(id) {
    try {
      setEstaCargando(true);
      setError(null);
      const data = await obtenerPedidoPorId(id);
      setPedidoActual(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setEstaCargando(false);
    }
  }

  async function confirmarPedido(pedido) {
    try {
      setEstaCargando(true);
      setError(null);
      const data = await crearPedido(pedido);
      setPedidoActual(data);
      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setEstaCargando(false);
    }
  }

  /**
   * Registra un pedido a partir de la estructura del carrito.
   * itemsCarrito: array de items con { idProducto, cantidad, precioUnidad }
   * Devuelve el pedido creado (response) y el id.
   */
  async function registrarPedidoDesdeCarrito(itemsCarrito, totalGeneral, currency) {
    if (!Array.isArray(itemsCarrito) || itemsCarrito.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const request = {
      customerName: 'Cliente demo',
      customerEmail: '',
      customerPhone: '',
      currency: currency || (itemsCarrito[0] && itemsCarrito[0].moneda) || 'MXN',
      items: itemsCarrito.map((it) => ({
        productId: Number(it.idProducto),
        quantity: Number(it.cantidad),
        unitPrice: Number(it.precioUnidad),
      })),
    };

    // Usa confirmarPedido que llama a crearPedido y actualiza estado
    const creado = await confirmarPedido(request);
    return creado && creado.id ? creado.id : null;
  }

  async function devolverPedido(orderId, motivo) {
    try {
      setEstaCargando(true);
      setError(null);
      return await crearDevolucion(orderId, motivo);
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setEstaCargando(false);
    }
  }

  return {
    pedidos,
    pedidoActual,
    estaCargando,
    error,
    cargarPedidos,
    cargarPedidoPorId,
    confirmarPedido,
    registrarPedidoDesdeCarrito,
    devolverPedido,
  };
}
