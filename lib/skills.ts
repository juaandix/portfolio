import {
  SiSpringboot,
  SiPostgresql,
  SiDocker,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiGit,
} from "react-icons/si";
import { Coffee, Globe, Users } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

export type SkillIcon = IconType | LucideIcon;

export interface Skill {
  name: string;
  Icon: SkillIcon;
  color: string;
}

export const skills: Skill[] = [
  { name: "Java",            Icon: Coffee,       color: "#e76f00" },
  { name: "Spring Boot",     Icon: SiSpringboot, color: "#6db33f" },
  { name: "PostgreSQL",      Icon: SiPostgresql, color: "#4169e1" },
  { name: "Docker",          Icon: SiDocker,     color: "#2496ed" },
  { name: "REST APIs",       Icon: Globe,        color: "#60a5fa" },
  { name: "Next.js",         Icon: SiNextdotjs,  color: "#e2e8f0" },
  { name: "React",           Icon: SiReact,      color: "#61dafb" },
  { name: "TypeScript",      Icon: SiTypescript, color: "#3178c6" },
  { name: "Git",             Icon: SiGit,        color: "#f05032" },
  { name: "Team Leadership", Icon: Users,        color: "#94a3b8" },
];

/** Skills that have a real technology logo (used in the hero and the LinkedIn banner). */
export const techSkills = skills.filter(
  (s) => s.name !== "REST APIs" && s.name !== "Team Leadership",
);
