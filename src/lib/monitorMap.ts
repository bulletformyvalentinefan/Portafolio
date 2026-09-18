import type { ProjectMeta } from "../types/infra";

// heartbeatList keys -> project id (verified 2026-09-18 from /api/status-page/infra)
// 1=Plop Blog, 2=Expense Tracker, 3=Play Something
export const KUMA_ID_TO_PROJECT: Record<string, string> = {
  "1": "plop-blog",
  "2": "expense-tracker",
  "3": "play-something",
};

export const PROJECTS: ProjectMeta[] = [
  {
    id: "plop-blog",
    title: "Plop Blog",
    shortTitle: "Plop Blog",
    description: "Plataforma E2E con moderación y chat en tiempo real.",
    tags: ["Go", "React Native", "Supabase", "Redis", "WebSockets"],
    liveUrl: "https://plop.dpdns.org",
    githubUrl: "https://github.com/bulletformyvalentinefan",
    kumaId: "1",
    arch: [
      { label: "React Native", sublabel: "Expo + SWR" },
      { label: "Caddy", sublabel: "Reverse Proxy · TLS" },
      { label: "Go API", sublabel: "REST + WebSockets" },
      { label: "Supabase", sublabel: "PostgreSQL · Redis" },
    ],
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    shortTitle: "Expense Tracker",
    description: "Gestor financiero full-stack con Docker Compose.",
    tags: ["Go", "Gin", "PostgreSQL", "React", "Docker Compose"],
    liveUrl: "https://expensetracker.plop.blog",
    githubUrl: "https://github.com/bulletformyvalentinefan/expense-tracker",
    kumaId: "2",
    arch: [
      { label: "React 19", sublabel: "Vite + SPA" },
      { label: "Gin", sublabel: "GORM · JWT" },
      { label: "Go API", sublabel: "Billetera · Categorías" },
      { label: "PostgreSQL", sublabel: "Docker Compose" },
    ],
  },
  {
    id: "play-something",
    title: "Play Something",
    shortTitle: "Play Something",
    description: "Go proxy para Spotify con Redis y Docker.",
    tags: ["Go", "React", "Redis", "Docker", "Spotify API"],
    liveUrl: "https://playsomething.plop.blog",
    githubUrl: "https://github.com/bulletformyvalentinefan/play-something",
    kumaId: "3",
    arch: [
      { label: "React 19", sublabel: "Vite + Router" },
      { label: "Go Proxy", sublabel: "chi · go-librespot" },
      { label: "Redis 7", sublabel: "Cache appendonly" },
      { label: "Docker", sublabel: "GHCR · Healthcheck" },
    ],
  },
  {
    id: "auto-deploy",
    title: "Auto-Deploy Pipeline",
    shortTitle: "Auto-Deploy",
    description: "Watchtower + GH Actions → GHCR, sin downtime.",
    tags: ["Watchtower", "GitHub Actions", "GHCR", "Caddy"],
    liveUrl: "https://github.com/bulletformyvalentinefan",
    githubUrl: "https://github.com/bulletformyvalentinefan",
    kumaId: null,
    arch: [
      { label: "GitHub Actions", sublabel: "Test + Build" },
      { label: "GHCR", sublabel: "Registry" },
      { label: "Watchtower", sublabel: "Auto-update" },
      { label: "Docker", sublabel: "Rolling update" },
    ],
  },
];
