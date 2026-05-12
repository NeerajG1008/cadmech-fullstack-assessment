# 📘 GitHub Workflow Guide

> Step-by-step instructions for forking, developing, committing, and deploying your assessment.

---

## Table of Contents

1. [Fork the Repository](#1-fork-the-repository)
2. [Clone Your Fork](#2-clone-your-fork)
3. [Set Up the Project](#3-set-up-the-project)
4. [Development Workflow](#4-development-workflow)
5. [Commit Best Practices](#5-commit-best-practices)
6. [Deploy Frontend to GitHub Pages](#6-deploy-frontend-to-github-pages)
7. [Deploy Backend to Render](#7-deploy-backend-to-render)
8. [Final Submission](#8-final-submission)

---

## 1. Fork the Repository

1. Go to the assessment repo:  
   **https://github.com/CAD-Mech-Engineering-Pvt-Ltd/cadmech-fullstack-assessment**

2. Click the **"Fork"** button (top-right corner)

3. Keep the default settings and click **"Create fork"**

4. You now have your own copy at:  
   `https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment`

> ⚠️ **Do NOT clone the original repo directly.** You must fork it first so you have your own copy to push changes to.

---

## 2. Clone Your Fork

Open your terminal and run:

```bash
# Clone your forked repo (replace YOUR-USERNAME)
git clone https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment.git

# Navigate into the project
cd cadmech-fullstack-assessment
```

Verify the remote is set to your fork:

```bash
git remote -v
# Should show:
# origin  https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment.git (fetch)
# origin  https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment.git (push)
```

---

## 3. Set Up the Project

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser. You should see the starter page.

### Backend Setup

```bash
cd backend
npm install

# Create your environment file
cp .env.example .env

# Edit .env with your database credentials
# For SQLite, you can use the default settings — no extra setup needed

node server.js
```

Open **http://localhost:5000/api/health** in your browser. You should see `{ "status": "ok" }`.

---

## 4. Development Workflow

### Recommended Approach

1. **Start with the backend** — Set up database, create API endpoints
2. **Then build the frontend** — Create components, connect to API
3. **Test everything locally** — Make sure both work together
4. **Deploy** — Push to production
5. **Fill SUBMISSION.md** — Document everything

### Running Both Simultaneously

Open **two terminal windows**:

**Terminal 1 — Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 — Backend:**
```bash
cd backend
node server.js
```

> 💡 **Tip:** Use `nodemon` for auto-restarting the backend:
> ```bash
> npm install -g nodemon
> nodemon server.js
> ```

---

## 5. Commit Best Practices

Make **small, meaningful commits** as you build. This shows your development process.

### Good Commit Messages

```bash
# ✅ Good — Descriptive and specific
git commit -m "feat: add equipment list component with table view"
git commit -m "feat: implement POST /api/equipment endpoint"
git commit -m "fix: resolve CORS issue for frontend-backend communication"
git commit -m "style: add responsive layout for mobile screens"
git commit -m "docs: update SUBMISSION.md with deployment links"

# ❌ Bad — Vague and unhelpful
git commit -m "update"
git commit -m "fix stuff"
git commit -m "wip"
```

### Commit Workflow

```bash
# Check what's changed
git status

# Stage specific files
git add frontend/src/components/EquipmentList.jsx
git add backend/routes/api.js

# Or stage everything
git add .

# Commit with a message
git commit -m "feat: implement equipment CRUD operations"

# Push to your fork
git push origin main
```

### Recommended Commit Frequency

Aim for **at least 10–15 commits** showing progressive development. We review your commit history.

---

## 6. Deploy Frontend to GitHub Pages

### Step 6.1 — Update `vite.config.js`

Edit `frontend/vite.config.js` to set the base path:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cadmech-fullstack-assessment/',  // ← Add this line
})
```

### Step 6.2 — Update API Base URL

In your frontend code, make sure your API calls point to your deployed backend URL (not `localhost`):

```javascript
// Use environment variable or direct URL
const API_BASE = 'https://your-backend-url.onrender.com/api';

// Example API call
const response = await fetch(`${API_BASE}/equipment`);
```

### Step 6.3 — Build the Frontend

```bash
cd frontend
npm run build
```

This creates a `dist/` folder with your production build.

### Step 6.4 — Deploy Using `gh-pages` Package

```bash
# Install gh-pages
npm install --save-dev gh-pages
```

Add these scripts to `frontend/package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Run the deploy:

```bash
npm run deploy
```

### Step 6.5 — Enable GitHub Pages

1. Go to your fork on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **"Deploy from a branch"**
4. Select the **`gh-pages`** branch and **`/ (root)`** folder
5. Click **Save**
6. Wait 2–3 minutes for deployment

Your frontend will be live at:  
**`https://YOUR-USERNAME.github.io/cadmech-fullstack-assessment/`**

---

## 7. Deploy Backend to Render

[Render](https://render.com) offers a free tier for web services — perfect for this assessment.

### Step 7.1 — Prepare Backend for Deployment

Make sure your `backend/package.json` has a start script:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Make sure your server listens on the correct port:

```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 7.2 — Deploy to Render

1. Go to [render.com](https://render.com) and sign up with your GitHub account
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository (your fork)
4. Configure:
   - **Name:** `cadmech-assessment-api` (or any name)
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables from your `.env` file
6. Select **Free tier**
7. Click **"Create Web Service"**

Your backend will be live at:  
**`https://cadmech-assessment-api.onrender.com`**

> ⚠️ **Note:** Render's free tier spins down after 15 minutes of inactivity. The first request after inactivity may take 30–60 seconds. This is expected and acceptable for this assessment.

### Alternative: Railway

If you prefer [Railway](https://railway.app):

1. Sign up at [railway.app](https://railway.app) with GitHub
2. Click **"New Project"** → **"Deploy from GitHub Repo"**
3. Select your forked repo
4. Set the **Root Directory** to `backend`
5. Add environment variables
6. Railway auto-detects Node.js and deploys

---

## 8. Final Submission

### Checklist Before Submitting

- [ ] All core features are working
- [ ] Frontend is deployed and accessible on GitHub Pages
- [ ] Backend is deployed and accessible on Render/Railway
- [ ] Frontend successfully communicates with the deployed backend
- [ ] `SUBMISSION.md` is completely filled out
- [ ] All code is pushed to your fork
- [ ] Commit history shows progressive development (10+ commits)

### Submit by Email

Reply to the assessment email with:

```
Subject: Assessment Submission — [Your Full Name]

Hi,

Please find my assessment submission below:

📦 GitHub Repo: https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment
🌐 Frontend (Live): https://YOUR-USERNAME.github.io/cadmech-fullstack-assessment/
🖥️ Backend (Live): https://your-backend-url.onrender.com

Thank you for the opportunity. Looking forward to hearing from you.

Best regards,
[Your Full Name]
[Your Phone Number]
```

---

## ❓ Troubleshooting

### GitHub Pages shows 404
- Make sure the `gh-pages` branch exists (check repo branches)
- Verify GitHub Pages settings point to `gh-pages` branch
- Wait 2–3 minutes after deploy — it takes time to propagate

### CORS errors in browser
- Make sure your backend has CORS enabled:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```

### Backend not responding on Render
- Check the **Logs** tab in Render dashboard
- Verify environment variables are set correctly
- Make sure the start command is `node server.js`

### API calls fail after deployment
- Update your frontend API base URL to use the deployed backend URL, not `localhost`
- Verify the backend is running by visiting `https://your-backend-url.onrender.com/api/health`

---

> 💡 **Pro Tip:** Test your deployed links in an **incognito/private browser window** to make sure they work for someone who isn't logged into your accounts.
