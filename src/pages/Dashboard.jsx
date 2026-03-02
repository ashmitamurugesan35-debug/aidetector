import React, { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import AlertCenter from '../components/AlertCenter'
import LiveSurveillance from '../components/LiveSurveillance'
import PanicModal from '../components/PanicModal'
import Calendar from '../components/Calendar'
import SettingsPage from './SettingsPage'

export default function Dashboard({ onBack, alerts, addAlert }) {
  const [showPanic, setShowPanic] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  const cameras = ['Front Door','Backyard','Garage']
  const [selectedCamera, setSelectedCamera] = useState(cameras[0])
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date()
    return d.toISOString().slice(0,10)
  })
  const [showCalendar, setShowCalendar] = useState(false)

  // compute current time string and mode from PC clock
  const [timeString, setTimeString] = useState('')
  const [timeMode, setTimeMode] = useState('day')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const h24 = now.getHours()
      const h = h24 % 12 || 12
      const m = now.getMinutes().toString().padStart(2,'0')
      const ap = h24 >= 12 ? 'PM' : 'AM'
      setTimeString(`${h}:${m} ${ap}`)
      // determine mode
      if (h24 >= 6 && h24 < 12) setTimeMode('morning')
      else if (h24 >= 12 && h24 < 18) setTimeMode('day')
      else setTimeMode('night')
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])


  // determine high-alert state
  const highAlert = timeMode === 'night' && alerts.length > 0

  // toast message
  const [toast, setToast] = useState('')
  useEffect(() => {
    if (alerts.length === 0) return
    const last = alerts[alerts.length-1]
    const lastDate = last.timestamp?.toISOString().slice(0,10)
    if (last.type === 'unknown' && lastDate === selectedDate) {
      setToast('Unknown person detected!')
      const t = setTimeout(() => setToast(''), 4000)
      return () => clearTimeout(t)
    }
  }, [alerts, selectedDate])

  return (
    <div className="min-h-screen bg-bg text-white relative flex">
      <PanicModal show={showPanic} onClose={() => setShowPanic(false)} />
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      {/* left sidebar */}
      <aside className="w-56 bg-[#121722] p-6 flex flex-col gap-6">
        <div className="text-xl font-bold">Sentinel AI</div>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveView('live-monitoring')}
            className={`text-left py-2 px-3 rounded transition ${activeView === 'live-monitoring' ? 'bg-cyberblue/20 text-cyberblue' : 'hover:text-cyberblue'}`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Live Monitoring
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`text-left py-2 px-3 rounded transition ${activeView === 'dashboard' ? 'bg-cyberblue/20 text-cyberblue' : 'hover:text-cyberblue'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('live-camera')}
            className={`text-left py-2 px-3 rounded transition ${activeView === 'live-camera' ? 'bg-cyberblue/20 text-cyberblue' : 'hover:text-cyberblue'}`}
          >
            Live Camera
          </button>
          <button
            onClick={() => setActiveView('alerts')}
            className={`text-left py-2 px-3 rounded transition ${activeView === 'alerts' ? 'bg-cyberblue/20 text-cyberblue' : 'hover:text-cyberblue'}`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveView('activity-log')}
            className={`text-left py-2 px-3 rounded transition ${activeView === 'activity-log' ? 'bg-cyberblue/20 text-cyberblue' : 'hover:text-cyberblue'}`}
          >
            Activity Log
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`text-left py-2 px-3 rounded transition ${activeView === 'settings' ? 'bg-cyberblue/20 text-cyberblue' : 'hover:text-cyberblue'}`}
          >
            Settings
          </button>
        </nav>
        <button
          onClick={onBack}
          className="mt-auto text-sm text-white/50 hover:text-white transition"
        >
          Back to Landing
        </button>
      </aside>

      {/* main content */}
      <main className="flex-1 flex flex-col">
        {/* top bar */}
        <header className="flex justify-between items-center px-6 py-4 bg-[#0D111B] border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="text-green-400">● ACTIVE</span>
            <span className="text-sm">{timeString}</span>
            <span className="text-sm capitalize">{activeView.replace('-', ' ')}</span>
          </div>
          {activeView !== 'settings' && activeView !== 'live-monitoring' && (
            <div className="relative flex items-center gap-2">
              <label className="text-sm">Date:</label>
              <input
                type="text"
                readOnly
                className="bg-bg/20 border border-white/30 rounded px-2 py-1 text-sm cursor-pointer"
                value={selectedDate}
                onClick={() => setShowCalendar(true)}
              />
              {showCalendar && (
                <Calendar
                  selectedDate={selectedDate}
                  onSelect={date => { setSelectedDate(date); setShowCalendar(false) }}
                />
              )}
            </div>
          )}
        </header>

        {/* Live Monitoring View */}
        {activeView === 'live-monitoring' && (
          <LiveSurveillance alerts={alerts} />
        )}

        {/* Dashboard View */}
        {activeView === 'dashboard' && (
          <div className="flex flex-1">
            <section className="flex-1 p-6">
              <div className="mb-4 flex items-center gap-4">
                <label className="text-sm">Camera:</label>
                <select
                  className="bg-bg/50 border border-white/30 rounded px-2 py-1 text-sm"
                  value={selectedCamera}
                  onChange={e => setSelectedCamera(e.target.value)}
                >
                  {cameras.map(cam => (
                    <option key={cam} value={cam}>{cam}</option>
                  ))}
                </select>
              </div>
              <div className="bg-[#1a1f29] h-full rounded-lg overflow-hidden relative">
                <img
                  src={`https://via.placeholder.com/800x450?text=${encodeURIComponent(selectedCamera)}`}
                  alt={`${selectedCamera} feed`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-xs px-2 py-1 rounded">LIVE</span>
              </div>
            </section>

            <aside className="w-80 bg-[#131a2a] p-6 flex flex-col gap-6 border-l border-white/10">
              <div className="bg-glass backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI ANALYSIS</h3>
                {timeMode === 'night' && alerts.length > 0 ? (
                  <div className="bg-orange-500/20 p-2 rounded">Late-Night Movement Detected<br />Unusual presence near entrance.</div>
                ) : alerts.length > 0 ? (
                  <div>{alerts[alerts.length-1].title}</div>
                ) : (
                  <div>No detections</div>
                )}
              </div>
              <div className="flex-1 overflow-auto">
                <h4 className="font-semibold mb-2">Activity Timeline</h4>
                <ul className="space-y-2 text-xs">
                  {alerts
                    .filter(a => a.timestamp?.toISOString().slice(0,10) === selectedDate)
                    .map(a => (
                      <li key={a.id} className="bg-[#0d141f] p-2 rounded">
                        {a.timestamp && new Date(a.timestamp).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} – {a.title}
                      </li>
                  ))}
                </ul>
              </div>
              <button
                className="bg-red-600 px-4 py-2 rounded text-white font-bold hover:bg-red-700"
                onClick={() => setShowPanic(true)}
              >CALL EMERGENCY</button>
            </aside>
          </div>
        )}

        {/* Live Camera View */}
        {activeView === 'live-camera' && (
          <div className="flex-1 p-6 flex flex-col">
            <div className="mb-4 flex items-center gap-4">
              <label className="text-sm">Camera:</label>
              <select
                className="bg-bg/50 border border-white/30 rounded px-2 py-1 text-sm"
                value={selectedCamera}
                onChange={e => setSelectedCamera(e.target.value)}
              >
                {cameras.map(cam => (
                  <option key={cam} value={cam}>{cam}</option>
                ))}
              </select>
            </div>
            <div className="bg-[#1a1f29] flex-1 rounded-lg overflow-hidden relative flex items-center justify-center">
              <img
                src={`https://via.placeholder.com/1200x700?text=${encodeURIComponent(selectedCamera + ' - LIVE FEED')}`}
                alt={`${selectedCamera} live feed`}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-red-500 text-sm px-3 py-1 rounded font-bold animate-pulse">LIVE</span>
              <div className="absolute bottom-4 right-4 bg-black/50 px-4 py-2 rounded text-sm">{timeString}</div>
            </div>
          </div>
        )}

        {/* Alerts View */}
        {activeView === 'alerts' && (
          <AlertCenter alerts={alerts} initialMode="alerts" />
        )}

        {/* Activity Log View */}
        {activeView === 'activity-log' && (
          <AlertCenter alerts={alerts} initialMode="activity" />
        )}

        {/* Settings View */}
        {activeView === 'settings' && (
          <SettingsPage />
        )}
      </main>
    </div>
  )
}
