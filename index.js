import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import notesReducer from './notesSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    notes: notesReducer,
  },
})
