import React, { useState } from 'react'
import { Search, Download, ChevronRight, Clock, MapPin, Zap, AlertCircle, Eye } from 'lucide-react'

export default function AlertCenter({ alerts, initialMode = 'alerts', showTabSwitcher = false }) {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0] || null)
  const [filterLevel, setFilterLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mode, setMode] = useState(initialMode) // 'alerts' or 'activity'

  // Categorize alerts by type
  const activityAlerts = alerts.filter(a => ['delivery', 'police', 'postman', 'known'].includes(a.type))
  const criticalAlerts = alerts.filter(a => ['theft', 'night', 'unknown'].includes(a.type))
  
  const displayAlerts = mode === 'alerts' ? criticalAlerts : activityAlerts

  // Map alert types to severity levels
  const getSeverity = type => {
    if (type === 'theft' || type === 'night') return 'critical'
    if (type === 'unknown') return 'warning'
    if (type === 'delivery' || type === 'police' || type === 'postman') return 'info'
    return 'safe'
  }

  // Filter alerts
  const filtered = displayAlerts.filter(a => {
    const severity = getSeverity(a.type)
    const matchFilter = filterLevel === 'all' || severity === filterLevel.toLowerCase()
    const matchSearch = searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.timestamp?.toLocaleTimeString().includes(searchQuery)
    return matchFilter && matchSearch
  })

  // Activity timeline for selected alert
  const getTimeline = alert => {
    if (!alert) return []
    const time = new Date(alert.timestamp)
    const times = []
    for (let i = 4; i >= 0; i--) {
      const t = new Date(time.getTime() - i * 60000)
      times.push(t)
    }
    
    if (mode === 'activity') {
      return [
        { time: times[0], event: 'Camera Active', icon: '📹' },
        { time: times[1], event: 'Object Detected', icon: '👁' },
        { time: times[2], event: 'Classification', icon: '🔍' },
        { time: times[3], event: 'Logged', icon: '💾' },
        { time: times[4], event: 'Archived', icon: '📁' }
      ]
    } else {
      return [
        { time: times[0], event: 'Motion Detected', icon: '📍' },
        { time: times[1], event: 'Human Identified', icon: '👤' },
        { time: times[2], event: 'Face Analysis', icon: '🔍' },
        { time: times[3], event: 'Threat Assessment', icon: '⚠️' },
        { time: times[4], event: 'Alert Triggered', icon: '🚨' }
      ]
    }
  }

  const getStatusBadge = type => {
    if (mode === 'activity') {
      return { text: 'RECORDED', color: 'blue' }
    }
    if (type === 'theft' || type === 'night') return { text: 'CRITICAL', color: 'red' }
    if (type === 'unknown') return { text: 'WARNING', color: 'yellow' }
    return { text: 'INFO', color: 'green' }
  }

  const getSeverityColor = type => {
    if (mode === 'activity') {
      return 'text-blue-400'
    }
    if (type === 'theft' || type === 'night') return 'text-red-500'
    if (type === 'unknown') return 'text-yellow-500'
    if (type === 'delivery' || type === 'police' || type === 'postman') return 'text-blue-500'
    return 'text-green-500'
  }

  const getSeverityBgColor = type => {
    if (mode === 'activity') {
      return 'bg-blue-500/10 border-blue-500/30'
    }
    if (type === 'theft' || type === 'night') return 'bg-red-500/20 border-red-500/40'
    if (type === 'unknown') return 'bg-yellow-500/20 border-yellow-500/40'
    if (type === 'delivery' || type === 'police' || type === 'postman') return 'bg-blue-500/20 border-blue-500/40'
    return 'bg-green-500/20 border-green-500/40'
  }

  const getConfidenceLevel = type => {
    if (type === 'theft') return 95
    if (type === 'unknown') return 87
    if (type === 'night') return 92
    return 99
  }

  const getRecommendedAction = type => {
    if (type === 'theft') return 'Contact emergency services immediately'
    if (type === 'night') return 'Verify identity and respond to doorbell'
    if (type === 'unknown') return 'Monitor closely and await homeowner action'
    if (type === 'delivery') return 'Verify delivery personnel identity'
    return 'No action required'
  }

  return (
    <div className="h-full flex flex-col bg-[#0D111B]">
      {/* Tab Switcher - Only show if showTabSwitcher is true */}
      {showTabSwitcher && (
        <div className="bg-[#121722] border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => { setMode('activity'); setSelectedAlert(null) }}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                mode === 'activity'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              Activity Log
            </button>
            <button
              onClick={() => { setMode('alerts'); setSelectedAlert(null) }}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                mode === 'alerts'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Alerts
            </button>
            <div className="flex-1"></div>
            <button className="flex items-center gap-2 bg-cyberblue/20 text-cyberblue px-4 py-2 rounded hover:bg-cyberblue/30 transition text-sm">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-white/50 mb-4">
            {mode === 'activity'
              ? 'Continuous recording of all observed activity.'
              : 'AI-detected risks that may require immediate response.'
            }
          </p>
        </div>
      )}

      {/* Header when not showing tab switcher */}
      {!showTabSwitcher && (
        <div className="bg-[#121722] border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {mode === 'activity' ? '👁 ACTIVITY LOG' : '🚨 ALERTS'}
            </h2>
            <button className="flex items-center gap-2 bg-cyberblue/20 text-cyberblue px-4 py-2 rounded hover:bg-cyberblue/30 transition text-sm">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-white/50 mb-4">
            {mode === 'activity'
              ? 'Continuous recording of all observed activity.'
              : 'AI-detected risks that may require immediate response.'
            }
          </p>
        </div>
      )}

      {/* Top Bar Controls */}
      <div className="bg-[#121722] border-b border-white/10 px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-white/50 block mb-1">FILTER</label>
            <select
              value={filterLevel}
              onChange={e => setFilterLevel(e.target.value)}
              className="w-full bg-[#1a1f29] border border-white/20 rounded px-3 py-2 text-sm text-white"
            >
              <option value="all">All Events</option>
              {mode === 'alerts' && (
                <>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                </>
              )}
              {mode === 'activity' && (
                <>
                  <option value="info">Informational</option>
                  <option value="safe">Safe</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="text-xs text-white/50 block mb-1">SYSTEM STATUS</label>
            <div className="flex items-center gap-2 bg-green-500/20 rounded px-3 py-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-400">Monitoring Active</span>
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-xs text-white/50 block mb-1">SEARCH</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search by time or event..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1f29] border border-white/20 rounded px-3 py-2 pl-10 text-sm text-white placeholder-white/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Alert List */}
        <div className="w-96 bg-[#121722] border-r border-white/10 overflow-y-auto">
          <div className="space-y-2 p-4">
            {filtered.length === 0 ? (
              <div className="text-center text-white/50 py-10">No {mode} events found</div>
            ) : (
              filtered.map(alert => {
                const status = getStatusBadge(alert.type)
                const isSelected = selectedAlert?.id === alert.id
                const borderColor = mode === 'activity' ? 'border-blue-500' : 'border-red-500'
                const bgColor = mode === 'activity' ? 'bg-blue-500/10' : 'bg-red-500/10'
                
                return (
                  <button
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`w-full text-left p-4 rounded border transition ${
                      isSelected
                        ? `${bgColor} ${borderColor}`
                        : 'bg-[#1a1f29] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{alert.icon}</span>
                        <div>
                          <p className="text-sm font-semibold line-clamp-2">{alert.title}</p>
                          <p className="text-xs text-white/50">
                            {alert.timestamp && new Date(alert.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        status.color === 'red' ? 'bg-red-500/30 text-red-400' :
                        status.color === 'yellow' ? 'bg-yellow-500/30 text-yellow-400' :
                        status.color === 'blue' ? 'bg-blue-500/30 text-blue-400' :
                        'bg-green-500/30 text-green-400'
                      }`}>
                        {status.text}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${getSeverityColor(alert.type)}`}>
                        {mode === 'activity' ? 'OBSERVED' : getSeverity(alert.type).toUpperCase()}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {selectedAlert ? (
            <>
              {/* Top Banner */}
              <div className={`p-6 rounded-lg border-l-4 ${getSeverityBgColor(selectedAlert.type)}`}>
                {mode === 'activity' ? (
                  <>
                    <p className="text-xl font-bold mb-2 text-blue-400">📹 Activity Recorded</p>
                    <p className="text-white/70">System monitoring record. No action needed.</p>
                  </>
                ) : (
                  <>
                    {(selectedAlert.type === 'theft' || selectedAlert.type === 'night') && (
                      <>
                        <p className="text-2xl font-bold mb-2">🚨 HIGH RISK EVENT DETECTED</p>
                        <p className="text-white/70">Late-night presence detected near entrance. System flagged behavior as highly suspicious.</p>
                      </>
                    )}
                    {selectedAlert.type === 'unknown' && (
                      <>
                        <p className="text-2xl font-bold mb-2">⚠️ UNIDENTIFIED PERSON</p>
                        <p className="text-white/70">Unknown individual detected. Face recognition failed to match known residents.</p>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">TITLE</p>
                  <p className="font-semibold text-sm">{selectedAlert.title}</p>
                </div>
                <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">TIME</p>
                  <p className="font-semibold text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedAlert.timestamp && new Date(selectedAlert.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">CAMERA LOCATION</p>
                  <p className="font-semibold text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Front Door Entrance
                  </p>
                </div>
                <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">
                    {mode === 'activity' ? 'STATUS' : 'AI CONFIDENCE'}
                  </p>
                  {mode === 'activity' ? (
                    <p className="font-semibold text-sm text-blue-400">✓ Recorded</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${getConfidenceLevel(selectedAlert.type)}%` }}
                        ></div>
                      </div>
                      <p className="font-semibold text-sm">{getConfidenceLevel(selectedAlert.type)}%</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Risk Classification or Summary */}
              {mode === 'alerts' && (
                <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
                  <p className="text-xs text-white/50 mb-2">RISK LEVEL</p>
                  <p className={`font-semibold text-lg ${getSeverityColor(selectedAlert.type)}`}>
                    {getSeverity(selectedAlert.type).toUpperCase()}
                  </p>
                </div>
              )}

              {/* Suggested Action or Summary */}
              <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
                <p className="text-xs text-white/50 mb-2">
                  {mode === 'activity' ? 'SUMMARY' : 'SUGGESTED ACTION'}
                </p>
                <p className="font-semibold flex items-center gap-2">
                  {mode === 'activity' ? (
                    <>
                      <Eye className="w-4 h-4 text-blue-400" />
                      System detected and logged this event.
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-yellow-400" />
                      {getRecommendedAction(selectedAlert.type)}
                    </>
                  )}
                </p>
              </div>

              {/* Captured Frame */}
              <div className="bg-[#1a1f29] rounded-lg p-4 border border-white/10">
                <p className="text-xs text-white/50 mb-2">CAPTURED FRAME</p>
                <img
                  src="https://via.placeholder.com/600x300?text=Frame+Capture"
                  alt="Captured frame"
                  className="w-full rounded"
                />
              </div>

              {/* Action Buttons */}
              {mode === 'alerts' && (
                <div className="flex gap-4">
                  {(selectedAlert.type === 'theft' || selectedAlert.type === 'night') && (
                    <>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition">
                        🚨 CALL EMERGENCY
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition">
                        📹 VIEW FEED
                      </button>
                    </>
                  )}
                  {selectedAlert.type === 'unknown' && (
                    <>
                      <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded transition">
                        ⚠️ ESCALATE
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition">
                        📹 VIEW FEED
                      </button>
                    </>
                  )}
                </div>
              )}

              {mode === 'activity' && (
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition">
                  👁 VIEW DETAILS
                </button>
              )}

              {/* Activity Timeline */}
              <div>
                <h3 className="text-lg font-bold mb-4">
                  {mode === 'activity' ? 'RECORDING TIMELINE' : 'DETECTION TIMELINE'}
                </h3>
                <div className="space-y-3">
                  {getTimeline(selectedAlert).map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                        mode === 'activity'
                          ? 'bg-blue-500/20 border-blue-500'
                          : 'bg-red-500/20 border-red-500'
                      }`}>
                        <span className="text-sm">{entry.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{entry.event}</p>
                        <p className="text-xs text-white/50">{entry.time.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              <p>Select an {mode} event to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
