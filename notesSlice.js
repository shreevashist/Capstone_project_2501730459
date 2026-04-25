import { createSlice } from '@reduxjs/toolkit'

const defaultNotes = [
  { id: 1, text: 'Meeting notes: discuss sprint planning on Monday.' },
  { id: 2, text: 'Remember to push backend changes before EOD.' },
  { id: 3, text: 'Research Redux Toolkit vs Zustand for state mgmt.' },
]

const notesSlice = createSlice({
  name: 'notes',
  initialState: defaultNotes,
  reducers: {
    addNote: (state, action) => { state.push(action.payload) },
    deleteNote: (state, action) => state.filter(n => n.id !== action.payload),
  },
})

export const { addNote, deleteNote } = notesSlice.actions
export default notesSlice.reducer
