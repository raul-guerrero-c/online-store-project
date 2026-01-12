// src/hooks/useCarrito.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * Contexto para compartir el estado del carrito en toda la aplicación.
 */
const CarritoContexto = createContext(null);

/**
 * Hook personalizado para consumir el contexto del carrito.
 * Debe utilizarse siempre dentro de CarritoProvider.
 */
export function useCarrito() {
  const contexto = useContext(CarritoContexto);

  if (contexto === null) {
    throw new Error('useCarrito debe utilizarse dentro de CarritoProvider.');
  }

  return contexto;
}

/**
 * Componente proveedor del carrito.
 * Envuelve a la aplicación y expone el estado del carrito y sus operaciones.
 */
export function CarritoProvider({ children }) {
  const [itemsCarrito, setItemsCarrito] = useState(() => {
    // Inicializamos el carrito desde localStorage si existe.
    if (typeof window === 'undefined') return [];

    try {
      const valorAlmacenado = window.localStorage.getItem('carrito');
      return valorAlmacenado ? JSON.parse(valorAlmacenado) : [];
    } catch (error) {
      console.error('Error leyendo carrito desde localStorage:', error);
      return [];
    }
  });

  // Sincronizamos el carrito en localStorage cada vez que cambie.
  useEffect(() => {
    try {
      window.localStorage.setItem('carrito', JSON.stringify(itemsCarrito));
    } catch (error) {
      console.error('Error guardando carrito en localStorage:', error);
    }
  }, [itemsCarrito]);

  /**
   * Agrega un producto al carrito.
   * Si ya existe, incrementa la cantidad.
   */
  const agregarAlCarrito = (producto) => {
    setItemsCarrito((itemsPrevios) => {
      const existente = itemsPrevios.find(
        (item) => item.idProducto === producto.id
      );

      if (existente) {
        return itemsPrevios.map((item) =>
          item.idProducto === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // Estructura de un elemento en el carrito
      const nuevoItem = {
        idProducto: producto.id,
        nombre: producto.nombre,
        fabricante: producto.fabricante,
        precioUnidad: producto.precio,
        moneda: producto.moneda,
        imagen: producto.imagen, // guardamos la url de imagen para mostrarla en el carrito
        cantidad: 1,
      };

      return [...itemsPrevios, nuevoItem];
    });
  };

  /**
   * Elimina un producto completamente del carrito.
   */
  const quitarDelCarrito = (idProducto) => {
    setItemsCarrito((itemsPrevios) =>
      itemsPrevios.filter((item) => item.idProducto !== idProducto)
    );
  };

  /**
   * Actualiza la cantidad de un producto.
   * Si la cantidad es menor o igual que 0, elimina el producto.
   */
  const actualizarCantidad = (idProducto, nuevaCantidad) => {
    setItemsCarrito((itemsPrevios) => {
      if (nuevaCantidad <= 0) {
        return itemsPrevios.filter((item) => item.idProducto !== idProducto);
      }

      return itemsPrevios.map((item) =>
        item.idProducto === idProducto
          ? { ...item, cantidad: nuevaCantidad }
          : item
      );
    });
  };

  /**
   * Vacía completamente el carrito.
   */
  const vaciarCarrito = () => {
    setItemsCarrito([]);
  };

  // Cálculos derivados
  const totalArticulos = itemsCarrito.reduce(
    (acum, item) => acum + item.cantidad,
    0
  );

  const totalGeneral = itemsCarrito.reduce(
    (acum, item) => acum + item.cantidad * item.precioUnidad,
    0
  );

  const valorContexto = {
    itemsCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalArticulos,
    totalGeneral,
  };

  return (
    <CarritoContexto.Provider value={valorContexto}>
      {children}
    </CarritoContexto.Provider>
  );
}
