import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore, useHydration } from './store/useAppStore'
import Layout from './components/Layout'
import ArcSelect from './pages/ArcSelect'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Tasks from './pages/Tasks'
import Status from './pages/Status'
import Codex from './pages/Codex'

/**
 * Renders a protected route: waits for hydration, then shows the page
 * if an arc is active, otherwise redirects to Arc Select.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const activeArcId = useAppStore((s) => s.activeArcId)
  const hydrated = useHydration()

  if (!hydrated) {
    // Store still rehydrating from localStorage — show nothing to avoid flash redirect
    return null
  }

  return activeArcId ? <>{children}</> : <Navigate to="/" replace />
}

export default function App() {
  const activeArcId = useAppStore((s) => s.activeArcId)
  const hydrated = useHydration()

  return (
    <div className="min-h-screen bg-ink flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative overflow-hidden">
        <Routes>
          {/* Arc Select: if arc already active AND hydrated, auto-redirect to Home */}
          <Route
            path="/"
            element={
              hydrated && activeArcId ? (
                <Navigate to="/home" replace />
              ) : (
                <ArcSelect />
              )
            }
          />

          {/* Protected routes — wrapped in Layout (bottom nav + global overlays) */}
          <Route element={<Layout />}>
            <Route
              path="/home"
              element={
                <ProtectedRoute><Home /></ProtectedRoute>
              }
            />
            <Route
              path="/journey"
              element={
                <ProtectedRoute><Journey /></ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute><Tasks /></ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute><Status /></ProtectedRoute>
              }
            />
            <Route
              path="/codex"
              element={
                <ProtectedRoute><Codex /></ProtectedRoute>
              }
            />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
