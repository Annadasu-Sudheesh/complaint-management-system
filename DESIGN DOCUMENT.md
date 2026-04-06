# 📄 DESIGN DOCUMENT

## Title
Smart Complaint Management System

## 1. Introduction
The Smart Complaint Management System is a full-stack web application designed to streamline the process of registering, tracking, and resolving complaints within an organization or university. It enables students to submit complaints and allows administrators to manage and resolve them efficiently.

## 2. Objectives
- Provide a platform for users to submit complaints easily
- Enable administrators to monitor and resolve issues
- Ensure transparency through status tracking
- Implement role-based authentication (Student/Admin)

## 3. System Architecture
The system follows a 3-tier architecture:

Frontend:
- React JS for UI and user interaction

Backend:
- Spring Boot for REST APIs

Database:
- MySQL for storing users and complaints

## 4. Technologies Used

| Layer           | Technology         |
|----------------|------------------|
| Frontend       | React JS         |
| Backend        | Spring Boot      |
| Database       | MySQL            |
| API Testing    | Postman          |
| Version Control| Git & GitHub     |

## 5. Modules

User Module:
- Signup/Login
- Submit complaints
- View complaint history

Admin Module:
- View all complaints
- Update complaint status
- Resolve complaints

## 6. Functional Requirements
- User authentication
- Role-based access control
- Complaint submission
- Complaint tracking
- Admin dashboard
- Status updates

## 7. Database Design

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
- remark
- priority
- user_id

## 8. API Endpoints

Authentication:
- POST /login
- POST /signup

Complaints:
- POST /complaints
- GET /complaints/{userId}
- GET /all-complaints
- PUT /complaints/{id}

## 9. System Workflow
1. User logs in
2. Student submits complaint
3. Complaint stored in database
4. Admin views complaints
5. Admin updates status
6. User tracks status

## 10. Future Enhancements
- Profile management
- Notifications
- File upload
- Analytics dashboard

## 11. Conclusion
The system provides an efficient and scalable solution for complaint handling with role-based access and real-time updates.

--------------------------------------------------------------------------------

