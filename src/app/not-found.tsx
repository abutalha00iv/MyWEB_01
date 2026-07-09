import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="bg-ivory">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <SectionLabel>404</SectionLabel>
        <h1 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          Guarded like a secret — even from us.
        </h1>
        <p className="measure mx-auto mt-5 text-lg leading-relaxed text-ink/65">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved somewhere we haven&rsquo;t mapped yet.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/" variant="primary" showArrow>
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
