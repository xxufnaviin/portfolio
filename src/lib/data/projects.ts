import stockyCover from "@/assets/stocky.jpg";
import auroraCover from "@/assets/auroraflow.jpg";
import latelierCover from "@/assets/l-atelier.jpg";
import medicalCover from "@/assets/medical-cost.jpg";
import lythiraCover from "@/assets/lythira.jpg";
import churnCover from "@/assets/customer-churn.jpg";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  period: string;
  stack: string[];
  highlights: string[];
  repo: string;
  flow: string[];
  cover: string;
};

export const projects: Project[] = [
  {
    id: "stocky",
    name: "Stocky AI",
    tagline: "Decision Intelligence Agent",
    period: "Apr 2026 – May 2026",
    stack: ["Python", "Agentic AI", "MCP", "Docker", "AWS ECS", "AWS ECR", "CI/CD"],
    highlights: ["Architected an Agentic AI + MCP system, dockerized to ECR/ECS with PyTest-backed CI/CD."],
    repo: "https://github.com/Vaarshh17/StockyAI",
    flow: ["User", "Agent Core", "MCP Tools", "API Services", "Response"],
    cover: stockyCover,
  },
  {
    id: "auroraflow",
    name: "AuroraFlow",
    tagline: "Weather ETL Platform",
    period: "Aug 2025 – Nov 2025",
    stack: ["Apache Spark", "Apache Airflow", "Docker", "GCS", "GCE", "Python"],
    highlights: ["Scalable PySpark + Airflow ETL containerized with Docker and deployed on GCE with GCS storage."],
    repo: "https://github.com/xxufnaviin/etl-spark-airflow",
    flow: ["Weather API", "Airflow DAG", "PySpark", "GCS", "Analytics"],
    cover: auroraCover,
  },
  {
    id: "latelier",
    name: "L-Atelier",
    tagline: "AI-Powered Trend Analysis Platform",
    period: "Sep 2025",
    stack: ["Airflow", "BigQuery", "FastAPI", "Python"],
    highlights: [
      "End-to-end YouTube → transcription → BigQuery pipeline served via FastAPI and orchestrated by Airflow.",
    ],
    repo: "https://github.com/xxufnaviin/L-Atelier",
    flow: ["YouTube", "Airflow", "Transcription", "BigQuery", "FastAPI"],
    cover: latelierCover,
  },
  {
    id: "medical-cost",
    name: "Medical Cost Prediction",
    tagline: "Regression for healthcare expenses",
    period: "Apr 2025 – May 2025",
    stack: ["Python", "pandas", "scikit-learn"],
    highlights: ["Tuned Decision Tree regressor with cross-validation reached R² ~0.83 on medical charges."],
    repo: "https://github.com/xxufnaviin/Medical-Cost-Prediction",
    flow: ["Data", "Preprocess", "Model", "Evaluation"],
    cover: medicalCover,
  },
  {
    id: "lythira",
    name: "Lythira – AI Healthcare Assistant",
    tagline: "Varsity Hackathon 2025",
    period: "Mar 2025 – Apr 2025",
    stack: ["React", "JavaScript", "Node.js", "HTML", "CSS"],
    highlights: ["AI assistant for disease management, health insights, and interactive medical learning."],
    repo: "https://github.com/xxufnaviin/Lythira-AI-Healthcare-Assistant",
    flow: ["User", "React UI", "Node API", "AI"],
    cover: lythiraCover,
  },
  {
    id: "customer-churn",
    name: "Customer Churn Prediction",
    tagline: "Logistic regression classifier",
    period: "Mar 2025",
    stack: ["Python", "pandas", "scikit-learn"],
    highlights: ["Logistic regression on a customer churn dataset reaching 95% prediction accuracy."],
    repo: "https://github.com/xxufnaviin/Customer-Churn-Prediction",
    flow: ["Data", "Preprocess", "Logistic Regression", "Prediction"],
    cover: churnCover,
  },
];

import ach2026 from "@/assets/ach-umhack2026.jpg";
import achDatathon from "@/assets/ach-umdatathon2025.jpg";
import ach2025 from "@/assets/ach-umhack2025.jpg";
import { drivePreviewUrl } from "@/lib/data/certifications";

export type Achievement = {
  rank: string;
  emoji: string;
  title: string;
  event: string;
  year: string;
  bullets: string[];
  image?: string;
  imageKind?: "img" | "pdf";
};

export const achievements: Achievement[] = [
  {
    rank: "1st Runner-Up",
    emoji: "🥈",
    title: "UM Hackathon",
    event: "Stocky AI — Decision Intelligence Agent",
    year: "2026",
    bullets: [
      "Built Stocky AI alongside teammates",
      "Designed the system architecture, wrote test cases, and handled automated deployments",
    ],
    image: ach2026,
    imageKind: "img",
  },
  {
    rank: "2nd Runner-Up",
    emoji: "🥉",
    title: "UM Datathon",
    event: "ML-based cash flow forecasting with executive dashboards",
    year: "2025",
    bullets: [
      "Built ML-powered cash flow forecasting with executive dashboards",
      "Created the Power BI dashboards and pitched part of the solution",
    ],
    image: achDatathon,
    imageKind: "img",
  },
  {
    rank: "Finalist",
    emoji: "🏅",
    title: "UM Hackathon",
    event: "Grabby AI — intelligent assistant for Grab merchants",
    year: "2025",
    bullets: [
      "Built Grabby AI, an assistant designed to help Grab merchants",
      "Coordinated tasks, delegated work, and led Q&A during live pitching",
    ],
    image: ach2025,
    imageKind: "img",
  },
  {
    rank: "Academic Honour",
    emoji: "🎓",
    title: "Vice Chancellor's List",
    event: "APU — 2024/2025 academic year",
    year: "2025",
    bullets: ["Recognised for outstanding academic performance at APU"],
    image: drivePreviewUrl("1WfmP1CcJSIwB4R4qe47Vy5sQhNTt7A_F"),
    imageKind: "pdf",
  },
  {
    rank: "Academic Honour",
    emoji: "🎓",
    title: "Vice Chancellor's List",
    event: "APU — 2023/2024 academic year",
    year: "2024",
    bullets: ["Recognised for outstanding academic performance at APU"],
    image: drivePreviewUrl("1zTIL8NWWLon-gmBkHIqwdOx4RuTWgcoU"),
    imageKind: "pdf",
  },
];
