import { useSelector } from 'react-redux'
import { useWeather } from '../hooks/useWeather'
import { useState } from 'react'

const iconMap = { Clear:'☀', Clouds:'☁', Rain:'🌧', Drizzle:'🌦', Thunderstorm:'⛈', Snow:'❄', Mist:'🌫', Haze:'🌫' }

const aiPool = [
  'You have high-priority tasks — tackle them before 12pm for best focus.',
  'Your productivity peaks mid-week. Schedule deep work Tuesday–Thursday.',
  'Batch your emails — try checking only at 10am and 4pm.',
  'Consider Pomodoro: 25 min focus + 5 min break cycles.',
  'End-of-day review: spend 5 mins planning tomorrow before logging off.',
]

const prodData = [
  { day: 'Mon', val: 82 }, { day: 'Tue', val: 91 }, { day: 'Wed', val: 67 },
  { day: 'Thu', val: 88 }, { day: 'Fri', val: 74 }, { day: 'Sat', val: 45 }, { day: 'Sun', val: 30 },
]

export default function Dashboard() {
  const tasks = useSelector(s => s.tasks)
  const notes = useSelector(s => s.notes)
  const { data: weather, loading: wLoad } = useWeather('New Delhi')
  const [suggestions] = useState(() => [...aiPool].sort(() => Math.random() - 0.5).slice(0, 3))

  const done = tasks.filter(t => t.done).length
  const score = tasks.length ? Math.round((done / tasks.length) * 100) : 0
  const now = new Date()
  const h = now.getHours()
  const greet = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px' }}>
            Good <span style={{ color: 'var(--accent)' }}>{greet}</span>, Dev ✦
          </div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
            You have {tasks.length - done} tasks pending today.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, padding: '3px 8px', background: '#EEEDFE', color: '#534AB7', borderRadius: 20, fontFamily: 'var(--font-mono)' }}>
            <div className="ai-dot" /> AI active
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#999', background: '#f0ede8', border: '0.5px solid rgba(0,0,0,0.1)', padding: '5px 10px', borderRadius: 8 }}>{dateStr}</span>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'tasks today', val: tasks.length, sub: `${done} done · ${tasks.length - done} left`, fill: `${score}%`, color: 'var(--accent)' },
          { label: 'notes saved', val: notes.length, sub: 'quick capture', fill: '80%', color: 'var(--accent2)' },
          { label: 'reminders', val: 4, sub: 'next in 2h', fill: '45%', color: '#BA7517' },
          { label: 'focus score', val: `${score}%`, sub: 'above avg ↑', fill: `${score}%`, color: '#534AB7' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#f0ede8', borderRadius: 8, padding: '1rem', position: 'relative', overflow: 'hidden' }}
            className="dark:bg-neutral-800">
            <div style={{ height: 2, background: s.color, width: s.fill, position: 'absolute', bottom: 0, left: 0, borderRadius: '0 2px 0 0' }} />
            <div style={{ fontSize: 10, color: '#999', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Mid grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: '1.25rem' }}>
        {/* Recent tasks */}
        <div className="card-base">
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: '0.75rem' }}>recent tasks</div>
          {tasks.slice(0, 5).map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div className={`task-check ${t.done ? 'done' : ''}`}>
                {t.done && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
              </div>
              <span style={{ fontSize: 13, flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#aaa' : 'inherit' }}>{t.text}</span>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, fontFamily: 'var(--font-mono)', background: t.tag === 'high' ? '#FAECE7' : t.tag === 'med' ? '#FAEEDA' : '#EAF3DE', color: t.tag === 'high' ? '#993C1D' : t.tag === 'med' ? '#854F0B' : '#3B6D11' }}>{t.tag}</span>
            </div>
          ))}
        </div>

        {/* AI suggestions */}
        <div className="card-base">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#999', textTransform: 'uppercase', letterSpacing: 0.8 }}>✦ ai suggestions</div>
            <div className="ai-dot" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {suggestions.map((s, i) => (
              <div key={i} style={{ background: '#f5f4f0', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.5, borderLeft: '2px solid var(--accent)', color: '#555' }}
                className="dark:bg-neutral-800 dark:text-neutral-300">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Weather */}
        <div className="card-base">
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: '0.75rem' }}>weather</div>
          {wLoad ? (
            <div style={{ fontSize: 12, color: '#999', textAlign: 'center', padding: '1rem' }}>Loading...</div>
          ) : weather ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>{iconMap[weather.weather[0].main] || '🌡'}</div>
              <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>{Math.round(weather.main.temp)}°C</div>
              <div style={{ fontSize: 11, color: '#888', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{weather.name}, {weather.sys.country}</div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 2, textTransform: 'capitalize' }}>{weather.weather[0].description}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}>
                {[
                  { label: 'feels like', val: `${Math.round(weather.main.feels_like)}°C` },
                  { label: 'humidity', val: `${weather.main.humidity}%` },
                  { label: 'wind', val: `${Math.round(weather.wind.speed * 3.6)} km/h` },
                  { label: 'condition', val: weather.weather[0].main },
                ].map((d, i) => (
                  <div key={i} style={{ background: '#f5f4f0', borderRadius: 8, padding: 8, textAlign: 'center' }} className="dark:bg-neutral-800">
                    <div style={{ fontSize: 9, color: '#999', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{d.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{d.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: '#999', textAlign: 'center' }}>Weather unavailable</div>
          )}
        </div>
      </div>

      {/* Weekly productivity */}
      <div className="card-base">
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: '0.75rem' }}>weekly productivity</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {prodData.map(d => (
            <div key={d.day} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#888', width: 32 }}>{d.day}</div>
              <div style={{ flex: 1, height: 6, background: '#f0ede8', borderRadius: 3, overflow: 'hidden' }} className="dark:bg-neutral-700">
                <div style={{ height: '100%', borderRadius: 3, background: d.val >= 80 ? 'var(--accent2)' : d.val >= 60 ? 'var(--accent)' : '#D85A30', width: `${d.val}%`, transition: 'width 0.6s' }} />
              </div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#aaa', width: 32, textAlign: 'right' }}>{d.val}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
