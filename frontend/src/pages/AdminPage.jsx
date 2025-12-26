// src/pages/AdminPage.jsx
import React from 'react';

// Vista de administración opcional.
// No tendrá autenticación real, pero servirá para simular tareas de gestión.
export function AdminPage() {
  return (
    <section className="admin-page">
      <header className="admin-page__header">
        <h1 className="admin-page__title">Área de administración</h1>
        <p className="admin-page__subtitle">
          Vista opcional para simular la gestión de productos y pedidos sin
          autenticación real.
        </p>
      </header>

      <div className="admin-page__content">
        <p className="admin-page__placeholder">
          En los próximos pasos podremos añadir tablas, formularios y acciones
          básicas de administración usando datos simulados.
        </p>
      </div>
    </section>
  );
}
