import React, { useState, useEffect } from 'react'
import { AlertCircle, Zap, Phone } from 'lucide-react'

export default function LiveSurveillance({ alerts, onViewAlert }) {
  const [detectionCards, setDetectionCards] = useState([])
  const [eventStream, setEventStream] = useState([])
  const [pipelineStep, setPipelineStep] = useState(0)
  const [showCriticalAlert, setShowCriticalAlert] = useState(false)
  const [currentAlert, setCurrentAlert] = useState(null)
  const [timeString, setTimeString] = useState('')

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeString(now.toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulate detection scenarios cycling
  useEffect(() => {
    const scenarios = [
      {
        cards: [
          { icon: '✔', text: 'Person Detected', color: 'green' },
          { icon: '✔', text: 'Classified as Resident', color: 'green' },
          { icon: '✔', text: 'No Risk Found', color: 'green' }
        ],
        events: [
          { time: '02:14:12', text: 'Motion Detected', type: 'activity' },
          { time: '02:14:14', text: 'Human Identified', type: 'activity' },
          { time: '02:14:16', text: 'Face Recognition OK', type: 'activity' }
        ]
      },
      {
        cards: [
          { icon: '📦', text: 'Delivery Personnel Detected', color: 'blue' },
          { icon: '👤', text: 'Service Worker Identified', color: 'blue' },
          { icon: 'ℹ️', text: 'Awaiting user confirmation', color: 'blue' }
        ],
        events: [
          { time: '03:45:22', text: 'Motion Detected', type: 'activity' },
          { time: '03:45:25', text: 'Person with package detected', type: 'activity' },
          { time: '03:45:30', text: 'Delivery ID captured', type: 'activity' }
        ]
      },
      {
        cards: [
          { icon: '⚠️', text: 'Presence During Restricted Hours', color: 'orange' },
          { icon: '🕐', text: '2:17 AM - Night Mode Active', color: 'orange' },
          { icon: '🚨', text: 'Behavior flagged as unusual', color: 'red' }
        ],
        events: [
          { time: '02:16:45', text: 'Motion Detected', type: 'activity' },
          { time: '02:16:50', text: 'Human Identified', type: 'activity' },
          { time: '02:17:02', text: 'Restricted Hours Rule Triggered', type: 'suspicious' },
          { time: '02:17:05', text: 'Alert Generated - Review Required', type: 'alert' }
        ],
        critical: true
      }
    ]

    let currentScene = 0
    const interval = setInterval(() => {
      const scene = scenarios[currentScene]
      setDetectionCards(scene.cards)
      setEventStream(scene.events)
      
      if (scene.critical) {
        setShowCriticalAlert(true)
        setCurrentAlert({
          title: '🚨 HIGH RISK DETECTED',
          description: 'Unknown individual detected during night hours. Possible intrusion attempt.',
          time: '2:17 AM',
          action: 'Immediate verification required'
        })
      } else {
        setShowCriticalAlert(false)
        setCurrentAlert(null)
      }

      currentScene = (currentScene + 1) % scenarios.length
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Animate pipeline step
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getPipelineColor = step => {
    const colors = ['bg-cyan-500', 'bg-cyan-500', 'bg-cyan-500', 'bg-cyan-500']
    return colors[step]
  }

  const getEventColor = type => {
    if (type === 'alert') return 'bg-red-500/20 border-red-500/50 text-red-400'
    if (type === 'suspicious') return 'bg-orange-500/20 border-orange-500/50 text-orange-400'
    return 'bg-blue-500/20 border-blue-500/50 text-blue-400'
  }

  const getEventIcon = type => {
    if (type === 'alert') return '🚨'
    if (type === 'suspicious') return '⚠️'
    return '📍'
  }

  return (
    <div className="h-full flex flex-col bg-[#0D111B] p-6 gap-6">
      {/* Critical Alert Modal */}
      {showCriticalAlert && currentAlert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-8 max-w-lg text-center">
            <p className="text-4xl mb-4">{currentAlert.title}</p>
            <p className="text-white/80 mb-4">{currentAlert.description}</p>
            <div className="bg-red-500/10 rounded p-3 mb-6 text-sm">
              <p className="text-red-400 font-semibold">Detected: {currentAlert.time}</p>
              <p className="text-white/70">{currentAlert.action}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCriticalAlert(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
              >
                View Alert
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Emergency
              </button>
              <button
                onClick={() => setShowCriticalAlert(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-4xl font-bold text-white mb-2">Live Surveillance</h1>
        <p className="text-white/60">Real-Time AI Monitoring & Threat Analysis</p>
      </div>

      {/* Pipeline Indicator */}
      <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
        <p className="text-xs text-white/50 mb-3">Processing Pipeline</p>
        <div className="flex items-center justify-between">
          <div className={`px-4 py-2 rounded ${pipelineStep === 0 ? 'bg-cyan-500/30 border border-cyan-500' : 'bg-white/10'}`}>
            <p className="text-sm font-semibold">📹 Camera</p>
          </div>
          <div className={`h-1 flex-1 mx-3 ${pipelineStep >= 1 ? 'bg-cyan-500' : 'bg-white/20'}`}></div>
          
          <div className={`px-4 py-2 rounded ${pipelineStep === 1 ? 'bg-cyan-500/30 border border-cyan-500' : 'bg-white/10'}`}>
            <p className="text-sm font-semibold">🧠 AI Analysis</p>
          </div>
          <div className={`h-1 flex-1 mx-3 ${pipelineStep >= 2 ? 'bg-cyan-500' : 'bg-white/20'}`}></div>
          
          <div className={`px-4 py-2 rounded ${pipelineStep === 2 ? 'bg-cyan-500/30 border border-cyan-500' : 'bg-white/10'}`}>
            <p className="text-sm font-semibold">🏷️ Classify</p>
          </div>
          <div className={`h-1 flex-1 mx-3 ${pipelineStep >= 3 ? 'bg-cyan-500' : 'bg-white/20'}`}></div>
          
          <div className={`px-4 py-2 rounded ${pipelineStep === 3 ? 'bg-cyan-500/30 border border-cyan-500' : 'bg-white/10'}`}>
            <p className="text-sm font-semibold">📊 Log/Alert</p>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* LEFT COLUMN - Camera Feed */}
        <div className="flex-1 flex flex-col">
          <div className="relative rounded-lg overflow-hidden border border-white/10 flex-1 bg-black flex items-center justify-center">
            {/* CCTV Feed */}
            <img
              src="https://via.placeholder.com/600x500?text=LIVE+CAMERA+FEED"
              alt="Live camera feed"
              className="w-full h-full object-cover opacity-80"
            />

            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Recording Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 px-3 py-2 rounded">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-red-500 font-bold text-sm">REC</span>
              </div>

              {/* Timestamp */}
              <div className="absolute top-4 right-4 bg-black/70 px-3 py-2 rounded text-xs text-white/80 font-mono">
                {timeString}
              </div>

              {/* Camera Name */}
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-2 rounded text-xs text-white/80">
                FRONT DOOR ENTRANCE
              </div>

              {/* AI Status */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-green-500/20 border border-green-500/50 px-3 py-2 rounded">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-400 font-semibold">Analyzing</span>
              </div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="mt-4 flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
              🔍 View Details
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded transition">
              📹 Switch Camera
            </button>
          </div>
        </div>

        {/* CENTER COLUMN - AI Detection */}
        <div className="w-80 flex flex-col bg-[#1a1f29] rounded-lg border border-white/10 p-6 gap-4 overflow-y-auto">
          <h2 className="text-lg font-bold text-white sticky top-0 bg-[#1a1f29]">
            🧠 AI Detection Engine
          </h2>

          <div className="space-y-3">
            {detectionCards.map((card, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border animate-fadeIn ${
                  card.color === 'green'
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : card.color === 'red'
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : card.color === 'orange'
                    ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                    : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                }`}
                style={{
                  animation: `slideIn 0.5s ease-out ${idx * 0.15}s both`
                }}
              >
                <p className="text-sm font-semibold">{card.icon} {card.text}</p>
              </div>
            ))}
          </div>

          {detectionCards.length === 0 && (
            <div className="text-center text-white/50 py-8">
              <p className="text-sm">Waiting for detection...</p>
            </div>
          )}

          {/* Confidence Meter */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-white/50 mb-2">Confidence Level</p>
            <div className="bg-white/10 rounded-full h-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '89%' }}></div>
            </div>
            <p className="text-xs text-white/70 mt-1">89% Match</p>
          </div>
        </div>

        {/* RIGHT COLUMN - Event Stream */}
        <div className="w-80 flex flex-col bg-[#1a1f29] rounded-lg border border-white/10 p-6 overflow-hidden">
          <h2 className="text-lg font-bold text-white mb-4">
            📊 Live Event Stream
          </h2>

          <div className="flex-1 overflow-y-auto space-y-2">
            {eventStream.map((event, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border border-l-4 text-xs ${getEventColor(event.type)}`}
                style={{
                  borderLeftColor: event.type === 'alert' ? '#ef4444' : event.type === 'suspicious' ? '#f97316' : '#3b82f6',
                  animation: `slideInRight 0.5s ease-out ${idx * 0.1}s both`
                }}
              >
                <p className="font-mono text-white/70">{event.time}</p>
                <p className="font-semibold">{getEventIcon(event.type)} {event.text}</p>
              </div>
            ))}
          </div>

          {eventStream.length === 0 && (
            <div className="flex items-center justify-center h-full text-white/50">
              <p className="text-sm">Awaiting events...</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
