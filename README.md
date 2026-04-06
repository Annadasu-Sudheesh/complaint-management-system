# 📘 README.md

# 🚀 Smart Complaint Management System

A full-stack web application that allows students to submit complaints and track their status, while administrators manage and resolve them efficiently.

---

## Features

- User Authentication (Student/Admin)
- Submit Complaints
- Track Complaint Status
- Admin Dashboard
- Update Status (Pending, In Progress, Resolved)
- Role-Based Access Control

---

## Tech Stack

- Frontend: React JS
- Backend: Spring Boot (Java)
- Database: MySQL
- Version Control: Git & GitHub

---

## Project Structure

solo_project/
│
├── demo-frontend/   # React frontend
├── demo/            # Spring Boot backend

---

## How to Run

Backend:
1. Open project in IDE
2. Run DemoApplication.java
3. Runs on http://localhost:8080

Frontend:
cd demo-frontend
npm install
npm run dev

Runs on http://localhost:5173

---

## API Endpoints

Authentication:
POST /login
POST /signup

Complaints:
POST /complaints
GET /complaints/{userId}
GET /all-complaints
PUT /complaints/{id}

---

## Workflow

- User logs in
- Student submits complaint
- Admin reviews complaints
- Admin updates status
- Student tracks complaint

---

## Author

Sudheesh Kumar  
GitHub: https://github.com/Annadasu-Sudheesh
