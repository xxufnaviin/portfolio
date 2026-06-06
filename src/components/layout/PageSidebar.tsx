import { useEffect, useState } from "react";
import { List, X } from "lucide-react";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certificates" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

function Outline({ active, progress, onClick }: { active: string; progress: number; onClick?: (id: string) => void }) {
  return (
    <nav className="relative">
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground mb-3 px-2">Outline</div>
      <div className="relative">
        {/* track */}
        <div aria-hidden className="absolute left-0 top-1 bottom-1 w-px bg-border" />
        {/* progress fill */}
        <div
          aria-hidden
          className="absolute left-0 top-1 w-[2px] rounded-full bg-primary/70 transition-[height] duration-150"
          style={{ height: `calc(${progress * 100}% - 2px)` }}
        />
        <ul className="flex flex-col">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="relative">
                {isActive && (
                  <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                )}
                <a
                  href={`#${s.id}`}
                  onClick={() => onClick?.(s.id)}
                  className={cn(
                    "block pl-3 pr-1 py-1 text-[16px] transition-colors",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export function PageSidebar() {
  const active = useActiveSection(sections.map((s) => s.id));
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* desktop fixed-left sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-[110px] z-20">
        <div className="h-full overflow-y-auto py-8 px-2">
          <Outline active={active} progress={progress} />
        </div>
      </aside>

      {/* mobile floating trigger + drawer */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open sections"
        className="lg:hidden fixed bottom-5 right-5 z-30 h-11 w-11 grid place-items-center rounded-full border border-border bg-background/90 backdrop-blur shadow-lg"
      >
        <List className="h-4 w-4" />
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-background border-l border-border p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Sections</span>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 grid place-items-center rounded-md border border-border"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Outline active={active} progress={progress} onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
