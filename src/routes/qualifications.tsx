import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  certifications,
  driveViewUrl,
  drivePreviewUrl,
} from "@/lib/data/certifications";

export const Route = createFileRoute("/qualifications")({
  head: () => ({
    meta: [
      { title: "Qualifications & Certifications — Naviin Raj" },
      {
        name: "description",
        content:
          "Full gallery of Naviin Raj's certifications and qualifications across data engineering, cloud infrastructure, and analytics.",
      },
      { property: "og:title", content: "Qualifications & Certifications — Naviin Raj" },
      {
        property: "og:description",
        content: "Certification gallery — full list of credentials and qualifications.",
      },
    ],
  }),
  component: QualificationsPage,
});

function QualificationsPage() {
  const router = useRouter();
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) router.history.back();
    else router.navigate({ to: "/" });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-5">
          <a
            href="/"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </a>


          <div className="mt-6">
            <SectionHeading
              eyebrow="qualifications · full gallery"
              title="All certifications"
              description="Every credential, embedded straight from source. Open any tile to view the full document in Google Drive."
            />
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-border bg-card overflow-hidden elevated flex flex-col hover:border-primary/40 transition"
              >
                <div className="relative h-72 bg-muted border-b border-border">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
