import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  label: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

export function PageHero({ label, title, intro, children }: PageHeroProps) {
  return (
    <section className="border-b border-ink/10 bg-ivory">
      <Container className="py-14 sm:py-20">
        <p className="section-label">{label}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="measure mt-6 text-lg leading-relaxed text-ink/70">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
