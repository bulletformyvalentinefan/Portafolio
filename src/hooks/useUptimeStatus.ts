import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import type { HeartbeatResponse, StatusPageResponse, ProjectLive, UptimeHeartbeat } from "../types/infra";
import { useMemo } from "react";

const HEARTBEAT_URL = (import.meta as unknown as { env: Record<string, string> }).env.VITE_STATUS_HEARTBEAT_URL;
const STATUS_PAGE_URL = (import.meta as unknown as { env: Record<string, string> }).env.VITE_STATUS_PAGE_URL;

function deriveLive(
  beats: UptimeHeartbeat[] | undefined,
  uptime24: number | undefined,
): ProjectLive {
  if (!beats || beats.length === 0) return { status: "unknown", pingMs: null, history: [], uptime24: uptime24 ?? null };
  const latest = beats[beats.length - 1];
  const status = latest.status === 1 ? "up" : latest.status === 0 ? "down" : "unknown";
  return {
    status,
    pingMs: latest.ping,
    history: beats.slice(-20).map((b) => b.ping),
    uptime24: uptime24 ?? null,
  };
}

export function useUptimeStatus() {
  const heartbeat = useSWR<HeartbeatResponse>(HEARTBEAT_URL || null, fetcher<HeartbeatResponse>, {
    refreshInterval: 20000,
    dedupingInterval: 15000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    errorRetryCount: 0,
    keepPreviousData: true,
    onError: () => {},
  });

  const statusPage = useSWR<StatusPageResponse>(STATUS_PAGE_URL || null, fetcher<StatusPageResponse>, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
    shouldRetryOnError: false,
    errorRetryCount: 0,
  });

  const liveByKumaId = useMemo(() => {
    const map: Record<string, ProjectLive> = {};
    const list = heartbeat.data?.heartbeatList ?? {};
    const uptimes = heartbeat.data?.uptimeList ?? {};
    for (const [kumaId, beats] of Object.entries(list)) {
      map[kumaId] = deriveLive(beats, uptimes[`${kumaId}_24`]);
    }
    return map;
  }, [heartbeat.data]);

  return {
    heartbeat,
    statusPage,
    liveByKumaId,
    isLoading: !heartbeat.data && !heartbeat.error,
    isError: !!heartbeat.error,
    mutate: heartbeat.mutate,
  };
}
