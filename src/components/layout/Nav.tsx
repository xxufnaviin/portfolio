import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, FileText } from "lucide-react";
import { useDarkMode } from "@/lib/hooks/useDarkMode";

import { ResumeViewer } from "@/components/resume/ResumeViewer";
import { cn } from "@/lib/utils";
import profilePic from "@/assets/profile.png";

type NavItem = { to: "/" | "/fyp" | "/qualifications"; label: string };

const items: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/fyp", label: "Final Year Project" },
  { to: "/qualifications", label: "Qualifications" },
];

export function Nav() {
  const { dark, toggle } = useDarkMode();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (it: NavItem) => location.pathname === it.to;

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm">
          <img
            src={profilePic}
            alt="Naviin Raj"
            className="h-8 w-8 rounded-md object-cover ring-2 ring-primary/40"
          />
          <span className="font-semibold tracking-tight">naviin<span className="text-primary">.raj</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map((it) => {
            const active = isActive(it);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={cn(
                  "relative px-3 py-1.5 text-sm rounded-md transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {it.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ResumeViewer
            trigger={(openFn) => (
              <button
                onClick={openFn}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition"
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </button>
            )}
          />
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-muted transition"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="lg:hidden h-9 w-9 grid place-items-center rounded-md border border-border"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-3 flex flex-col">
            {items.map((it) => {
              const active = isActive(it);
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-2 text-sm",
                    active ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {it.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
