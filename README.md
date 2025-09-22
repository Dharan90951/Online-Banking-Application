# Output Preview

<figure>
  <figcaption>Frontpage (on desktop screen)</figcaption>
  <img src="Screenshot 2025-09-22 001157.png" alt="Frontpage" width="700">
</figure>
<figure>
  <figcaption>ProfilePage (on desktop screen)</figcaption>
  <img src="Screenshot 2025-09-22 001129.png" alt="Frontpage" width="700">
</figure>

# Java Full-Stack Banking Application

A comprehensive online banking application built with Java Spring Boot backend and React frontend.

## Project Overview

This full-stack application demonstrates a modern banking system with secure user authentication, account management, transaction processing, and reporting features.

## Technology Stack

### Frontend
- React.js for UI components
- Redux for state management
- Material-UI for responsive design
- Axios for API communication
- Jest for testing

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security for authentication and authorization
- Spring Data JPA for database access
- Hibernate as ORM
- JWT for stateless authentication

### Database
- MySQL for data persistence
- Flyway for database migrations

### DevOps & Tools
- Maven for dependency management and build
- Git for version control
- Docker for containerization
- JUnit and Mockito for testing
- Swagger for API documentation

## Project Structure

```
├── backend/                 # Java Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Java source files
│   │   │   └── resources/  # Configuration files
│   │   └── test/           # Test files
│   ├── pom.xml             # Maven configuration
│   └── .dockerignore       # Docker build exclusions
│
├── frontend/               # React application
│   ├── public/             # Static files
│   ├── src/                # React source files
│   ├── package.json        # NPM configuration
│   └── .dockerignore       # Docker build exclusions
│
├── docker/                 # Docker configuration
│   ├── docker-compose.yml  # Multi-container setup
│   ├── backend.Dockerfile  # Backend container definition
│   ├── frontend.Dockerfile # Frontend container definition
│   ├── nginx.conf          # Nginx configuration for frontend
│   ├── start.ps1           # PowerShell script to start application (Windows)
│   ├── stop.ps1            # PowerShell script to stop application (Windows)
│   ├── start.sh            # Shell script to start application (Linux/macOS)
│   └── stop.sh             # Shell script to stop application (Linux/macOS)
│
├── .gitignore              # Git exclusions
├── Makefile                # Make commands for easy Docker operations
├── CONTRIBUTING.md         # Contribution guidelines
└── LICENSE                 # MIT License
```

## Features

- User registration and authentication with JWT
- Multi-factor authentication for enhanced security
- Account management (checking, savings, etc.)
- Money transfers between accounts
- Bill payments and scheduling
- Transaction history and statements
- Notifications for account activities
- Admin dashboard for user management

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0
- Maven 3.8+
- Docker and Docker Compose (for containerized setup)

### Setup Instructions

#### Option 1: Using Docker (Recommended)

1. Clone the repository
2. Navigate to the project root directory
3. Choose one of the following methods to start the application:

   **Using Scripts:**
   
   Windows:
   ```
   .\docker\start.ps1
   ```
   
   Linux/macOS:
   ```
   chmod +x ./docker/start.sh
   ./docker/start.sh
   ```
   
   **Using Make:**
   ```
   make up
   ```
   
   **Using Docker Compose directly:**
   ```
   cd docker
   docker-compose up -d
   ```
   
4. Access the application at http://localhost

5. To stop the application, choose one of the following methods:
   
   **Using Scripts:**
   
   Windows:
   ```
   .\docker\stop.ps1
   ```
   
   Linux/macOS:
   ```
   chmod +x ./docker/stop.sh
   ./docker/stop.sh
   ```
   
   **Using Make:**
   ```
   make down
   ```
   
   **Using Docker Compose directly:**
   ```
   cd docker
   docker-compose down
   ```
   
6. For more commands and options:
   ```
   make help
   ```

#### Option 2: Manual Setup

1. Clone the repository
2. Set up the database
3. Configure application properties
4. Build and run the backend:
   ```
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
5. Install frontend dependencies and start the React app:
   ```
   cd frontend
   npm install
   npm start
   ```

Detailed instructions are available in the backend and frontend directories.

## API Documentation

API documentation is available via Swagger UI at `/swagger-ui.html` when the application is running.

## Security Measures

- HTTPS for secure communication
- JWT with short expiration times
- Password hashing with BCrypt
- Input validation and sanitization
- CSRF protection
- Rate limiting
- SQL injection prevention

## Contributing

We welcome contributions to this project! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.# Online-Banking-Application
# Online-Banking-Application

