import { useEffect } from "react";
import { FiX, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { StackTagIcon } from "../../lib/stackIcons";
import type { ProjectLive, ProjectMeta } from "../../types/infra";

export function ProjectDrawer({
  meta,
  live,
  onClose,
  onRevalidate,
}: {
  meta: ProjectMeta | null;
  live?: ProjectLive;
  onClose: () => void;
  onRevalidate: () => void;
}) {
  useEffect(() => {
    if (!meta) return;
    onRevalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta?.id]);

  useEffect(() => {
    if (!meta) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Bloquear scroll de fondo en móvil cuando drawer abierto
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Ocultar top bar (vh.dev) para que no choque con el modal
    const header = document.querySelector(".header") as HTMLElement | null;
    header?.classList.add("header--hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      header?.classList.remove("header--hidden");
    };
  }, [meta, onClose]);

  if (!meta) return null;

  const isUp = live?.status === "up";
  const isUnknown = !live || live.status === "unknown";

  return (
    <>
      <button aria-label="Cerrar" onClick={onClose} className="fixed inset-0 z-[55] bg-black/45 backdrop-blur-[2px]" />

      {/* Desktop drawer — por encima del header (z-30) */}
      <aside className="hidden md:flex fixed right-0 top-0 z-[60] h-dvh w-[min(400px,92vw)] flex-col border-l bg-[var(--bg)] shadow-2xl" style={{ borderColor: "var(--border)" }}>
        <DrawerContent meta={meta} live={live} isUp={isUp} isUnknown={isUnknown} onClose={onClose} />
      </aside>

      {/* Mobile bottom-sheet — evita choque con top bar, safe-area */}
      <aside className="flex md:hidden fixed inset-x-0 bottom-0 z-[60] max-h-[78dvh] flex-col rounded-t-2xl border-t bg-[var(--bg)] shadow-2xl overflow-hidden pb-[env(safe-area-inset-bottom)]" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto mt-3 h-1 w-10 rounded-full" style={{ background: "var(--border)" }} />
        <div className="overflow-auto overscroll-contain">
          <DrawerContent meta={meta} live={live} isUp={isUp} isUnknown={isUnknown} onClose={onClose} />
        </div>
      </aside>
    </>
  );
}

function DrawerContent({
  meta,
  live,
  isUp,
  isUnknown,
  onClose,
}: {
  meta: ProjectMeta;
  live?: ProjectLive;
  isUp: boolean;
  isUnknown: boolean;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col min-h-0">
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`h-2 w-2 rounded-full shrink-0 ${isUnknown ? "bg-zinc-500" : isUp ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
            <h2 className="text-sm font-semibold truncate" style={{ color: "var(--text-main)" }}>{meta.title}</h2>
            <span className="text-xs font-mono" style={{ color: isUp ? "#10b981" : isUnknown ? "var(--node-muted)" : "#ef4444" }}>
              {isUnknown ? "offline" : isUp ? "online" : "offline"}
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--node-muted)" }}>{meta.description}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Cerrar panel"
          className="btn btn-icon shrink-0"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--node-muted)" }}
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-5 overflow-auto">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-subtle)" }}>
            <HiOutlineCube className="h-3.5 w-3.5" /> Arquitectura
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
            {meta.arch.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1.5 shrink-0">
                <div className="rounded-lg border px-2.5 py-2 text-center min-w-[84px]" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <div className="text-xs font-medium leading-tight" style={{ color: "var(--text-main)" }}>{step.label}</div>
                  {step.sublabel ? <div className="text-[11px] font-mono leading-tight" style={{ color: "var(--node-muted)" }}>{step.sublabel}</div> : null}
                </div>
                {i < meta.arch.length - 1 ? <FiArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--border)" }} /> : null}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-subtle)" }}>
            <span className={`h-2 w-2 rounded-full ${isUp ? "bg-emerald-500" : isUnknown ? "bg-zinc-500" : "bg-red-500"}`} /> Estado
          </div>
          <div className="rounded-lg border px-3 py-3 text-xs font-mono flex items-center gap-2" style={{ borderColor: "var(--border)", background: "var(--surface)", color: isUp ? "#10b981" : isUnknown ? "var(--node-muted)" : "#ef4444" }}>
            <span className={`h-2 w-2 rounded-full ${isUp ? "bg-emerald-500 animate-pulse" : isUnknown ? "bg-zinc-500" : "bg-red-500"}`} />
            {isUp ? "Operativo" : isUnknown ? "Offline — sin monitor" : "Offline"}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 rounded border px-2 py-1 text-xs font-mono" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-muted)" }}>
              <StackTagIcon tag={t} className="h-3.5 w-3.5 shrink-0" />
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pb-2">
          <a href={meta.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1">
            <FiExternalLink className="h-4 w-4" /> Abrir demo
          </a>
          {meta.githubUrl && meta.githubUrl !== meta.liveUrl && meta.id !== "auto-deploy" ? (
            <a href={meta.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
              <SiGithub className="h-4 w-4" /> GitHub
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
