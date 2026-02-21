import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ARCS, STAT_LABELS } from '../data/arcs';
import { getTodayKey, getDayNumber } from '../utils/seed';
import PanelCard from '../components/PanelCard';

export default function Tasks() {
  const activeArcId = useAppStore((s) => s.activeArcId);
  const startedAtDate = useAppStore((s) => s.startedAtDate);
  const daily = useAppStore((s) => s.daily);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const ensureDailyTasks = useAppStore((s) => s.ensureDailyTasks);

  const today = getTodayKey();
  const dayNumber = getDayNumber(startedAtDate);
  const arc = ARCS[activeArcId!];

  useEffect(() => {
    ensureDailyTasks(today);
  }, [today, ensureDailyTasks]);

  const entry = daily[today];
  if (!entry) return null;

  const { tasks, allDone } = entry;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="px-5 pt-8 pb-4 relative">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-[2px] w-5" style={{ backgroundColor: arc.tint, opacity: 0.5 }} />
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-35 font-heading">
            DAY {dayNumber} &middot; {arc.label}
          </span>
        </div>
        <h1 className="font-heading text-[42px] font-bold tracking-[0.02em] leading-[0.95]">
          DAILY<br />TASKS
        </h1>
      </div>

      {/* Progress count */}
      <div className="flex items-center gap-3 mb-6 mt-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-8 h-1 rounded-full transition-all duration-400"
              style={{
                backgroundColor: i < completedCount ? arc.tint : 'rgba(232,224,212,0.08)',
              }}
            />
          ))}
        </div>
        <span className="text-[10px] opacity-25 tracking-wider font-heading">
          {completedCount}/3
        </span>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <button
            key={task.templateId}
            onClick={() => toggleTask(today, i)}
            className="w-full text-left active:scale-[0.98] transition-transform duration-100"
          >
            <PanelCard
              tint={arc.tint}
              tintOpacity={task.completed ? 0.04 : 0.1}
              className={`transition-all duration-300 ${task.completed ? 'opacity-45' : ''}`}
            >
              <div className="flex items-stretch">
                {/* Left accent bar */}
                <div
                  className="w-1 flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: task.completed ? 'rgba(232,224,212,0.05)' : arc.tint,
                  }}
                />

                <div className="flex-1 p-4 pl-5 flex items-center gap-4">
                  {/* Checkbox */}
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      border: task.completed
                        ? 'none'
                        : '2px solid rgba(232,224,212,0.15)',
                      backgroundColor: task.completed ? arc.tint : 'transparent',
                    }}
                  >
                    {task.completed && (
                      <span className="text-ink text-sm font-bold">&#10003;</span>
                    )}
                  </div>

                  {/* Task Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-heading text-base tracking-[0.04em] leading-tight ${
                        task.completed ? 'line-through opacity-50' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {/* Stat badge */}
                      <span
                        className="text-[9px] uppercase tracking-[0.12em] font-heading font-bold px-2 py-0.5"
                        style={{
                          backgroundColor: `${arc.tint}18`,
                          color: arc.tint,
                          border: `1px solid ${arc.tint}30`,
                        }}
                      >
                        {STAT_LABELS[task.stat]}
                      </span>
                      <span className="text-[10px] opacity-25 tracking-wider font-heading">
                        +{task.xp} XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </PanelCard>
          </button>
        ))}
      </div>

      {/* All Done State */}
      {allDone && (
        <div className="mt-10 text-center relative">
          {/* Stamp */}
          <div className="inline-block relative">
            <div
              className="rotate-[-6deg] border-[3px] px-10 py-3"
              style={{ borderColor: arc.tint, color: arc.tint }}
            >
              <p className="font-heading text-4xl font-bold tracking-[0.15em]">
                COMPLETED!
              </p>
            </div>
          </div>
          <p className="text-paper/30 text-xs mt-6 tracking-wider font-heading">
            +10 BONUS XP EARNED (DISCIPLINE)
          </p>
          <p className="text-paper/15 text-[10px] mt-1.5 tracking-wider">
            All tasks cleared. Come back tomorrow for new challenges.
          </p>
        </div>
      )}
    </div>
  );
}
