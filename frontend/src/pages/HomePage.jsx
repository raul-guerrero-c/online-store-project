// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../hooks/useProductos.js';
import { useCarrito } from '../hooks/useCarrito.jsx';
import { ListaProductos } from '../components/products/ListaProductos.jsx';

// Página de inicio de la tienda online.
// Muestra un banner de bienvenida y una sección de productos destacados.
export function HomePage() {
  const { productos, estaCargando, error } = useProductos();
  const { agregarAlCarrito } = useCarrito();

  // Seleccionamos algunos productos destacados (por ejemplo, los primeros 4).
  const productosDestacados = productos.slice(0, 3);

  const manejarAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <section className="home-page">
      <header className="home-page__hero">
        <div className="home-page__hero-contenido">
          <h1 className="home-page__titulo">
            Bienvenido a la tienda online
          </h1>
          <p className="home-page__texto">
            Explora nuestro catálogo de productos digitales y hardware
            especializado. Esta versión es un front-end de práctica preparado
            para integrarse con una API y un motor de búsqueda tipo Elasticsearch
            en actividades posteriores.
          </p>

          <div className="home-page__acciones">
            <Link
              to="/productos"
              className="home-page__boton home-page__boton--primario"
            >
              Ver catálogo completo
            </Link>
            <a
              href="#destacados"
              className="home-page__boton home-page__boton--secundario"
            >
              Ver productos destacados
            </a>
          </div>
        </div>
      </header>

      <div className="home-page__content" id="destacados">
        <section className="home-page__destacados">
          <header className="home-page__destacados-header">
            <h2 className="home-page__destacados-titulo">
              Productos destacados
            </h2>
            <p className="home-page__destacados-subtitulo">
              Una selección rápida del catálogo. Puedes ver todos los productos
              desde la sección &quot;Productos&quot;.
            </p>
          </header>

          <div className="home-page__destacados-contenido">
            {estaCargando && (
              <p className="home-page__estado">
                Cargando productos destacados...
              </p>
            )}

            {error && (
              <p className="home-page__estado home-page__estado--error">
                Ocurrió un error al cargar los productos destacados.
              </p>
            )}

            {!estaCargando && !error && (
              <ListaProductos
                productos={productosDestacados}
                alAgregarAlCarrito={manejarAgregarAlCarrito}
              />
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
 