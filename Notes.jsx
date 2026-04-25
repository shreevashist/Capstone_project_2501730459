import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { addNote, deleteNote } from '../store/notesSlice'

export default function Notes() {
  const notes = useSelector(s => s.notes)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const filtered = notes.filter(n => n.text.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>Notes</div>

      <div className="card-base">
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} placeholder="Write a quick note..." />
        <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => {
          if (!input.trim()) return
          dispatch(addNote({ id: Date.now(), text: input.trim() }))
          setInput('')
        }}>Save note</button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..." style={{ maxWidth: 280 }} />

      {filtered.length === 0 && <div style={{ fontSize: 13, color: '#aaa' }}>No notes yet.</div>}
      {[...filtered].reverse().map(n => (
        <div key={n.id} className="card-base" style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ flex: 1, fontSize: 13, lineHeight: 1.6, borderLeft: '2px solid var(--accent)', paddingLeft: 10 }}>{n.text}</div>
          <button onClick={() => dispatch(deleteNote(n.id))} style={{ fontSize: 11, color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>✕</button>
        </div>
      ))}
    </div>
  )
}
