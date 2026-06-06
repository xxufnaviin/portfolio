import { useState, type ReactNode } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { profile } from "@/lib/data/profile";

export function ResumeViewer({ trigger }: { trigger: (open: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {trigger(() => setOpen(true))}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/70 backdrop-blur-sm p-2 md:p-6 animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Resume viewer"
        >
          <div
            className="relative w-full max-w-5xl h-[95vh] md:h-[90vh] rounded-2xl overflow-hidden bg-card border border-border elevated flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-b border-border bg-background/80 backdrop-blur">
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-wider text-primary">resume.pdf</div>
                <div className="text-sm font-medium truncate">{profile.fullName}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-muted transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Open
                </a>
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 grid place-items-center rounded-md border border-border hover:bg-muted transition"
                  aria-label="Close resume"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe
              src={`${profile.resumeUrl}#toolbar=1&view=FitH`}
              title="Naviin Raj resume"
              className="flex-1 w-full bg-muted"
            />
          </div>
        </div>
      )}
    </>
  );
}
