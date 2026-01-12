import { API_BASE_URL } from "../config/api.js";

async function httpJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status} - ${text}`);
  }

  // Algunos endpoints pueden no devolver body
  try {
    return await response.json();
  } catch {
    return null;
  }
}

// Crear pedido
export function crearPedido(pedido) {
  return httpJson(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify(pedido),
  });
}

// Obtener todos los pedidos
export function obtenerPedidos() {
  return httpJson(`${API_BASE_URL}/api/orders`);
}

// Obtener pedido por ID
export function obtenerPedidoPorId(id) {
  return httpJson(`${API_BASE_URL}/api/orders/${id}`);
}

// Crear devolución
export function crearDevolucion(orderId, motivo) {
  return httpJson(`${API_BASE_URL}/api/orders/${orderId}/returns`, {
    method: "POST",
    body: JSON.stringify({ motivo }),
  });
}
