import { useState } from 'react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const EVENT_DAYS = [3, 7, 12, 15, 19, 25, 28]

const reminders = [
  { time: '10:00', text: 'Team standup call', color: '#7F77DD' },
  { time: '12:30', text: 'Lunch break', color: '#1D9E75' },
  { time: '14:00', text: 'Client presentation prep', color: '#BA7517' },
  { time: '17:00', text: 'Push code and create PR', color: '#D85A30' },
]

export default function Calendar() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const first = new Date(year, month, 1).getDay()
  const total = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.25rem', maxWidth: 800 }}>
      <div className="card-base">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{MONTHS[month]} {year}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn-ghost" onClick={prevMonth}>←</button>
            <button className="btn-ghost" onClick={nextMonth}>→</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
          {DAYS.map(d => (
            <div key={d} style={{ fontSize: 10, color: '#aaa', textAlign: 'center', fontFamily: 'var(--font-mono)', padding: '4px 0' }}>{d}</div>
          ))}
          {Array.from({ length: first }, (_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: total }, (_, i) => {
            const d = i + 1
            const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear()
            const hasEv = EVENT_DAYS.includes(d)
            return (
              <div key={d} className={`cal-day ${isToday ? 'today' : ''} ${hasEv ? 'has-event' : ''}`}>{d}</div>
            )
          })}
        </div>
      </div>

      <div className="card-base">
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.75rem' }}>Today's reminders</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reminders.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: '#f5f4f0', borderRadius: 8 }} className="dark:bg-neutral-800">
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#aaa', minWidth: 40 }}>{r.time}</div>
              <div style={{ fontSize: 12, flex: 1 }}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
