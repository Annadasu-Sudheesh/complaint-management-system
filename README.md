# 📘 README.md

## Title

Smart Complaint Management System

## 1. Introduction

The Smart Complaint Management System is a full-stack web application designed to streamline the process of tracking, and resolving complaints within an organization or university. It allows students to submit complaints with optional file attachments and enables administrators to manage, prioritize, and resolve them efficiently with full tracking.

## 2. Features

Student:

- Login
- Submit complaints with file upload
- View complaint history
- Track status (Pending, In Progress, Resolved)
- View priority and admin remarks
- View created and resolved dates

Admin:

- Secure login
- View all complaints
- Update status
- Set priority (Low, Medium, High)
- Add remarks
- View uploaded files
- Cannot modify once resolved

## 3. Technologies Used

Frontend:

- React JS (Vite)

Backend:

- Spring Boot (Java)

Database:

- H2 Database

Other Tools:

- Postman (API Testing)
- Git & GitHub (Version Control)

## 4. Project Structure

solo_project/

- demo-frontend/ (React frontend)
- demo-backend/demo/ (Spring Boot backend)

## 5. How to Run

Backend:

1. Open project in IDE
2. Run DemoApplication.java
3. Runs on http://localhost:8080

Frontend:

1. Open terminal
2. cd demo-frontend
3. npm install
4. npm run dev
5. Runs on http://localhost:5173

Frontend environment:

1. Create a `.env` file inside `demo-frontend`
2. Set `VITE_API_BASE_URL=http://localhost:8080` for local development
3. Override that value in your deployment environment so the built frontend points to the correct backend URL

Frontend API configuration:

- All frontend API calls use a shared axios client in `demo-frontend/src/config/api.js`
- `apiClient` uses `import.meta.env.VITE_API_BASE_URL` as the backend base URL
- If the env variable is not set, fallback is `http://localhost:8080`
- File links are generated through `getApiUrl(...)` so uploads also respect the same backend base URL

## 6. API Endpoints

Authentication:

- POST /login
- POST /signup

Complaints:

- POST /complaints (with file upload)
- GET /complaints/{userId}
- GET /all-complaints
- PUT /complaints/{id}

## 7. Workflow

1. User logs in (Student/Admin)
2. Student submits complaint (with optional file)
3. Complaint is stored with:
   - status = Pending
   - priority = Low
   - createdAt timestamp
4. Admin views complaints
5. Admin updates:
   - status
   - priority
   - remark
6. When complaint is resolved:
   - resolvedAt timestamp is saved
   - further updates are restricted
7. Student tracks complaint progress

## 8. Database Design

User Table:

- id
- name
- email
- password
- role

Complaint Table:

- id
- title
- description
- status
- priority
- remark
- file_path
- created_at
- resolved_at
- user_id

## 9. Features Implemented

- File upload system
- Complaint status flow
- Admin priority control
- Admin remark system
- Created and resolved timestamps
- Role-based access
- Protected routes
- Dynamic UI updates
- File viewing system
- Status locking after resolution

## 10. Future Enhancements

- Profile management
- Notifications (Email/SMS)
- Complaint categories
- Analytics dashboard
- Search and filters
- Dark mode UI
- Real-time updates

## 11. Testing

Frontend:

1. Open terminal
2. cd demo-frontend
3. npm run build
4. npm run lint

Backend:

1. Open terminal
2. cd demo-backend/demo
3. .\\mvnw.cmd test

## 12. Author

Sudheesh Annadasu
GitHub: https://github.com/Annadasu-Sudheesh

## 13. Conclusion

This system provides an efficient and scalable solution for complaint handling with modern features like file uploads, priority management, timestamps, and role-based access, ensuring transparency and improved workflow.
