import React, { useState } from 'react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [page, setPage] = useState('landing')
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'unknown',
      title: '⚠ Unknown Individual Detected',
      timestamp: new Date(Date.now() - 5 * 60000),
      accent: 'yellow',
      icon: '⚠️'
    },
    {
      id: 2,
      type: 'theft',
      title: '🚨 Possible Theft Detected',
      timestamp: new Date(Date.now() - 20 * 60000),
      accent: 'red',
      icon: '🚨'
    },
    {
      id: 3,
      type: 'delivery',
      title: '📦 Delivery Personnel Identified',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      accent: 'blue',
      icon: '📦'
    },
    {
      id: 4,
      type: 'night',
      title: '🌙 Late-Night Activity Detected',
      timestamp: new Date(Date.now() - 8 * 60 * 60000),
      accent: 'orange',
      icon: '🌙'
    },
    {
      id: 5,
      type: 'known',
      title: '✔ Known Resident Entry',
      timestamp: new Date(Date.now() - 12 * 60 * 60000),
      accent: 'green',
      icon: '✔️'
    }
  ])

  const addAlert = alert => {
    setAlerts(prev => [...prev, { id: prev.length + 1, timestamp: new Date(), ...alert }])
  }

  return (
    <div className="app-root">
      {page === 'landing' && (
        <Landing
          onEnter={() => setPage('dashboard')}
        />
      )}
      {page === 'dashboard' && (
        <Dashboard
          onBack={() => setPage('landing')}
          alerts={alerts}
          addAlert={addAlert}
        />
      )}
    </div>
  )
}
