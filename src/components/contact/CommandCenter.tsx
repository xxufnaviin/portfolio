import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Copy, Check } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { profile } from "@/lib/data/profile";
import { Terminal } from "./Terminal";
import { ProfilePopover } from "./ProfilePopover";
import profilePic from "@/assets/profile.png";


const channels = [
  { id: "email", label: "email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, copy: true },
  { id: "phone", label: "phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone, copy: true },
  { id: "linkedin", label: "linkedin", value: "/in/xxufnaviin", href: profile.linkedin, icon: Linkedin, copy: false },
  { id: "github", label: "github", value: "@xxufnaviin", href: profile.github, icon: Github, copy: false },
];

export function CommandCenter() {
  const [copied, setCopied] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);


  const copy = (id: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="contact" className="relative pt-10 pb-14 border-t border-border">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="contact · command center"
          title="Let's build pipelines together"
          description="Drop a message, copy a channel, or talk to the terminal — whichever feels right."
        />




        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="w-full text-left flex items-center gap-4 rounded-xl border border-border bg-card/70 backdrop-blur p-4 hover:border-primary/40 hover:bg-card transition cursor-pointer"
            >
              <img
                src={profilePic}
                alt={profile.name}
                className="h-14 w-14 rounded-md object-cover ring-2 ring-primary/40"
              />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm truncate">{profile.name}</div>
                <div className="text-xs text-muted-foreground truncate">{profile.role}</div>
                <div className="text-[11px] text-muted-foreground/80 mt-0.5">{profile.location}</div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-primary shrink-0">view</span>
            </button>

            {channels.map(({ id, label, value, href, icon: Icon, copy: canCopy }) => (
              <div
                key={id}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card/70 backdrop-blur p-4 hover:border-primary/40 transition"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <Icon className="h-4 w-4" />
                </div>
                <a href={href} target="_blank" rel="noreferrer" className="flex-1 min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="text-sm truncate text-primary group-hover:opacity-80 transition">{value}</div>
                </a>
                {canCopy && (
                  <button
                    onClick={() => copy(id, value)}
                    className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-muted transition"
                    aria-label={`copy ${label}`}
                  >
                    {copied === id ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
            ))}

            <div className="rounded-xl border border-dashed border-border p-4 bg-muted/30">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">timezone</div>
              <div className="text-sm mt-0.5">Asia / Kuala Lumpur · GMT+8</div>
            </div>
          </div>

          <Terminal />
        </div>
      </div>
      <ProfilePopover open={profileOpen} onClose={() => setProfileOpen(false)} />
    </section>
  );
}

