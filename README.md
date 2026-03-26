# 🛠️ Smart Operation Review Dashboard

> A full-stack production monitoring and issue management dashboard designed to track operational performance, log production data, and manage issues efficiently within an organization.

---

## 📌 Overview

The **Smart Operation Review Dashboard (SORD)** is a centralized platform built to help organizations manage daily operational data and monitor production activities in real time.

### What it does:
- 📋 Track and manage production logs
- 🐛 Record and resolve operational issues
- 📊 Monitor key performance indicators (KPIs)
- 📈 View analytics through an interactive dashboard
- 🔐 Authenticate users securely
- 🔌 Manage production data through RESTful APIs

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js (Vite), HTML5, CSS3, JavaScript (ES6) |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite |
| **Tools** | Git & GitHub, Postman |

---

## 🏗️ System Architecture

```
┌────────────────────┐
│        User        │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   React Frontend   │
│  (Vite + UI Pages) │
└─────────┬──────────┘
          │  HTTP API
          ▼
┌────────────────────┐
│  Node.js Backend   │
│  Express REST API  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│     SQLite DB      │
│ Production / Issues│
└────────────────────┘
```

The system follows a **three-tier architecture**:

1. **Presentation Layer** – React Frontend
2. **Application Layer** – Node.js + Express API
3. **Data Layer** – SQLite Database

---

## ✨ Key Features

- **🔐 User Authentication** — Secure login system using authentication middleware
- **📋 Production Log Management** — Create, update, and view production records
- **🐛 Issue Tracking** — Report and track operational issues across teams
- **📊 Dashboard Analytics** — Interactive dashboard displaying real-time operational data
- **🔌 RESTful APIs** — Structured backend APIs for seamless data communication
- **🧩 Modular Backend Architecture** — Organized with controllers, routes, services, and models

---

## 📁 Project Structure

```
Smart-Operation-Review-Dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── src/
│   └── server.js
│
├── postman/
│   └── SORD.postman_collection.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bharath395/Smart-Operation-Review-Dashboard.git
cd Smart-Operation-Review-Dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

> Backend runs on: **http://localhost:5000**

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on: **http://localhost:3000**

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/register` | Register new user |

### 🐛 Issues Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/issues` | Get all issues |
| `POST` | `/api/issues` | Create new issue |
| `PUT` | `/api/issues/:id` | Update issue |
| `DELETE` | `/api/issues/:id` | Delete issue |

### 📋 Production Logs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/production` | Get production logs |
| `POST` | `/api/production` | Add production entry |
| `PUT` | `/api/production/:id` | Update production record |

---

## 🧪 API Testing

A **Postman Collection** is included in the repository for easy API testing.

**Location:** `postman/SORD.postman_collection.json`

To use it:
1. Open Postman
2. Click **Import**
3. Select `SORD.postman_collection.json`
4. Run the requests against your local server

---

## 📸 Screenshots

> _Add your screenshots to a `/screenshots` folder and update the paths below._

| Page | Preview |
|------|---------|
| Login Page | `screenshots/login.png` |
| Dashboard | `screenshots/dashboard.png` |
| Issue Management | `screenshots/issues.png` |
| Production Logs | `screenshots/production.png` |

---

## 🔮 Future Enhancements

- [ ] Advanced analytics dashboard
- [ ] Role-based access control (RBAC)
- [ ] Email notifications
- [ ] Real-time monitoring using WebSockets
- [ ] Cloud deployment (AWS / Render / Vercel)

---

## 👤 Author

**Bharath A**  
Electronics and Communication Engineering  
Bannari Amman Institute of Technology

[![GitHub](https://img.shields.io/badge/GitHub-bharath395-181717?style=flat&logo=github)](https://github.com/bharath395)

---

## 📄 License

This project is developed for **educational and academic purposes**.
