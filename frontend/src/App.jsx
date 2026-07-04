import { useState } from 'react'
import './App.css'
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast';

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

function App() {
  return (
    <>
      <Dashboard />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}

export default App
