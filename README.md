# 🌊 Flow - Task Management Application

![Flow Banner](https://img.shields.io/badge/Flow-Task_Manager-8b5cf6?style=for-the-badge&logo=react&logoColor=white)

Flow is a premium, highly responsive **Task Management Web Application** built on the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It is designed with modern glassmorphism aesthetics, smooth animations, and advanced functionality like drag-and-drop Kanban boards and interactive data visualization.

---

## ✨ Key Features

- **🔐 Secure Authentication:** User registration and login using JWT (JSON Web Tokens) with protected routes.
- **📱 Fully Responsive UI:** 100% mobile and tablet responsive design. Features a custom mobile hamburger menu overlay while maintaining a dual-pane layout on desktop.
- **📋 Advanced Task Management:** Full CRUD operations (Create, Read, Update, Delete) for tasks.
- **🎯 Drag & Drop Kanban Board:** Smooth, interactive Kanban board built with `@dnd-kit` to visually drag tasks between columns (Backlog, To Do, In Progress, In Review, Done).
- **📈 Dynamic Analytics Dashboard:** Visualizes weekly productivity, completion rates, and task distributions using Recharts (Pie, Bar, and Area charts).
- **🎨 Premium Aesthetics:** Dark mode by default, featuring custom glassmorphism components, gradients, and micro-animations via `framer-motion`.
- **🔔 Toast Notifications:** Real-time feedback for user actions via sleek, custom-styled toast alerts.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Custom glassmorphism theme)
- **Animations:** Framer Motion, LottieFiles
- **Drag & Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Security:** bcryptjs (Password Hashing), jsonwebtoken (Auth)
- **Middleware:** CORS, Express JSON

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### **1. Prerequisites**
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- Git

### **2. Clone the Repository**
```bash
git clone https://github.com/Shubham09996/Task_Manager.git
cd Task_Manager
```

---

### **3. Backend Setup**
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and configure the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

---

### **4. Frontend Setup**
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder to connect to your backend:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```

The application will now be running at `http://localhost:5173`.

---

## 🌍 Deployment

### **Frontend Deployment (Vercel/Netlify)**
1. Push your code to GitHub.
2. Import the repository into Vercel or Netlify.
3. Ensure the root directory is set to `frontend/`.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.
5. Deploy!

### **Backend Deployment (Render/Railway)**
1. Connect your GitHub repository to Render/Railway.
2. Set the root directory to `backend/`.
3. Set the build command to `npm install` and the start command to `node server.js`.
4. Add `MONGO_URI` and `JWT_SECRET` in the Environment Variables section.
5. Deploy! 

*(Note: The CORS settings in `backend/server.js` are pre-configured to accept requests from localhost and the deployed frontend URL).*

---

## 📂 Project Structure

\`\`\`text
Task_Manager/
├── backend/
│   ├── config/        # Database configuration
│   ├── controllers/   # API logic (auth, tasks)
│   ├── middleware/    # Auth and error handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express API routes
│   └── server.js      # Entry point
│
└── frontend/
    ├── public/        # Static assets (Favicon)
    ├── src/
    │   ├── api/       # Axios configuration
    │   ├── components/# Reusable UI (Navbar, Sidebar, TaskBoard)
    │   ├── context/   # React Context (Auth, Tasks)
    │   ├── pages/     # Main Views (Login, Dashboard, Analytics)
    │   ├── App.jsx    # Router Setup
    │   └── index.css  # Global styles & Tailwind
    ├── package.json
    └── vite.config.js
\`\`\`

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Shubham09996/Task_Manager/issues).

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
