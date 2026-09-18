import type { IconType } from "react-icons";
import {
  SiReact,
  SiGo,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiNodedotjs,
  SiGithubactions,
  SiGithub,
  SiApachekafka,
  SiSpringboot,
  SiRabbitmq,
  SiJsonwebtokens,
  SiSupabase,
} from "react-icons/si";
import { VscTerminalLinux } from "react-icons/vsc";
import { HiOutlineCube, HiOutlineChip } from "react-icons/hi";
import { BiMemoryCard } from "react-icons/bi";

const map: Record<string, IconType> = {
  // stack tags – alineado a feat/delete-project (4 proyectos curados)
  react: SiReact,
  "react native": SiReact,
  caddy: SiNodedotjs,
  go: SiGo,
  gin: SiGo,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  supabase: SiSupabase,
  redis: SiRedis,
  docker: SiDocker,
  "docker compose": SiDocker,
  websockets: SiNodedotjs,
  "node proxy": SiNodedotjs,
  node: SiNodedotjs,
  "github actions": SiGithubactions,
  ghcr: SiGithub,
  github: SiGithub,
  kafka: SiApachekafka,
  "java 21": SiSpringboot,
  spring: SiSpringboot,
  "spring boot": SiSpringboot,
  "oracle 23c": SiPostgresql,
  spotify: SiNodedotjs,
  "spotify api": SiNodedotjs,
  rabbitmq: SiRabbitmq,
  jwt: SiJsonwebtokens,
  markdown: SiGithub,
  sast: HiOutlineCube,
  security: HiOutlineCube,
  // infra
  debian: VscTerminalLinux,
  cpu: HiOutlineChip,
  ram: BiMemoryCard,
  containers: HiOutlineCube,
};

export function getStackIcon(tag: string): IconType | null {
  const k = tag.toLowerCase().trim();
  if (map[k]) return map[k];
  // partial match
  for (const [key, icon] of Object.entries(map)) {
    if (k.includes(key) || key.includes(k)) return icon;
  }
  return null;
}

export function StackTagIcon({ tag, className = "h-3 w-3" }: { tag: string; className?: string }) {
  const Icon = getStackIcon(tag);
  if (!Icon) return null;
  return <Icon className={className} aria-hidden />;
}
