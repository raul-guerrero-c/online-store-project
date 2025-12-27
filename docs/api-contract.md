# API Contract – Online Store

Este documento describe el contrato de las APIs REST entre el **front-end React** y el **back-end** desplegado detrás del servidor perimetral (Cloud Gateway).

## Objetivo

- Definir los endpoints que el front-end puede invocar.
- Unificar el formato de las peticiones y respuestas JSON.
- Servir como referencia para el desarrollo de los microservicios:
  - `search-service` (búsqueda/catálogo sobre Elasticsearch).
  - `operator-service` (pedidos y devoluciones sobre base de datos relacional).

## Endpoints principales (resumen)

- `GET /api/search/products` – búsqueda y listado de productos.
- `GET /api/search/products/{id}` – detalle de producto.
- `POST /api/orders` – crear un pedido a partir del carrito.
- `GET /api/orders` – listar pedidos.
- `GET /api/orders/{id}` – detalle de pedido.
- `POST /api/orders/{id}/returns` – registrar devoluciones de líneas de pedido.

> Nota: En versiones posteriores se completará este documento con el modelo JSON exacto de las peticiones y respuestas, así como los campos usados en Elasticsearch (text, keyword, search_as_you_type, etc.).
