import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { ButtonLink } from "@/components/ui/Button";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <AmbientGlow tone="ink" />
      <Container className="relative py-20 text-center sm:py-24">
        <FadeUp>
          <p className="section-label !text-gold-light">Start a Project</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-ivory sm:text-4xl">
            Have a project in mind? Let&rsquo;s build something that lasts.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ivory/65">
            Tell us about your business and what you need — we&rsquo;ll reply
            with next steps within one business day.
          </p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/contact" variant="primary" showArrow>
              Start a Project
            </ButtonLink>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
