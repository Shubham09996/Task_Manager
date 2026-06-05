# Quantum - Task Management Web Application

A full-stack modern task management web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with a stunning, ultra-minimalist, high-performance UI.

## Features

- **Authentication**: Secure JWT-based User Registration and Login.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Kanban Board**: Drag-and-drop tasks between statuses (Backlog, To do, In progress, In review, Done).
- **Search & Filter**: Find tasks instantly by searching titles/descriptions or filtering by priority.
- **Pagination**: Handle large datasets efficiently with built-in frontend/backend pagination.
- **Analytics Dashboard**: Dynamic charts showing weekly productivity and completion rates based on real task data.
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for beautiful micro-animations and zero-latency interactions.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Router, Recharts, dnd-kit, Framer Motion, Axios.
- **Backend**: Node.js, Express.js, Mongoose, bcryptjs, jsonwebtoken, cors, dotenv.
- **Database**: MongoDB (Atlas).

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (or local MongoDB server)

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd Task_Manager
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory (optional, if you want to configure the API URL explicitly):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend will be accessible at `http://localhost:5173`*

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token
- `GET /api/auth/me` - Get current user profile

### Tasks
- `GET /api/tasks` - Get all tasks (supports `?page=`, `?limit=`, `?search=`, `?priority=`, `?status=`)
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/status` - Update task status (for drag-and-drop)
- `DELETE /api/tasks/:id` - Delete a task

## Deliverables Status

✅ Fully functional MERN application
✅ Secure authentication (JWT)
✅ Smooth CRUD operations & Drag-and-drop
✅ Clean, Professional, Ultra-minimal UI/UX
✅ Search, filter, and pagination
✅ README with setup instructions
