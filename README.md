# 📝 Notes App

[![Made with React](https://img.shields.io/badge/Made%20with-React-blue)](https://reactjs.org/) 
[![Express](https://img.shields.io/badge/Backend-Express.js-lightgrey)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/) 
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/) 


A full-stack **Notes Management Application** built with **MERN stack** (MongoDB, Express.js, React, Node.js) featuring **JWT authentication, CRUD operations, search, pinning, and toast notifications**.  

---

## 🚀 Features
- 🔐 **User Authentication** (Signup / Login with JWT)
- 📝 **Create, Edit, Delete Notes**
- 📌 **Pin Important Notes**
- 🔍 **Search Notes by Title or Content**
- 🎨 **Responsive UI with TailwindCSS**
- 🔔 **Toast Notifications for Actions**
- ☁️ **MongoDB Atlas Integration**

---

## 📸 Screenshots 

![Signup Page](./screenshots/signup.png)  
![Dashboard](./screenshots/dashboard.png)  
![Notes CRUD](./screenshots/notes.png)  

---

## 🛠️ Tech Stack
**Frontend**
- ⚛️ React (Vite)
- 🎨 TailwindCSS
- 📦 Axios

**Backend**
- 🟢 Node.js + Express
- 🛢 MongoDB + Mongoose
- 🔑 JWT Authentication
- 🔒 Bcrypt (for password hashing)

---

### ⚙️ Installation & Setup

## 1️⃣ Clone the repository
git clone https://github.com/prakriti1111/Notes.git
cd Notes

## 2️⃣ Setup Backend
bash<br>
Copy code<br>
cd backend<br>
npm install<br>
Create .env file:<br>

env<br>
Copy code<br>
ACCESS_TOKEN_SECRET=yourSecretKey<br>
Update config.json with your MongoDB Atlas connection string.<br>

Run backend:<br>

bash<br>
Copy code<br>
npm start<br>
## 3️⃣ Setup Frontend
bash<br>
Copy code<br>
cd ../frontend/notes-app<br>
npm install<br>
npm run dev<br>
## 📡 API Endpoints
## 🔑 Auth
POST /create-account → Register user

POST /login → Login user

GET /get-user → Get logged-in user info

📝 Notes
POST /add-note → Add new note

GET /get-all-note → Get all notes

PUT /edit-note/:id → Edit note

DELETE /delete-note/:id → Delete note

PUT /update-note-pinned/:id → Toggle pin

GET /search-note?query=xyz → Search notes
