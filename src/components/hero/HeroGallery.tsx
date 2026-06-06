import n2 from "@/assets/naviin2.png";

export function HeroGallery() {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[6/6] overflow-hidden rounded-2xl border border-border bg-muted shadow-lg p-2">
        <img src={n2} alt="Naviin" loading="eager" className="h-full w-full object-cover rounded-xl" />
      </div>
    </div>
  );
}
