import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionLabel, GoldRule } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { PricingGroup } from "@/components/pricing/PricingGroup";
import { ChevronDownIcon } from "@/components/icons";

const pricingDescription =
  "Clear packages and honest starting prices for website design, landing pages, redesigns, bug fixes, maintenance plans, and Android apps.";

export const metadata: Metadata = {
  title: "Pricing",
  description: pricingDescription,
  openGraph: { title: "Pricing — Aureth Tyrian", description: pricingDescription },
};

const groupOrder = [
  "Website Design & Build",
  "Landing Pages",
  "Website Redesign",
  "Bug Fixing & Repair",
  "Care & Maintenance",
  "Android Apps",
];

const faqs = [
  {
    question: "How much will my project actually cost?",
    answer:
      "It depends on size and features — business sites typically range from $60 to $250. Tell us what your business does, how many pages you need, and any special features, and you'll get an exact quote within one business day.",
  },
  {
    question: "Is there a monthly fee? Who hosts my site?",
    answer:
      "No monthly fee by default. Your site is deployed to hosting you own, with free HTTPS — so you're never locked in to us. If you'd like updates and monitoring handled for you, Care & Maintenance plans start at $15/month.",
  },
  {
    question: "What if I don't like the first design direction?",
    answer:
      "We work design-first: you approve the visual direction before we build the full site, and every package includes revision rounds after that. You'll never be stuck with a direction you didn't choose.",
  },
  {
    question: "What counts as a revision?",
    answer:
      "One consolidated round of change requests to the agreed scope — colors, text, images, layout tweaks. New pages or a change of design direction after approval are quoted separately, clearly, before we start.",
  },
];

async function getPackagesByGroup() {
  const packages = await prisma.pricingPackage.findMany({ orderBy: { order: "asc" } });
  const grouped = new Map<string, typeof packages>();
  for (const pkg of packages) {
    const list = grouped.get(pkg.serviceArea) ?? [];
    list.push(pkg);
    grouped.set(pkg.serviceArea, list);
  }
  return groupOrder
    .map((area) => ({ area, packages: grouped.get(area) ?? [] }))
    .filter((g) => g.packages.length > 0);
}

export default async function PricingPage() {
  const groups = await getPackagesByGroup();

  return (
    <>
      <Breadcrumbs items={[{ label: "Pricing" }]} />
      <PageHero
        label="Pricing"
        title="Clear packages. Honest pricing."
        intro="Every price below is a real starting point, not a teaser. Final quotes depend on scope and are always confirmed in writing before work begins."
      >
        <div className="mt-8">
          <ButtonLink href="/contact" variant="primary" showArrow>
            Get an Exact Quote
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-ivory">
        <Container className="flex flex-col gap-20 py-20 sm:py-24">
          {groups.map((group, i) => (
            <div key={group.area}>
              <PricingGroup serviceArea={group.area} packages={group.packages} />
              {i < groups.length - 1 && <GoldRule className="mt-20" />}
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-warmgray">
        <Container className="py-20 sm:py-24">
          <FadeUp>
            <SectionLabel>Pricing FAQ</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Questions about cost and process.
            </h2>
          </FadeUp>

          <div className="mt-12 divide-y divide-ink/10 border-t border-ink/10 sm:max-w-3xl">
            {faqs.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-ink/40 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
