export type Certification = {
  id: string;
  driveId: string;
  title: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  {
    id: "grab-rec",
    driveId: "1PVcy4W6B_qov782YD8HWGwFRcPwV58GC",
    title: "Recommendation Letter",
    issuer: "Grab",
    year: "2025",
  },
  {
    id: "aws-cloud-practitioner",
    driveId: "1N9GabfcJt01_P2WvETL-21X-H35QCui9",
    title: "AWS Cloud Practitioner — Cloud Quest",
    issuer: "AWS",
    year: "2025",
  },
  {
    id: "aws-genai-practitioner",
    driveId: "1Js1HV2nQVrtWz_NACNEwVvxaSDviC1oz",
    title: "AWS Gen AI Practitioner — Cloud Quest",
    issuer: "AWS",
    year: "2025",
  },
  {
    id: "aws-data-eng-foundations",
    driveId: "1cvKWtc5_fY4FPRS8mVkaf9nFcuO2a7ID",
    title: "AWS Data Engineering — Foundations",
    issuer: "AWS",
    year: "2025",
  },
  {
    id: "aws-ml-essentials",
    driveId: "1dDTAtq98wHi_BrXO1YkG9ybtmXwvIgcW",
    title: "AWS Machine Learning Essentials for Business",
    issuer: "AWS",
    year: "2025",
  },
  {
    id: "aws-ml-terminology",
    driveId: "1oSMEX6FsWKB8kN2ZEur0gmeX87jCy88f",
    title: "AWS Machine Learning Terminology",
    issuer: "AWS",
    year: "2025",
  },
  {
    id: "um-hackathon-2026-1st-ru",
    driveId: "11YIekqob1mrHA-4M1LVuzHNlM5Az_ZBI",
    title: "UM Hackathon 2026 — 1st Runner Up",
    issuer: "Universiti Malaya",
    year: "2026",
  },
  {
    id: "um-datathon-2025-2nd-ru",
    driveId: "1Abr7kz8MFERK-G87F8GESQg9ydoBLKdr",
    title: "UM Datathon 2025 — 2nd Runner Up",
    issuer: "Universiti Malaya",
    year: "2025",
  },
  {
    id: "um-hackathon-2025-qualifier",
    driveId: "1yhGB6MXaSr2S6wq702NdT6lXppPaPqYs",
    title: "UM Hackathon 2025 — Qualifier",
    issuer: "Universiti Malaya",
    year: "2025",
  },
  {
    id: "v-hack-2025-qualifier",
    driveId: "1oSZlm2f6JdZVwxfejxb5jx3WJXFZw5o-",
    title: "V HACK 2025 — Qualifier",
    issuer: "V HACK",
    year: "2025",
  },
  {
    id: "data-analysis-python-workshop",
    driveId: "1cUslwJ3cB-De3O98_akuYecmsc1rDw_3",
    title: "Data Analysis with Python — Workshop",
    issuer: "Workshop",
    year: "2024",
  },
  {
    id: "apu-vcl-23-24",
    driveId: "1zTIL8NWWLon-gmBkHIqwdOx4RuTWgcoU",
    title: "Vice Chancellor's List 2023/2024",
    issuer: "APU",
    year: "2024",
  },
  {
    id: "apu-vcl-24-25",
    driveId: "1WfmP1CcJSIwB4R4qe47Vy5sQhNTt7A_F",
    title: "Vice Chancellor's List 2024/2025",
    issuer: "APU",
    year: "2025",
  },
];

export const driveViewUrl = (driveId: string) =>
  `https://drive.google.com/file/d/${driveId}/view`;

export const drivePreviewUrl = (driveId: string) =>
  `https://drive.google.com/file/d/${driveId}/preview`;
