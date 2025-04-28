# 🏥 Hospital Management System API

This is a RESTful API for managing users, clients, programs, and enrollments in a hospital setting.  
It uses Node.js, Express, MongoDB, and Swagger for API documentation.

---

## 🚀 Features

- User authentication (Sign up and Login)
- Client management (Create, Read, Update, Delete)
- Program management (Create, Read, Update, Delete)
- Enroll clients into programs
- API documentation with Swagger (`/api-docs` endpoint)
- Centralized error handling

---

## 🌐 Deployed Website

The API is live and accessible here:  
👉 [Hospital Management System API Documentation](https://hospital-client-management-system.onrender.com/api-docs)

---

## 📄 Important Note

🔴 **Database Connection:**  
For the purpose of an interview process, the MongoDB Atlas database is exposed publicly inside `app.js`.  
Please feel free to connect to your own local or private database for security reasons.

```javascript
// Note: Database exposed temporarily for interview process.
// Feel free to connect to your own local MongoDB for testing and production use.
await connectDB(
  "mongodb+srv://briankipkiruimunyat:healthcare@cluster0.g3r77i1.mongodb.net/?retryWrites=true&w=majority&appName=healthcaremanagement"
);
```

---

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/Munyat/hospital_client_management_system.git
cd hospital_client_management_system
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add:

```
PORT=3005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=1d
```

_(You can continue using the provided Atlas URI for testing.)_

4. Run the server:

```bash
npm start
```

---

## 📚 API Documentation

- Local: `http://localhost:3005/api-docs`
- Live: [`https://hospital-client-management-system.onrender.com/api-docs`](https://hospital-client-management-system.onrender.com/api-docs)

It documents all endpoints, request bodies, authentication methods, and responses.

---

## 🔐 Authentication

All protected routes use **Bearer Token** authentication.  
Obtain a token by signing up or logging in at:

- `/api/v1/users/signup`
- `/api/v1/users/login`

---

## 📬 API Endpoints Overview

### User Endpoints

| Method |       Endpoint       | Description       |
| :----: | :------------------: | :---------------- |
|  POST  | /api/v1/users/signup | Register new user |
|  POST  | /api/v1/users/login  | Login user        |

### Client Endpoints

| Method |      Endpoint       | Description         |
| :----: | :-----------------: | :------------------ |
|  GET   |   /api/v1/clients   | Get all clients     |
|  GET   | /api/v1/clients/:id | Get client by ID    |
|  POST  |   /api/v1/clients   | Create a new client |
| PATCH  | /api/v1/clients/:id | Update a client     |
| DELETE | /api/v1/clients/:id | Delete a client     |

### Program Endpoints

| Method |       Endpoint       | Description          |
| :----: | :------------------: | :------------------- |
|  GET   |   /api/v1/programs   | Get all programs     |
|  GET   | /api/v1/programs/:id | Get program by ID    |
|  POST  |   /api/v1/programs   | Create a new program |
| PATCH  | /api/v1/programs/:id | Update a program     |
| DELETE | /api/v1/programs/:id | Delete a program     |

### Enrollment Endpoints

| Method |    Endpoint    | Description                  |
| :----: | :------------: | :--------------------------- |
|  POST  | /api/v1/enroll | Enroll a client in a program |
|  GET   | /api/v1/enroll | Get all enrollments          |

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- Swagger (API Docs)
- JWT (Authentication)
- Morgan (Logger)

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

This project is licensed for educational and interview purposes.  
Feel free to fork and adapt it!

---

## ✨

❤️ Thank you for using the Hospital Management System API!
