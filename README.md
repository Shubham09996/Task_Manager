# MERN Stack Task Management App

A premium, modern task management web application built with the MERN stack and styled with Tailwind CSS.

## Features
- **User Authentication**: Secure registration and login using JWT.
- **Task Management**: Create, read, update, and delete tasks.
- **Kanban Board**: Drag and drop tasks between different status columns.
- **Analytics Dashboard**: Visual representations of productivity and completion rates using Recharts.
- **Dark Theme UI**: Premium glassmorphism design with responsive layouts.
- **Filtering & Search**: Quickly find and filter tasks by status, priority, and text search.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Recharts, @dnd-kit (for drag and drop), Lucide React (for icons).
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or a MongoDB URI for Atlas)

### Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (if not exists) and add:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/mern-task-app
   JWT_SECRET=your_super_secret_key_here
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open another terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Access the Application
Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## Project Structure
- `backend/` - Contains the Express server, Mongoose models, controllers, and routes following the MVC pattern.
- `frontend/` - Contains the Vite React application, organized into components, pages, context providers, and API utilities.
