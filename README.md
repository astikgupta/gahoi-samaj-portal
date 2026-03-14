# Gahoi Samaj Connect

A full-stack modern community website designed to connect members of the Gahoi community. It features a member directory, a secure matrimonial platform for 18+ individuals, community event announcements, and an admin dashboard.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, React Router, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **File Uploads**: Multer & Cloudinary

## Quick Start Guide

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI
- Cloudinary account credentials

### 1. Setup Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Open `backend/.env` and update the placeholders (especially `MONGO_URI` and your Cloudinary keys if needed):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/gahoi_samaj_connect
   JWT_SECRET=gahoisamajconnectsecret1234
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### 2. Setup Frontend
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## Features
- **User Authentication**: Secure JWT-based registration and login.
- **Member Directory**: Search for community members by city/profession.
- **Matrimonial Platform (18+)**: Protected route requiring user to be 18 or older to access profiles.
- **Admin Dashboard**: Manage user approvals and view statistics.
- **Events & Gallery**: Stay updated with the latest community news.
