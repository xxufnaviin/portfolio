import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HorizontalScroller({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ width: 0, left: 0, visible: false });
  const dragRef = useRef<{ startX: number; startScroll: number } | null>(null);

  const update = () => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth + 1) {
      setThumb((t) => ({ ...t, visible: false }));
      return;
    }
    if (!track) {
      setThumb((t) => ({ ...t, visible: true }));
      return;
    }
    const trackW = track.clientWidth;
    const ratio = clientWidth / scrollWidth;
    const width = Math.max(40, trackW * ratio);
    const maxScroll = scrollWidth - clientWidth;
    const left = maxScroll === 0 ? 0 : (scrollLeft / maxScroll) * (trackW - width);
    setThumb({ width, left, visible: true });
  };

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c as Element));
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (thumb.visible) update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumb.visible]);

  const onThumbDown = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startScroll: el.scrollLeft };
  };
  const onThumbMove = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const trackW = track.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll / Math.max(1, trackW - thumb.width);
    el.scrollLeft = dragRef.current.startScroll + dx * ratio;
  };
  const onThumbUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left - thumb.width / 2;
    const trackW = track.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll / Math.max(1, trackW - thumb.width);
    el.scrollTo({ left: x * ratio, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        className="no-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        {children}
      </div>

      {thumb.visible && (
        <div className="mt-4 px-1">
          <div
            ref={trackRef}
            onClick={onTrackClick}
            className="relative h-1.5 rounded-full bg-border cursor-pointer"
          >
            <div
              onPointerDown={onThumbDown}
              onPointerMove={onThumbMove}
              onPointerUp={onThumbUp}
              onPointerCancel={onThumbUp}
              className="absolute top-0 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent cursor-grab active:cursor-grabbing"
              style={{ width: thumb.width, left: thumb.left }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
