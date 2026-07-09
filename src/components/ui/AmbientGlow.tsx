type AmbientGlowProps = {
  tone?: "ivory" | "ink";
};

const palettes: Record<"ivory" | "ink", { a: string; b: string }> = {
  ivory: { a: "var(--color-plum)", b: "var(--color-gold)" },
  ink: { a: "var(--color-gold)", b: "var(--color-plum-light)" },
};

export function AmbientGlow({ tone = "ivory" }: AmbientGlowProps) {
  const { a, b } = palettes[tone];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="animate-drift-a absolute -right-24 -top-28 h-[26rem] w-[26rem] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: a }}
      />
      <div
        className="animate-drift-b absolute -bottom-32 -left-20 h-[22rem] w-[22rem] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: b }}
      />
    </div>
  );
}
