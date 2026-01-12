import { API_BASE_URL } from "../config/api.js";

async function httpGet(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status} - ${text}`);
  }

  return response.json();
}

function mapProducto(p) {
  if (!p) return null;

  return {
    id: p.id,
    sku: p.sku,
    nombre: p.name,
    fabricante: p.brand,
    categoria: p.category,
    descripcionCorta: p.shortDescription,
    descripcionLarga: p.longDescription,
    precio: p.price,
    moneda: p.currency,
    imagen: p.imageUrl,
    stock: p.stockQuantity,
    activo: p.active,
    creadoEn: p.createdAt,
    actualizadoEn: p.updatedAt,
  };
}

export async function obtenerProductos() {
  const data = await httpGet(`${API_BASE_URL}/api/products`);

  // API puede devolver un arreglo directo o un objeto con la lista en alguna propiedad
  if (Array.isArray(data)) {
    return data.map(mapProducto);
  }

  if (data && Array.isArray(data.items)) {
    return data.items.map(mapProducto);
  }

  return [];
}

export async function obtenerProductoPorId(id) {
  const data = await httpGet(`${API_BASE_URL}/api/products/${id}`);
  return mapProducto(data);
}
