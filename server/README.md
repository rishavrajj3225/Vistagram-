# Vistagram API Documentation

Welcome to the Vistagram API! This document describes the available endpoints for user authentication and post management.

---

## Authentication

### Register a New User

- **Endpoint:** `POST /api/v1/users/register`
- **Description:** Register a new user account.
- **Request Body (JSON):**
    ```json
    {
        "username": "one2",
        "email": "one2@gmail.com",
        "password": "123456"
    }
    ```
- **Response:** Confirmation message and user details.

---

### Login

- **Endpoint:** `POST /api/v1/users/login`
- **Description:** Log in with email and password.
- **Request Body (JSON):**
    ```json
    {
        "email": "user@example.com",
        "password": "your_password"
    }
    ```
- **Response:** Login confirmation and (optionally) a session token.

---

### Logout

- **Endpoint:** `GET /api/v1/users/logout`
- **Description:** Log out the current user.
- **Response Example:**
    ```json
    {
        "status": "success",
        "message": "User logged out successfully."
    }
    ```

---

### Get Current User

- **Endpoint:** `GET /api/v1/users/current`
- **Description:** Get details of the authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Response Example:**
    ```json
    {
        "id": "12345",
        "username": "exampleUser",
        "email": "user@example.com",
        "profile_picture": "http://example.com/profile.jpg",
        "bio": "This is an example bio."
    }
    ```

---

## Posts

### Create a New Post

- **Endpoint:** `POST /api/v1/posts/create`
- **Description:** Upload an image and optional caption.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** `form-data`
    - `image` (file, required)
    - `caption` (text, optional)
- **Response:** Details of the created post.

---

### Like a Post

- **Endpoint:** `PUT /api/v1/posts/like`
- **Description:** Like a post by ID.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body (JSON):**
    ```json
    {
        "postId": "688880120f8725d58b15d3fa"
    }
    ```
- **Response:** Confirmation and updated like count.

---

### Share a Post

- **Endpoint:** `POST /api/v1/posts/share`
- **Description:** Share a post by ID.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body (JSON):**
    ```json
    {
        "postId": "6888aa0b5aed61c87b32e52e"
    }
    ```
- **Response:** Confirmation message.

---

### Delete a Post

- **Endpoint:** `DELETE /api/v1/posts/delete`
- **Description:** Delete a post by ID.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body (JSON):**
    ```json
    {
        "postId": "688880120f8725d58b15d3fa"
    }
    ```
- **Response Example:**
    ```json
    {
        "status": "success",
        "message": "Post deleted successfully."
    }
    ```

---

### Get All Posts

- **Endpoint:** `GET /api/v1/posts/all`
- **Description:** Retrieve all posts.
- **Response Example:**
    ```json
    {
        "posts": [
            {
                "id": "string",
                "userId": "string",
                "content": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        ]
    }
    ```

---

### Get Post by ID

- **Endpoint:** `GET /api/v1/posts/{postId}`
- **Description:** Retrieve details of a specific post.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Post details as JSON.

---

## Notes

- All endpoints requiring authentication expect a Bearer token in the `Authorization` header.
- Handle errors such as invalid input, authentication failures, and permission issues.
- Deleting posts is irreversible.

---
