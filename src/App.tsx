import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import Layout from './components/Layout'
import ArcSelect from './pages/ArcSelect'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Tasks from './pages/Tasks'
import Status from './pages/Status'
import Codex from './pages/Codex'

export default function App() {
  const activeArcId = useAppStore((s) => s.activeArcId)

  return (
    <div className="min-h-screen bg-ink flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={<ArcSelect />}
          />
          <Route element={<Layout />}>
            <Route
              path="/home"
              element={
                activeArcId ? <Home /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/journey"
              element={
                activeArcId ? <Journey /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/tasks"
              element={
                activeArcId ? <Tasks /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/status"
              element={
                activeArcId ? <Status /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/codex"
              element={
                activeArcId ? <Codex /> : <Navigate to="/" replace />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  )
}
