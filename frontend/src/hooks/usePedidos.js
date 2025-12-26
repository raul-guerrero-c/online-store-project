// src/hooks/usePedidos.js
import { useEffect, useState } from 'react';

/**
 * Hook personalizado para gestionar pedidos simulados.
 * - Carga los pedidos desde localStorage.
 * - Permite registrar nuevos pedidos a partir del carrito.
 * - Permite marcar líneas como devueltas.
 */

const CLAVE_STORAGE_PEDIDOS = 'pedidos';

function crearIdPedido() {
  return `PED-${Date.now()}`;
}

function crearIdLinea(indice) {
  return `L-${indice + 1}`;
}

export function usePedidos() {
  const [pedidos, setPedidos] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const valorAlmacenado = window.localStorage.getItem(
        CLAVE_STORAGE_PEDIDOS
      );
      return valorAlmacenado ? JSON.parse(valorAlmacenado) : [];
    } catch (error) {
      console.error('Error leyendo pedidos desde localStorage:', error);
      return [];
    }
  });

  // Sincronizamos los pedidos con localStorage cada vez que cambien.
  useEffect(() => {
    try {
      window.localStorage.setItem(
        CLAVE_STORAGE_PEDIDOS,
        JSON.stringify(pedidos)
      );
    } catch (error) {
      console.error('Error guardando pedidos en localStorage:', error);
    }
  }, [pedidos]);

  /**
   * Registra un nuevo pedido a partir de los ítems del carrito.
   * Devuelve el id del pedido creado.
   */
  const registrarPedidoDesdeCarrito = (itemsCarrito, totalGeneral, moneda) => {
    if (!itemsCarrito || itemsCarrito.length === 0) {
      return null;
    }

    const idPedido = crearIdPedido();
    const fecha = new Date().toISOString();

    const lineas = itemsCarrito.map((item, indice) => ({
      idLinea: crearIdLinea(indice),
      idProducto: item.idProducto,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precioUnidad: item.precioUnidad,
      moneda: item.moneda,
      devuelto: false,
    }));

    const nuevoPedido = {
      idPedido,
      fecha,
      total: totalGeneral,
      moneda,
      estado: 'COMPLETADO', // o "CON_DEVOLUCIONES" cuando haya alguna devolución
      lineas,
    };

    setPedidos((previos) => [...previos, nuevoPedido]);

    return idPedido;
  };

  /**
   * Marca una línea de un pedido como devuelta.
   * Si alguna línea está devuelta, el estado del pedido pasa a "CON_DEVOLUCIONES".
   */
  const marcarLineaComoDevuelta = (idPedido, idLinea) => {
    setPedidos((previos) =>
      previos.map((pedido) => {
        if (pedido.idPedido !== idPedido) return pedido;

        const lineasActualizadas = pedido.lineas.map((linea) =>
          linea.idLinea === idLinea
            ? { ...linea, devuelto: true }
            : linea
        );

        const tieneAlgunaDevuelta = lineasActualizadas.some(
          (linea) => linea.devuelto
        );

        return {
          ...pedido,
          lineas: lineasActualizadas,
          estado: tieneAlgunaDevuelta
            ? 'CON_DEVOLUCIONES'
            : pedido.estado,
        };
      })
    );
  };

  return {
    pedidos,
    registrarPedidoDesdeCarrito,
    marcarLineaComoDevuelta,
  };
}
