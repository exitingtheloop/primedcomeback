import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ARCS, STAT_LABELS } from '../data/arcs';
import { getTodayKey, getDayNumber } from '../utils/seed';
import PanelCard from '../components/PanelCard';

export default function Tasks() {
  const navigate = useNavigate();
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
  const pct = Math.round((completedCount / 3) * 100);

  return (
    <div className="px-5 pt-8 pb-4 relative">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-[2px] w-5" style={{ backgroundColor: arc.tint, opacity: 0.5 }} />
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-45 font-heading font-semibold label-clear">
            DAY {dayNumber} &middot; {arc.label}
          </span>
        </div>
        <h1 className="font-heading text-[42px] font-bold tracking-[0.02em] leading-[0.95]">
          DAILY<br />TASKS
        </h1>
      </div>

      {/* Progress section */}
      <div className="mb-6 mt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-heading font-semibold tracking-[0.15em] uppercase label-clear" style={{ color: arc.tint }}>
            {completedCount}/3 COMPLETED
          </span>
          {allDone && (
            <span className="text-[10px] font-heading font-bold tracking-[0.1em] uppercase label-clear" style={{ color: arc.tint }}>
              X ALL DONE
            </span>
          )}
        </div>
        {/* Segment dots */}
        <div className="flex gap-1.5 mt-2">
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
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <button
            key={task.templateId}
            onClick={() => toggleTask(today, i)}
            className="w-full text-left press-card"
          >
            <PanelCard
              tint={arc.tint}
              tintOpacity={task.completed ? 0.03 : 0.1}
              className={`transition-all duration-300 ${task.completed ? 'opacity-50' : ''}`}
            >
              <div className="flex items-stretch">
                {/* Left accent bar */}
                <div
                  className="w-1 flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: task.completed ? 'rgba(232,224,212,0.04)' : arc.tint,
                  }}
                />

                <div className="flex-1 p-4 pl-5 flex items-center gap-4">
                  {/* Checkbox — animated */}
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{
                      border: task.completed
                        ? 'none'
                        : '2px solid rgba(232,224,212,0.18)',
                      backgroundColor: task.completed ? arc.tint : 'transparent',
                    }}
                  >
                    {task.completed && (
                      <span className="text-ink text-sm font-bold check-pop">X</span>
                    )}
                  </div>

                  {/* Task Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-heading text-[15px] font-semibold tracking-[0.03em] leading-tight ${
                        task.completed ? 'line-through opacity-50' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {/* Stat badge */}
                      <span
                        className="text-[9px] uppercase tracking-[0.12em] font-heading font-bold px-2 py-0.5 label-clear"
                        style={{
                          backgroundColor: `${arc.tint}18`,
                          color: arc.tint,
                          border: `1px solid ${arc.tint}30`,
                        }}
                      >
                        {STAT_LABELS[task.stat]}
                      </span>
                      <span className="text-[10px] opacity-30 tracking-wider font-heading font-medium label-clear">
                        +{task.xp} XP
                      </span>
                    </div>
                  </div>

                  {/* Earned XP indicator */}
                  {task.completed && (
                    <div className="flex-shrink-0 self-center pl-2">
                      <span
                        className="text-xs font-heading font-bold tracking-wider check-pop"
                        style={{ color: arc.tint, opacity: 0.6 }}
                      >
                        +{task.xp}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </PanelCard>
          </button>
        ))}
      </div>

      {/* ── All Done State — big "DONE" banner ───────────────── */}
      {allDone && (
        <div className="mt-10 text-center relative">
          {/* Background glow */}
          <div
            className="absolute inset-0 -inset-x-8 -inset-y-4 opacity-10 blur-2xl pointer-events-none"
            style={{ backgroundColor: arc.tint }}
          />

          {/* Stamp */}
          <div className="inline-block relative stamp-slam pointer-events-none">
            <div
              className="border-[3px] px-12 py-4"
              style={{ borderColor: arc.tint, color: arc.tint }}
            >
              <p className="font-heading text-5xl font-bold tracking-[0.18em]">
                DONE
              </p>
            </div>
          </div>
          <p
            className="text-xs mt-6 tracking-wider font-heading font-semibold label-clear"
            style={{ color: `${arc.tint}90` }}
          >
            +10 BONUS XP EARNED (DISCIPLINE)
          </p>
          <p className="text-paper/20 text-[10px] mt-2 tracking-wider label-clear">
            All tasks cleared. Come back tomorrow.
          </p>

          {/* Navigation out of done state */}
          <div className="flex gap-2 mt-8 justify-center relative z-10">
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-3 font-heading text-xs tracking-[0.15em] uppercase font-semibold text-paper/30 hover:text-paper/45 press-card label-clear"
              style={{ border: '1px solid rgba(232,224,212,0.06)' }}
            >
              ← HOME
            </button>
            <button
              onClick={() => navigate('/status')}
              className="px-6 py-3 font-heading text-xs tracking-[0.15em] uppercase font-semibold press-card label-clear"
              style={{
                backgroundColor: `${arc.tint}15`,
                border: `1px solid ${arc.tint}30`,
                color: arc.tint,
              }}
            >
              VIEW STATUS →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
