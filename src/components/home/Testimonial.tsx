import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { QuoteIcon } from "@/components/icons";

async function getTestimonial() {
  try {
    return await prisma.testimonial.findFirst({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return null;
  }
}

export async function Testimonial() {
  const testimonial = await getTestimonial();

  if (!testimonial) return null;

  return (
    <section className="bg-warmgray">
      <Container className="py-20 sm:py-28">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <QuoteIcon className="mx-auto h-10 w-10 text-gold" />
          <p className="mt-8 font-display text-2xl leading-snug text-ink sm:text-3xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <p className="mt-8 text-sm font-medium tracking-wide text-ink">
            {testimonial.clientName}
            <span className="text-ink/50"> — {testimonial.role}</span>
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
