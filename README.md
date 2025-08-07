# 🧠 CrowdSolve - A Collaborative Problem Solving Platform

CrowdSolve is a full-stack MERN application where users can post real-world problems and contribute solutions. It supports image uploads, commenting, upvoting, and a clean UI built with React + Tailwind CSS. The backend is built with Express.js and MongoDB, and images are hosted on Cloudinary.

##

## 🛠️ Tech Stack

### Frontend:
- React (with Vite)
- Tailwind CSS
- React Router
- Axios

### Backend:
- Node.js
- Express
- MongoDB + Mongoose
- Cloudinary (image hosting)
- Multer (file handling)
- JSON Web Token (JWT)

---

## 📁 Folder Structure
```
CrowdSolve/
├── backend/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/ # DB and Cloudinary config
│ ├── uploads/ # Optional (temp local storage)
│ ├── .env
│ └── server.js
├── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── index.html
├── README.md

```
---

## 🚀 Features

- ✅ User registration and login (JWT-based)
- ✅ Post real-world problems with image, location & tags
- ✅ Upload solution with image and text
- ✅ Comment on others' solutions
- ✅ Upvote solutions
- ✅ Responsive UI
- ✅ Image uploads handled via Cloudinary

---

## 🔐 Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Cloudinary account
- Vercel (for frontend deployment)
- Render (for backend deployment)

---

## ⚙️ Environment Variables

### 🔙 `/backend/.env`
```env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
```

## 🧩 Getting Started
### 🔙 Backend Setup

```bash
git clone https://github.com/singhaniya0411/CrowdSolve.git
cd backend
npm install
npm start
```
Server will run on http://localhost:5000.

### 🌐 Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
App will run on http://localhost:5173.

---


🧪 API Endpoints
- `GET /api/problem – List all problems`

- `POST /api/problem – Post a new problem`

- `GET /api/problem/:id – Get specific problem`

- `GET /api/solutions/:problemId – View solutions`

- `POST /api/solutions/:problemId – Submit solution`

- `POST /api/comments/:solutionId – Add comment`

- `GET /api/comments/:solutionId – Get all comments`

- `POST /api/solutions/:solutionId/upvote – Upvote a solution`


## 🤝 Contributing
Feel free to fork this project, create a new branch, and submit a pull request. Your contributions are welcome!

## 📄 License
This project is licensed under the MIT License.

## 🙋‍♂️ Author
Made with ❤️ by Vishal Singhaniya
