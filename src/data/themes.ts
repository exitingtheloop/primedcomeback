import { ArcId } from '../data/arcs';

/** Per-arc theme configuration controlling overlay intensities */
export interface ArcTheme {
  id: ArcId;
  tint: string;
  /** RGB string for use in rgba() — derived from tint */
  tintRGB: string;
  /** Panel background tint opacity (0–1) */
  panelTintOpacity: number;
  /** Global overlay intensities */
  grain: 'light' | 'normal' | 'heavy';
  halftone: 'sparse' | 'normal' | 'dense';
  scanlines: 'subtle' | 'normal' | 'heavy';
  vignette: 'light' | 'normal' | 'heavy';
  /** Posterize filter variant for bg images */
  posterize: 'light' | 'normal' | 'heavy';
  /** Card-level overlay opacities (fine-tuning) */
  cardGrain: number;
  cardHalftone: number;
  cardScanlines: number;
  /** Ink bleed enabled */
  inkBleed: boolean;
}

export const ARC_THEMES: Record<ArcId, ArcTheme> = {
  redemption: {
    id: 'redemption',
    tint: '#dc2626',
    tintRGB: '220, 38, 38',
    panelTintOpacity: 0.12,
    grain: 'normal',
    halftone: 'normal',
    scanlines: 'normal',
    vignette: 'normal',
    posterize: 'normal',
    cardGrain: 0.22,
    cardHalftone: 0.06,
    cardScanlines: 0.07,
    inkBleed: true,
  },
  genius: {
    id: 'genius',
    tint: '#06b6d4',
    tintRGB: '6, 182, 212',
    panelTintOpacity: 0.10,
    grain: 'normal',
    halftone: 'dense',
    scanlines: 'normal',
    vignette: 'normal',
    posterize: 'normal',
    cardGrain: 0.20,
    cardHalftone: 0.07,
    cardScanlines: 0.06,
    inkBleed: true,
  },
  winter: {
    id: 'winter',
    tint: '#60a5fa',
    tintRGB: '96, 165, 250',
    panelTintOpacity: 0.10,
    grain: 'heavy',
    halftone: 'sparse',
    scanlines: 'subtle',
    vignette: 'heavy',
    posterize: 'light',
    cardGrain: 0.25,
    cardHalftone: 0.04,
    cardScanlines: 0.05,
    inkBleed: true,
  },
};

/** Helper: get CSS class modifier suffix */
export function grainClass(level: ArcTheme['grain']): string {
  if (level === 'light') return 'overlay-grain overlay-grain--light';
  if (level === 'heavy') return 'overlay-grain overlay-grain--heavy';
  return 'overlay-grain';
}

export function halftoneClass(level: ArcTheme['halftone']): string {
  if (level === 'sparse') return 'overlay-halftone overlay-halftone--sparse';
  if (level === 'dense') return 'overlay-halftone overlay-halftone--dense';
  return 'overlay-halftone';
}

export function scanlineClass(level: ArcTheme['scanlines']): string {
  if (level === 'subtle') return 'overlay-scanlines overlay-scanlines--subtle';
  if (level === 'heavy') return 'overlay-scanlines overlay-scanlines--heavy';
  return 'overlay-scanlines';
}

export function vignetteClass(level: ArcTheme['vignette']): string {
  if (level === 'light') return 'overlay-vignette overlay-vignette--light';
  if (level === 'heavy') return 'overlay-vignette overlay-vignette--heavy';
  return 'overlay-vignette';
}

export function posterizeClass(level: ArcTheme['posterize']): string {
  if (level === 'light') return 'posterize--light';
  if (level === 'heavy') return 'posterize--heavy';
  return 'posterize';
}
