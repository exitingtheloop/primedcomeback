import { useAppStore } from '../store/useAppStore';
import { ARCS } from '../data/arcs';
import { getDayNumber } from '../utils/seed';
import PanelCard from '../components/PanelCard';

export default function Journey() {
  const activeArcId = useAppStore((s) => s.activeArcId);
  const startedAtDate = useAppStore((s) => s.startedAtDate);
  const daily = useAppStore((s) => s.daily);
  const dayNumber = getDayNumber(startedAtDate);
  const arc = ARCS[activeArcId!];

  // Generate list of days from start to today (or at least 7)
  const totalDays = Math.max(dayNumber, 7);
  const days = Array.from({ length: totalDays }, (_, i) => {
    const dayNum = i + 1;
    const date = new Date(startedAtDate! + 'T00:00:00');
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().split('T')[0];
    const entry = daily[dateKey];
    return {
      dayNum,
      dateKey,
      completed: entry?.allDone ?? false,
      tasksCompleted: entry ? entry.tasks.filter((t) => t.completed).length : 0,
      isToday: dayNum === dayNumber,
      isFuture: dayNum > dayNumber,
    };
  });

  const completedCount = days.filter((d) => d.completed).length;

  return (
    <div className="px-5 pt-10 pb-4">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[0.35em] uppercase opacity-40 font-heading mb-1">
          {arc.label} ARC
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-[0.04em] leading-none">
          JOURNEY
        </h1>
        <p className="text-paper/25 text-xs mt-2 tracking-wider">
          {completedCount} chapter{completedCount !== 1 ? 's' : ''} completed
        </p>
      </div>

      {/* Day/Chapter List */}
      <div className="space-y-2">
        {days.map((day) => (
          <PanelCard
            key={day.dayNum}
            tint={arc.tint}
            tintOpacity={
              day.isToday ? 0.18 : day.completed ? 0.08 : 0.02
            }
            stamp={day.completed ? 'DONE' : undefined}
            className="p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Day indicator */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: day.completed || day.isToday
                      ? 'none'
                      : '1.5px solid rgba(232,224,212,0.1)',
                    backgroundColor: day.completed
                      ? arc.tint
                      : day.isToday
                        ? `${arc.tint}33`
                        : 'transparent',
                  }}
                >
                  {day.completed ? (
                    <span className="text-ink text-sm font-bold">✓</span>
                  ) : (
                    <span
                      className="text-sm font-heading font-bold"
                      style={{
                        color: day.isToday
                          ? arc.tint
                          : 'rgba(232,224,212,0.2)',
                      }}
                    >
                      {day.dayNum}
                    </span>
                  )}
                </div>

                <div>
                  <p
                    className={`font-heading tracking-[0.08em] text-sm ${
                      day.isFuture ? 'opacity-20' : ''
                    }`}
                  >
                    CHAPTER {day.dayNum}
                  </p>
                  <p className="text-[10px] opacity-25 mt-0.5">
                    {day.dateKey}
                  </p>
                </div>
              </div>

              {/* Status badge */}
              <div>
                {day.isToday && !day.completed && (
                  <span
                    className="text-[10px] uppercase tracking-[0.12em] font-heading px-2.5 py-1 rounded-sm font-bold"
                    style={{
                      backgroundColor: arc.tint,
                      color: '#0a0a0a',
                    }}
                  >
                    TODAY
                  </span>
                )}
                {day.isToday && day.completed && (
                  <span
                    className="text-[10px] uppercase tracking-[0.12em] font-heading"
                    style={{ color: arc.tint }}
                  >
                    CLEARED
                  </span>
                )}
                {!day.isToday && !day.completed && !day.isFuture && (
                  <span className="text-[10px] uppercase tracking-wider opacity-20">
                    {day.tasksCompleted}/3
                  </span>
                )}
                {day.isFuture && (
                  <span className="text-[10px] uppercase tracking-wider opacity-10">
                    LOCKED
                  </span>
                )}
              </div>
            </div>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}
