import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ARCS, ArcId } from '../data/arcs';
import { getDayNumber } from '../utils/seed';
import { GrainOverlay, ScanlineOverlay, VignetteOverlay, HalftoneOverlay, InkBleedOverlay } from '../components/Overlays';
import { ARC_THEMES } from '../data/themes';
import PanelCard from '../components/PanelCard';

const ARC_ORDER: ArcId[] = ['redemption', 'genius', 'winter'];

/** SVG-based abstract background per arc for the thumbnail grid */
function ArcThumbnailBg({ tint }: { tint: string }) {
  return (
    <div className="absolute inset-0">
      {/* Diagonal slash pattern */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="100" height="100" fill={tint} opacity="0.15" />
        <polygon points="0,100 60,0 100,0 100,100" fill={tint} opacity="0.08" />
        <polygon points="0,100 0,40 30,0 50,0" fill="white" opacity="0.03" />
      </svg>
      <HalftoneOverlay density="dense" />
      <ScanlineOverlay weight="normal" />
    </div>
  );
}

export default function ArcSelect() {
  const selectArc = useAppStore((s) => s.selectArc);
  const activeArcId = useAppStore((s) => s.activeArcId);
  const startedAtDate = useAppStore((s) => s.startedAtDate);
  const dayNumber = getDayNumber(startedAtDate);
  const navigate = useNavigate();

  const handleSelect = (arcId: ArcId) => {
    selectArc(arcId);
    navigate('/home');
  };

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-ink relative overflow-hidden flex flex-col">
      {/* Full-page overlays */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <GrainOverlay intensity="heavy" />
        <ScanlineOverlay weight="normal" />
        <VignetteOverlay strength="heavy" />
        <InkBleedOverlay />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <span className="text-paper/30 text-lg">&#8592;</span>
          <span className="font-heading text-sm tracking-[0.2em] uppercase text-paper/50">
            GO BACK
          </span>
        </div>

        {/* Title section */}
        <div className="px-5 mb-5">
          <h1 className="font-heading text-5xl font-bold text-paper tracking-[0.04em] text-shadow-lg leading-[0.95]">
            ARC<br />MODE
          </h1>
          <p className="text-paper/35 text-xs tracking-[0.25em] uppercase font-heading font-semibold mt-2 label-clear">
            Choose your personalized arc
          </p>
        </div>

        {/* Arc Grid — 2 columns of manga-panel thumbnails */}
        <div className="px-5 mb-4">
          <div className="grid grid-cols-2 gap-2.5">
            {ARC_ORDER.map((arcId) => {
              const arc = ARCS[arcId];
              const isActive = activeArcId === arcId;
              return (
                <button
                  key={arc.id}
                  onClick={() => handleSelect(arc.id)}
                  className="relative overflow-hidden text-left group press-card"
                  style={{ aspectRatio: '3/4' }}
                >
                  {/* Panel background */}
                  <div className="absolute inset-0 bg-paper-dark" />
                  <ArcThumbnailBg tint={arc.tint} />

                  {/* Active ring */}
                  {isActive && (
                    <div
                      className="absolute inset-0 z-10"
                      style={{ border: `2px solid ${arc.tint}` }}
                    />
                  )}

                  {/* Content overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p
                      className="font-heading text-xl font-bold tracking-[0.06em] leading-none text-shadow-md"
                      style={{ color: arc.tint }}
                    >
                      {arc.label}
                    </p>
                    <p className="text-paper/45 text-[10px] font-heading font-semibold tracking-wider mt-0.5 label-clear">
                      {arc.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Locked placeholder slot */}
            <div
              className="relative overflow-hidden bg-paper-dark flex items-center justify-center"
              style={{ aspectRatio: '3/4' }}
            >
              <div className="absolute inset-0 bg-paper/[0.02]" />
              <div className="text-center">
                <span className="text-paper/10 text-3xl">&#128274;</span>
                <p className="text-paper/10 text-[9px] font-heading tracking-widest mt-1 uppercase">
                  Locked
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Unlocked counter */}
        <div className="px-5 mb-5">
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-paper/[0.06]" />
            <span className="text-paper/20 text-[10px] font-heading tracking-[0.2em] uppercase whitespace-nowrap">
              1 / 25 ARCS UNLOCKED
            </span>
            <div className="h-[1px] flex-1 bg-paper/[0.06]" />
          </div>
        </div>

        {/* Active Arc Banner */}
        {activeArcId && (
          <div className="px-5 pb-10">
            <button
              onClick={handleContinue}
              className="w-full text-left press-card"
            >
              <PanelCard
                tint={ARCS[activeArcId].tint}
                tintOpacity={0.2}
                className="p-5"
              >
                {/* "ACTIVE" badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: ARCS[activeArcId].tint }}
                  />
                  <span
                    className="text-[10px] font-heading tracking-[0.25em] uppercase font-bold"
                    style={{ color: ARCS[activeArcId].tint }}
                  >
                    ACTIVE ARC
                  </span>
                </div>

                <h2
                  className="font-heading text-3xl font-bold tracking-[0.06em] text-shadow-md leading-none"
                  style={{ color: ARCS[activeArcId].tint }}
                >
                  {ARCS[activeArcId].label}
                </h2>

                <p className="text-paper/35 text-xs font-heading tracking-wider mt-2 leading-relaxed">
                  Currently on Chapter {dayNumber}: {ARCS[activeArcId].subtitle}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid rgba(232,224,212,0.06)' }}>
                  <span className="text-paper/25 text-[10px] tracking-[0.15em] uppercase font-heading">
                    Continue &#8594;
                  </span>
                  <span className="text-paper/15 text-[10px] tracking-wider">
                    Day {dayNumber}
                  </span>
                </div>
              </PanelCard>
            </button>
          </div>
        )}

        {/* Footer */}
        {!activeArcId && (
          <div className="px-5 pb-10 mt-auto">
            <p className="text-center text-paper/10 text-[10px] tracking-[0.2em] uppercase font-heading">
              Select an arc to begin your journey
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
