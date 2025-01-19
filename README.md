# **API Server for Collectible Card Game**

## **Description**

This project is an Express.js API server for a fictional collectible card game. It includes features for user authentication, card management (CRUD operations), and token-based authorization.

---

## **Features**

- **Authentication**: Login with username and password to receive a JWT token.
- **Card Management**:
  - Retrieve all cards with optional filters.
  - Create, update, and delete cards (protected by JWT).
- **Error Handling**: Descriptive error messages for client and server issues.
- **Secure**: Environment-based JWT secret and hashed passwords.

---

## **Endpoints**

### **Authentication**

- `POST /auth/getToken`: Authenticates user and returns a JWT.

### **Cards**

- `GET /cards`: Retrieve all cards (supports filters via query parameters).
- `POST /cards/create`: Create a new card (requires JWT).
- `PUT /cards/:id`: Update an existing card by ID (requires JWT).
- `DELETE /cards/:id`: Delete a card by ID (requires JWT).

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone git@github.com:kchild89/API-Server-Project.git
   ```
