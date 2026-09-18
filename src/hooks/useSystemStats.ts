import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import type { SystemStats } from "../types/infra";

const TELEMETRY_URL = (import.meta as unknown as { env: Record<string, string> }).env.VITE_TELEMETRY_URL;

export function useSystemStats() {
  // Si no hay URL (repo fork sin env), no fetchear
  return useSWR<SystemStats>(TELEMETRY_URL || null, fetcher<SystemStats>, {
    refreshInterval: 5000,
    dedupingInterval: 4000,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    keepPreviousData: true,
  });
}
