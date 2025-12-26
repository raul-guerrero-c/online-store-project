// src/pages/ProductsPage.jsx
import React from 'react';
import { useProductos } from '../hooks/useProductos.js';
import { useCarrito } from '../hooks/useCarrito.jsx';
import { useFiltrosProductos } from '../hooks/useFiltrosProductos.js';
import { ListaProductos } from '../components/products/ListaProductos.jsx';
import { BuscadorProductos } from '../components/products/BuscadorProductos.jsx';
import { FiltrosProductos } from '../components/products/FiltrosProductos.jsx';

// Página principal del catálogo de productos.
// Usa los hooks useProductos y useFiltrosProductos para cargar y filtrar
// el catálogo, y useCarrito para agregar productos al carrito.
export function ProductsPage() {
  const { productos, estaCargando, error } = useProductos();
  const { agregarAlCarrito } = useCarrito();

  const {
    terminoBusqueda,
    categoriaSeleccionada,
    fabricanteSeleccionado,
    categoriasDisponibles,
    fabricantesDisponibles,
    productosFiltrados,
    manejarCambioBusqueda,
    manejarCambioCategoria,
    manejarCambioFabricante,
    limpiarFiltros,
  } = useFiltrosProductos(productos);

  const manejarAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <section className="products-page">
      <header className="products-page__header">
        <h1 className="products-page__title">Productos</h1>
        <p className="products-page__subtitle">
          Explora el catálogo, aplica búsqueda y filtros. La lógica de filtrado
          está pensada para poder sustituir los datos locales por una API
          real con Elasticsearch en actividades posteriores.
        </p>
      </header>

      <div className="products-page__content">
        {estaCargando && (
          <p className="products-page__status">
            Cargando productos, por favor espera...
          </p>
        )}

        {error && (
          <p className="products-page__status products-page__status--error">
            Ocurrió un error al cargar los productos.
          </p>
        )}

        {!estaCargando && !error && (
          <>
            <div className="products-page__herramientas">
              <BuscadorProductos
                terminoBusqueda={terminoBusqueda}
                alCambiarBusqueda={manejarCambioBusqueda}
              />

              <FiltrosProductos
                categorias={categoriasDisponibles}
                fabricantes={fabricantesDisponibles}
                categoriaSeleccionada={categoriaSeleccionada}
                fabricanteSeleccionado={fabricanteSeleccionado}
                alCambiarCategoria={manejarCambioCategoria}
                alCambiarFabricante={manejarCambioFabricante}
                alLimpiarFiltros={limpiarFiltros}
              />
            </div>

            <ListaProductos
              productos={productosFiltrados}
              alAgregarAlCarrito={manejarAgregarAlCarrito}
            />
          </>
        )}
      </div>
    </section>
  );
}
