import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ARCS } from '../data/arcs';
import PanelCard from '../components/PanelCard';

export default function Codex() {
  const navigate = useNavigate();
  const activeArcId = useAppStore((s) => s.activeArcId);
  const streak = useAppStore((s) => s.streak);
  const daily = useAppStore((s) => s.daily);
  const statsXP = useAppStore((s) => s.statsXP);
  const resetArc = useAppStore((s) => s.resetArc);
  const arc = ARCS[activeArcId!];

  const completedDays = Object.entries(daily)
    .filter(([_, entry]) => entry.allDone)
    .sort(([a], [b]) => b.localeCompare(a));

  const totalXP = Object.values(statsXP).reduce((a, b) => a + b, 0);

  const handleSwitchArc = () => {
    resetArc();
    navigate('/');
  };

  return (
    <div className="px-5 pt-10 pb-4">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[0.35em] uppercase opacity-40 font-heading mb-1">
          ARCHIVE
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-[0.04em] leading-none">
          CODEX
        </h1>
      </div>

      {/* Arc Lore */}
      <PanelCard tint={arc.tint} tintOpacity={0.12} className="p-5 mb-5">
        <h2
          className="font-heading text-2xl font-bold tracking-[0.08em] mb-2"
          style={{ color: arc.tint }}
        >
          {arc.label} ARC
        </h2>
        <p className="text-paper/50 text-sm leading-relaxed">
          {arc.description}
        </p>
      </PanelCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <PanelCard tint={arc.tint} tintOpacity={0.06} className="p-3.5 text-center">
          <p className="font-heading text-2xl font-bold leading-none">
            {streak}
          </p>
          <p className="text-[9px] uppercase tracking-[0.15em] opacity-30 mt-1.5 font-heading">
            Streak
          </p>
        </PanelCard>
        <PanelCard tint={arc.tint} tintOpacity={0.06} className="p-3.5 text-center">
          <p className="font-heading text-2xl font-bold leading-none">
            {completedDays.length}
          </p>
          <p className="text-[9px] uppercase tracking-[0.15em] opacity-30 mt-1.5 font-heading">
            Days Done
          </p>
        </PanelCard>
        <PanelCard tint={arc.tint} tintOpacity={0.06} className="p-3.5 text-center">
          <p className="font-heading text-2xl font-bold leading-none">
            {totalXP}
          </p>
          <p className="text-[9px] uppercase tracking-[0.15em] opacity-30 mt-1.5 font-heading">
            Total XP
          </p>
        </PanelCard>
      </div>

      {/* Completion Log */}
      <div className="mb-8">
        <h3 className="font-heading text-sm tracking-[0.15em] opacity-40 mb-3 uppercase">
          Completed Chapters
        </h3>
        {completedDays.length === 0 ? (
          <p className="text-paper/20 text-sm py-4">
            No chapters completed yet. Begin your first task.
          </p>
        ) : (
          <div>
            {completedDays.map(([date]) => (
              <div
                key={date}
                className="flex items-center gap-3 py-2.5"
                style={{
                  borderBottom: '1px solid rgba(232,224,212,0.04)',
                }}
              >
                <span style={{ color: arc.tint }} className="text-sm">
                  ✓
                </span>
                <span className="text-sm opacity-50 font-heading tracking-wider">
                  {date}
                </span>
                <span className="text-[10px] opacity-20 ml-auto">
                  +30 XP
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Switch Arc */}
      <div
        className="pt-6"
        style={{ borderTop: '1px solid rgba(232,224,212,0.06)' }}
      >
        <button
          onClick={handleSwitchArc}
          className="w-full py-3.5 font-heading text-xs tracking-[0.25em] uppercase text-paper/30 hover:text-paper/50 transition-colors duration-200"
          style={{
            border: '1px solid rgba(232,224,212,0.08)',
          }}
        >
          SWITCH ARC
        </button>
        <p className="text-center text-[10px] text-paper/15 mt-2 tracking-wider">
          Warning: switching resets all progress
        </p>
      </div>
    </div>
  );
}
