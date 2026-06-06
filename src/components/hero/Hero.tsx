import { motion } from "framer-motion";
import { Github, Linkedin, FileText, Mail, ArrowUpRight, Activity, Database, Cloud } from "lucide-react";
import { profile } from "@/lib/data/profile";
import { ResumeViewer } from "@/components/resume/ResumeViewer";
import { BackgroundGrid } from "./BackgroundGrid";
import { HeroGallery } from "./HeroGallery";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] pt-4 md:pt-6 pb-12 flex items-center overflow-hidden"
    >
      <BackgroundGrid />

      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center w-full">
        {/* Left: profile card morphed in from landing animation */}
        <motion.div
          layoutId="profile-card"
          className="rounded-3xl border border-border bg-card/80 backdrop-blur-md elevated p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row items-start gap-10">
            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                available · open to data engineering roles
              </div>

              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">{profile.name}</h1>

              <p className="mt-4 text-base md:text-lg text-foreground/80">{profile.role}</p>

              <p className="text-base md:text-lg text-gradient font-medium">{profile.subRole}</p>

              <p className="mt-5 max-w-xl text-muted-foreground leading-relaxed">{profile.tagline}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background/60 text-sm font-medium hover:bg-muted transition"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>

                <ResumeViewer
                  trigger={(open) => (
                    <button
                      onClick={open}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background/60 text-sm font-medium hover:bg-muted transition"
                    >
                      <FileText className="h-4 w-4" />
                      Resume
                    </button>
                  )}
                />

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 transition"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full max-w-[340px] lg:max-w-[360px] shrink-0 translate-x-[-8px] lg:translate-x-[-12px]">
              <HeroGallery />
            </div>
          </div>
        </motion.div>

        {/* Right: live metrics dashboard — 3 metrics left, sparkline right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <div className="space-y-3">
            <MetricCard
              icon={<Activity className="h-4 w-4" />}
              label="pipeline throughput"
              value="1.42M"
              unit="events/s"
              trend="+12.4%"
              color="primary"
            />
            <MetricCard
              icon={<Database className="h-4 w-4" />}
              label="storage layer · postgres"
              value="99.99"
              unit="% uptime"
              trend="green"
              color="accent"
            />
            <MetricCard
              icon={<Cloud className="h-4 w-4" />}
              label="active spark workers"
              value="248"
              unit="pods"
              trend="auto-scaling"
              color="jade"
            />
          </div>
          <Sparkline />
        </motion.div>
      </div>
    </section>
  );
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  trend: string;
  color: "primary" | "accent" | "jade";
}) {
  const dot = { primary: "bg-primary", accent: "bg-accent", jade: "bg-jade" }[color];
  return (
    <div className="rounded-xl border border-border bg-card/70 backdrop-blur p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-8 w-8 rounded-md bg-muted grid place-items-center text-muted-foreground">{icon}</div>
        <div className="min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground truncate">{label}</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-semibold tracking-tight text-primary">{value}</span>
            <span className="text-xs text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground shrink-0">
        <span className={`h-1.5 w-1.5 rounded-full ${dot} animate-pulse-glow`} />
        {trend}
      </div>

    </div>
  );
}

function Sparkline() {
  const points = [8, 14, 11, 18, 16, 22, 19, 26, 24, 30, 28, 34, 31, 38];
  const max = Math.max(...points);
  return (
    <div className="rounded-xl border border-border bg-card/70 backdrop-blur p-4 flex flex-col h-full min-h-[220px]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          requests · last 24h
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">p99 · 142ms</span>
      </div>
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full flex-1 min-h-[120px]">
        <defs>
          <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points.map((p, i) => `${(i / (points.length - 1)) * 100},${30 - (p / max) * 28}`).join(" ")}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points={`0,30 ${points.map((p, i) => `${(i / (points.length - 1)) * 100},${30 - (p / max) * 28}`).join(" ")} 100,30`}
          fill="url(#spark-fill)"
        />
      </svg>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>00:00</span>
        <span>now</span>
      </div>
    </div>
  );
}
