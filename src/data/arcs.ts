export type ArcId = 'redemption' | 'genius' | 'winter';
export type StatKey = 'discipline' | 'physicality' | 'wisdom' | 'intellect';

export interface TaskTemplate {
  id: string;
  title: string;
  stat: StatKey;
  xp: number;
}

export interface Arc {
  id: ArcId;
  label: string;
  subtitle: string;
  description: string;
  tint: string;
  taskPool: TaskTemplate[];
}

export const ARCS: Record<ArcId, Arc> = {
  redemption: {
    id: 'redemption',
    label: 'REDEMPTION',
    subtitle: 'Rise From The Ashes',
    description:
      'The path of discipline and rebirth. Every fall is a lesson, every bruise a badge. You don\'t crawl back—you climb. Forge yourself through fire and silence the doubters with results.',
    tint: '#dc2626',
    taskPool: [
      { id: 'r-1', title: 'Wake before 6:00 AM', stat: 'discipline', xp: 10 },
      { id: 'r-2', title: 'No social media until noon', stat: 'discipline', xp: 10 },
      { id: 'r-3', title: 'Cold shower (2+ minutes)', stat: 'discipline', xp: 10 },
      { id: 'r-4', title: '100 Push-ups (any split)', stat: 'physicality', xp: 10 },
      { id: 'r-5', title: 'Run 2 miles', stat: 'physicality', xp: 10 },
      { id: 'r-6', title: '30-minute workout', stat: 'physicality', xp: 10 },
      { id: 'r-7', title: 'Read 20 pages', stat: 'wisdom', xp: 10 },
      { id: 'r-8', title: 'Write a journal entry', stat: 'wisdom', xp: 10 },
      { id: 'r-9', title: 'Meditate for 10 minutes', stat: 'wisdom', xp: 10 },
      { id: 'r-10', title: 'Study for 1 hour', stat: 'intellect', xp: 10 },
      { id: 'r-11', title: 'Write down 3 goals', stat: 'intellect', xp: 10 },
      { id: 'r-12', title: 'Plan tomorrow tonight', stat: 'intellect', xp: 10 },
    ],
  },
  genius: {
    id: 'genius',
    label: 'GENIUS',
    subtitle: 'Unlock Your Mind',
    description:
      'The path of knowledge and mastery. Your mind is the sharpest weapon you own. Feed it problems, starve it distractions. Genius isn\'t born—it\'s built in the hours nobody sees.',
    tint: '#06b6d4',
    taskPool: [
      { id: 'g-1', title: 'Deep focus session (1 hr)', stat: 'discipline', xp: 10 },
      { id: 'g-2', title: 'No distractions until 2 PM', stat: 'discipline', xp: 10 },
      { id: 'g-3', title: 'Organize your workspace', stat: 'discipline', xp: 10 },
      { id: 'g-4', title: 'Morning stretch routine', stat: 'physicality', xp: 10 },
      { id: 'g-5', title: '20-min walk (no phone)', stat: 'physicality', xp: 10 },
      { id: 'g-6', title: 'Posture check every hour', stat: 'physicality', xp: 10 },
      { id: 'g-7', title: 'Read 30 pages', stat: 'wisdom', xp: 10 },
      { id: 'g-8', title: 'Teach someone one concept', stat: 'wisdom', xp: 10 },
      { id: 'g-9', title: 'Watch a lecture or documentary', stat: 'wisdom', xp: 10 },
      { id: 'g-10', title: 'Solve 3 problems', stat: 'intellect', xp: 10 },
      { id: 'g-11', title: 'Write 500 words', stat: 'intellect', xp: 10 },
      { id: 'g-12', title: 'Practice a skill for 1 hour', stat: 'intellect', xp: 10 },
    ],
  },
  winter: {
    id: 'winter',
    label: 'WINTER',
    subtitle: 'Endure The Cold',
    description:
      'The path of resilience and endurance. When the world freezes over, you keep moving. Comfort is the enemy. The cold strips away weakness and leaves only what\'s unbreakable.',
    tint: '#60a5fa',
    taskPool: [
      { id: 'w-1', title: 'Cold exposure (3 minutes)', stat: 'discipline', xp: 10 },
      { id: 'w-2', title: 'No comfort food today', stat: 'discipline', xp: 10 },
      { id: 'w-3', title: 'Breathwork session (Wim Hof)', stat: 'discipline', xp: 10 },
      { id: 'w-4', title: 'Heavy lifting session', stat: 'physicality', xp: 10 },
      { id: 'w-5', title: 'Sprint intervals', stat: 'physicality', xp: 10 },
      { id: 'w-6', title: 'Fasted morning walk', stat: 'physicality', xp: 10 },
      { id: 'w-7', title: 'Read in silence (30 min)', stat: 'wisdom', xp: 10 },
      { id: 'w-8', title: 'Write a reflection', stat: 'wisdom', xp: 10 },
      { id: 'w-9', title: 'Mindful eating practice', stat: 'wisdom', xp: 10 },
      { id: 'w-10', title: 'Problem-solving drill', stat: 'intellect', xp: 10 },
      { id: 'w-11', title: 'Deep study session (1 hr)', stat: 'intellect', xp: 10 },
      { id: 'w-12', title: 'Strategy planning (30 min)', stat: 'intellect', xp: 10 },
    ],
  },
};

export const STAT_LABELS: Record<StatKey, string> = {
  discipline: 'DISCIPLINE',
  physicality: 'PHYSICALITY',
  wisdom: 'WISDOM',
  intellect: 'INTELLECT',
};

export const STAT_ICONS: Record<StatKey, string> = {
  discipline: '⚡',
  physicality: '💪',
  wisdom: '📖',
  intellect: '🧠',
};

export const ALL_STATS: StatKey[] = ['discipline', 'physicality', 'wisdom', 'intellect'];
