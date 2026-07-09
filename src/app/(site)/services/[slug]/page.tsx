import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { GoldRule, SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import { parseFaq, parseIncluded, parseProcess } from "@/lib/content-types";

async function getService(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.summary,
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.summary,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const included = parseIncluded(service.included);
  const process = parseProcess(service.process);
  const faq = parseFaq(service.faq);

  return (
    <>
      <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} />
      <PageHero label="Service" title={service.title} intro={service.summary} />

      <section className="bg-ivory">
        <Container className="grid grid-cols-1 gap-14 py-20 sm:py-24 lg:grid-cols-[1fr_320px] lg:gap-20">
          <div>
            <FadeUp>
              <SectionLabel>What&rsquo;s Included</SectionLabel>
              <ul className="mt-6 flex flex-col gap-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/75">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <div className="mt-16">
              <GoldRule />
            </div>

            <FadeUp className="mt-16">
              <SectionLabel>Our Process</SectionLabel>
              <ol className="mt-6 flex flex-col gap-8">
                {process.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-lg text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-ink/65">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </FadeUp>

            {faq.length > 0 && (
              <>
                <div className="mt-16">
                  <GoldRule />
                </div>
                <FadeUp className="mt-16">
                  <SectionLabel>Frequently Asked</SectionLabel>
                  <div className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
                    {faq.map((item) => (
                      <details key={item.question} className="group py-5">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                          {item.question}
                          <ChevronDownIcon className="h-4 w-4 shrink-0 text-ink/40 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </FadeUp>
              </>
            )}
          </div>

          <aside className="h-fit rounded-md border border-ink/12 bg-warmgray p-7 lg:sticky lg:top-28">
            <p className="section-label">Timeline</p>
            <p className="mt-2 font-display text-xl text-ink">{service.timeline}</p>

            <div className="mt-6 h-px w-full bg-ink/10" />

            <p className="section-label mt-6">Starting At</p>
            <p className="mt-2 font-display text-xl text-ink">{service.startingPrice}</p>

            <ButtonLink href="/contact" variant="primary" showArrow className="mt-8 w-full">
              Start a Project
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" className="mt-3 w-full">
              See Full Pricing
            </ButtonLink>
          </aside>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
