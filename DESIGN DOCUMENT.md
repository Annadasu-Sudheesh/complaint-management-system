# 📄 DESIGN DOCUMENT

## Title

Smart Complaint Management System

## 1. Introduction

The Smart Complaint Management System is a full-stack web application designed to streamline the process of tracking, and resolving complaints within an organization or university. It enables students to submit complaints with optional file attachments and allows administrators to manage, prioritize, and resolve them efficiently with full tracking.

## 2. Objectives

- Provide an easy interface for users to submit complaints
- Allow file attachments as proof (images/documents)
- Enable administrators to manage complaints effectively
- Provide real-time status tracking (Pending → In Progress → Resolved)
- Ensure transparency with timestamps (created & resolved time)
- Implement role-based authentication (Student/Admin)

## 3. System Architecture

The system follows a 3-tier architecture:

Frontend:

- React JS for UI and user interaction
- Centralized API layer in `src/config/api.js` using an axios instance
- Backend base URL is loaded from `VITE_API_BASE_URL` (`.env`) for environment-specific deployments

Backend:

- Spring Boot for REST APIs and business logic

Database:

- H2 Database for storing users, complaints, and metadata

## 4. Technologies Used

| Layer           | Technology      |
| --------------- | --------------- |
| Frontend        | React JS (Vite) |
| Backend         | Spring Boot     |
| Database        | H2 Database     |
| API Testing     | Postman         |
| Version Control | Git & GitHub    |

## 5. Modules

### User Module:

- Login
- Submit complaint with file upload
- View complaint history
- View status, priority, remark
- View created and resolved time

### Admin Module:

- View all complaints
- Update complaint status (Pending → In Progress → Resolved)
- Set priority (Low, Medium, High)
- Add remarks for complaints
- View attached files
- Restrict updates after resolution

## 6. Functional Requirements

- Secure user authentication
- Role-based access control
- Complaint submission with file upload
- Complaint tracking system
- Admin dashboard with full control
- Status transitions control (no changes after resolved)
- Priority management
- Remark system
- Timestamp tracking (createdAt, resolvedAt)

## 7. Database Design

### User Table:

- id (Primary Key)
- name
- email
- password
- role (STUDENT / ADMIN)

### Complaint Table:

- id (Primary Key)
- title
- description
- status (Pending / In Progress / Resolved)
- remark
- priority (Low / Medium / High)
- file_path
- created_at
- resolved_at
- user_id (Foreign Key)

## 8. API Endpoints

### Authentication:

- POST /login
- POST /signup

### Complaints:

- POST /complaints (with file upload)
- GET /complaints/{userId}
- GET /all-complaints
- PUT /complaints/{id}

### Frontend API Integration Notes:

- Frontend uses `apiClient` from `src/config/api.js` for all HTTP requests
- `apiClient` uses `import.meta.env.VITE_API_BASE_URL` as axios `baseURL`
- Default fallback for local development is `http://localhost:8080`
- `getApiUrl(path)` is used for uploaded file URLs to keep base URL consistent

## 9. System Workflow

1. User logs in (Student/Admin)
2. Student submits complaint (with optional file)
3. Complaint is stored with:
   - status = Pending
   - priority = Low
   - createdAt timestamp
4. Admin views complaints dashboard
5. Admin updates:
   - status
   - priority
   - remark
6. When status = Resolved:
   - resolvedAt timestamp is stored
   - further changes are restricted
7. Student tracks complaint progress in dashboard

## 10. Features Implemented

- File upload system (proof attachment)
- Complaint status flow (Pending → In Progress → Resolved)
- Admin priority control
- Admin remarks system
- Created and resolved timestamps
- Role-based routing (Admin / Student)
- Protected routes (unauthorized access blocked)
- Dynamic UI updates (no reload required)
- File viewing via URL
- Status locking after resolution

## 11. Future Enhancements

- User profile management
- Email/SMS notifications
- Complaint categorization
- Analytics dashboard (charts)
- Search and filtering system
- Mobile responsive UI improvements
- Real-time updates using WebSockets

## 12. Validation Commands

Frontend validation:

- `npm run build`
- `npm run lint`

Backend validation:

- `.\\mvnw.cmd test`

## 13. Conclusion

The Smart Complaint Management System provides a robust and scalable solution for managing complaints efficiently. With added features like file uploads, priority management, timestamps, and role-based access, the system ensures transparency, accountability, and improved resolution workflow.
