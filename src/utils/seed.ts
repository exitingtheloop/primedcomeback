/** Simple deterministic hash from string to positive integer */
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/** Seeded Fisher-Yates shuffle for deterministic ordering */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Returns today's date as YYYY-MM-DD in local time */
export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

/** Calculate day number from start date */
export function getDayNumber(startedAtDate: string | null): number {
  if (!startedAtDate) return 1;
  const start = new Date(startedAtDate + 'T00:00:00');
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(diffMs / 86400000) + 1);
}

/** Calculate level from XP — level = floor(xp / 100) + 1 */
export function getLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}
