import { ReactNode } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ARC_THEMES, ArcTheme } from '../data/themes';
import {
  GrainOverlay,
  HalftoneOverlay,
  ScanlineOverlay,
  InkBleedOverlay,
} from './Overlays';

interface PanelCardProps {
  children: ReactNode;
  className?: string;
  /** Override tint color (defaults to active arc tint) */
  tint?: string;
  /** Override tint opacity (defaults to arc theme's panelTintOpacity) */
  tintOpacity?: number;
  /** Optional background image URL */
  bgImageUrl?: string;
  /** Abstract SVG shapes to render as background (replaces bgImageUrl) */
  bgElement?: ReactNode;
  /** Stamp overlay text (e.g. "COMPLETED!", "DONE") */
  stamp?: string;
  /** Click handler */
  onClick?: () => void;
  /** Disable posterize filter on bg layer */
  noPosterize?: boolean;
  /** Disable all texture overlays */
  noOverlays?: boolean;
  /** Override overlay intensity: 'minimal' tones everything down */
  overlayIntensity?: 'minimal' | 'normal' | 'heavy';
}

function getTheme(): ArcTheme | null {
  const arcId = useAppStore.getState().activeArcId;
  if (!arcId) return null;
  return ARC_THEMES[arcId];
}

export default function PanelCard({
  children,
  className = '',
  tint: tintOverride,
  tintOpacity: tintOpacityOverride,
  bgImageUrl,
  bgElement,
  stamp,
  onClick,
  noPosterize = false,
  noOverlays = false,
  overlayIntensity = 'normal',
}: PanelCardProps) {
  const theme = getTheme();
  const tint = tintOverride ?? theme?.tint ?? '#dc2626';
  const tintOpacity = tintOpacityOverride ?? theme?.panelTintOpacity ?? 0.12;

  // Scale overlay opacities by intensity
  const intensityScale =
    overlayIntensity === 'minimal' ? 0.4 : overlayIntensity === 'heavy' ? 1.5 : 1;

  return (
    <div
      className={`relative overflow-hidden panel-card ${onClick ? 'press-card cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* ── Layer 1: Base background ─────────────────────── */}
      <div className="absolute inset-0 bg-paper-dark" />

      {/* ── Layer 2: Background image (posterized) ───────── */}
      {bgImageUrl && (
        <>
          <div
            className={`absolute inset-0 bg-cover bg-center ${noPosterize ? '' : 'posterize'}`}
            style={{ backgroundImage: `url(${bgImageUrl})` }}
          />
          {/* Dim overlay for text contrast */}
          <div className="absolute inset-0 bg-black/90" />
        </>
      )}

      {/* ── Layer 2b: Abstract SVG bg element ────────────── */}
      {bgElement && (
        <div className={`absolute inset-0 ${noPosterize ? '' : 'duotone-base'}`}>
          {bgElement}
        </div>
      )}

      {/* ── Layer 3: Tint overlay ────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: tint, opacity: tintOpacity }}
      />

      {/* ── Layer 4–7: Texture overlays (ordered stack) ─── */}
      {!noOverlays && (
        <>
          {/* 4. Halftone dots */}
          <div style={{ opacity: intensityScale }}>
            <HalftoneOverlay
              density={theme?.halftone ?? 'normal'}
            />
          </div>

          {/* 5. Grain */}
          <div style={{ opacity: intensityScale }}>
            <GrainOverlay
              intensity={theme?.grain ?? 'normal'}
            />
          </div>

          {/* 6. Scanlines */}
          <div style={{ opacity: intensityScale }}>
            <ScanlineOverlay
              weight={theme?.scanlines ?? 'normal'}
            />
          </div>

          {/* 7. Ink bleed (if theme enables it) */}
          {theme?.inkBleed && overlayIntensity !== 'minimal' && (
            <InkBleedOverlay />
          )}
        </>
      )}

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10">{children}</div>

      {/* ── Stamp overlay ────────────────────────────────── */}
      {stamp && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="font-heading text-3xl font-bold tracking-[0.15em] rotate-[-8deg] border-[3px] px-5 py-1.5 uppercase"
            style={{
              color: tint,
              borderColor: tint,
              textShadow: `0 0 20px ${tint}40`,
            }}
          >
            {stamp}
          </div>
        </div>
      )}
    </div>
  );
}
