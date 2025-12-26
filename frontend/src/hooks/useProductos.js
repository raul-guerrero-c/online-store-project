// src/hooks/useProductos.js
import { useEffect, useState } from 'react';
import { productos as productosSimulados } from '../data/productos.js';

/**
 * Hook personalizado para obtener el catálogo de productos.
 * Simula una llamada asíncrona (como si fuese una API REST),
 * preparando el código para una futura integración con base de datos
 * y un motor de búsqueda tipo Elasticsearch.
 */
export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let estaMontado = true;

    // Simulamos una llamada asíncrona con un pequeño retraso.
    const idTimeout = setTimeout(() => {
      if (!estaMontado) return;

      try {
        setProductos(productosSimulados);
        setEstaCargando(false);
      } catch (err) {
        setError(err);
        setEstaCargando(false);
      }
    }, 400); // 400 ms para poder visualizar el estado de carga

    // Cleanup del efecto cuando se desmonta el componente.
    return () => {
      estaMontado = false;
      clearTimeout(idTimeout);
    };
  }, []);

  return {
    productos,
    estaCargando,
    error,
  };
}
