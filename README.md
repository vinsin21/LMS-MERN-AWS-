# Coders Gyan LMS Platform

**The Ultimate "One-Click" Ed-Tech Startup Solution.**

Coders Gyan LMS is a production-ready, full-stack Learning Management System (LMS) template designed to launch your educational platform in minutes. Built with a focus on scalability, performance, and user experience, it combines a fully customizable modern frontend with a robust, AWS-powered backend.

## 🚀 Why This Template?

*   **Production Ready**: Not just a prototype. This codebase is structured for real-world deployment.
*   **Scalable Architecture**: Built to handle growth, from your first student to your ten-thousandth.
*   **Modern Tech Stack**: Leveraging the latest and greatest in web development technologies.
*   **Video First**: Native support for high-quality video streaming, essential for modern courses.

## 🏗️ Architecture Overview

### 🎨 Frontend (Client)
*Located in `/frontend`*

A stunning, responsive, and highly interactive user interface built to engage students.

*   **Framework**: React 18 with TypeScript & Vite for blazing fast performance.
*   **Styling**: Tailwind CSS with a custom design system for easy branding.
*   **UI Components**: Radix UI & Lucide Icons for accessible and polished elements.
*   **Key Features**:
    *   **Immersive Course Player**: Distraction-free learning environment.
    *   **Student Dashboard**: Progress tracking, certificates, and profile management.
    *   **Marketing Pages**: Landing page, course catalog, and blog/articles support.
    *   **Responsive**: Perfect experience on Desktop, Tablet, and Mobile.

### ⚙️ Backend (Server)
*Located in `/backend`*

A powerful, secure, and scalable API server that powers the platform.

*   **Core**: Express.js (Node.js) REST API.
*   **Database**: MongoDB (Mongoose) for flexible and scalable data modeling.
*   **Cloud Infrastructure (AWS)**:
    *   **Video Streaming**: Built-in support for video processing and streaming (e.g., S3, CloudFront).
    *   **Storage**: Secure asset storage for course materials and user uploads.
*   **Security**: JWT Authentication, Role-Based Access Control (RBAC), and secure headers.

## ⚡ Quick Start

Get your platform running locally in minutes.

### Prerequisites
*   Node.js (v16+)
*   MongoDB (Local or Atlas URI)
*   AWS Account (for video/storage features)

### 1. Setup Backend
```bash
cd backend
npm install
# Configure your .env file (see backend/README.md)
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Your application should now be live!
*   Frontend: `http://localhost:5173`
*   Backend: `http://localhost:5000` (default)

## 🛠️ Customization

*   **Branding**: Easily change colors, fonts, and logos in `frontend/tailwind.config.js` and `frontend/index.css`.
*   **Content**: Manage courses, lessons, and users via the database or API.
*   **Features**: Modular code structure allows for easy addition of new features like quizzes, assignments, or community forums.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Accelerate your Ed-Tech journey with Coders Gyan.*
