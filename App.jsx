import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import Calendar from './pages/Calendar'
import Weather from './pages/Weather'
import AI from './pages/AI'

export default function App() {
  const [dark, setDark] = useState(false)
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={dark ? 'dark' : ''} style={{ minHeight: '100vh' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh', background: dark ? '#111110' : '#f5f4f0' }}>
            <Sidebar dark={dark} setDark={setDark} />
            <main style={{ padding: '1.5rem', overflowY: 'auto' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/ai" element={<AI />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  )
}
