import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionLabel, GoldRule } from "@/components/ui/SectionLabel";
import { CtaBand } from "@/components/home/CtaBand";
import { ShieldIcon, KeyIcon, CompassIcon, LayersIcon, CheckIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const aboutDescription =
  "The story behind Aureth Tyrian's name, what we believe, how we work, and who's behind the studio.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  openGraph: { title: "About — Aureth Tyrian", description: aboutDescription },
};

const values = [
  {
    icon: ShieldIcon,
    title: "Security is not an upgrade",
    description: "Every product ships secure by default. We never sell safety as an extra.",
  },
  {
    icon: CheckIcon,
    title: "Honesty over hype",
    description: "We only promise what we can deliver, and we deliver what we promise. Deadlines are commitments.",
  },
  {
    icon: CompassIcon,
    title: "Clarity for non-technical clients",
    description: "You're never made to feel small for not knowing technology. We explain everything in plain language.",
  },
  {
    icon: LayersIcon,
    title: "Craft in every detail",
    description: "Spacing, speed, spelling, mobile view — small details are checked on every project before delivery.",
  },
  {
    icon: KeyIcon,
    title: "You own your work",
    description: "On full payment, you receive complete source files and full ownership. No lock-in, ever.",
  },
];

const process = [
  { title: "Brief", description: "You tell us about your business, your goals, and what the site needs to do." },
  { title: "Design First", description: "We propose a visual direction and get your explicit approval before any build begins." },
  { title: "Build", description: "The full site is built from the approved design, page by page, on clean code." },
  { title: "Test & Secure", description: "Every page is checked on real devices, and reviewed against a security checklist." },
  { title: "Deliver", description: "You receive complete source files and, if included, a live deployed link." },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <PageHero
        label="About"
        title={siteConfig.motto}
        intro="That's the promise behind every delivery. If a project can't meet all three standards, it isn't delivered until it does."
      />

      <section className="bg-ivory">
        <Container className="py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <FadeUp>
              <SectionLabel>The Name</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink">
                Crafted like gold. Guarded like a secret.
              </h2>
            </FadeUp>
            <FadeUp delay={80} className="measure text-[15px] leading-relaxed text-ink/70">
              <p>
                &ldquo;Aureth&rdquo; is coined from <em>aurum</em>, the Latin word for gold — the measure of rare,
                lasting value. &ldquo;Tyrian&rdquo; recalls Tyrian purple, the legendary dye of ancient emperors,
                created in the city of Tyre by a secret formula so precious it was worth more than gold — and lost
                to history.
              </p>
              <p className="mt-4">
                Together, Aureth Tyrian stands for work of rare quality: crafted with the care of gold, guarded
                with the discipline of a formula worth protecting. Every site we build is treated the same
                way — beautiful enough to be worth showing off, and secure enough to be worth trusting.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="bg-warmgray">
        <Container className="py-20 sm:py-24">
          <FadeUp>
            <SectionLabel>What We Believe</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Five principles behind every project.
            </h2>
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <FadeUp key={value.title} delay={Math.min(i, 5) * 70}>
                <value.icon className="h-7 w-7 text-plum" />
                <h3 className="mt-5 font-display text-lg text-ink">{value.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{value.description}</p>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="py-20 sm:py-24">
          <FadeUp>
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Every project moves through the same five stations.
            </h2>
          </FadeUp>

          <ol className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {process.map((step, i) => (
              <FadeUp key={step.title} delay={Math.min(i, 5) * 70}>
                <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.description}</p>
              </FadeUp>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-warmgray">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <FadeUp>
              <Image
                src="/assets/logo/seal.svg"
                alt=""
                width={96}
                height={96}
                className="mx-auto h-24 w-24"
              />
              <SectionLabel>Founder</SectionLabel>
              <h2 className="mt-3 font-display text-2xl text-ink">{siteConfig.founder}</h2>
              <p className="mt-1 text-sm tracking-wide text-ink/55">{siteConfig.founderRole}</p>
              <GoldRule className="mx-auto mt-8 max-w-xs" />
              <p className="measure mx-auto mt-8 text-[15px] leading-relaxed text-ink/70">
                Aureth Tyrian is owner-operated: one person, fully responsible for every project from first brief
                to final delivery — no handoffs, no middlemen.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
