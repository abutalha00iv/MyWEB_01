import Image from "next/image";

type BrowserMockupProps = {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function BrowserMockup({ src, alt, className = "", priority = false }: BrowserMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-md border border-ink/12 bg-warmgray shadow-[0_1px_0_0_rgba(28,25,23,0.04)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-ink/12 bg-ivory px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full border border-ink/20" />
        <span className="h-2 w-2 rounded-full border border-ink/20" />
        <span className="h-2 w-2 rounded-full border border-ink/20" />
      </div>
      <div className="relative aspect-[16/10] w-full bg-warmgray">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink/30">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="4" width="18" height="16" rx="1.5" />
              <path d="M3 9h18" />
              <path d="M8 14l2.5 2.5L14 12l3 4" />
            </svg>
            <span className="text-xs tracking-wide">Screenshot coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
}
