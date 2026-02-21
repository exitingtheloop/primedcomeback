import { useAppStore } from '../store/useAppStore';
import { ARCS, ALL_STATS, STAT_LABELS, STAT_ICONS, StatKey } from '../data/arcs';
import { getLevel } from '../utils/seed';
import PanelCard from '../components/PanelCard';

/** Abstract SVG shapes — posterized by PanelCard's duotone-base */
function StatBgElement({ stat, tint }: { stat: StatKey; tint: string }) {
  switch (stat) {
    case 'physicality':
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <polygon points="0,60 30,0 50,60" fill={tint} opacity="0.12" />
          <polygon points="40,60 70,10 100,60" fill={tint} opacity="0.08" />
          <rect x="75" y="20" width="20" height="40" fill={tint} opacity="0.05" />
        </svg>
      );
    case 'discipline':
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <rect x="5" y="5" width="25" height="50" fill={tint} opacity="0.10" />
          <rect x="35" y="15" width="25" height="40" fill={tint} opacity="0.07" />
          <rect x="65" y="10" width="30" height="45" fill={tint} opacity="0.12" />
        </svg>
      );
    case 'wisdom':
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <circle cx="25" cy="30" r="22" fill={tint} opacity="0.10" />
          <circle cx="72" cy="35" r="16" fill={tint} opacity="0.07" />
        </svg>
      );
    case 'intellect':
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <polygon points="50,2 98,58 2,58" fill={tint} opacity="0.10" />
          <polygon points="50,18 80,50 20,50" fill="black" opacity="0.04" />
        </svg>
      );
  }
}

export default function Status() {
  const activeArcId = useAppStore((s) => s.activeArcId);
  const statsXP = useAppStore((s) => s.statsXP);
  const arc = ARCS[activeArcId!];

  return (
    <div className="px-5 pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-[2px] w-5" style={{ backgroundColor: arc.tint, opacity: 0.5 }} />
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-35 font-heading">
            {arc.label} ARC
          </span>
        </div>
        <h1 className="font-heading text-[42px] font-bold tracking-[0.02em] leading-[0.95]">
          STATUS
        </h1>
      </div>

      {/* Stat Panels — PanelCard with full overlay stack + abstract bg */}
      <div className="space-y-3">
        {ALL_STATS.map((stat) => {
          const xp = statsXP[stat];
          const level = getLevel(xp);
          const xpInLevel = xp % 100;

          return (
            <PanelCard
              key={stat}
              tint={arc.tint}
              tintOpacity={0.10}
              bgElement={<StatBgElement stat={stat} tint={arc.tint} />}
              overlayIntensity="heavy"
              className="p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{STAT_ICONS[stat]}</span>
                  <span className="font-heading text-lg tracking-[0.1em] uppercase font-bold">
                    {STAT_LABELS[stat]}
                  </span>
                </div>
                <span
                  className="font-heading text-2xl font-bold tracking-[0.06em]"
                  style={{ color: arc.tint }}
                >
                  LVL {level}
                </span>
              </div>

              {/* XP Bar */}
              <div className="h-2 bg-paper/[0.06] overflow-hidden">
                <div
                  className="h-full transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.max(xpInLevel, 3)}%`,
                    backgroundColor: arc.tint,
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] opacity-25 tracking-wider font-heading">
                  {xp} XP
                </span>
                <span className="text-[10px] opacity-20 tracking-wider">
                  {xpInLevel}/100 to next
                </span>
              </div>
            </PanelCard>
          );
        })}
      </div>
    </div>
  );
}
