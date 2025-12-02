# Full Stack Chat Application

A modern, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. This application features instant messaging, user authentication, profile management, and media sharing in a responsive and beautiful interface.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.io.
- **User Authentication**: Secure signup and login functionality with JWT.
- **Profile Management**: Users can update their profile details, including avatar and cover photos.
- **Media Sharing**: Support for sending images in chats, powered by Cloudinary.
- **Online Status**: Real-time indicators for user online/offline status.
- **Responsive Design**: Fully responsive UI built with TailwindCSS and DaisyUI, working seamlessly on desktop and mobile.
- **State Management**: Efficient global state management using Zustand.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: TailwindCSS, DaisyUI, Chakra UI
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React, React Icons
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **File Storage**: Cloudinary (via Multer)
- **Validation**: Joi

## 📂 Project Structure

```
chat-App-Project-1/
├── Backend/            # Node.js/Express backend API and Socket.io server
├── client/             # React frontend application
├── PERFORMANCE_GUIDE.md # Detailed guide on performance optimization
└── package.json        # Root scripts for managing both frontend and backend
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string
- Cloudinary account for image storage

### 1. Clone the Repository
```bash
git clone https://github.com/Amro145/full-stack-chat-application.git
cd chat-App-Project-1
```

### 2. Install Dependencies
Install dependencies for both backend and frontend from the root directory:
```bash
npm install --prefix Backend
npm install --prefix client
```
Or simply run the build script which installs everything:
```bash
npm run build
```

### 3. Environment Variables

**Backend (`Backend/.env`):**
Create a `.env` file in the `Backend` directory with the following:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

**Client (`client/.env`):**
Create a `.env` file in the `client` directory (if needed for specific configs, though Vite uses `import.meta.env`):
```env
VITE_API_URL=http://localhost:5001
```

### 4. Run the Application

**Start the Backend:**
```bash
npm run start --prefix Backend
# or for development with nodemon
npm run dev --prefix Backend
```

**Start the Frontend:**
```bash
npm run dev --prefix client
```

## 📜 License

This project is licensed under the ISC License.
