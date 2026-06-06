import grab1 from "@/assets/grab-1.png.asset.json";
import apuLogo from "@/assets/apu-logo.png.asset.json";

export type PipelineMedia =
  | { kind: "logo-image"; src: string; alt: string; sublabel?: string }
  | { kind: "logo-text"; label: string; sublabel?: string }
  | { kind: "carousel"; images: string[]; alt: string };

export type PipelineStage = {
  id: string;
  stage: string;
  category: string;
  kind: "source" | "processing" | "transformation" | "storage" | "analytics" | "deployment";
  active: boolean;
  comingSoon?: boolean;
  title?: string;
  subtitle?: string;
  period?: string;
  body?: string;
  bullets?: string[];
  tech?: string[];
  media?: PipelineMedia;
};

export const pipeline: PipelineStage[] = [
  {
    id: "source",
    stage: "Data Source",
    category: "Education",
    kind: "source",
    active: true,
    title: "Asia Pacific University",
    subtitle: "BSc (Hons) Computer Science — Data Analytics",
    period: "2022 – Present · CGPA 3.87",
    body: "Foundational training in distributed systems, databases, and statistical modelling — the upstream source feeding every project downstream.",
    bullets: [
      "Vice Chancellor's List 2023 / 2024",
      "Vice Chancellor's List 2024 / 2025",
      "Specialism in Data Analytics",
    ],
    tech: ["Python", "SQL", "R", "Statistics", "Algorithms"],
    media: { kind: "logo-image", src: apuLogo.url, alt: "Asia Pacific University", sublabel: "Asia Pacific University" },
  },
  {
    id: "preprocessing",
    stage: "Data Preprocessing",
    category: "Internship",
    kind: "processing",
    active: true,
    title: "Data Engineer Intern — Grab",
    subtitle: "Unified data platform · Spark on Kubernetes",
    period: "Jul 2025 – Nov 2025",
    body: "Shipped to a platform handling millions of jobs. Worked across the Spark, Airflow, and Kubernetes stack with full CI/CD ownership.",
    bullets: [
      "Migrated Spark jobs into unified platform architecture",
      "Packaged dependencies using Poetry and semantic versioning",
      "Automated deployment pipelines using GitLab CI/CD",
      "Refactored Airflow integrations using official Apache Airflow APIs",
      "Enhanced Spark-on-Kubernetes submission logic",
      "Implemented regex-based token masking for sensitive data",
      "Migrated and centralized Docker images into AWS ECR",
      "Executed large-scale dependency and secret-path migrations using AI-assisted tooling",
    ],
    tech: [
      "Apache Spark",
      "Apache Airflow",
      "AWS S3",
      "Kubernetes",
      "GitLab CI/CD",
      "AWS ECR",
      "Docker",
      "Golang",
      "PostgreSQL",
    ],
    media: {
      kind: "carousel",
      alt: "Naviin at Grab",
      images: [grab1.url],
    },
  },
  {
    id: "transformation",
    stage: "Data Transformation",
    category: "Coming Soon",
    kind: "transformation",
    active: true,
    comingSoon: true,
    title: "Coming up next",
    subtitle: "The next stage of the pipeline is currently being provisioned.",
    body: "Future role, project, or contribution will land here — focused on transformation, modelling, and downstream delivery.",
  },
];
