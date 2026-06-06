import { motion } from "framer-motion";
import { Database, Cpu, Wand2, Calendar, Lock } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { pipeline, type PipelineStage } from "@/lib/data/experience";
import { TechIcon } from "@/lib/tech-icons";
import { MediaCarousel } from "./MediaCarousel";

const icons: Record<PipelineStage["kind"], React.ReactNode> = {
  source: <Database className="h-5 w-5" />,
  processing: <Cpu className="h-5 w-5" />,
  transformation: <Wand2 className="h-5 w-5" />,
  storage: <Database className="h-5 w-5" />,
  analytics: <Cpu className="h-5 w-5" />,
  deployment: <Cpu className="h-5 w-5" />,
};

export function PipelineTimeline() {
  return (
    <section id="experience" className="relative pt-10 pb-14">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="experience · pipeline"
          title="Career as a data pipeline"
          description="Each role and milestone is a stage in the pipeline — flowing top to bottom."
        />

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <ol className="space-y-10">
            {pipeline.map((node, i) => (
              <TimelineRow key={node.id} node={node} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function MediaPanel({ node }: { node: PipelineStage }) {
  const media = node.media;
  if (!media) return null;

  if (media.kind === "carousel") {
    return <MediaCarousel images={media.images} alt={media.alt} />;
  }

  // ✅ LOGO IMAGE (FIXED WIDTH CONTROL)
  if (media.kind === "logo-image") {
    const isAPU = node.id === "apu";

    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg p-2">
        <div className="flex items-center justify-center bg-background rounded-xl p-4">
          <div className="flex-none">
            <img
              src={media.src}
              alt={media.alt}
              loading="eager"
              className={["object-contain", isAPU ? "w-[120px] max-w-[120px]" : "w-[200px] max-w-[200px]"].join(" ")}
            />
          </div>
        </div>
      </div>
    );
  }

  // logo-text variant
  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted shadow-lg p-2">
      <div className="relative w-full h-full rounded-xl bg-background/60 backdrop-blur flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
          {media.label}
        </div>
        {media.sublabel && (
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {media.sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineRow({ node, index }: { node: PipelineStage; index: number }) {
  const hasMedia = !!node.media && !node.comingSoon;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative flex gap-6"
    >
      {/* ICON */}
      <div className="relative w-12 flex-shrink-0 flex justify-center">
        <div
          className={[
            "relative z-10 h-12 w-12 grid place-items-center rounded-xl",
            node.comingSoon
              ? "border border-dashed border-border bg-background text-muted-foreground"
              : "bg-foreground text-background",
          ].join(" ")}
        >
          {icons[node.kind]}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 pt-1 min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
          stage · 0{index + 1} · {node.category}
        </div>

        {node.comingSoon ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-5 md:p-6">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-muted-foreground">{node.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{node.subtitle}</p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dashed border-border bg-muted/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <Lock className="h-3 w-3" /> coming soon
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6 elevated">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* TEXT */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{node.title}</h3>

                {node.subtitle && <p className="mt-1 text-sm md:text-base text-muted-foreground">{node.subtitle}</p>}

                {node.period && (
                  <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-primary">
                    <Calendar className="h-3.5 w-3.5" /> {node.period}
                  </div>
                )}

                {node.body && (
                  <p className="mt-4 text-foreground/85 leading-relaxed text-sm md:text-base">{node.body}</p>
                )}

                {node.bullets && (
                  <ul className="mt-4 space-y-1.5">
                    {node.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                        <span className="text-foreground/85">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {node.tech && (
                  <div className="mt-5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                      stack
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {node.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border bg-background/60 text-[11px] font-mono"
                        >
                          <TechIcon name={t} />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MEDIA */}
              {hasMedia && (
                <div className="w-full md:w-[340px] lg:w-[420px] flex-shrink-0">
                  <div className="max-h-[280px]">
                    <MediaPanel node={node} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.li>
  );
}
