import { useSelector, useDispatch } from 'react-redux'
import { useState, useMemo } from 'react'
import { addTask, toggleTask, deleteTask } from '../store/tasksSlice'

export default function Tasks() {
  const tasks = useSelector(s => s.tasks)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [tag, setTag] = useState('med')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let t = [...tasks]
    if (search) t = t.filter(x => x.text.toLowerCase().includes(search.toLowerCase()))
    if (filter === 'done') t = t.filter(x => x.done)
    if (filter === 'pending') t = t.filter(x => !x.done)
    if (filter === 'high') t = t.filter(x => x.tag === 'high')
    if (sort === 'az') t.sort((a, b) => a.text.localeCompare(b.text))
    if (sort === 'tag') t.sort((a, b) => ['high','med','low'].indexOf(a.tag) - ['high','med','low'].indexOf(b.tag))
    return t
  }, [tasks, search, filter, sort])

  const handleAdd = () => {
    if (!input.trim()) return
    dispatch(addTask({ id: Date.now(), text: input.trim(), done: false, tag }))
    setInput('')
  }

  const tagStyle = t => ({
    fontSize: 10, padding: '2px 7px', borderRadius: 6, fontFamily: 'var(--font-mono)',
    background: t === 'high' ? '#FAECE7' : t === 'med' ? '#FAEEDA' : '#EAF3DE',
    color: t === 'high' ? '#993C1D' : t === 'med' ? '#854F0B' : '#3B6D11'
  })

  return (
    <div className="card-base" style={{ maxWidth: 700 }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: '1rem' }}>Tasks</div>

      {/* Add task */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} placeholder="Add a task..." />
        <select value={tag} onChange={e => setTag(e.target.value)} style={{ width: 80, padding: '7px 6px', fontSize: 12, border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 8, fontFamily: 'var(--font-mono)', background: '#f5f4f0', cursor: 'pointer', outline: 'none' }}>
          <option value="high">high</option>
          <option value="med">med</option>
          <option value="low">low</option>
        </select>
        <button className="btn-primary" onClick={handleAdd}>+ Add</button>
      </div>

      {/* Search + filter + sort */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." style={{ maxWidth: 200 }} />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '7px 8px', fontSize: 12, border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 8, fontFamily: 'var(--font-mono)', background: '#f5f4f0', cursor: 'pointer', outline: 'none' }}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
          <option value="high">High priority</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '7px 8px', fontSize: 12, border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 8, fontFamily: 'var(--font-mono)', background: '#f5f4f0', cursor: 'pointer', outline: 'none' }}>
          <option value="default">Default order</option>
          <option value="az">A → Z</option>
          <option value="tag">By priority</option>
        </select>
      </div>

      {/* Task list */}
      {filtered.length === 0 && <div style={{ fontSize: 13, color: '#aaa', padding: '1rem 0' }}>No tasks found.</div>}
      {filtered.map(t => (
        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
          <div className={`task-check ${t.done ? 'done' : ''}`} onClick={() => dispatch(toggleTask(t.id))}>
            {t.done && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
          </div>
          <span style={{ flex: 1, fontSize: 13, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#aaa' : 'inherit' }}>{t.text}</span>
          <span style={tagStyle(t.tag)}>{t.tag}</span>
          <button onClick={() => dispatch(deleteTask(t.id))} style={{ fontSize: 11, color: '#ccc', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
      ))}

      <div style={{ marginTop: '0.75rem', fontSize: 11, color: '#aaa', fontFamily: 'var(--font-mono)' }}>
        {tasks.filter(t => t.done).length}/{tasks.length} completed
      </div>
    </div>
  )
}
