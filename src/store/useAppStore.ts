import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ArcId, StatKey, ARCS } from '../data/arcs';
import { hashCode, seededShuffle } from '../utils/seed';

export interface DailyTask {
  templateId: string;
  title: string;
  stat: StatKey;
  xp: number;
  completed: boolean;
}

export interface DailyEntry {
  tasks: DailyTask[];
  allDone: boolean;
}

interface AppState {
  activeArcId: ArcId | null;
  startedAtDate: string | null;
  streak: number;
  lastCompletedDate: string | null;
  statsXP: Record<StatKey, number>;
  daily: Record<string, DailyEntry>;
}

interface AppActions {
  selectArc: (arcId: ArcId) => void;
  ensureDailyTasks: (today: string) => void;
  toggleTask: (today: string, taskIndex: number) => void;
  resetArc: () => void;
}

const INITIAL_STATS: Record<StatKey, number> = {
  discipline: 0,
  physicality: 0,
  wisdom: 0,
  intellect: 0,
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────
      activeArcId: null,
      startedAtDate: null,
      streak: 0,
      lastCompletedDate: null,
      statsXP: { ...INITIAL_STATS },
      daily: {},

      // ── Actions ────────────────────────────────────────────
      selectArc: (arcId) => {
        const today = new Date().toISOString().split('T')[0];
        set({
          activeArcId: arcId,
          startedAtDate: today,
          streak: 0,
          lastCompletedDate: null,
          statsXP: { ...INITIAL_STATS },
          daily: {},
        });
      },

      ensureDailyTasks: (today) => {
        const state = get();
        if (state.daily[today] || !state.activeArcId) return;

        const arc = ARCS[state.activeArcId];
        const seed = hashCode(today + state.activeArcId);
        const shuffled = seededShuffle(arc.taskPool, seed);
        const picked = shuffled.slice(0, 3);

        set({
          daily: {
            ...state.daily,
            [today]: {
              tasks: picked.map((t) => ({
                templateId: t.id,
                title: t.title,
                stat: t.stat,
                xp: t.xp,
                completed: false,
              })),
              allDone: false,
            },
          },
        });
      },

      toggleTask: (today, taskIndex) => {
        const state = get();
        const entry = state.daily[today];
        if (!entry) return;

        const task = entry.tasks[taskIndex];
        const isCompleting = !task.completed;

        // Toggle the task
        const newTasks = entry.tasks.map((t, i) =>
          i === taskIndex ? { ...t, completed: !t.completed } : t
        );

        const allDoneNow = newTasks.every((t) => t.completed);
        const wasAllDone = entry.allDone;

        // Calculate XP delta
        const newStatsXP = { ...state.statsXP };
        if (isCompleting) {
          newStatsXP[task.stat] += task.xp;
        } else {
          newStatsXP[task.stat] = Math.max(0, newStatsXP[task.stat] - task.xp);
        }

        // Handle bonus XP + streak
        let newStreak = state.streak;
        let newLastCompleted = state.lastCompletedDate;

        if (allDoneNow && !wasAllDone) {
          // Just completed all 3 tasks → bonus XP + streak
          newStatsXP.discipline += 10;
          newStreak = state.streak + 1;
          newLastCompleted = today;
        } else if (!allDoneNow && wasAllDone) {
          // Un-completed a task, removing the all-done status
          newStatsXP.discipline = Math.max(0, newStatsXP.discipline - 10);
          newStreak = Math.max(0, state.streak - 1);
        }

        set({
          daily: {
            ...state.daily,
            [today]: { tasks: newTasks, allDone: allDoneNow },
          },
          statsXP: newStatsXP,
          streak: newStreak,
          lastCompletedDate: newLastCompleted,
        });
      },

      resetArc: () => {
        set({
          activeArcId: null,
          startedAtDate: null,
          streak: 0,
          lastCompletedDate: null,
          statsXP: { ...INITIAL_STATS },
          daily: {},
        });
      },
    }),
    {
      name: 'arc-mode-v1',
      version: 1,
    }
  )
);
