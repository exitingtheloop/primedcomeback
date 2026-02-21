import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ARCS, getChapterImage } from '../data/arcs';
import { getTodayKey, getDayNumber, getLevel } from '../utils/seed';
import PanelCard from '../components/PanelCard';

export default function Home() {
  const navigate = useNavigate();
  const activeArcId = useAppStore((s) => s.activeArcId);
  const startedAtDate = useAppStore((s) => s.startedAtDate);
  const streak = useAppStore((s) => s.streak);
  const daily = useAppStore((s) => s.daily);
  const statsXP = useAppStore((s) => s.statsXP);
  const ensureDailyTasks = useAppStore((s) => s.ensureDailyTasks);

  const today = getTodayKey();
  const dayNumber = getDayNumber(startedAtDate);
  const arc = ARCS[activeArcId!];
  const totalXP = Object.values(statsXP).reduce((a, b) => a + b, 0);
  const overallLevel = getLevel(totalXP);

  useEffect(() => {
    ensureDailyTasks(today);
  }, [today, ensureDailyTasks]);

  const todayEntry = daily[today];
  const tasksRemaining = todayEntry
    ? todayEntry.tasks.filter((t) => !t.completed).length
    : 3;
  const tasksCompleted = 3 - tasksRemaining;
  const allDone = todayEntry?.allDone ?? false;

  return (
    <div className="px-5 pt-8 pb-4">
      {/* Header: "CURRENTLY ON YOUR [ARC]" + DAY tag */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-45 font-heading font-semibold mb-1 label-clear">
            CURRENTLY ON YOUR
          </p>
          <h1
            className="font-heading text-4xl font-bold tracking-[0.04em] text-shadow-lg leading-none"
            style={{ color: arc.tint }}
          >
            {arc.label} ARC
          </h1>
        </div>
        <div
          className="flex-shrink-0 px-3 py-1.5 ml-3 mt-1"
          style={{
            backgroundColor: `${arc.tint}15`,
            border: `1px solid ${arc.tint}30`,
          }}
        >
          <span
            className="font-heading text-xs font-bold tracking-[0.15em] label-clear"
            style={{ color: arc.tint }}
          >
            DAY {dayNumber}
          </span>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <PanelCard tint={arc.tint} tintOpacity={0.06} className="p-3 text-center">
          <p className="font-heading text-xl font-bold leading-none">{streak}</p>
          <p className="text-[9px] uppercase tracking-[0.12em] opacity-35 mt-1 font-heading font-semibold label-clear">Streak</p>
        </PanelCard>
        <PanelCard tint={arc.tint} tintOpacity={0.06} className="p-3 text-center">
          <p className="font-heading text-xl font-bold leading-none" style={{ color: arc.tint }}>LV.{overallLevel}</p>
          <p className="text-[9px] uppercase tracking-[0.12em] opacity-35 mt-1 font-heading font-semibold label-clear">Level</p>
        </PanelCard>
        <PanelCard tint={arc.tint} tintOpacity={0.06} className="p-3 text-center">
          <p className="font-heading text-xl font-bold leading-none">{totalXP}</p>
          <p className="text-[9px] uppercase tracking-[0.12em] opacity-35 mt-1 font-heading font-semibold label-clear">Total XP</p>
        </PanelCard>
      </div>

      {/* Big Chapter Card */}
      <PanelCard tint={arc.tint} tintOpacity={0.15} bgImageUrl={getChapterImage(activeArcId!, dayNumber)} className="p-6 mb-5">
        {/* Chapter label */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="h-[2px] w-6"
            style={{ backgroundColor: arc.tint, opacity: 0.4 }}
          />
          <span
            className="text-[11px] font-heading tracking-[0.25em] uppercase font-bold label-clear"
            style={{ color: arc.tint }}
          >
            CHAPTER {dayNumber}
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-heading text-3xl font-bold leading-[1.05] tracking-[0.02em] text-paper mb-1">
          {arc.subtitle}
        </h2>
        <p className="text-paper/50 text-xs mb-6 tracking-wider label-clear">
          {arc.description.slice(0, 80)}...
        </p>

        {/* Challenge Status */}
        <div className="pt-4" style={{ borderTop: '1px solid rgba(232,224,212,0.06)' }}>
          {allDone ? (
            <div className="text-center py-2">
              <span
                className="font-heading text-2xl font-bold tracking-[0.1em]"
                style={{ color: arc.tint }}
              >
                X CHAPTER CLEARED
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline justify-between">
                <p className="font-heading text-lg font-bold tracking-[0.05em] text-paper leading-none">
                  {tasksRemaining} task{tasksRemaining !== 1 ? 's' : ''} remaining
                </p>
                <span className="text-[10px] font-heading font-semibold tracking-[0.1em] label-clear" style={{ color: arc.tint }}>
                  {tasksCompleted}/3
                </span>
              </div>
              <p className="text-paper/30 text-[11px] tracking-[0.1em] uppercase font-heading mt-1 label-clear">
                TO COMPLETE THIS CHAPTER
              </p>

              {/* Segment dots */}
              <div className="flex gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 flex-1 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor:
                        i < tasksCompleted ? arc.tint : 'rgba(232,224,212,0.08)',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </PanelCard>

      {/* Tasks Remaining Bar — live update */}
      <PanelCard tint={arc.tint} tintOpacity={0.05} className="px-5 py-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold leading-none">
              {tasksRemaining}
            </span>
            <span className="text-paper/35 text-xs tracking-[0.1em] uppercase font-heading font-semibold label-clear">
              {tasksRemaining === 3 ? 'TASKS REMAINING TODAY' : tasksRemaining === 0 ? 'ALL TASKS DONE!' : `TASK${tasksRemaining > 1 ? 'S' : ''} LEFT TODAY`}
            </span>
          </div>
          {/* Mini progress */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-sm transition-all duration-300"
                style={{
                  backgroundColor: i < tasksCompleted ? arc.tint : 'rgba(232,224,212,0.08)',
                }}
              />
            ))}
          </div>
        </div>
      </PanelCard>

      {/* CTA Button */}
      {allDone ? (
        <>
          {/* Static completion badge — not clickable */}
          <div
            className="w-full py-4 text-center font-heading text-base tracking-[0.2em] uppercase font-bold"
            style={{
              color: arc.tint,
              border: `2px solid ${arc.tint}`,
            }}
          >
            X DAY COMPLETE
          </div>

          {/* Post-completion actions */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => navigate('/status')}
              className="py-3 font-heading text-xs tracking-[0.15em] uppercase font-semibold press-card label-clear"
              style={{
                backgroundColor: `${arc.tint}15`,
                border: `1px solid ${arc.tint}30`,
                color: arc.tint,
              }}
            >
              VIEW STATUS
            </button>
            <button
              onClick={() => navigate('/journey')}
              className="py-3 font-heading text-xs tracking-[0.15em] uppercase font-semibold text-paper/30 hover:text-paper/45 press-card label-clear"
              style={{ border: '1px solid rgba(232,224,212,0.06)' }}
            >
              VIEW JOURNEY
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate('/tasks')}
            className="w-full py-4 font-heading text-base tracking-[0.2em] uppercase font-bold transition-all duration-200 press-card"
            style={{
              backgroundColor: arc.tint,
              color: '#0a0a0a',
              border: '2px solid transparent',
            }}
          >
            BEGIN TASKS →
          </button>

          {/* Journey link */}
          <button
            onClick={() => navigate('/journey')}
            className="w-full mt-3 py-3 font-heading text-xs tracking-[0.2em] uppercase text-paper/30 hover:text-paper/45 transition-colors duration-200 press-card label-clear"
            style={{ border: '1px solid rgba(232,224,212,0.06)' }}
          >
            VIEW JOURNEY · CHAPTER {dayNumber}
          </button>
        </>
      )}

      {/* Today's missions preview */}
      <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(232,224,212,0.04)' }}>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-25 font-heading font-semibold mb-3 label-clear">
          TODAY'S MISSIONS
        </p>
        {todayEntry?.tasks.map((task, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2.5"
            style={{ borderBottom: '1px solid rgba(232,224,212,0.03)' }}
          >
            <div
              className="w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors duration-200"
              style={{
                border: task.completed ? 'none' : '1.5px solid rgba(232,224,212,0.15)',
                backgroundColor: task.completed ? arc.tint : 'transparent',
              }}
            >
              {task.completed && (
                <span className="text-ink text-[10px] font-bold check-pop">X</span>
              )}
            </div>
            <span
              className={`text-sm font-heading font-medium tracking-wide ${
                task.completed ? 'opacity-25 line-through' : 'opacity-55'
              }`}
            >
              {task.title}
            </span>
            <span className="text-[9px] opacity-20 ml-auto tracking-wider whitespace-nowrap font-heading font-medium label-clear">
              +{task.xp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
