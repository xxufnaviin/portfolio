import { motion } from "framer-motion";
import { Github, ArrowUpRight, Server } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HorizontalScroller } from "@/components/common/HorizontalScroller";
import { projects } from "@/lib/data/projects";
import { TechIcon } from "@/lib/tech-icons";


export function Projects() {
  return (
    <section id="projects" className="relative pt-10 pb-14 border-t border-border">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="projects · deployable services"
          title="Shipped systems, not slides"
          description="Each project is a deployable service in the infrastructure grid — architecture, stack, and source code."
        />

        <HorizontalScroller className="mt-10">
          <div className="flex gap-5 pb-2">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300 elevated flex flex-col snap-start shrink-0 w-[330px] md:w-[360px]"
              >
                <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-border bg-muted/40">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 rounded-md bg-primary/10 text-primary grid place-items-center shrink-0">
                      <Server className="h-3.5 w-3.5" />
                    </div>
                    <div className="font-mono text-[11px] truncate">
                      <span className="text-muted-foreground">svc/</span>
                      <span className="text-foreground">{p.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-primary shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                    deployed
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  {/* Title block — fixed height so image aligns across cards */}
                  <div className="min-h-[68px]">
                    <h3 className="text-lg font-semibold tracking-tight leading-snug">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.tagline}</p>
                    <div className="font-mono text-[11px] text-muted-foreground mt-1">{p.period}</div>
                  </div>

                  {/* Flow block — fixed height */}
                  <div className="mt-4 min-h-[52px] flex items-start flex-wrap gap-1">
                    {p.flow.map((n, idx) => (
                      <div key={n} className="flex items-center gap-1 min-w-0">
                        <span className="px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px] truncate">
                          {n}
                        </span>
                        {idx < p.flow.length - 1 && (
                          <span className="text-muted-foreground text-[10px]">→</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Highlights — fixed height */}
                  <ul className="mt-3 space-y-1.5 min-h-[56px]">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-xs text-foreground/80">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Cover image — pinned to same Y/X across cards */}
                  <div className="mt-4 -mx-5 border-y border-border bg-muted/30">
                    <img
                      src={p.cover}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-32 object-cover"
                    />
                  </div>

                  {/* Stack with logos */}
                  <div className="mt-4 flex flex-wrap gap-1.5 flex-1 content-start">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono"
                      >
                        <TechIcon name={t} />
                        {t}
                      </span>
                    ))}
                  </div>



                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <a
                      href={p.repo}
                      target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition"
                    >
                      <Github className="h-3.5 w-3.5" /> Source
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <span className="font-mono text-[10px] text-muted-foreground">v1.0.0</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </HorizontalScroller>
      </div>
    </section>
  );
}
