import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { ArrowUpRightIcon } from "@/components/icons";

const servicesDescription =
  "Website design and build, landing pages, redesigns, bug fixing, care plans, and Android apps — every service Aureth Tyrian offers.";

export const metadata: Metadata = {
  title: "Services",
  description: servicesDescription,
  openGraph: { title: "Services — Aureth Tyrian", description: servicesDescription },
};

async function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumbs items={[{ label: "Services" }]} />
      <PageHero
        label="Services"
        title="Six ways we help your business look and work better online."
        intro="Every project starts with a clear brief and ends with a site that's tested, secure, and fully yours. Pick a service below, or start a project and we'll recommend the right one."
      />

      <section className="bg-ivory">
        <Container className="pb-24 sm:pb-32">
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {services.map((service, i) => (
              <FadeUp key={service.id} delay={Math.min(i, 4) * 60}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-1 gap-4 py-10 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                >
                  <div>
                    <h2 className="font-display text-2xl text-ink transition-colors duration-200 group-hover:text-plum sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="measure mt-3 text-[15px] leading-relaxed text-ink/65">{service.summary}</p>
                    <p className="mt-4 text-xs uppercase tracking-wide text-ink/55">
                      {service.startingPrice} &middot; {service.timeline}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-plum">
                    View service
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
