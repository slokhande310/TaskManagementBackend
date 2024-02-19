# Task Management API

This Node.js application provides a Task Management API where users can sign up, log in, and authenticated users can perform CRUD operations on tasks.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (MongoDB Database)
  - You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-hosted MongoDB database.

### Installation

1. Clone the repository:

   ```bash
   https://github.com/slokhande310/TaskManagementBackend.git
   ```
2. Navigate to the project directory:

   ```bash
   cd TaskManagementBackend
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Set up the environment variables by creating a .env file
   ```bash
   MONGO_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_jwt_secret
   ```
5. Run the application:

   ```bash
   npm start
   ```
### Usage

### Authentication
To access authenticated routes, users need to sign up and log in to obtain an access token. Include the token in the Authorization header of your requests.

### Endpoints
#### Sign Up:

```bash 
POST /users/register
```

#### Log In:
```bash
POST /users/login
```
#### Tasks:
```bash
GET /tasks/gettasks/ (Get all tasks)
```
```bash
GET /tasks/gettasks/:id (Get a specific task)
```
```bash
POST /tasks/createtask (Create a new task)
```
```bash
PATCH /tasks/updatetask/:id (Update a task)
```
```bash
DELETE /tasks/deletetask/:id (Delete a task)
```
