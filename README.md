# NoteTaker API

A secure RESTful Note-Taking API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Mongoose**, **JWT Authentication**, and **bcrypt**.

The application allows users to register, authenticate, create notes, organize them into categories, and securely access only their own notes.

---

## Features

### Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Authentication Type Guard

### Notes

- Create Notes
- Retrieve All Notes
- Retrieve Note By ID
- Update Note
- Delete Note
- Retrieve Notes By Category

### Categories

- Automatic Category Creation
- Category Reuse
- Category Mapping To Notes

### Infrastructure

- MongoDB Persistence with Mongoose
- DTO Validation using `class-validator`
- Generic Validation Middleware
- Typed Request Logging Middleware
- Global Error Handling
- Swagger/OpenAPI Documentation
- TypeScript Support

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | Web Framework |
| TypeScript | Type Safety |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Swagger UI / JSDoc | API Documentation |
| class-validator / class-transformer | DTO Validation |
| dotenv | Environment Config |

---

## Project Structure

```
src/
│
├── config/
│   ├── Database.ts
│   └── Swagger.ts
│
├── controllers/
│   └── NoteController.ts
│
├── dto/
│   ├── CreateNoteDto.ts
│   └── UpdateNoteDto.ts
│
├── errors/
│   └── AppError.ts
│
├── interfaces/
│   ├── INote.ts
│   └── ICategory.ts
│
├── middlewares/
│   ├── ErrorMiddleware.ts
│   ├── LoggingMiddleware.ts
│   └── ValidationMiddleware.ts
│
├── models/
│   ├── Note.ts
│   └── Category.ts
│
├── routes/
│   └── NoteRoutes.ts
│
├── services/
│   ├── NoteService.ts
│   └── CategoryService.ts
│
├── types/
│   └── express/
│       └── index.d.ts
│
├── app.ts
└── server.ts
```

---

## Data Models

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

```bash
git clone https://github.com/sypha999/SimpleNoteTaker
cd SimpleNoteTaker
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8787
MONGODB_URI=mongodb://localhost:27017/notetaker
JWT_SECRET=my-super-secret-key
JWT_EXPIRES_IN=1d
```

---

## Running the Application

```bash
# Development
npm run dev

# Build
npm run build

# Run Production Build
npm start
```

---

## API Documentation

### Swagger UI

Available at:

```
http://localhost:8787/api-docs
```

### Postman Collection

[NoteTaker Postman Collection](./NoteTaker-Postman-Collection-v2.1.json)

---

## Authentication

All Note endpoints require a JWT token in the `Authorization` header:

```http
Authorization: Bearer <jwt-token>
```

Obtain a token via `POST /api/auth/login`.

---

## API Endpoints

### Auth

| Method | Endpoint |
|--------|-------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Notes

| Method | Endpoint |
|--------|--------------------------------------|
| GET | /api/v1/notes |
| GET | /api/v1/notes/:id |
| GET | /api/v1/notes/categories/:categoryId |
| POST | /api/v1/notes |
| PUT | /api/v1/notes/:id |
| DELETE | /api/v1/notes/:id |

---

## Usage Examples

### Register User

```http
POST /api/auth/register
```

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login User

```http
POST /api/auth/login
```

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Create Note

```http
POST /api/v1/notes
```

```json
{
  "title": "Sprint Planning",
  "content": "Review backlog",
  "category": "Work"
}
```

**Response:**

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

### Get All Notes

```http
GET /api/v1/notes
```

**Response:**

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

### Get Note By ID

```http
GET /api/v1/notes/{id}
```

**Response:**

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

### Get Notes By Category

```http
GET /api/v1/notes/categories/{categoryId}
```

**Response:**

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

### Update Note

```http
PUT /api/v1/notes/{id}
```

```json
{
  "title": "Updated Sprint Planning",
  "content": "Updated meeting notes",
  "category": "Personal"
}
```

**Response:**

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

### Delete Note

```http
DELETE /api/v1/notes/{id}
```

**Response:**

```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

## Note Ownership

Each note belongs to a specific user. Users can only **create**, **view**, **update**, and **delete** their own notes — cross-user access is not permitted.

---

## Category Management

Categories are automatically managed by the application. When creating or updating a note:

1. The system checks if the category exists.
2. If it exists, the existing category is reused.
3. If it does not exist, a new category is created.
4. The note stores a reference to the category's ObjectId.

This prevents duplicate category records and keeps the data normalized.

---

## Validation

Validation uses `class-validator` and `class-transformer`.

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

## Error Handling

Errors are handled globally and return consistent JSON responses.

```json
{
  "message": "Note not found"
}
```

| Status | Description |
|--------|------------------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Logging

A typed middleware logs all incoming requests:

```json
{
  "method": "POST",
  "url": "/api/v1/notes",
  "timestamp": "2026-05-30T12:00:00.000Z"
}
```
