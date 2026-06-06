import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HorizontalScroller } from "@/components/common/HorizontalScroller";
import { achievements } from "@/lib/data/projects";

export function Achievements() {
  return (
    <section id="achievements" className="relative pt-10 pb-14 border-t border-border">
      <div className="mx-auto max-w-7xl px-5">

        <SectionHeading
          eyebrow="achievements · trophy cabinet"
          title="Wins worth keeping"
          description="A small cabinet — every trophy came with a real product behind it."
        />

        <HorizontalScroller className="mt-10">
          <div className="flex gap-5 pb-2">
            {achievements.map((a, i) => (
              <motion.div
                key={`${a.title}-${a.year}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6 overflow-hidden group hover:border-primary/40 transition snap-start shrink-0 w-[320px] md:w-[360px] flex flex-col"
              >
                <div
                  className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-30 blur-3xl"
                  style={{ background: "var(--gradient-glow)" }}
                />

                <div className="relative flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl" aria-hidden>{a.emoji}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {a.year}
                    </span>
                  </div>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-primary">
                    {a.rank}
                  </div>
                  <h3 className="text-lg font-semibold mt-1 leading-tight">{a.title} {a.year}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.event}</p>

                  <ul className="mt-4 space-y-1.5">
                    {a.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-xs text-foreground/80">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {a.image && (
                    <div className="mt-auto pt-5">
                      <div className="rounded-lg overflow-hidden border border-border bg-muted aspect-[4/3] relative">
                        {a.imageKind === "pdf" ? (
                          <>
                            <iframe
                              src={a.image}
                              title={a.title}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full pointer-events-none"
                            />
                            <div className="absolute inset-0" aria-hidden />
                          </>
                        ) : (
                          <img
                            src={a.image}
                            alt={`${a.title} ${a.year}`}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </HorizontalScroller>
      </div>
    </section>
  );
}
