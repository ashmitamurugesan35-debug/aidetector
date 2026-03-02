import React from 'react'

function getMonthData(year, month) {
  const result = []
  const date = new Date(year, month, 1)
  const firstDay = date.getDay() // 0=Sunday
  date.setDate(date.getDate() - firstDay)
  for (let week = 0; week < 6; week++) {
    const weekData = []
    for (let i = 0; i < 7; i++) {
      weekData.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    result.push(weekData)
  }
  return result
}

export default function Calendar({ selectedDate, onSelect }) {
  const [view, setView] = React.useState(() => {
    const d = new Date(selectedDate)
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const weeks = getMonthData(view.year, view.month)
  const monthName = new Date(view.year, view.month).toLocaleString('default', { month: 'long' })

  const prevMonth = () => {
    setView(v => {
      const m = v.month - 1
      if (m < 0) return { year: v.year - 1, month: 11 }
      return { year: v.year, month: m }
    })
  }
  const nextMonth = () => {
    setView(v => {
      const m = v.month + 1
      if (m > 11) return { year: v.year + 1, month: 0 }
      return { year: v.year, month: m }
    })
  }

  return (
    <div className="absolute top-full left-0 mt-2 bg-bg border border-white/20 rounded-lg p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="px-2">◀</button>
        <span className="font-semibold">{monthName} {view.year}</span>
        <button onClick={nextMonth} className="px-2">▶</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-center">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (<div key={d} className="font-medium">{d}</div>))}
        {weeks.map((week, wi) =>
          week.map(day => {
            const iso = day.toISOString().slice(0,10)
            const isCurrentMonth = day.getMonth() === view.month
            const isSelected = iso === selectedDate
            return (
              <div
                key={iso}
                className={`p-1 rounded cursor-pointer ${isCurrentMonth ? 'text-white' : 'text-white/40'} ${isSelected ? 'bg-cyberblue' : ''}`}
                onClick={() => onSelect(iso)}
              >
                {day.getDate()}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
