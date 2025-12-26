// src/pages/ProductDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { obtenerProductoPorId } from '../data/productos.js';
import { useCarrito } from '../hooks/useCarrito.jsx';
import '../styles/components/detalle-producto.css';

// Página de detalle de producto.
// Muestra la información completa, incluida la imagen
// y permite agregar el producto al carrito.
export function ProductDetailPage() {
  const { idProducto } = useParams();
  const producto = obtenerProductoPorId(idProducto);
  const { agregarAlCarrito } = useCarrito();

  if (!producto) {
    return (
      <section className="product-detail-page">
        <header className="product-detail-page__header">
          <h1 className="product-detail-page__title">Producto no encontrado</h1>
        </header>
        <div className="product-detail-page__content">
          <p className="product-detail-page__placeholder">
            El producto solicitado no existe en el catálogo.
          </p>
        </div>
      </section>
    );
  }

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
  };

  return (
    <section className="product-detail-page">
      <header className="product-detail-page__header">
        <h1 className="product-detail-page__title">{producto.nombre}</h1>
        <p className="product-detail-page__subtitle">
          {producto.fabricante} · {producto.categoria}
        </p>
      </header>

      <div className="product-detail-page__content">
        <article className="detalle-producto">
          <div className="detalle-producto__imagen-contenedor">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="detalle-producto__imagen"
              loading="lazy"
            />
          </div>

          <div className="detalle-producto__info">
            <p className="detalle-producto__texto">
              <strong>Descripción corta:</strong>{' '}
              {producto.descripcionCorta}
            </p>

            <p className="detalle-producto__texto">
              <strong>Descripción larga:</strong>{' '}
              {producto.descripcionLarga}
            </p>

            <p className="detalle-producto__texto">
              <strong>Precio:</strong> {producto.moneda}{' '}
              {producto.precio.toFixed(2)}
            </p>

            <p className="detalle-producto__texto">
              <strong>Stock disponible:</strong> {producto.stock} unidades
            </p>

            <button
              type="button"
              className="detalle-producto__boton-agregar"
              onClick={manejarAgregarAlCarrito}
            >
              Agregar al carrito
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
