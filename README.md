# Course and User Management API

This project is a Course and User Management API built using **Node.js** and **Express**. It provides functionalities for user authentication and course management.

## Features

- **User Registration**: Create new users with validation and password hashing.
- **User Login**: Authenticate users and generate JWT tokens for secure access.
- **Course Management**:
  - Create, Read, Update, and Delete (CRUD) operations for courses.
  - Validation for course data.
- **Centralized Error Handling**: Custom error handling for consistent API responses.


## API Endpoints

### User Endpoints

- **POST /api/users/register**: Register a new user (username, email, password).
- **POST /api/users/login**: Login an existing user (email, password).

### Course Endpoints

- **GET /api/courses**: Retrieve all courses.
- **GET /api/courses/:id**: Retrieve a specific course by ID.
- **POST /api/courses**: Create a new course (title).
- **PUT /api/courses/:id**: Update an existing course by ID (title).
- **DELETE /api/courses/:id**: Delete a course by ID.

## Example Requests

### User Registration

```bash
curl -X POST http://localhost:5500/api/users/register -d '{"username": "john", "email": "john@example.com", "password": "password123"}' -H "Content-Type: application/json"
