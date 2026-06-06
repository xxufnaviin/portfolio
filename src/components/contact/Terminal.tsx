import { useState, useRef, useEffect } from "react";
import { profile } from "@/lib/data/profile";

type Line = { kind: "input" | "output" | "system"; text: string };

const commands = ["help", "about", "projects", "contact", "resume", "skills", "clear", "whoami"];

function runCommand(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  switch (c) {
    case "help":
      return [{ kind: "output", text: `Available commands:\n  ${commands.join("  ")}` }];
    case "about":
      return [{
        kind: "output",
        text: `${profile.name} — CS student (Data Analytics specialism) @ APU.\nAspiring data engineer focused on cloud-native infrastructure, Spark, and pipeline orchestration.\nCurrently: Data Engineer Intern @ Grab.`,
      }];
    case "projects":
      return [{
        kind: "output",
        text: "  • Logarda — cloud monitoring system (final year project)\n  • Stocky AI — decision intelligence agent\n  • AuroraFlow — weather ETL platform\n  • L-Atelier — AI-powered trend analysis\n  → full grid coming in next deploy.",
      }];
    case "skills":
      return [{
        kind: "output",
        text: "python · golang · sql · spark · airflow · postgres · redis · aws · gcp · docker · k8s · terraform · ci/cd",
      }];
    case "contact":
      return [{
        kind: "output",
        text: `email   ${profile.email}\nphone   ${profile.phone}\nlinkedin ${profile.linkedin}\ngithub   ${profile.github}`,
      }];
    case "resume":
      window.open(profile.resumeUrl, "_blank");
      return [{ kind: "output", text: "→ opening resume in new tab…" }];
    case "whoami":
      return [{ kind: "output", text: "guest@naviin.dev" }];
    case "clear":
      return [{ kind: "system", text: "__clear__" }];
    default:
      return [{ kind: "output", text: `command not found: ${c}\ntype 'help' for available commands.` }];
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: "naviin.dev terminal · v1.0.0" },
    { kind: "output", text: "type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = (raw: string) => {
    const next: Line[] = [{ kind: "input", text: raw }];
    const result = runCommand(raw);
    if (result[0]?.text === "__clear__") {
      setLines([]);
    } else {
      setLines((l) => [...l, ...next, ...result]);
    }
    if (raw.trim()) setHistory((h) => [...h, raw]);
    setHIdx(-1);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni);
      setInput(history[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const ni = hIdx + 1;
      if (ni >= history.length) { setHIdx(-1); setInput(""); }
      else { setHIdx(ni); setInput(history[ni]); }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="rounded-xl border border-border bg-card text-foreground overflow-hidden elevated cursor-text"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/60">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">~/naviin/contact — zsh</span>
      </div>

      <div className="px-4 pt-3 flex flex-wrap gap-1.5">
        {commands.filter(c => c !== "clear").map((c) => (
          <button
            key={c}
            onClick={() => submit(c)}
            className="px-2 py-0.5 rounded font-mono text-[11px] bg-muted hover:bg-primary/15 text-muted-foreground hover:text-primary transition"
          >
            {c}
          </button>
        ))}
      </div>

      <div ref={scrollRef} className="px-4 py-3 h-72 overflow-y-auto font-mono text-[13px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {l.kind === "input" ? (
              <span><span className="text-primary">guest@naviin</span><span className="text-muted-foreground">:~$</span> {l.text}</span>
            ) : (
              <span className="text-foreground/80">{l.text}</span>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-primary">guest@naviin</span><span className="text-muted-foreground">:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="ml-2 flex-1 bg-transparent outline-none caret-primary text-foreground"
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  );
}
