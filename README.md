# ARC MODE

A mobile-first manga/noir self-improvement web app. Choose your arc, complete daily tasks, level up your stats.

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (styling)
- **React Router** (routing)
- **Zustand** (state management + localStorage persistence)
- No backend. No auth. Fully offline.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser (best experienced at mobile width ~390px).

## Pages

| Route      | Description                              |
| ---------- | ---------------------------------------- |
| `/`        | Arc Select — choose Redemption, Genius, or Winter |
| `/home`    | Dashboard — chapter, streak, tasks overview |
| `/tasks`   | Daily Tasks — complete 3 tasks for XP    |
| `/journey` | Journey — chapter timeline & history     |
| `/status`  | Status — 4 stats with levels & XP bars   |
| `/codex`   | Codex — arc lore, log, switch arc        |

## Game Loop

- Select an Arc → see your Home dashboard
- Complete **3 daily tasks** → each gives **+10 XP** to one stat
- Complete all 3 → **+10 bonus XP** (Discipline) + streak increment
- **Level** = `floor(xp / 100) + 1`
- Tasks are deterministically generated per day per arc (seeded shuffle)
- Progress persists via localStorage

## Build

```bash
npm run build
npm run preview
```
