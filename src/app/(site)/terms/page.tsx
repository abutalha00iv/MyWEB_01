import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { LiteMarkdown } from "@/components/ui/LiteMarkdown";
import { getSiteSettings } from "@/lib/settings";

const termsDescription = "The terms that govern working with Aureth Tyrian.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: termsDescription,
  openGraph: { title: "Terms of Service — Aureth Tyrian", description: termsDescription },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      <PageHero label="Legal" title="Terms of Service" />
      <section className="bg-ivory">
        <Container className="py-16 sm:py-20">
          <LiteMarkdown content={settings.termsOfService} />
        </Container>
      </section>
    </>
  );
}
