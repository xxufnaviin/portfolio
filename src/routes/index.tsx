import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { PageSidebar } from "@/components/layout/PageSidebar";
import { LandingAnimation } from "@/components/hero/LandingAnimation";
import { Hero } from "@/components/hero/Hero";
import { PipelineTimeline } from "@/components/experience/PipelineTimeline";
import { CloudArchitecture } from "@/components/skills/CloudArchitecture";

import { Projects } from "@/components/projects/Projects";
import { CertificationsStub } from "@/components/common/CertificationsStub";
import { Achievements } from "@/components/achievements/Achievements";
import { CommandCenter } from "@/components/contact/CommandCenter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naviin Raj — Data Engineer & Cloud Infrastructure" },
      {
        name: "description",
        content:
          "Naviin Raj — CS student specialising in Data Analytics, focused on data engineering, distributed computing, cluster management, and cloud infrastructure. Data Engineer Intern @ Grab.",
      },
      { property: "og:title", content: "Naviin Raj — Data Engineer & Cloud Infrastructure" },
      {
        property: "og:description",
        content:
          "Spark, Airflow, Kubernetes & cloud-native pipelines. CGPA 3.87, Vice Chancellor's List, hackathon podium finishes.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <LandingAnimation onDone={() => setReady(true)} />
      <div
        className="min-h-screen"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        <Nav />
        <PageSidebar />
        <main className="pt-16 mx-auto max-w-[1340px] px-4 lg:px-6 lg:pl-[130px] min-w-0">
          <Hero />
          <PipelineTimeline />
          <CloudArchitecture />
          <Projects />
          <CertificationsStub />
          <Achievements />
          <CommandCenter />
        </main>
        <Footer />
      </div>
    </>
  );
}

