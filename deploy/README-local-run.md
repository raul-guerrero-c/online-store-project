# Guía de ejecución local – Online Store (borrador)

Este documento explica cómo ejecutar el proyecto **en entorno local**.

## 1. Componentes

El proyecto se compone de:

- Front-end: aplicación React + Vite (carpeta `frontend/`).
- Back-end: microservicios Java + Spring Boot (carpeta `backend/`), que se desplegarán mediante Docker Compose.
- Infraestructura:
  - Base de datos relacional (MySQL u otra).
  - Elasticsearch para búsqueda.

## 2. Requisitos previos

- Git
- Java JDK 17 (o superior)
- Maven
- Node.js + npm
- Docker + Docker Compose

## 3. Pasos generales (versión resumida)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/raul-guerrero-c/online-store-project.git
   cd online-store-project
