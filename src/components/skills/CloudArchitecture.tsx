import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Workflow, CloudCog, Brain } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { skillLayers } from "@/lib/data/skills";
import { TechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

const layerIcons: Record<string, React.ReactNode> = {
  programming: <Code2 className="h-4 w-4" />,
  data: <Workflow className="h-4 w-4" />,
  cloud: <CloudCog className="h-4 w-4" />,
  ai: <Brain className="h-4 w-4" />,
};

export function CloudArchitecture() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="skills" className="relative pt-10 pb-14">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="technical skills · architecture"
          title="An interconnected stack"
          description="Four infrastructure layers — each component is a tool I reach for to ship production systems."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillLayers.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl border border-border bg-card/80 backdrop-blur p-5 md:p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 text-primary">
                <div className="h-7 w-7 rounded-md bg-primary/10 grid place-items-center">
                  {layerIcons[layer.id]}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  layer · 0{idx + 1}
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-primary">{layer.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{layer.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {layer.items.map((item) => {
                  const key = `${layer.id}::${item}`;
                  const active = hover === key;
                  return (
                    <button
                      key={item}
                      onMouseEnter={() => setHover(key)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(key)}
                      onBlur={() => setHover(null)}
                      className={cn(
                        "group relative px-3 py-1.5 rounded-lg border text-sm transition-all duration-200",
                        active
                          ? "border-primary/60 bg-primary/10 text-foreground glow-emerald scale-[1.04]"
                          : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                        <TechIcon name={item} />
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

