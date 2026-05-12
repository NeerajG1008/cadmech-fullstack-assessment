<div align="center">

# 🏭 CADMech Full Stack Developer Assessment

### SmartLab Equipment Manager

**Technical Round 1** — Full Stack Development Assessment  
**Company:** Cadmech Engineering Pvt. Ltd., Pune  
**Role:** Full Stack Developer (1–3 years experience)

---

</div>

## 📋 About This Assessment

Build a **SmartLab Equipment Manager** — a full-stack web application that allows lab administrators to manage laboratory equipment inventory. This simulates a real-world feature from Cadmech's SmartLab platform.

> **⏰ Time Limit:** 5 days from the date you receive this assessment.

---

## 🎯 Problem Statement

Cadmech manages hundreds of lab equipment items across training centers — CNC machines, IoT sensors, automation trainers, and more. You need to build a web application that helps administrators **track and manage** this equipment.

### Core Features (Required)

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Dashboard** | Summary cards showing total equipment, active count, under maintenance count, decommissioned count |
| 2 | **Equipment List** | Table or grid view of all equipment with key details |
| 3 | **Add Equipment** | Form to add new equipment (name, type, status, location, serial number, description) |
| 4 | **Edit Equipment** | Ability to update any equipment's details |
| 5 | **Delete Equipment** | Remove equipment with a confirmation dialog |
| 6 | **Search & Filter** | Search by name, filter by type and/or status |
| 7 | **Responsive Design** | Must work on both desktop and mobile screens |

### Equipment Types

Use these categories for the `type` field:

- 🔧 CNC Machine
- 📡 IoT Sensor
- ⚡ Automation Trainer
- 🖥️ PLC Module
- 💧 Hydraulic System
- 💨 Pneumatic System
- ⚡ Electrical Panel

### Equipment Status

- ✅ **Active** — Currently operational
- 🔧 **Under Maintenance** — Temporarily offline for repairs
- ❌ **Decommissioned** — No longer in use

### Bonus Features (Optional — earns extra points)

- Pagination for equipment list
- Sorting by columns (name, date, status)
- Dark / Light mode toggle
- Export equipment list to CSV
- Bulk status update (select multiple → change status)
- Activity log (track when equipment was added/edited/deleted)
- Form validation with helpful error messages
- Loading states and skeleton screens

---

## 🛠️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Frontend** | React.js (Vite) | Starter code provided in `/frontend` |
| **Backend** | Node.js + Express | Starter code provided in `/backend` |
| **Database** | MySQL / PostgreSQL / SQLite | Your choice. Schema provided in `/backend/db/schema.sql` |
| **Deployment** | GitHub Pages (frontend) + Render or Railway (backend) | Free tier is perfectly fine |

> **🤖 AI Usage:** You are **encouraged** to use AI tools (ChatGPT, GitHub Copilot, etc.).  
> However, you **must understand every line of code** you write. You will be asked to explain your implementation decisions in the follow-up interview.

---

## 📁 Project Structure

```
├── frontend/               # React + Vite starter
│   ├── src/
│   │   ├── App.jsx         # Main component — start here
│   │   ├── components/     # Add your components here
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── backend/                # Node.js + Express starter
│   ├── server.js           # Entry point — start here
│   ├── routes/
│   │   └── api.js          # API route scaffolding
│   ├── db/
│   │   └── schema.sql      # Database schema
│   ├── .env.example
│   └── package.json
│
├── SUBMISSION.md            # ⚠️ FILL THIS before submitting
└── GITHUB-WORKFLOW-GUIDE.md # Step-by-step deployment guide
```

---

## 🔌 API Endpoints (Expected)

Your backend should implement these REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/equipment` | Get all equipment (supports `?search=`, `?type=`, `?status=` query params) |
| `GET` | `/api/equipment/:id` | Get a single equipment item by ID |
| `POST` | `/api/equipment` | Create new equipment |
| `PUT` | `/api/equipment/:id` | Update an existing equipment item |
| `DELETE` | `/api/equipment/:id` | Delete an equipment item |
| `GET` | `/api/stats` | Get dashboard statistics (counts by status) |

### Example Request/Response

**POST** `/api/equipment`
```json
{
  "name": "CNC Lathe Trainer V2",
  "type": "CNC Machine",
  "status": "Active",
  "location": "Lab 3 - Building A",
  "serial_number": "CNC-2024-0042",
  "description": "CNC lathe training unit for undergraduate lab sessions"
}
```

**Response** `201 Created`
```json
{
  "id": 1,
  "name": "CNC Lathe Trainer V2",
  "type": "CNC Machine",
  "status": "Active",
  "location": "Lab 3 - Building A",
  "serial_number": "CNC-2024-0042",
  "description": "CNC lathe training unit for undergraduate lab sessions",
  "installed_date": "2024-01-15",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **Git** installed ([Download](https://git-scm.com/))
- **GitHub account**
- **Any SQL database** — MySQL, PostgreSQL, or SQLite (SQLite is easiest to get started)

### Step 1: Fork This Repository

Click the **"Fork"** button at the top-right of this page to create your own copy.

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment.git
cd cadmech-fullstack-assessment
```

### Step 3: Set Up Frontend

```bash
cd frontend
npm install
npm run dev
# Frontend will start at http://localhost:5173
```

### Step 4: Set Up Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
node server.js
# Backend will start at http://localhost:5000
```

### Step 5: Build Your Solution

Implement all **7 core features** listed above. Refer to the API endpoints table for your backend routes.

### Step 6: Deploy

- **Frontend →** Deploy to GitHub Pages (see [GITHUB-WORKFLOW-GUIDE.md](./GITHUB-WORKFLOW-GUIDE.md))
- **Backend →** Deploy to [Render](https://render.com) or [Railway](https://railway.app) (free tier)

### Step 7: Submit

1. Fill out **`SUBMISSION.md`** with all required links and details
2. Push all your code to your forked repository
3. **Reply to the assessment email** with your submission details

---

## 📝 Submission Requirements

You **must** provide all of the following:

| # | Requirement | How |
|---|-------------|-----|
| 1 | **GitHub Repository Link** | Your forked repo with all code |
| 2 | **Live Frontend URL** | Deployed on GitHub Pages |
| 3 | **Live Backend URL** | Deployed on Render / Railway |
| 4 | **Completed SUBMISSION.md** | Fill the template in your repo |

---

## ⚖️ Evaluation Criteria

| Category | Weight | What We Look For |
|----------|--------|------------------|
| **Functionality** | 30% | All core features working correctly |
| **Code Quality** | 25% | Clean, readable, well-structured code |
| **UI/UX Design** | 15% | Professional look, responsive layout, good user experience |
| **API Design** | 15% | RESTful conventions, error handling, proper HTTP status codes |
| **Deployment** | 10% | Both frontend and backend successfully deployed and accessible |
| **Bonus Features** | 5% | Extra features from the bonus list |

---

## ❓ Questions?

If you have any questions about the assessment:

- **Email:** hr@cadmech.com
- **Response time:** Within 24 hours on business days

> Please **do not** reach out for help with code implementation — this is an assessment of your independent problem-solving ability.

---

## ⏰ Deadline

**5 days** from the date you received the assessment email.  
Late submissions will **not** be evaluated.

---

<div align="center">

**Cadmech Engineering Pvt. Ltd.** — Transforming Engineering Education 🚀  
Pune, India

</div>
