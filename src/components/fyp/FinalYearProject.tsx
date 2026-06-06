import { CheckCircle2, Loader2, Github, ArrowUpRight } from "lucide-react";
import { fyp } from "@/lib/data/fyp";

export function FinalYearProject() {
  return (
    <section id="fyp" className="relative pt-4 pb-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            final year project
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] pb-2 bg-gradient-to-br from-primary via-foreground to-accent bg-clip-text text-transparent">
            Logarda
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl">
            A cloud monitoring system, observed end-to-end — agents, ingestion, storage, forecasting, LLM inference, and live alerting in one platform.
          </p>
        </div>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">platform · {fyp.platform}</span>

          <span>{fyp.period}</span>

          {fyp.repos.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border hover:border-primary/40 hover:text-foreground transition"
            >
              <Github className="h-3 w-3" />
              {r.label}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
        </div>

        {/* Modules */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {fyp.modules.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-primary">module · {m.id}</div>
                  <h3 className="text-xl font-semibold mt-1">{m.label}</h3>
                </div>

                <a
                  href={fyp.repos.find((r) => r.label.toLowerCase() === m.id)?.url ?? fyp.repos[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 w-8 grid place-items-center rounded-md border border-border hover:bg-muted transition"
                  aria-label="GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* stack */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.stack.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-mono">
                    {t}
                  </span>
                ))}
              </div>

              {/* shipped */}
              <div className="mt-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">shipped</div>
                <ul className="space-y-1.5">
                  {m.done.map((b) => (
                    <li key={b} className="flex gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/85">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* in flight */}
              <div className="mt-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                  in flight
                </div>
                <ul className="space-y-1.5">
                  {m.doing.map((b) => (
                    <li key={b} className="flex gap-2 text-sm">
                      <Loader2
                        className="h-4 w-4 text-[var(--building)] animate-spin shrink-0 mt-0.5"
                        style={{ animationDuration: "3s" }}
                      />
                      <span className="text-foreground/85">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Progress tracker */}
        <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-primary">development progress</div>
              <h3 className="text-lg font-semibold mt-1">Build status · v0.4</h3>
            </div>

            <div className="font-mono text-xs text-muted-foreground">
              {fyp.progress.completed.length} shipped · {fyp.progress.inProgress.length} in flight
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <ProgressColumn title="Completed" items={fyp.progress.completed} status="done" />
            <ProgressColumn title="In Progress" items={fyp.progress.inProgress} status="doing" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressColumn({ title, items, status }: { title: string; items: string[]; status: "done" | "doing" }) {
  const dot = status === "done" ? "bg-primary" : "bg-[var(--building)] animate-pulse";

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{title}</span>
      </div>

      <ul className="space-y-2">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-center justify-between gap-3 text-sm py-1.5 border-b border-border/60 last:border-0"
          >
            <span>{it}</span>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${
                status === "done" ? "text-primary" : "text-[var(--building)]"
              }`}
            >
              {status === "done" ? "● shipped" : "◐ building"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
