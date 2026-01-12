import { useEffect, useState } from "react";
import { obtenerProductoPorId } from "../services/productsApi.js";

/**
 * Hook personalizado para obtener un producto por su id
 * desde el backend real (search-service vía Gateway).
 */
export function useProductoDetalle(idProducto) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let estaMontado = true;

    async function cargarProducto() {
      try {
        setCargando(true);

        // Si no hay id, no hacemos la petición
        if (!idProducto) {
          if (estaMontado) {
            setProducto(null);
            setCargando(false);
          }
          return;
        }

        const data = await obtenerProductoPorId(idProducto);
        if (estaMontado) {
          setProducto(data);
        }
      } catch (err) {
        if (estaMontado) {
          setError(err);
        }
      } finally {
        if (estaMontado) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => {
      estaMontado = false;
    };
  }, [idProducto]);

  return {
    producto,
    cargando,
    error,
  };
}
