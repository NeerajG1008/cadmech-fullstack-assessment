import { useState } from 'react'
import './App.css'

/**
 * SmartLab Equipment Manager — CADMech Assessment
 *
 * TODO: Build your solution here!
 *
 * Required Features:
 * 1. Dashboard with summary statistics
 * 2. Equipment list (table/grid view)
 * 3. Add new equipment (form)
 * 4. Edit equipment
 * 5. Delete equipment (with confirmation)
 * 6. Search & Filter (by name, type, status)
 * 7. Responsive design
 *
 * API Base URL (development): http://localhost:5000/api
 * API Base URL (production):  Replace with your deployed backend URL
 *
 * Hints:
 * - Create separate components in the /components folder
 * - Use fetch() or axios to communicate with the backend
 * - Consider using React Router for navigation (optional)
 * - Add loading states while fetching data
 */

// TODO: Update this to your deployed backend URL before deploying frontend
const API_BASE = '/api'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏭 SmartLab Equipment Manager</h1>
          <p className="subtitle">Cadmech Engineering Pvt. Ltd.</p>
        </div>
      </header>

      <main className="app-main">
        <section className="welcome-section">
          <div className="welcome-card">
            <h2>👋 Welcome, Developer!</h2>
            <p>
              This is your starting point. Replace this content with your
              SmartLab Equipment Manager implementation.
            </p>

            <div className="checklist">
              <h3>📋 Feature Checklist</h3>
              <ul>
                <li>⬜ Dashboard with summary stats</li>
                <li>⬜ Equipment list view</li>
                <li>⬜ Add new equipment</li>
                <li>⬜ Edit equipment</li>
                <li>⬜ Delete equipment</li>
                <li>⬜ Search &amp; Filter</li>
                <li>⬜ Responsive design</li>
              </ul>
            </div>

            <div className="api-status">
              <h3>🔌 Backend API Status</h3>
              <p>
                Make sure your backend is running at{' '}
                <code>http://localhost:5000</code>
              </p>
              <button
                className="check-btn"
                onClick={async () => {
                  try {
                    const res = await fetch(`${API_BASE}/health`)
                    const data = await res.json()
                    alert(`✅ Backend is running! Status: ${data.status}`)
                  } catch (err) {
                    alert('❌ Backend is not reachable. Make sure it is running on port 5000.')
                  }
                }}
              >
                Check Backend Connection
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          CADMech Full Stack Assessment &copy; {new Date().getFullYear()} —
          Cadmech Engineering Pvt. Ltd.
        </p>
      </footer>
    </div>
  )
}

export default App
