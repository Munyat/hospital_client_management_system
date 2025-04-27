Of course!  
Here's a polished `README.md` based on everything you shared about the **Hospital Management System** API:

---

# 🏥 Hospital Management System API

This is a **RESTful API** for managing **clients**, **programs**, **user authentication**, and **client enrollment** into healthcare programs.

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (for Authentication)

---

## 📂 Project Structure (Endpoints)

### 🧑‍🤝‍🧑 Clients

| Method | Endpoint                      | Description                       |
| :----: | :---------------------------- | :-------------------------------- |
|  GET   | `/api/v1/clients`             | Fetch **all clients**             |
|  GET   | `/api/v1/clients/:id`         | Fetch a **single client** by ID   |
|  POST  | `/api/v1/clients`             | **Create** a new client           |
| PATCH  | `/api/v1/clients/:id`         | **Update** an existing client     |
| DELETE | `/api/v1/clients/:id`         | **Delete** a client               |
|  GET   | `/api/v1/clients?name=<name>` | **Filter/search** clients by name |

Example `POST /clients` body:

```json
{
  "name": "Jane",
  "gender": "Female",
  "email": "jane@gmail.com",
  "date_of_birth": "1988-03-22",
  "national_id": "9876543",
  "phone": "+254700000071"
}
```

---

### 📚 Programs

| Method | Endpoint               | Description                |
| :----: | :--------------------- | :------------------------- |
|  GET   | `/api/v1/programs`     | Fetch **all programs**     |
|  GET   | `/api/v1/programs/:id` | Fetch a **single program** |
|  POST  | `/api/v1/programs`     | **Create** a program       |
| PATCH  | `/api/v1/programs/:id` | **Update** a program       |
| DELETE | `/api/v1/programs/:id` | **Delete** a program       |

Example `POST /programs` body:

```json
{
  "name": "Tuberculosis (TB) Control",
  "description": "A program aimed at preventing, diagnosing, and treating tuberculosis. Includes DOTS (Directly Observed Treatment, Short-course) for effective management."
}
```

---

### 📝 Enrollment

| Method | Endpoint         | Description                        |
| :----: | :--------------- | :--------------------------------- |
|  POST  | `/api/v1/enroll` | **Enroll** a client into a program |

Example `POST /enroll` body:

```json
{
  "client": "client_id_here",
  "program": "program_id_here"
}
```

---

### 👤 Users (Authentication)

| Method | Endpoint               | Description                          |
| :----: | :--------------------- | :----------------------------------- |
|  POST  | `/api/v1/users/signup` | **Register** a new user              |
|  POST  | `/api/v1/users/login`  | **Login** user and get **JWT token** |

Example `POST /users/signup` body:

```json
{
  "fullName": "Brian Kipkirui",
  "email": "brian@example.com",
  "password": "StrongPassword123"
}
```

Example `POST /users/login` body:

```json
{
  "email": "brannKipkiru@example.com",
  "password": "StrongPassword123"
}
```

---

## 🔒 Authentication

All endpoints (except `signup` and `login`) are protected with **Bearer Token** authentication.

Every request must include the `Authorization` header:

```bash
Authorization: Bearer <token>
```

---

## 🚀 How to Run Locally

1. Clone the repository:

```bash
git clone <your-repository-url>
cd hospital-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Set environment variables (`.env`):

```env
PORT=3001
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d
```

4. Start the server:

```bash
npm start
```

Server will be running at: `http://localhost:3001`

---

## 📬 Postman Collection

You can import the Postman collection to easily test all the endpoints.  
(You can create and export it later if you want.)

---

## 📢 Notes

- Make sure MongoDB is running before starting the server.
- Always send a valid **JWT token** when accessing protected routes.
- Data validation and error handling have been added for robustness.

---

# ❤️ Thank you for using Hospital Management System API!

---

Would you also like me to generate a **Postman Collection JSON** for you so you can just import it directly? 🚀  
(only if you want!)
