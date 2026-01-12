// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage.jsx';
import { ProductsPage } from '../pages/ProductsPage.jsx';
import { ProductDetailPage } from '../pages/ProductDetailPage.jsx';
import { CartPage } from '../pages/CartPage.jsx';
import { ReturnsPage } from '../pages/ReturnsPage.jsx';
import { OrdersPage} from '../pages/OrdersPage.jsx';


// Definición de rutas principales de la aplicación.
// Se elimina la ruta de administración para evitar dejar una página vacía.
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ordenes" element={<OrdersPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/productos/:idProducto" element={<ProductDetailPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/devoluciones" element={<ReturnsPage />} />
      {/* Ruta por defecto: redirigimos cualquier ruta desconocida a Home */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
