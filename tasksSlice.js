import { createSlice } from '@reduxjs/toolkit'

const defaultTasks = [
  { id: 1, text: 'Review project proposal', done: false, tag: 'high' },
  { id: 2, text: 'Team standup meeting', done: true, tag: 'med' },
  { id: 3, text: 'Update API documentation', done: false, tag: 'med' },
  { id: 4, text: 'Code review for PR #42', done: false, tag: 'high' },
  { id: 5, text: 'Reply to client emails', done: true, tag: 'low' },
]

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: defaultTasks,
  reducers: {
    addTask: (state, action) => { state.push(action.payload) },
    toggleTask: (state, action) => {
      const t = state.find(x => x.id === action.payload)
      if (t) t.done = !t.done
    },
    deleteTask: (state, action) => state.filter(t => t.id !== action.payload),
  },
})

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer
