// src/hooks/useFiltrosProductos.js
import { useMemo, useState } from 'react';

/**
 * Normaliza un texto para hacer comparaciones "tipo Elasticsearch" en el front:
 * - pasa a minúsculas
 * - elimina acentos
 */
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Hook personalizado para gestionar búsqueda y filtros de productos.
 * Recibe la lista de productos original y devuelve:
 * - productos filtrados
 * - estado de búsqueda y filtros
 * - funciones para actualizar dichos filtros
 *
 * Esta estructura hace muy sencilla una futura integración con una API REST
 * y Elasticsearch, ya que toda la lógica de búsqueda está encapsulada.
 */
export function useFiltrosProductos(productos) {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [fabricanteSeleccionado, setFabricanteSeleccionado] =
    useState('todos');

  // Categorías y fabricantes disponibles, derivadas de los productos.
  const categoriasDisponibles = useMemo(() => {
    const conjunto = new Set();
    productos.forEach((producto) => {
      if (producto.categoria) {
        conjunto.add(producto.categoria);
      }
    });
    return Array.from(conjunto).sort();
  }, [productos]);

  const fabricantesDisponibles = useMemo(() => {
    const conjunto = new Set();
    productos.forEach((producto) => {
      if (producto.fabricante) {
        conjunto.add(producto.fabricante);
      }
    });
    return Array.from(conjunto).sort();
  }, [productos]);

  // Aplicamos búsqueda + filtros sobre la lista original.
  const productosFiltrados = useMemo(() => {
    const textoNormalizado = normalizarTexto(terminoBusqueda.trim());

    return productos.filter((producto) => {
      const coincideCategoria =
        categoriaSeleccionada === 'todas' ||
        producto.categoria === categoriaSeleccionada;

      const coincideFabricante =
        fabricanteSeleccionado === 'todos' ||
        producto.fabricante === fabricanteSeleccionado;

      if (!textoNormalizado) {
        return coincideCategoria && coincideFabricante;
      }

      const campoBusqueda = [
        producto.nombre,
        producto.descripcionCorta,
        producto.fabricante,
        producto.categoria,
      ]
        .filter(Boolean)
        .join(' ');

      const campoNormalizado = normalizarTexto(campoBusqueda);

      const coincideTexto = campoNormalizado.includes(textoNormalizado);

      return coincideCategoria && coincideFabricante && coincideTexto;
    });
  }, [productos, terminoBusqueda, categoriaSeleccionada, fabricanteSeleccionado]);

  // Manejadores para el UI
  const manejarCambioBusqueda = (evento) => {
    setTerminoBusqueda(evento.target.value);
  };

  const manejarCambioCategoria = (evento) => {
    setCategoriaSeleccionada(evento.target.value);
  };

  const manejarCambioFabricante = (evento) => {
    setFabricanteSeleccionado(evento.target.value);
  };

  const limpiarFiltros = () => {
    setTerminoBusqueda('');
    setCategoriaSeleccionada('todas');
    setFabricanteSeleccionado('todos');
  };

  return {
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
  };
}
