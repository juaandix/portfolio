import type { Metadata } from "next";
import ProjectCollage from "@/components/ui/ProjectCollage";

export const metadata: Metadata = {
  title: "LinkedIn banner",
  robots: { index: false, follow: false },
};

// Fixed 1584×396 canvas (LinkedIn cover size). Screenshot it to get the banner PNG.
// Text sits on the right: LinkedIn's profile photo covers the bottom-left corner.
export default function Banner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div
        id="banner"
        className="relative overflow-hidden bg-slate-950 flex items-center justify-end"
        style={{ width: 1584, height: 396 }}
      >
        <ProjectCollage still lightShade tileWidth={300} />

        {/* Extra shade behind the text block */}
        <div className="absolute inset-y-0 right-0 w-[62%] bg-gradient-to-l from-slate-950/95 via-slate-950/75 to-transparent" />

        <div className="relative pr-24 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-blue-400 text-xs font-mono tracking-widest uppercase">
              Software Developer
            </span>
          </div>
          <h1 className="text-6xl font-bold tracking-tight leading-[1.05] mb-4">
            Juan David <span className="gradient-text-animated">Gil Diaz</span>
          </h1>
          <p className="text-slate-300 text-xl">
            Full-Stack · <span className="text-slate-100">Java · Spring Boot · Next.js</span>
          </p>
        </div>
      </div>
    </div>
  );
}
