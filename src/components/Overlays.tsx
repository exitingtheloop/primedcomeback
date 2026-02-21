/**
 * Overlay components — CSS-class-based system backed by overlays.css.
 * These are thin React wrappers around the CSS utility classes.
 * Each overlay is absolutely positioned and pointer-events: none.
 */

/* ── Grain (SVG feTurbulence noise, mix-blend-overlay) ───── */
export function GrainOverlay({
  intensity = 'normal',
}: {
  intensity?: 'light' | 'normal' | 'heavy';
}) {
  const mod =
    intensity === 'light'
      ? ' overlay-grain--light'
      : intensity === 'heavy'
        ? ' overlay-grain--heavy'
        : '';
  return <div className={`overlay-grain${mod}`} />;
}

/* ── Halftone (radial-gradient dot mask) ─────────────────── */
export function HalftoneOverlay({
  density = 'normal',
}: {
  density?: 'sparse' | 'normal' | 'dense';
}) {
  const mod =
    density === 'sparse'
      ? ' overlay-halftone--sparse'
      : density === 'dense'
        ? ' overlay-halftone--dense'
        : '';
  return <div className={`overlay-halftone${mod}`} />;
}

/* ── Scanlines (repeating-linear-gradient) ───────────────── */
export function ScanlineOverlay({
  weight = 'normal',
}: {
  weight?: 'subtle' | 'normal' | 'heavy';
}) {
  const mod =
    weight === 'subtle'
      ? ' overlay-scanlines--subtle'
      : weight === 'heavy'
        ? ' overlay-scanlines--heavy'
        : '';
  return <div className={`overlay-scanlines${mod}`} />;
}

/* ── Vignette (edge darkening) ───────────────────────────── */
export function VignetteOverlay({
  strength = 'normal',
}: {
  strength?: 'light' | 'normal' | 'heavy';
}) {
  const mod =
    strength === 'light'
      ? ' overlay-vignette--light'
      : strength === 'heavy'
        ? ' overlay-vignette--heavy'
        : '';
  return <div className={`overlay-vignette${mod}`} />;
}

/* ── Ink Bleed (turbulence posterized splatter) ──────────── */
export function InkBleedOverlay() {
  return <div className="overlay-ink-bleed" />;
}
