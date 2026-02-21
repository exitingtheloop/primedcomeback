import { Outlet } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ARC_THEMES } from '../data/themes';
import BottomNav from './BottomNav';
import {
  GrainOverlay,
  ScanlineOverlay,
  VignetteOverlay,
  InkBleedOverlay,
} from './Overlays';

export default function Layout() {
  const activeArcId = useAppStore((s) => s.activeArcId);
  const theme = activeArcId ? ARC_THEMES[activeArcId] : null;

  return (
    <div className="min-h-screen bg-ink relative flex flex-col">
      {/* Fixed full-screen overlays — theme-aware intensities */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <GrainOverlay intensity={theme?.grain ?? 'normal'} />
        <ScanlineOverlay weight={theme?.scanlines ?? 'normal'} />
        <VignetteOverlay strength={theme?.vignette ?? 'normal'} />
        {theme?.inkBleed && <InkBleedOverlay />}
      </div>

      {/* Scrollable content area */}
      <main className="flex-1 pb-24 overflow-y-auto relative">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
