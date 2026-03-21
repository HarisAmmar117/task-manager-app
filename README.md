# Task Manager App

## Overview
A full-stack Task Manager application built with Angular (frontend), Spring Boot (backend), and MySQL database. The application allows users to create, read, update, and delete tasks with a clean and responsive user interface.

## Features
- ✅ Create, read, update, and delete tasks
- ✅ Task filtering by status (TO_DO, IN_PROGRESS, DONE)
- ✅ Responsive UI with Angular Material/Bootstrap
- ✅ Form validation
- ✅ RESTful API architecture
- ✅ 3 - Tier Monolati architecture

## Tech Stack

### Frontend
- Angular
- TypeScript
- Angular Material / Bootstrap
- RxJS
- HttpClient
- Reactive Forms

### Backend
- Spring Boot
- Spring Data JPA
- Maven
- RESTful API

### Database
- MySQL

## Prerequisites
- Node.js v24.14.0
- Java 21
- Maven
- MySQL Server

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd task-manager-app
```

### 2. Database Setup

#### Install MySQL
Download and install MySQL from [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

#### Create Database
```sql
CREATE DATABASE taskflowdb;
```

#### Database Configuration
The application will automatically create tables on first run using JPA/Hibernate.

### 3. Backend Setup

#### Navigate to backend folder
```bash
cd backend
```

#### Update Database Credentials
Edit `src/main/resources/application.yaml`:

```properties
spring.application.name=taskmanager

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server Configuration
server.port=8080

# CORS Configuration
cors.allowed.origins=http://localhost:4200
```

#### Build and Run

**Using Maven:**
```bash
./mvnw clean install
./mvnw spring-boot:run
```

**Using Gradle:**
```bash
./gradlew clean build
./gradlew bootRun
```

Backend will run on: **http://localhost:8080**

### 4. Frontend Setup

#### Navigate to frontend folder
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Update API URL (if needed)
Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

#### Run the Application
```bash
ng serve
```

Frontend will run on: **http://localhost:4200**

### 5. Access the Application
Open your browser and navigate to: **http://localhost:4200**

## API Endpoints

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

### Request/Response Examples

#### Create Task
**POST** `/api/tasks`
```json
{
  "title": "Complete assignment",
  "description": "Finish the full stack coding assignment",
  "status": "TO_DO"
}
```

#### Update Task
**PUT** `/api/tasks/1`
```json
{
  "title": "Complete assignment",
  "description": "Finish the full stack coding assignment",
  "status": "IN_PROGRESS"
}
```

## Task Entity Model

```java
public class Task {
    private Long id;
    private String title;
    private String description;
    private String status; // TO_DO, IN_PROGRESS, DONE
    private LocalDateTime createdAt;
}
```

## Features Implementation

### Task Management
- **Create**: Click "Add Task" button and fill the form
- **Read**: View all tasks in table/card format on the main page
- **Update**: Click "Edit" button on any task to modify it
- **Delete**: Click "Delete" button to remove a task
- **Filter**: Use status dropdown to filter tasks by status

### Form Validation
- **Title**: Required field (cannot be empty)
- **Description**: Optional field with character limit
- **Status**: Dropdown selection (TO_DO, IN_PROGRESS, DONE)

## Available npm Scripts (Frontend)

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run unit tests
npm run lint       # Run linting
```

## Available Maven/Gradle Commands (Backend)

**Maven:**
```bash
./mvnw clean           # Clean build artifacts
./mvnw compile         # Compile the project
./mvnw test            # Run tests
./mvnw package         # Create JAR file
```

**Gradle:**
```bash
./gradlew clean        # Clean build artifacts
./gradlew build        # Build the project
./gradlew test         # Run tests
./gradlew bootJar      # Create JAR file
```

## Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database `taskmanager` exists

**Port Already in Use:**
- Change port in `application.properties`: `server.port=8081`

### Frontend Issues

**Cannot connect to backend:**
- Verify backend is running on port 8080
- Check CORS configuration in backend
- Verify `apiUrl` in `environment.ts`

**Port 4200 in use:**
```bash
ng serve --port 4201
```

## Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Future Enhancements
- JWT-based authentication
- Docker containerization
- Task categories and tags
- Task assignment to users
- Due dates and reminders
- File attachments
- Advanced search functionality

## License
MIT License

## Author
[Your Name]

---

**Note**: Make sure MySQL is running before starting the backend application!