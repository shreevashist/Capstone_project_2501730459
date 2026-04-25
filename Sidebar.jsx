import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Sidebar({ dark, setDark }) {
  const tasks = useSelector(s => s.tasks)
  const done = tasks.filter(t => t.done).length
  const score = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  return (
    <aside className="sidebar-base flex flex-col gap-6 p-5 w-56 min-h-screen">
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />
        FlowAI
      </div>

      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>workspace</div>
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>⊞ Dashboard</NavLink>
        <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>✓ Tasks</NavLink>
        <NavLink to="/notes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>◻ Notes</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>◷ Calendar</NavLink>
      </div>

      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>widgets</div>
        <NavLink to="/weather" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>◈ Weather</NavLink>
        <NavLink to="/ai" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>✦ AI Suggestions</NavLink>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, color: '#999', padding: '8px 10px', background: '#f5f4f0', borderRadius: 8, fontFamily: 'var(--font-mono)' }}
          className="dark:bg-neutral-800">
          <div style={{ marginBottom: 3 }}>productivity score</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{score}%</div>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className="btn-ghost w-full"
          style={{ fontSize: 11 }}>
          {dark ? '☀ Light mode' : '◑ Dark mode'}
        </button>
      </div>
    </aside>
  )
}
