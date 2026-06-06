import { profile } from "@/lib/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p className="font-mono">
          © {new Date().getFullYear()} {profile.name} · built with intent
        </p>
        <p className="font-mono text-xs">
          status: <span className="text-primary">● operational</span>
        </p>
      </div>
    </footer>
  );
}
