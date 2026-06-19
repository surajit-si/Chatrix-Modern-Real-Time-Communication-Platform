# 🚀 Chatrix

### Fast. Secure. Connected.

A modern, full-stack real-time communication platform built for seamless messaging, media sharing, and scalable collaboration.







---

## 📖 Overview

**Chatrix** is a modern real-time messaging platform designed with scalability, performance, and security in mind. It delivers instant communication, secure authentication, media sharing, and a responsive user experience powered by a robust full-stack architecture.

Whether you're building team collaboration tools, social messaging platforms, or enterprise communication systems, Chatrix provides a solid foundation for real-time interaction.

---

## ✨ Features

### 💬 Messaging

* Real-time one-to-one messaging
* Instant message delivery
* Message synchronization
* Chat saved in DB
* Online & offline status tracking

### 🔒 Security

* JWT Authentication
* Protected Routes
* Secure Cookie Sessions
* Authorization Middleware
* Password Hashing

### 📷 Media Sharing

* Image Uploads
* Cloud-Based Media Storage
* Profile Picture Management
* Optimized Asset Delivery

### ⚡ Performance

* Socket.IO Real-Time Communication
* Efficient API Architecture
* Optimized Database Queries
* Responsive User Interface

### 👤 User Management

* User Registration
* Secure Login System
* User Profiles
* Session Management

---

## 🏗️ Architecture

```text
┌─────────────────┐
│     React       │
│   Frontend UI   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Express.js   │
│   REST API      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    MongoDB      │
│   Database      │
└─────────────────┘

       ▲
       │
       ▼

┌─────────────────┐
│    Socket.IO    │
│ Real-Time Layer │
└─────────────────┘

       ▲
       │
       ▼

┌─────────────────┐
│   Cloudinary    │
│ Media Storage   │
└─────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS / Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* Cookie-Based Sessions
* bcrypt

### Real-Time Communication

* ws

### File Handling

* Multer
* Cloudinary

---

## ⚙️ Environment Variables

Create a `.env` file inside the server directory.

```env
MONGODB_URI=
PORT=2xx8

CORS_ORIGIN=*

CLOUD_NAME=
API_KEY=
API_SECRET=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRE=2h

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRE=1d

NODEMAILER_USER=
NODEMAILER_PASS=
```

---

## 🚀 Installation

### Clone Repository

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

### Run Development Server

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## 🔐 Security Features

* JWT Authentication
* HTTP-Only Cookies
* Password Encryption
* Route Protection
* Secure Middleware
* User Authorization Checks

---

## 📈 Future Enhancements

* Group Chats
* Message Reactions
* Push Notifications
* End-to-End Encryption
* Dark Mode
* AI-Powered Features

---

## 📜 License

This project is licensed under the MIT License.

---

### Built with ❤️ using React, Node.js, Express, MongoDB, Socket.IO & Cloudinary

**Chatrix — Modern Real-Time Communication Platform**
