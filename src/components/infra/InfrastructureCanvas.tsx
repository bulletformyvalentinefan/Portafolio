import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import { useSystemStats } from "../../hooks/useSystemStats";
import { useUptimeStatus } from "../../hooks/useUptimeStatus";
import { PROJECTS } from "../../lib/monitorMap";
import type { ProjectMeta } from "../../types/infra";
import { ServerNode } from "./nodes/ServerNode";
import { ProjectNode } from "./nodes/ProjectNode";
import { ProjectDrawer } from "./ProjectDrawer";

const nodeTypes = { server: ServerNode, project: ProjectNode };

function useDotColor() {
  const [color, setColor] = useState("#27272a");
  useEffect(() => {
    const update = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--dot-color").trim();
      if (v) setColor(v);
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return color;
}

function getInitialNodes(): Node[] {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  // Distribución orgánica (no línea recta), respeta tamaño 280/300 + gap 60-80
  const positions = isMobile
    ? [
        { x: -165, y: 40 },
        { x: 165, y: 40 },
        { x: -165, y: 300 },
        { x: 165, y: 300 },
      ]
    : [
        { x: -480, y: 40 },
        { x: -150, y: 155 },
        { x: 150, y: 155 },
        { x: 480, y: 40 },
      ];
  return [
    {
      id: "server",
      type: "server",
      position: { x: 0, y: isMobile ? -190 : -210 },
      data: { stats: null, isLoading: true, isError: false },
      draggable: true,
    },
    ...PROJECTS.map((meta, i) => ({
      id: meta.id,
      type: "project",
      position: positions[i] ?? { x: (i - 1.5) * 280, y: 120 },
      data: { meta, live: undefined, isHeartbeatLoading: true },
      draggable: true,
    } as Node)),
  ];
}
const initialNodes: Node[] = getInitialNodes();

const initialEdges: Edge[] = PROJECTS.map((meta) => ({
  id: `e-server-${meta.id}`,
  source: "server",
  sourceHandle: "out",
  target: meta.id,
  targetHandle: "in",
  type: "smoothstep",
  animated: true,
  style: { stroke: "#52525b", strokeWidth: 1.6 },
}));

function CanvasInner() {
  const stats = useSystemStats();
  const uptime = useUptimeStatus();
  const { setCenter, getViewport } = useReactFlow();
  const [selected, setSelected] = useState<ProjectMeta | null>(null);
  const dotColor = useDotColor();
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync telemetría y estado sin resetear posiciones (mantiene drag)
  // Si homelab está down (telemetría error o 0 containers), forzar offline en todas las cards
  const homelabDown = !!stats.error || (!!stats.data && stats.data.docker.running_containers === 0);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "server") {
          return {
            ...n,
            data: {
              stats: stats.data ?? null,
              isLoading: !stats.data && !stats.error,
              isError: !!stats.error || homelabDown,
            },
          };
        }
        const meta = (n.data as unknown as { meta: ProjectMeta }).meta;
        if (!meta) return n;
        let live = meta.kumaId ? uptime.liveByKumaId[meta.kumaId] : undefined;
        // Homelab caído → todas las cards con kumaId pasan a offline, sin ping
        if (homelabDown && meta.kumaId) {
          live = { status: "down", pingMs: null, history: [], uptime24: null };
        }
        return {
          ...n,
          data: {
            meta,
            live,
            isHeartbeatLoading: !uptime.heartbeat.data && !uptime.heartbeat.error && !homelabDown,
          },
        };
      }),
    );
  }, [stats.data, stats.error, homelabDown, uptime.liveByKumaId, uptime.heartbeat.data, uptime.heartbeat.error, setNodes]);

  // Sync color de edges según estado (también offline si homelab caído)
  useEffect(() => {
    setEdges((eds) =>
      eds.map((e) => {
        const targetId = e.target;
        const meta = PROJECTS.find((p) => p.id === targetId);
        let live = meta?.kumaId ? uptime.liveByKumaId[meta.kumaId] : undefined;
        if (homelabDown && meta?.kumaId) live = { status: "down", pingMs: null, history: [], uptime24: null };
        const isDown = live?.status === "down";
        const isUnknown = !live || live.status === "unknown";
        const stroke = isDown ? "#ef4444" : isUnknown ? "#71717a" : "#10b981";
        const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return {
          ...e,
          animated: !prefersReduced && !isUnknown && live?.status === "up" && !homelabDown,
          style: { ...(e.style as object), stroke, strokeWidth: 1.6 },
        };
      }),
    );
  }, [uptime.liveByKumaId, homelabDown, setEdges]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (node.type === "project") {
        const meta = (node.data as unknown as { meta: ProjectMeta }).meta;
        setSelected(meta);
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        // Blur queda, pero sin zoom agresivo: mantener zoom actual con leve ajuste
        const viewport = getViewport();
        const currentZoom = Math.min(Math.max(viewport.zoom, 0.75), 0.95);
        const x = node.position.x + 140;
        const y = node.position.y + 70;
        // En móvil, subir un poco para no quedar bajo el bottom-sheet
        const yOffset = isMobile ? 90 : 0;
        setCenter(x, y - yOffset, { zoom: currentZoom, duration: 520 });
        void uptime.mutate();
      }
    },
    [setCenter, getViewport, uptime],
  );

  const handleClose = useCallback(() => setSelected(null), []);
  let selectedLive = selected?.kumaId ? uptime.liveByKumaId[selected.kumaId] : undefined;
  if (homelabDown && selected?.kumaId) {
    selectedLive = { status: "down", pingMs: null, history: [], uptime24: null };
  }

  return (
    <div className="infra-canvas-wrap relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.18, minZoom: 0.55, maxZoom: 1.35 }}
        minZoom={0.45}
        maxZoom={1.75}
        proOptions={{ hideAttribution: true }}
        className="!bg-transparent"
        defaultViewport={{ x: 0, y: 0, zoom: 0.95 }}
        panOnScroll={false}
        panOnDrag
        zoomOnPinch
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        style={{ touchAction: "none" }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color={dotColor} />
        <Controls showInteractive={false} position={isMobile ? "top-left" : "bottom-right"} />
      </ReactFlow>

      <ProjectDrawer meta={selected} live={selectedLive} onClose={handleClose} onRevalidate={() => void uptime.mutate()} />
    </div>
  );
}

export function InfrastructureCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
