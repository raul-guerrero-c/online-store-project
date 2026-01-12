import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productsApi.js";

/**
 * Hook personalizado para obtener el catálogo de productos
 * desde el backend real (search-service vía Gateway).
 */
export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let estaMontado = true;

    async function cargarProductos() {
      try {
        setEstaCargando(true);
        const data = await obtenerProductos();
        if (estaMontado) {
          setProductos(data);
        }
      } catch (err) {
        if (estaMontado) {
          setError(err);
        }
      } finally {
        if (estaMontado) {
          setEstaCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      estaMontado = false;
    };
  }, []);

  return {
    productos,
    estaCargando,
    error,
  };
}
