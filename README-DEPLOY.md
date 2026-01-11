# Despliegue (Local y VPS) - Online Store Project

Este documento describe cómo ejecutar el backend en local con Docker y cómo desplegarlo en un VPS (Ubuntu 24.04) usando Docker Compose.

## Requisitos

### Local (Windows)
- Docker Desktop instalado y corriendo.
- Git.
- (Opcional) MySQL Workbench para ejecutar scripts SQL.

### VPS (Ubuntu 24.04)
- Acceso SSH al servidor.
- Docker y Docker Compose instalados.
- Puertos abiertos en firewall/seguridad:
  - 22 (SSH)
  - 8081 (Gateway)
  - 8761 (Eureka, opcional para demo)
  - No abrir 3306 (MySQL) públicamente.

---

## Estructura de archivos de despliegue

En la raíz del repo:

- `.env.example` (plantilla, se sube a Git)
- `.env` (variables reales, NO se sube a Git)
- `docker-compose.local.yml` (Docker Compose para local)
- `docker-compose.prod.yml` (Docker Compose para VPS/producción académica)

En cada microservicio:

- `backend/eureka-server/Dockerfile`
- `backend/cloud-gateway/Dockerfile`
- `backend/search-service/Dockerfile`
- `backend/operator-service/Dockerfile`

Y perfiles docker:

- `backend/cloud-gateway/src/main/resources/application-docker.yml`
- `backend/search-service/src/main/resources/application-docker.yml`
- `backend/operator-service/src/main/resources/application-docker.yml`

---

## Variables de entorno (.env)

### Plantilla (se sube a Git)
1. Copia `.env.example` a `.env`.
2. Ajusta valores según ambiente.

Ejemplo:

```bash
cp .env.example .env
