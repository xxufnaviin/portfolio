import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, Github, X, MessageSquare } from "lucide-react";
import { profile } from "@/lib/data/profile";
import profilePic from "@/assets/profile.png";

export function ProfilePopover({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (!panelRef.current?.contains(e.target as Node)) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-[440px] rounded-xl bg-popover border border-border shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 h-8 w-8 grid place-items-center rounded-md bg-background/80 backdrop-blur border border-border hover:bg-muted transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Framed square avatar (not full-bleed) */}
            <div className="pt-8 pb-4 px-6 bg-gradient-to-b from-muted/60 to-transparent flex justify-center">
              <div className="h-32 w-32 rounded-xl overflow-hidden ring-4 ring-primary/30 border border-border bg-background">
                <img src={profilePic} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="px-6 pb-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                <h2 className="text-lg font-semibold leading-tight">{profile.name}</h2>
              </div>
              <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[11px] uppercase tracking-wider">
                Data Engineer
              </div>
              <div className="mt-1.5 text-sm text-muted-foreground">{profile.role}</div>
              <div className="mt-1 text-xs text-muted-foreground/80">
                Active · {profile.location} · GMT+8
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <ActionBtn icon={<MessageSquare className="h-4 w-4" />} label="Message" href={`mailto:${profile.email}`} primary />
                <ActionBtn icon={<Phone className="h-4 w-4" />} label="Call" href={`tel:${profile.phone.replace(/\s/g, "")}`} />
                <ActionBtn icon={<Mail className="h-4 w-4" />} label="Email" href={`mailto:${profile.email}`} />
                <ActionBtn icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" href={profile.linkedin} external />
                <ActionBtn icon={<Github className="h-4 w-4" />} label="GitHub" href={profile.github} external />
              </div>

              <div className="mt-5 pt-4 border-t border-border space-y-2 text-xs">
                <Row label="Email" value={profile.email} />
                <Row label="Phone" value={profile.phone} />
                <Row label="Local time" value="Asia / Kuala Lumpur" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ActionBtn({
  icon, label, href, external, primary,
}: { icon: React.ReactNode; label: string; href: string; external?: boolean; primary?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={[
        "inline-flex items-center justify-center gap-2 h-9 rounded-md text-xs font-medium transition border",
        primary
          ? "bg-primary text-primary-foreground border-primary hover:opacity-90"
          : "bg-background border-border hover:bg-muted",
      ].join(" ")}
    >
      {icon}
      {label}
    </a>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground">{label}</span>
      <span className="truncate text-foreground/85">{value}</span>
    </div>
  );
}
