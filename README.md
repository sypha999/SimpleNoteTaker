# NoteTaker API

A simple RESTful Note-Taking API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.

The application allows users to create, retrieve, update, and delete notes while organizing them into categories. Categories are managed as separate entities and automatically created when they do not exist.

---

## Features

- Create notes
- Retrieve all notes
- Retrieve a note by ID
- Update existing notes
- Delete notes
- Retrieve notes by category
- Automatic category creation and mapping
- MongoDB persistence with Mongoose
- DTO validation using `class-validator`
- Generic validation middleware
- Typed request logging middleware
- Global error handling
- Swagger/OpenAPI documentation
- TypeScript support

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Swagger UI
- Swagger JSDoc
- Class Validator
- Class Transformer
- Dotenv

---

## Project Structure

```text
src
│
├── config
│   ├── Database.ts
│   └── Swagger.ts
│
├── controllers
│   └── NoteController.ts
│
├── dto
│   ├── CreateNoteDto.ts
│   └── UpdateNoteDto.ts
│
├── errors
│   └── AppError.ts
│
├── interfaces
│   ├── INote.ts
│   └── ICategory.ts
│
├── middlewares
│   ├── ErrorMiddleware.ts
│   ├── LoggingMiddleware.ts
│   └── ValidationMiddleware.ts
│
├── models
│   ├── Note.ts
│   └── Category.ts
│
├── routes
│   └── NoteRoutes.ts
│
├── services
│   ├── NoteService.ts
│   └── CategoryService.ts
│
├── app.ts
└── server.ts
```

---

## Data Model

### Category

```json
{
  "_id": "6858c0f8b4b1d6f48d123456",
  "name": "Work"
}
```

### Note

```json
{
  "_id": "6858c0f8b4b1d6f48d999999",
  "title": "Sprint Planning",
  "content": "Review backlog and discuss priorities",
  "category": "6858c0f8b4b1d6f48d123456",
  "createdAt": "2026-05-30T12:00:00.000Z",
  "updatedAt": "2026-05-30T12:00:00.000Z"
}
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/sypha999/SimpleNoteTaker
cd SimpleNoteTaker
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8787
MONGODB_URI=mongodb://localhost:27017/notetaker
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

---

## API Documentation

### Postman Collection

Download the Postman collection:

[NoteTaker Postman Collection](./NoteTaker-Postman-Collection-v2.1.json)

### Swagger Documentation

Swagger UI is available at:

```text
http://localhost:8787/api-docs
```

---

# API Endpoints

## Create Note

### Request

```http
POST /api/v1/notes
```

### Body

```json
{
  "title": "Sprint Planning",
  "content": "Review backlog",
  "category": "Work"
}
```

### Response

```json
{
  "_id": "6858c0f8b4b1d6f48d999999",
  "title": "Sprint Planning",
  "content": "Review backlog",
  "category": {
    "_id": "6858c0f8b4b1d6f48d123456",
    "name": "Work"
  }
}
```

---

## Get All Notes

### Request

```http
GET /api/v1/notes
```

### Response

```json
[
  {
    "_id": "6858c0f8b4b1d6f48d999999",
    "title": "Sprint Planning",
    "content": "Review backlog",
    "category": {
      "_id": "6858c0f8b4b1d6f48d123456",
      "name": "Work"
    }
  }
]
```

---

## Get Note By ID

### Request

```http
GET /api/v1/notes/{id}
```

### Response

```json
{
  "_id": "6858c0f8b4b1d6f48d999999",
  "title": "Sprint Planning",
  "content": "Review backlog",
  "category": {
    "_id": "6858c0f8b4b1d6f48d123456",
    "name": "Work"
  }
}
```

---

## Get Notes By Category

### Request

```http
GET /api/v1/notes/categories/{categoryId}
```

### Response

```json
[
  {
    "_id": "6858c0f8b4b1d6f48d999999",
    "title": "Sprint Planning",
    "content": "Review backlog",
    "category": {
      "_id": "6858c0f8b4b1d6f48d123456",
      "name": "Work"
    }
  }
]
```

---

## Update Note

### Request

```http
PUT /api/v1/notes/{id}
```

### Body

```json
{
  "title": "Updated Sprint Planning",
  "content": "Updated meeting notes",
  "category": "Personal"
}
```

### Response

```json
{
  "_id": "6858c0f8b4b1d6f48d999999",
  "title": "Updated Sprint Planning",
  "content": "Updated meeting notes",
  "category": {
    "_id": "6858c0f8b4b1d6f48d777777",
    "name": "Personal"
  }
}
```

---

## Delete Note

### Request

```http
DELETE /api/v1/notes/{id}
```

### Response

```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

# Validation

Request validation is implemented using:

- class-validator
- class-transformer

Example DTO:

```ts
export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;
}
```

---

# Error Handling

Custom application errors are handled globally.

Example response:

```json
{
  "message": "Note not found"
}
```

Common error codes:

| Status Code | Description |
|------------|-------------|
| 400 | Bad Request |
| 404 | Resource Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Logging

A typed logging middleware captures incoming requests.

Example log:

```json
{
  "method": "POST",
  "url": "/api/v1/notes",
  "timestamp": "2026-05-30T12:00:00.000Z"
}
```

---

# Category Management

Categories are automatically managed by the application.

When creating or updating a note:

1. The system checks if the category exists.
2. If it exists, the existing category is reused.
3. If it does not exist, a new category is created.
4. The note stores a reference to the category's ObjectId.

This prevents duplicate category records and keeps the data normalized.

---