export type SkillLayer = {
  id: string;
  label: string;
  description: string;
  items: string[];
};

export const skillLayers: SkillLayer[] = [
  {
    id: "programming",
    label: "Programming",
    description: "Languages and runtimes I write production code in.",
    items: ["Python", "Golang", "SQL", "Java", "C/C++", "JavaScript", "R", "YAML"],
  },
  {
    id: "data",
    label: "Data Engineering",
    description: "Building pipelines, orchestrating jobs, modelling state.",
    items: [
      "Apache Spark",
      "Apache Airflow",
      "PostgreSQL",
      "Redis",
      "ETL Pipelines",
      "Distributed Systems",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    description: "Shipping containers, infrastructure, and CI/CD.",
    items: [
      "AWS",
      "Google Cloud",
      "Docker",
      "CI/CD",
      "Terraform",
      "Bash",
      "ECS",
      "EC2",
      "ECR",
      "S3",
    ],
  },
  {
    id: "ai",
    label: "AI & ML",
    description: "Modelling, agents, and the visualisation layer on top.",
    items: [
      "Scikit-Learn",
      "Agentic AI",
      "MCP Server",
      "LLM",
      "Matplotlib",
      "Seaborn",
    ],
  },
];
