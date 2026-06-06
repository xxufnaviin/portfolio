
## 1. Center the page (kill right-lean)

Problem: `main` uses `lg:pl-[140px] mx-auto max-w-[1340px]` so content shifts right by the sidebar width. Sidebar is `fixed left-0 w-[140px]`.

Fix in `src/routes/index.tsx`: drop `lg:pl-[140px]` and let `main` truly center; sidebar can overlap on narrow desktops. To minimize overlap, also tighten the outline in `src/components/layout/PageSidebar.tsx`:
- Sidebar width 140 → 120, text from `text-sm` → `text-[12px]`, eyebrow tighter, `px-3` → `px-2`.
- Shorten labels ("Technical Skills" → "Skills", "Certifications" → "Certs", "Achievements" → "Awards").

## 2. Tech Skills section — add logos

In `src/components/skills/CloudArchitecture.tsx`, render `<TechIcon name={item} />` inside each chip (already mapped in `src/lib/tech-icons.tsx`). Add a few missing aliases in `tech-icons.tsx`: `java`, `c/c++`, `yaml`, `aws`, `google cloud`, `terraform`, `bash`, `ecs`, `ec2`, `s3`, `scikit-learn` (exists), `matplotlib`, `seaborn`, `agentic ai` (exists), `mcp server`, `llm`, `etl pipelines`, `distributed systems`. Fall back to existing `Boxes` icon when unmapped (already does).

## 3. Career pipeline — full width, APU logo, Grab carousel

`src/components/experience/PipelineTimeline.tsx`:
- Remove the `max-w-4xl` wrapper so cards span the section's `max-w-7xl` (aligns with hero width).
- Extend `PipelineStage` type in `src/lib/data/experience.ts` with optional `media?: { kind: "logo" | "carousel"; src?: string; images?: string[]; alt?: string }`.
- Add APU logo asset (download official APU logo via a stable URL or use a text-based block if logo unavailable — propose uploading via `lovable-assets` from a fetched PNG; if fetching fails, render a styled "APU" wordmark card as fallback).
- For Grab node: upload grab1..grab5 via `lovable-assets create --file /mnt/user-uploads/grabN.png` into `src/assets/grab-N.jpg.asset.json` pointers, then add `images: [...]` to that stage.

Rendering inside `TimelineRow`: when `node.media` exists, change layout to two-column grid (`md:grid-cols-[1fr,260px]`) — text on left, media panel on right styled identically to `HeroGallery` (`aspect-square`, `rounded-2xl border border-border bg-muted shadow-lg p-2`, inner `rounded-xl`).
- `logo` → centered contained image with padding.
- `carousel` → reuse the same hero-style frame; create small `<MediaCarousel>` component using framer-motion fade + auto-advance every 3.5s, with prev/next dots; eager-loaded `<img>`s.

## 4. Contact — Slack popover polish + Send Message + email sending

`src/components/contact/ProfilePopover.tsx`:
- Widen panel: `max-w-[440px]`.
- Replace full-bleed square avatar with a centered framed avatar: `mx-auto mt-6 h-32 w-32 rounded-xl ring-4 ring-primary/30 border border-border overflow-hidden` (still square, not fill).
- Add role line: "Data Engineer" displayed prominently under the name (use a separate styled row).

`src/components/contact/CommandCenter.tsx`:
- Add a "Send Message" button (primary, with `MessageSquare` icon) above or beside the profile card. On click: scroll to terminal, focus input, and seed a guided flow.

`src/components/contact/Terminal.tsx`:
- Add a `message` command + a programmatic `startMessageFlow()` exposed via ref/context (simplest: lift state up by adding `useImperativeHandle` or a small event bus, or just pass a `seedFlow` prop from `CommandCenter`).
- Flow steps (collected line-by-line in terminal): your name → your email → subject → message body → confirm. Terminal stays in `inputMode: "flow"` until done.
- On confirm, POST to a new server function `sendContactEmail` that emails the form contents to `profile.email` ("naviin2373@gmail.com").

Email delivery requires backend. **Needs prerequisites**:
1. Enable Lovable Cloud.
2. Configure an email domain.
3. Run `setup_email_infra` + `scaffold_transactional_email`.
4. Add a "contact-message" template (single recipient = site owner, triggered by a specific user submission → qualifies as transactional).
5. Public action route `/api/public/contact` validates input (Zod) + rate-limits via simple in-memory token-bucket per IP, then calls `sendTransactionalEmail` server-side with `to: profile.email`.

If user doesn't want Cloud setup, fallback: `mailto:naviin2373@gmail.com?subject=...&body=...` opened in a new tab after confirm. I'll default to the mailto fallback unless Cloud is enabled, so the feature works immediately.

## 5. FYP architecture diagram (after Development Progress)

In `src/components/fyp/FinalYearProject.tsx`:
- Heading: increase "Logarda" prominence. Edit `src/components/common/SectionHeading.tsx` (or inline override here) to render the eyebrow split as a tiny "FINAL YEAR PROJECT ·" with a big bold "Logarda" word, and demote "A cloud monitoring system, observed end-to-end" to a smaller subtitle (`text-base md:text-lg text-muted-foreground`).
- After the Progress tracker block, append a new `<ArchitectureDiagram />` component.

`src/components/fyp/ArchitectureDiagram.tsx` (new): pure SVG/HTML built with theme tokens (no raw colors — uses `bg-card`, `border-border`, `text-primary`, `text-accent`). Layout mirrors the uploaded diagram:
- Top row: AWS CloudWatch source → flows into VPC; Train Time-Series Forecasting Models on the right.
- VPC group (dashed `border-primary/40` rounded box): ECR · EC2 Collector (Python CRON) · EC2 Postgres+Redis.
- Bottom row: GitHub repo (CI/CD arrow into ECR) · Logarda UI (Next.js) · Logarda API (Go workers + handlers) · Analytics API (Python: prediction, LLM inference, queries) · LLM (Llama) · RAG DB (AWS).
- Use `react-icons/si` for service logos (SiAmazonaws, SiDocker, SiPostgresql, SiRedis, SiPython, SiGo, SiNextdotjs, SiJavascript, SiGithub, SiScikitlearn, SiMeta).
- Connect blocks with simple SVG arrows (absolutely-positioned overlay or inline `<svg>` with manual paths). Responsive: collapses to vertical stack on `<md`.
- Wrap in `rounded-2xl border border-border bg-card p-6` with `font-mono` labels matching the rest of the site.

## 6. Image / PDF preloading

`src/routes/__root.tsx` — extend `links` with `rel: "preload"` entries (`as: "image"`) for all hero/section/project/grab images and `rel: "prefetch"` (`as: "document"`) for the certification Google Drive preview URLs (from `src/lib/data/certifications.ts` via `drivePreviewUrl`).
- Build the array dynamically: import asset JSONs + iterate certifications.
- Also add `<link rel="dns-prefetch" href="https://drive.google.com">` and `https://lh3.googleusercontent.com`.

## Files touched / created
- Edit: `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/components/layout/PageSidebar.tsx`, `src/components/skills/CloudArchitecture.tsx`, `src/components/experience/PipelineTimeline.tsx`, `src/lib/data/experience.ts`, `src/lib/tech-icons.tsx`, `src/components/contact/CommandCenter.tsx`, `src/components/contact/ProfilePopover.tsx`, `src/components/contact/Terminal.tsx`, `src/components/fyp/FinalYearProject.tsx`.
- New: `src/components/experience/MediaCarousel.tsx`, `src/components/fyp/ArchitectureDiagram.tsx`.
- New assets: `src/assets/grab-1..5.jpg.asset.json`, `src/assets/apu-logo.png.asset.json`.

## Open questions
1. Send Message email delivery: enable **Lovable Cloud + app email infra** (real send to your inbox), or use **`mailto:` fallback** (opens user's mail client, zero backend)? Default if you don't answer: mailto fallback.
2. APU logo: upload one yourself, or let me fetch the public APU crest? If neither works, I'll render a styled "APU" wordmark tile.
