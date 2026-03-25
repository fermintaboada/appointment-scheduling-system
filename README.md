# 📅 Appointment Scheduling System (Full Stack)

A full-stack appointment management application built with React, TypeScript, Node.js, and PostgreSQL. The system allows users to register, authenticate, and manage appointments with real-world scheduling constraints.

---

## 🚀 Features

- User authentication (register / login) with protected routes  
- Appointment booking, listing, and cancellation  
- Business rule validation for scheduling (time windows, weekends, duplicate prevention)  
- User-specific appointment management  
- Form handling with validation  
- Full frontend-backend integration  

---

## 🧠 Architecture

The application follows a modular and scalable architecture across all layers:

### Frontend
- React with component-based architecture  
- Context API for global state management  
- Form handling and validation  
- Protected navigation flows  

### Backend
- Node.js with Express and TypeScript  
- Layered architecture (controllers, services, repositories)  
- RESTful API design  
- Business logic encapsulated in service layer  

### Database
- PostgreSQL relational database  
- Data modeling with TypeORM  
- Entity relationships between users, credentials, and appointments  

---

## 🛠️ Tech Stack

### Frontend
- React  
- TypeScript  
- React Router  
- Context API  
- Formik  

### Backend
- Node.js  
- Express  
- TypeScript  
- TypeORM  

### Database
- PostgreSQL  

---

## 🔌 API Overview

The backend exposes REST endpoints for:

- User registration and authentication  
- Appointment creation  
- Appointment retrieval (per user)  
- Appointment cancellation  

---

## 📂 Project Structure
root/
├── front/ # React frontend application
│ └── src/
│ ├── components/
│ ├── views/
│ ├── context/
│ ├── routes/
│ └── services/
│
├── back/ # Node.js + Express backend
│ └── src/
│ ├── controllers/
│ ├── services/
│ ├── repositories/
│ ├── entities/
│ └── config/