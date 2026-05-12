<div align="center">

# 🏭 CADMech Full Stack Developer Assessment

### SmartLab Equipment Manager

**Technical Round 1** — Full Stack Development Assessment  
**Company:** Cadmech Engineering Pvt. Ltd., Pune  
**Role:** Full Stack Developer (1–3 years experience)

---

</div>

## 📋 About This Assessment

Build a **SmartLab Equipment Manager** — a full-stack web application that helps lab administrators manage laboratory equipment, monitor sensor health, and make data-driven maintenance decisions.

This assessment is designed in **3 tiers of increasing complexity**. Tier 1 is mandatory. Tiers 2 and 3 test your engineering depth, debugging skills, and problem-solving attitude.

> **⏰ Time Limit:** 7 days from the date you receive this assessment.  
> **🤖 AI Usage:** Allowed and encouraged — but you **must understand every line** of your code. You will be asked to explain it.

---

## 🎯 Assessment Structure

```
┌─────────────────────────────────────────────────────────┐
│  TIER 3: Innovation & Attitude (25 points)              │
│  Real-time IoT simulation, health scoring,              │
│  creative features, engineering decisions                │
├─────────────────────────────────────────────────────────┤
│  TIER 2: Engineering Challenges (35 points)             │
│  Bug fixing, CSV import with messy data,                │
│  data visualization, search optimization                │
├─────────────────────────────────────────────────────────┤
│  TIER 1: Foundation — MANDATORY (40 points)             │
│  Full CRUD, REST API, database, responsive UI,          │
│  deployment                                             │
└─────────────────────────────────────────────────────────┘
```

> ⚠️ **You must complete Tier 1 to pass.** Tiers 2 and 3 differentiate strong candidates from exceptional ones.

---

## 🔧 Tier 1: Foundation (40 points) — MANDATORY

Build a complete equipment management system with these features:

### Core Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Dashboard** | Summary cards: total equipment, active count, under maintenance, decommissioned |
| 2 | **Equipment List** | Table/grid showing all equipment with details |
| 3 | **Add Equipment** | Form with validation (name, type, status, location, serial number, description) |
| 4 | **Edit Equipment** | Pre-filled form, update functionality |
| 5 | **Delete Equipment** | Confirmation dialog before deletion |
| 6 | **Search & Filter** | Search by name + filter by type and/or status |
| 7 | **Responsive Design** | Works on desktop (1920px) and mobile (375px) |

### Equipment Types

`CNC Machine` · `IoT Sensor` · `Automation Trainer` · `PLC Module` · `Hydraulic System` · `Pneumatic System` · `Electrical Panel`

### Equipment Status

- ✅ **Active** — Currently operational
- 🔧 **Under Maintenance** — Temporarily offline
- ❌ **Decommissioned** — No longer in use

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/equipment` | List all (supports `?search=`, `?type=`, `?status=`) |
| `GET` | `/api/equipment/:id` | Get single item |
| `POST` | `/api/equipment` | Create new (validate required fields) |
| `PUT` | `/api/equipment/:id` | Update existing |
| `DELETE` | `/api/equipment/:id` | Delete item |
| `GET` | `/api/stats` | Dashboard statistics |

---

## 🐛 Tier 2: Engineering Challenges (35 points)

### Challenge 2A: Bug Fixing (10 points)

We've provided a utility file at `backend/utils/dataParser.js`. This module is used to parse and validate equipment data from external sources.

**It has 3 intentional bugs.** Your job is to:

1. **Find all 3 bugs** by reading the code and testing it
2. **Fix them** so the utility works correctly
3. **Document each bug** — what was wrong, why it was wrong, and how you fixed it

Create a file called `BUG-FIXES.md` in the project root documenting your fixes.

> 💡 The bugs are realistic mistakes that happen in production codebases. Finding them tests your debugging mindset.

### Challenge 2B: CSV Data Import (10 points)

We've provided a CSV file at `data/equipment-import.csv` containing equipment records from a legacy system.

**The data is messy.** It contains:
- Missing required fields
- Duplicate serial numbers
- Inconsistent casing (`active` vs `Active` vs `ACTIVE`)
- Extra whitespace and formatting issues
- Dates in mixed formats
- Invalid equipment types
- Some corrupted rows

Build an **import feature** that:

1. Accepts the CSV file (via upload or API endpoint)
2. Parses and validates each row
3. Cleans/normalizes the data (fix casing, trim whitespace, standardize dates)
4. Imports valid records into the database
5. Returns a detailed **import report** showing:
   - ✅ Successfully imported rows
   - ⚠️ Rows that were fixed/normalized (with what was fixed)
   - ❌ Rejected rows (with reason)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/equipment/import` | Upload CSV file and import |

> This tests how you handle **real-world dirty data** — a daily reality in production systems.

### Challenge 2C: Data Visualization (10 points)

Transform the dashboard from simple number cards into meaningful visualizations:

1. **Equipment by Type** — Bar chart or pie chart showing count per type
2. **Status Distribution** — Visual breakdown of Active / Maintenance / Decommissioned
3. **Timeline** — When equipment was installed over time (line chart or area chart)
4. **Recent Activity** — Last 10 additions/modifications

Use any charting library (Chart.js, Recharts, D3, etc.) or build your own with SVG/Canvas.

### Challenge 2D: Smart Search (5 points)

Implement search with:
- **Debouncing** — Don't fire API calls on every keystroke
- **Highlight matching text** in search results
- **Search across multiple fields** (name, type, location, serial number)
- **Empty state** with helpful message when no results found

---

## 🚀 Tier 3: Innovation & Attitude (25 points)

> This tier has intentionally **open-ended requirements**. How you interpret and implement them reveals your engineering judgment and initiative.

### Challenge 3A: IoT Sensor Simulation (10 points)

Each equipment item has sensors that report health data. We've provided sample sensor data at `data/sensor-readings.json`.

Build a feature that:

1. **Simulates real-time sensor data** — Use WebSocket, SSE, or polling to stream sensor readings to the frontend
2. **Displays sensor data** for each equipment item (temperature, vibration, power consumption)
3. **Shows live updating values** on the equipment detail page

The `sensor-readings.json` file contains the data format. Your backend should simulate generating new readings at regular intervals based on this format.

### Challenge 3B: Equipment Health Score (8 points)

Design and implement an **equipment health scoring algorithm** (0–100 score) based on:

- Sensor readings (are values within normal ranges?)
- Equipment age (calculated from `installed_date`)
- Maintenance history (how often has status changed to "Under Maintenance"?)
- Current status

**We are NOT giving you the formula.** You must:
1. Design your own health scoring algorithm
2. Document your logic and reasoning in a `HEALTH-SCORE.md` file
3. Display health scores on the dashboard and equipment list
4. Use color coding (green = healthy, yellow = warning, red = critical)

> This tests your ability to **design solutions for ambiguous requirements** — a core skill in product development.

### Challenge 3C: Your Innovation (7 points)

Build **one feature of your choice** that you think would add genuine value to a lab equipment management system. It should demonstrate:

- Engineering thinking (not just UI polish)
- Understanding of the problem domain (lab management, training systems)
- Technical depth

**Examples** (you can use these or come up with your own):
- Maintenance scheduling with calendar view
- Equipment QR code generation for physical tagging
- Predictive maintenance alerts based on sensor trends
- Equipment comparison tool
- Audit trail / activity log with user actions
- PDF report generation
- Role-based access control

Document your feature and reasoning in `SUBMISSION.md`.

---

## 🛠️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Frontend** | React.js (Vite) | Starter provided in `/frontend` |
| **Backend** | Node.js + Express | Starter provided in `/backend` |
| **Database** | MySQL / PostgreSQL / SQLite | Your choice. Schema in `/backend/db/schema.sql` |
| **Deployment** | GitHub Pages + Render/Railway | Free tier acceptable |

---

## 📁 Project Structure

```
├── frontend/               # React + Vite starter
│   ├── src/
│   │   ├── App.jsx         # Start here
│   │   └── components/     # Your components
│   └── package.json
│
├── backend/                # Node.js + Express starter
│   ├── server.js           # Entry point
│   ├── routes/api.js       # API routes (scaffolded)
│   ├── utils/
│   │   └── dataParser.js   # ⚠️ HAS 3 BUGS — Fix these (Tier 2A)
│   ├── db/schema.sql       # Database schema
│   └── package.json
│
├── data/                   # Challenge data files
│   ├── equipment-import.csv    # Messy CSV for import (Tier 2B)
│   └── sensor-readings.json   # IoT sensor data (Tier 3A)
│
├── BUG-FIXES.md            # ← Create this: Document your bug fixes
├── HEALTH-SCORE.md         # ← Create this: Document your health score algorithm
├── SUBMISSION.md           # ← Fill this before submitting
└── GITHUB-WORKFLOW-GUIDE.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ · Git · GitHub account · SQL database (SQLite is easiest)

### Setup

```bash
# 1. Fork this repo, then clone your fork
git clone https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment.git
cd cadmech-fullstack-assessment

# 2. Start frontend
cd frontend && npm install && npm run dev
# → http://localhost:5173

# 3. Start backend (in a new terminal)
cd backend && npm install && cp .env.example .env && node server.js
# → http://localhost:5000
```

### Deployment

- **Frontend →** GitHub Pages (see [GITHUB-WORKFLOW-GUIDE.md](./GITHUB-WORKFLOW-GUIDE.md))
- **Backend →** [Render](https://render.com) or [Railway](https://railway.app) (free tier)

---

## 📝 Submission Requirements

Reply to the assessment email with:

| # | Requirement |
|---|-------------|
| 1 | **GitHub Repository Link** — Your forked repo |
| 2 | **Live Frontend URL** — GitHub Pages |
| 3 | **Live Backend URL** — Render / Railway |
| 4 | **Completed SUBMISSION.md** |
| 5 | **BUG-FIXES.md** — If you attempted Tier 2A |
| 6 | **HEALTH-SCORE.md** — If you attempted Tier 3B |

---

## ⚖️ Evaluation Criteria

| Tier | Category | Points |
|------|----------|--------|
| **Tier 1** | CRUD Functionality | 15 |
| **Tier 1** | API Design & Error Handling | 10 |
| **Tier 1** | UI/UX & Responsive Design | 10 |
| **Tier 1** | Deployment (FE + BE live) | 5 |
| **Tier 2** | Bug Fixing + Documentation | 10 |
| **Tier 2** | CSV Import (edge case handling) | 10 |
| **Tier 2** | Data Visualization | 10 |
| **Tier 2** | Smart Search | 5 |
| **Tier 3** | IoT Simulation | 10 |
| **Tier 3** | Health Score Algorithm | 8 |
| **Tier 3** | Innovation Feature | 7 |
| | **Total** | **100** |

### What We're Really Testing

Beyond code, we evaluate:

- 🧠 **Problem-solving** — How do you approach bugs and messy data?
- 📐 **Engineering judgment** — How do you handle ambiguous requirements?
- 📝 **Communication** — Can you document your decisions clearly?
- 💪 **Persistence** — Did you attempt the hard parts or stop at Tier 1?
- 🔍 **Attention to detail** — Edge cases, error handling, validation
- 📈 **Growth mindset** — Your commit history tells a story

---

## ❓ Questions?

- **Email:** hr@cadmech.com
- **Response time:** Within 24 hours on business days
- For Tier 3's ambiguous requirements: **make your best judgment and document your reasoning.** There is no single right answer.

---

## ⏰ Deadline

**7 days** from the date you received the assessment email.  
Late submissions will not be evaluated.

---

<div align="center">

**Cadmech Engineering Pvt. Ltd.** — Transforming Engineering Education 🚀  
Pune, India

</div>
