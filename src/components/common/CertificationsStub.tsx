import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  certifications,
  driveViewUrl,
  drivePreviewUrl,
} from "@/lib/data/certifications";

const previewIds = [
  "grab-rec",
  "um-hackathon-2026-1st-ru",
  "aws-data-eng-foundations",
];

export function CertificationsStub() {
  const previews = previewIds
    .map((id) => certifications.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <section id="certs" className="pt-10 pb-14 border-t border-border">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="qualifications · certifications"
          title="Credential gallery"
          description="A few highlighted credentials — view the full set on the qualifications page."
        />

        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((c) => (
            <div
              key={c.id}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition elevated flex flex-col"
            >
              <div className="relative h-40 bg-muted border-b border-border">
                <iframe
                  src={drivePreviewUrl(c.driveId)}
                  title={c.title}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold leading-tight">{c.title}</h3>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {c.issuer} · {c.year}
                </div>
                <a
                  href={driveViewUrl(c.driveId)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline self-start"
                >
                  Open in Drive <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            to="/qualifications"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary/40 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition"
          >
            Show all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
