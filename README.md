# Task Management

This repository contains a simple Task Management application with a Spring Boot backend and a Next.js frontend. The project is configured to run with Docker Compose for easy local development.

## Contents

- `backend/` - Spring Boot application
- `frontend/` - Next.js (React) frontend
- `docker-compose.yml` - Compose file to run the app and a MySQL database

## Quick start (Docker Compose)

1. Make sure Docker is running.
2. From the project root run:

```cmd
docker compose up --build
```

This will:

- start a MySQL 8 container (service name `db`)
- build and start the backend service on port 8080
- build and start the frontend service on port 3000

To run in the background:

```cmd
docker compose up -d --build
```

Follow logs with:

```cmd
docker compose logs -f
```

To stop and remove containers and the database volume:

```cmd
docker compose down -v
```

## Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- MySQL: 3306

## Docker image build (manual)

If you prefer to build images manually:

```cmd
docker build -t task-management-backend:latest ./backend
docker build -t task-management-frontend:latest ./frontend
```

Then run `docker compose up` (without `--build`) to use the locally built images.
