# Vistagram
A full-stack project with separate frontend and backend.

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **Other:** REST API, dotenv, Nodemon, ESLint, Prettier

## Project Structure

```
Vistagram/
├── backend/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── package.json
│   └── ...
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/)

---

## Backend Setup

1. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**
    - Create a `.env` file based on `.env.example`.

4. **Run the backend server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

---

## Frontend Setup

1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the frontend development server:**
    ```bash
    npm run dev
    # or
    yarn start
    ```

---

## Development Workflow

- Start both frontend and backend servers for local development.
- Update environment variables as needed for API endpoints.

---

## More Documentation

- [Server Documentation](server/README.md)
- [Backend Swagger JSON](server/swagger-output.json)

To generate the Swagger JSON documentation, run:
```bash
npm run swagger
```
after completing the setup.