import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MediaCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [paused, images.length]);

  const go = (d: number) => setI((p) => (p + d + images.length) % images.length);

  return (
    <div
      className="relative w-full aspect-square overflow-hidden rounded-2xl border border-border bg-muted shadow-lg p-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[i]}
            src={images[i]}
            alt={alt}
            loading="eager"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-6 bg-primary" : "w-1.5 bg-background/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
