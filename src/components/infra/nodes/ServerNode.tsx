import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { SiDocker } from "react-icons/si";
import { HiOutlineChip, HiServer } from "react-icons/hi";
import { BiMemoryCard } from "react-icons/bi";
import type { SystemStats } from "../../../types/infra";

export interface ServerNodeData extends Record<string, unknown> {
  stats?: SystemStats | null;
  isLoading: boolean;
  isError: boolean;
}

function Skeleton({ w = "w-20" }: { w?: string }) {
  return <span className={`inline-block h-3 ${w} animate-pulse rounded bg-zinc-200 dark:bg-zinc-800`} style={{ background: "var(--node-border)" }} />;
}

export const ServerNode = memo(function ServerNode({ data }: NodeProps) {
  const d = data as unknown as ServerNodeData;
  const s = d.stats;
  const pct = s?.memory.percent ?? 0;

  return (
    <div className="infra-node w-[min(300px,calc(100vw-32px))] md:w-[300px] rounded-xl border backdrop-blur shadow-xl cursor-grab active:cursor-grabbing">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b" style={{ borderColor: "var(--node-border)" }}>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-500/10 border border-zinc-500/20">
          <HiServer className="h-4 w-4" style={{ color: "var(--node-muted)" }} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="infra-node-muted text-[11px] font-medium tracking-widest font-mono uppercase">Homelab</div>
          <div className="infra-node-title text-sm font-semibold truncate">Self-hosted · Live</div>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse shrink-0" aria-hidden />
      </div>

      <div className="px-4 py-3 space-y-3">
        {d.isError ? (
          <div className="rounded-lg border border-red-900/40 bg-red-950/20 px-3 py-2 text-xs text-red-300 font-mono">
            Telemetría no disponible
          </div>
        ) : null}

        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 infra-node-muted">
            <HiOutlineChip className="h-3.5 w-3.5" /> CPU
          </span>
          <span className="infra-node-title font-medium">
            {d.isLoading && !s ? <Skeleton w="w-10" /> : `${s?.cpu_percent.toFixed(1) ?? "—"}%`}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 infra-node-muted">
              <BiMemoryCard className="h-3.5 w-3.5" /> RAM
            </span>
            <span className="infra-node-muted">
              {d.isLoading && !s ? <Skeleton w="w-24" /> : s ? `${pct.toFixed(1)}%` : "—"}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "var(--node-border)" }}>
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border px-3 py-2" style={{ borderColor: "var(--node-border)", background: "color-mix(in srgb, var(--node-bg) 60%, transparent)" }}>
          <span className="flex items-center gap-1.5 text-xs font-mono infra-node-muted">
            <SiDocker className="h-3.5 w-3.5 text-[#2496ED]" /> Containers
          </span>
          <span className="text-xs font-mono font-medium infra-node-title">
            {d.isLoading && !s ? <Skeleton w="w-12" /> : s ? `${s.docker.running_containers} activos` : "—"}
          </span>
        </div>

        <div className="text-[11px] font-mono infra-node-muted truncate">Homelab · online</div>
      </div>

      <Handle type="source" position={Position.Bottom} id="out" isConnectable={false} className="!bg-emerald-500 !border-white dark:!border-zinc-900 !w-2.5 !h-2.5" />
    </div>
  );
});
