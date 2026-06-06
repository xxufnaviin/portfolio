import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FinalYearProject } from "@/components/fyp/FinalYearProject";

export const Route = createFileRoute("/fyp")({
  head: () => ({
    meta: [
      { title: "Final Year Project · Logarda — Naviin Raj" },
      {
        name: "description",
        content:
          "Logarda — a cloud monitoring system with ingestion, storage, forecasting, LLM inference, and live alerting. Final year project by Naviin Raj.",
      },
      { property: "og:title", content: "Final Year Project · Logarda — Naviin Raj" },
      {
        property: "og:description",
        content: "Cloud monitoring system end-to-end — Analytics + Backend modules, build status, and progress.",
      },
    ],
  }),
  component: FypPage,
});

function FypPage() {
  const router = useRouter();
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) router.history.back();
    else router.navigate({ to: "/" });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-5 pt-4">
          <a
            href="/"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </a>
        </div>
        <FinalYearProject />
      </main>
      <Footer />
    </div>
  );
}

