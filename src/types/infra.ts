// Payload: GET https://telemetry.plop.blog/api/system/stats
export interface SystemStats {
  os: string;
  uptime_hours: number;
  cpu_percent: number;
  memory: {
    used_mb: number;
    total_mb: number;
    percent: number;
  };
  docker: {
    running_containers: number;
    total_containers: number;
  };
}

// Payload: GET https://status.plop.blog/api/status-page/heartbeat/infra
export interface UptimeHeartbeat {
  status: 0 | 1 | 2; // 0=down,1=up,2=pending
  time: string;
  msg: string;
  ping: number;
}

export interface HeartbeatResponse {
  heartbeatList: Record<string, UptimeHeartbeat[]>;
  uptimeList: Record<string, number>;
}

// Payload: GET https://status.plop.blog/api/status-page/infra
export interface StatusPageResponse {
  config: {
    slug: string;
    title: string;
    description: string | null;
  };
  publicGroupList: {
    id: number;
    name: string;
    weight: number;
    monitorList: { id: number; name: string; sendUrl: number; type: string }[];
  }[];
}

export type ProjectLiveStatus = "up" | "down" | "unknown";

export interface ProjectLive {
  status: ProjectLiveStatus;
  pingMs: number | null;
  history: number[];
  uptime24: number | null;
}

export interface ArchStep {
  label: string;
  sublabel?: string;
}

export interface ProjectMeta {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string | null;
  kumaId: string | null; // key in heartbeatList; null = static (Auto-Deploy)
  arch: ArchStep[];
}
