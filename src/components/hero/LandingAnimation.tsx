import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "naviin-landing-seen";

export function LandingAnimation({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    const has = sessionStorage.getItem(KEY) === "1";
    setSeen(has);

    if (has || reduce) {
      onDone();
    }
  }, [onDone, reduce]);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  if (seen === null || seen || reduce) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      transition={{
        duration: 3.4,
        times: [0, 0.7, 0.9, 1],
        ease: "linear",
      }}
      onAnimationComplete={() => {
        sessionStorage.setItem(KEY, "1");
        onDone();
      }}
      aria-hidden
    >
      {/* Road */}
      <div className="absolute inset-x-0 bottom-[42%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-[40%] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      {/* Background grid (make sure bg-grid exists in your CSS/Tailwind config) */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Profile Card */}
      <motion.div
        layoutId="profile-card"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] rounded-2xl border border-border bg-card shadow-xl p-5"
        initial={{ opacity: 0, y: -120, scale: 0.6 }}
        animate={{
          opacity: [0, 0, 1, 1],
          y: [-120, -120, 0, 0],
          scale: [0.6, 0.6, 1, 1],
        }}
        transition={{
          duration: 3.4,
          times: [0, 0.45, 0.65, 1],
          ease,
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center text-white font-bold">
            N
          </div>

          <div>
            <div className="font-semibold leading-tight">Naviin Raj</div>
            <div className="text-xs text-muted-foreground font-mono">data.engineer</div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "0%", "100%"] }}
            transition={{
              duration: 3.4,
              times: [0, 0.65, 1],
              ease,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
