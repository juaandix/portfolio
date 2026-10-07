import { techSkills } from "@/lib/skills";

type Props = {
  /** Show only the logos, without the technology names. */
  iconsOnly?: boolean;
  iconSize?: number;
  className?: string;
};

export default function TechLogos({ iconsOnly = false, iconSize = 16, className = "" }: Props) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {techSkills.map(({ name, Icon, color }) => (
        <li
          key={name}
          title={name}
          className={`flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-sm ${
            iconsOnly ? "p-2.5" : "px-3 py-1.5"
          }`}
        >
          <span className="shrink-0" style={{ color }}>
            <Icon size={iconSize} aria-hidden />
          </span>
          {iconsOnly ? (
            <span className="sr-only">{name}</span>
          ) : (
            <span className="text-xs text-slate-300">{name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
