import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { SiGithub } from "react-icons/si";
import { StackTagIcon } from "../../../lib/stackIcons";
import type { ProjectLive, ProjectMeta } from "../../../types/infra";

export interface ProjectNodeData extends Record<string, unknown> {
  meta: ProjectMeta;
  live?: ProjectLive;
  isHeartbeatLoading: boolean;
}

function StatusBadge({ live, isLoading }: { live?: ProjectLive; isLoading: boolean }) {
  if (isLoading && !live) {
    return <span className="inline-flex h-5 w-16 animate-pulse rounded-full" style={{ background: "var(--node-border)" }} />;
  }
  if (!live || live.status === "unknown") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-mono" style={{ borderColor: "var(--node-border)", background: "color-mix(in srgb, var(--node-bg) 80%, transparent)", color: "var(--node-muted)" }}>
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" /> offline
      </span>
    );
  }
  const isUp = live.status === "up";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-mono ${
        isUp ? "border-emerald-900/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50" : "border-red-900/50 bg-red-950/40 text-red-300"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isUp ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
      {isUp ? "online" : "offline"}
    </span>
  );
}

export const ProjectNode = memo(function ProjectNode({ data }: NodeProps) {
  const { meta, live, isHeartbeatLoading } = data as unknown as ProjectNodeData;
  const isStatic = !meta.kumaId;

  return (
    <div className="infra-node group w-[min(280px,calc(100vw-32px))] md:w-[280px] rounded-xl border backdrop-blur shadow-xl transition hover:shadow-2xl cursor-grab active:cursor-grabbing">
      <Handle type="target" position={Position.Top} id="in" isConnectable={false} className="!bg-zinc-400 dark:!bg-zinc-600 !border-white dark:!border-zinc-900 !w-2.5 !h-2.5" />

      <div className="px-4 pt-3.5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="infra-node-title text-sm font-semibold leading-tight pr-2">{meta.title}</h3>
          <StatusBadge live={live} isLoading={isHeartbeatLoading} />
        </div>
        <p className="infra-node-muted text-xs leading-relaxed line-clamp-2 mb-2.5">{meta.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {meta.tags.slice(0, 4).map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-mono" style={{ borderColor: "var(--node-border)", color: "var(--node-muted)", background: "color-mix(in srgb, var(--node-bg) 60%, transparent)" }}>
              <StackTagIcon tag={t} className="h-3 w-3 shrink-0" />
              {t}
            </span>
          ))}
          {meta.tags.length > 4 ? <span className="text-[11px] font-mono infra-node-muted">+{meta.tags.length - 4}</span> : null}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={meta.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-primary btn-small"
          >
            {isStatic ? <SiGithub className="h-3.5 w-3.5" /> : null}
            {isStatic ? "GitHub" : "Live"}
          </a>
          {meta.githubUrl && meta.githubUrl !== meta.liveUrl ? (
            <a
              href={meta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn btn-small"
            >
              <SiGithub className="h-3.5 w-3.5" /> Repo
            </a>
          ) : null}
          <span className="ml-auto text-[11px] font-mono infra-node-muted group-hover:opacity-100 opacity-60 transition">inspeccionar</span>
        </div>
      </div>
    </div>
  );
});
