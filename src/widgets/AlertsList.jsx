import React from 'react'

export const initialAlerts = []

export function AlertsList({alerts = []}) {
  return (
    <div className="space-y-3">
      {alerts.map(a => (
        <div
          key={a.id}
          className="flex items-center gap-3 p-3 bg-glass backdrop-blur-md rounded-lg border border-white/10"
        >
          <div className="text-xl">{a.icon}</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{a.title}</div>
            {a.subtitle && <div className="text-xs text-white/70">{a.subtitle}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
