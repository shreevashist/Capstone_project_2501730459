import { useSelector } from 'react-redux'
import { useState } from 'react'

const allSuggestions = [
  { cat: 'Focus', text: 'You have high-priority tasks pending. Tackle them before 12pm when focus is sharpest.' },
  { cat: 'Habits', text: 'Your productivity peaks Tuesday–Thursday. Schedule deep work sessions on these days.' },
  { cat: 'Break', text: 'Working 90+ mins without a break reduces focus by 30%. Take a 5-min walk now.' },
  { cat: 'Email', text: 'Batch email replies to 10am and 4pm only — constant checking costs 2 hours/day.' },
  { cat: 'Review', text: 'Spend 5 mins planning tomorrow before logging off today. It boosts next-day output by 20%.' },
  { cat: 'Pomodoro', text: 'Try 25-min focused sprints with a 5-min break. Perfect for task-heavy days like today.' },
  { cat: 'Notes', text: 'You have recurring topics in your notes. Consider organizing them into dedicated docs.' },
  { cat: 'Goals', text: 'You\'re 60% through your tasks today. Push through — finishing streaks build momentum.' },
  { cat: 'Sleep', text: 'Consistent sleep times improve cognitive performance. Aim for 7–8 hours tonight.' },
  { cat: 'Hydration', text: 'Drink a glass of water. Even mild dehydration impacts concentration and memory.' },
]

const catColors = { Focus:'#7F77DD', Habits:'#1D9E75', Break:'#BA7517', Email:'#534AB7', Review:'#0F6E56', Pomodoro:'#D85A30', Notes:'#185FA5', Goals:'#3B6D11', Sleep:'#993556', Hydration:'#3B6D11' }

export default function AI() {
  const tasks = useSelector(s => s.tasks)
  const [shown, setShown] = useState(() => [...allSuggestions].sort(() => Math.random() - 0.5).slice(0, 4))
  const done = tasks.filter(t => t.done).length
  const score = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  return (
    <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>✦ AI Suggestions</div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, padding: '3px 8px', background: '#EEEDFE', color: '#534AB7', borderRadius: 20, fontFamily: 'var(--font-mono)' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.5s infinite' }} />
          mock AI
        </span>
      </div>

      {/* Score summary */}
      <div className="card-base" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ fontSize: 42, fontWeight: 700, color: 'var(--accent)', letterSpacing: -2, lineHeight: 1 }}>{score}%</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Today's productivity score</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{done} of {tasks.length} tasks complete</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.map((s, i) => (
          <div key={i} className="card-base" style={{ borderLeft: `2px solid ${catColors[s.cat] || 'var(--accent)'}` }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: catColors[s.cat], marginBottom: 4, fontWeight: 500 }}>{s.cat}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>{s.text}</div>
          </div>
        ))}
      </div>

      <button className="btn-ghost" style={{ alignSelf: 'flex-start' }} onClick={() => setShown([...allSuggestions].sort(() => Math.random() - 0.5).slice(0, 4))}>
        ↻ Refresh suggestions
      </button>
    </div>
  )
}
