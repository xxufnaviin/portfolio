export const fyp = {
  name: "Logarda",
  tagline: "Cloud Monitoring System",
  period: "Apr 2026 – Present",
  platform: "AWS",
  repos: [
    { label: "Analytics", url: "https://github.com/xxufnaviin/logarda" },
    { label: "Backend", url: "https://github.com/xxufnaviin/logarda-api" },
  ],
  architecture: [
    "Client Agents",
    "Metrics Collection",
    "PostgreSQL Storage",
    "Redis Queue",
    "Data Processing",
    "Forecasting Engine",
    "LLM Inference",
    "Dashboard & Alerting",
  ],
  modules: [
    {
      id: "analytics",
      label: "Analytics Module",
      stack: ["Python", "Bash", "Docker", "CI/CD", "AWS ECR", "AWS EC2", "PostgreSQL", "Redis"],
      done: [
        "Automated data pipeline ingests compute metrics & logs into PostgreSQL",
        "Error logs queued in Redis for scalable downstream processing",
        "Containerized with Docker, deployed to ECR, runs as CRON on self-hosted EC2",
      ],
      doing: [
        "Data processing pipeline preparing metrics for time-series forecasting",
        "LLM inference pipeline backed by a RAG workflow over AWS documentation",
        "API endpoints for LLM inference on error log messages",
      ],
    },
    {
      id: "backend",
      label: "Backend Module",
      stack: ["Golang", "PostgreSQL", "Redis"],
      done: [
        "Scalable backend supporting concurrent users",
        "AES-GCM encryption and SHA-256 hashing for data security & integrity",
      ],
      doing: [
        "Metrics stream worker pushing live updates to the dashboard",
        "Error message inference worker monitoring the Redis queue",
        "API endpoints handling client-side requests in real time",
      ],
    },
  ],
  progress: {
    completed: [
      "Metrics ingestion",
      "Docker deployment",
      "EC2 deployment",
      "Security implementation",
    ],
    inProgress: [
      "Forecasting engine",
      "LLM inference service",
      "Redis workers",
      "Real-time dashboard updates",
    ],
  },
};
