import React from "react";
import { useParams } from "react-router-dom";
import { useProductoDetalle } from "../hooks/useProductoDetalle.js";
import { useCarrito } from "../hooks/useCarrito.jsx";
import "../styles/components/detalle-producto.css";

export function ProductDetailPage() {
  const { idProducto } = useParams();
  const { producto, cargando, error } = useProductoDetalle(idProducto);
  const { agregarAlCarrito } = useCarrito();

  if (cargando) {
    return <p>Cargando producto...</p>;
  }

  if (error || !producto) {
    return (
      <section className="product-detail-page">
        <h1>Producto no encontrado</h1>
      </section>
    );
  }

  return (
    <section className="product-detail-page">
      <header className="product-detail-page__header">
        <h1>{producto.nombre}</h1>
        <p>{producto.fabricante} · {producto.categoria}</p>
      </header>

      <article className="detalle-producto">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="detalle-producto__imagen"
        />

        <p><strong>Descripción:</strong> {producto.descripcionLarga}</p>
        <p><strong>Precio:</strong> {producto.moneda} {producto.precio}</p>

        <button onClick={() => agregarAlCarrito(producto)}>
          Agregar al carrito
        </button>
      </article>
    </section>
  );
}
