import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp } from "@/components/ui/FadeUp";
import { ArrowUpRightIcon, CompassIcon, LayersIcon, RefreshIcon } from "@/components/icons";

const items = [
  {
    icon: CompassIcon,
    title: "Website Design & Build",
    description: "Bespoke marketing sites and web apps, designed and engineered from the ground up.",
    href: "/services/website-design-and-build",
  },
  {
    icon: LayersIcon,
    title: "Landing Pages",
    description: "Focused, high-converting single pages for launches, campaigns, and offers.",
    href: "/services/landing-pages",
  },
  {
    icon: RefreshIcon,
    title: "Care & Maintenance",
    description: "Ongoing updates, monitoring, and support so your site stays fast and secure.",
    href: "/services/care-and-maintenance-plans",
  },
];

export function WhatWeDo() {
  return (
    <section className="bg-warmgray">
      <Container className="py-20 sm:py-28">
        <FadeUp>
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            Three ways we can help your business look and work better online.
          </h2>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {items.map((item, i) => (
            <FadeUp key={item.href} delay={i * 90} className="bg-warmgray">
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between gap-8 bg-warmgray p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-ivory hover:shadow-[0_18px_40px_-24px_rgba(28,25,23,0.25)]"
              >
                <div>
                  <item.icon className="h-7 w-7 text-plum" />
                  <h3 className="mt-6 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{item.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-plum">
                  Learn more
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
