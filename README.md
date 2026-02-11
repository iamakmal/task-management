# Task Management

This repository contains a containerized full-stack task management system with a Spring Boot backend and a Next.js frontend. The project is configured to run with Docker Compose, including a MySQL database and Nginx reverse proxy.

## Technologies

- **Backend**: Java, Spring Boot, Spring Data JPA, MySQL
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Tanstack Query
- **Database**: MySQL
- **Reverse Proxy**: Nginx
- **Testing**: JUnit (backend), Jest (frontend)

## Architecture

```
                +-------------------+
                |   User / Browser  |
                +---------+---------+
                          |
                          v
                +-------------------+
                |   Nginx (Port 80) |
                |   Reverse Proxy   |
                +----+----------+---+
                     |          |
                     v          v
        +----------------+   +------------------+
        |   Frontend     |   |     Backend      |
        |   Next.js      |   |  Spring Boot API|
        |   Port 3000    |   |   Port 8080     |
        +----------------+   +---------+--------+
                                       |
                                       v
                               +---------------+
                               |    MySQL DB   |
                               |   Port 3306   |
                               +---------------+

```

## Features

- Add new tasks
- View the last 5 incomplete tasks
- Mark tasks as complete

## Screenshots

## API Endpoints

- `POST /api/tasks` - Create a new task
- `GET /api/tasks/lastFiveIncompleteTasks` - Retrieve the last 5 incomplete tasks
- `PUT /api/tasks/completeTask/{id}` - Mark a task as complete

## Quick Start (Docker Compose)

1. Ensure Docker is running.
2. Create a `.env` file in the project root with the following variables:
   ```
   DB_PASSWORD=your_mysql_root_password
   DB_URL=jdbc:mysql://db:3306/task-db
   DB_USERNAME=root
   BACKEND_PORT=8080
   ```
3. From the project root, run:
   ```cmd
   docker compose up --build
   ```

This will:

- Start a MySQL 8 container (service name `db`)
- Start the backend service
- Start the frontend service
- Start Nginx as a reverse proxy on port 80

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

- Application: http://localhost:80 (via Nginx)
- Backend (direct): http://localhost:8080
- Frontend (direct): http://localhost:3000
- MySQL: 3306

## Development Setup (Without Docker)

### Backend

1. Ensure Java 17 and Maven are installed.
2. Set up a MySQL database.
3. Update `application.properties` with your database credentials.
4. Run the backend:
   ```cmd
   cd backend
   ./mvnw spring-boot:run
   ```
5. Run tests:
   ```cmd
   ./mvnw test
   ```

### Frontend

1. Ensure Node.js is installed.
2. Install dependencies:
   ```cmd
   cd frontend
   npm install
   ```
3. Run the development server:
   ```cmd
   npm run dev
   ```
4. Run tests:
   ```cmd
   npm test
   ```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The pipeline is defined in `.github/workflows/deploy.yml` and includes the following steps:

- **Trigger**: Runs on push or pull request to the `main` branch
- **Setup**: Configures JDK 17 and Node.js 18
- **Testing**: Executes frontend tests with Jest and backend tests with JUnit
- **Build & Push**: Builds Docker images for backend and frontend, then pushes them to Docker Hub
- **Deploy**: Automatically deploys to an EC2 instance via SSH

### Required Secrets

To use the CI/CD pipeline, set up the following secrets in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_ACCESS_TOKEN`: Docker Hub access token
- `EC2_HOST`: EC2 instance public IP or DNS
- `EC2_USER`: SSH username (e.g., `ubuntu`)
- `EC2_SSH_KEY`: Private SSH key for EC2 access

## Deployment to EC2

The application is configured for deployment on Amazon EC2. The deployment process assumes:

1. An EC2 instance with Docker and Docker Compose installed
2. The repository cloned in `/home/ubuntu/app`
3. SSH access configured with the private key stored in GitHub secrets

### Manual Deployment Steps

If you need to deploy manually:

1. SSH into your EC2 instance:

   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

2. Navigate to the app directory:

   ```bash
   cd /home/ubuntu/app
   ```

3. Pull the latest changes:

   ```bash
   git pull origin main
   ```

4. Pull the latest Docker images:

   ```bash
   docker-compose pull
   ```

5. Restart the services:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### EC2 Setup Requirements

- Ubuntu/Debian-based AMI
- Docker and Docker Compose installed
- Security group allowing inbound traffic on port 80
- SSH key pair configured

## Docker Image Build (Manual)

If you prefer to build images manually:

```cmd
docker build -t task-management-backend:latest ./backend
docker build -t task-management-frontend:latest ./frontend
docker build -t task-management-nginx:latest ./nginx
```

Then run `docker compose up` (without `--build`) to use the locally built images.
