import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #0c1a3a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            transform: "translateY(-50%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid rgba(59,130,246,0.35)",
            background: "rgba(59,130,246,0.08)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#60a5fa",
            }}
          />
          <span
            style={{
              color: "#60a5fa",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Software Developer
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1.05,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Juan David{" "}
          <span style={{ color: "#3b82f6" }}>Gil Diaz</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#64748b",
            marginBottom: 48,
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          Desarrollador Full-Stack especializado en{" "}
          <span style={{ color: "#cbd5e1" }}>Java · Spring Boot · Next.js</span>
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 10 }}>
          {["Java 21", "Spring Boot", "Next.js", "TypeScript", "PostgreSQL", "Docker"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: "rgba(30,41,59,0.8)",
                  border: "1px solid rgba(51,65,85,0.6)",
                  color: "#94a3b8",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            color: "#334155",
            fontSize: 16,
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          juandix.dev
        </div>
      </div>
    ),
    size
  );
}
