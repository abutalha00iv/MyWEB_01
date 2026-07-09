import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { LiteMarkdown } from "@/components/ui/LiteMarkdown";
import { getSiteSettings } from "@/lib/settings";

const privacyDescription = "How Aureth Tyrian collects, uses, and protects your information.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyDescription,
  openGraph: { title: "Privacy Policy — Aureth Tyrian", description: privacyDescription },
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <PageHero label="Legal" title="Privacy Policy" />
      <section className="bg-ivory">
        <Container className="py-16 sm:py-20">
          <LiteMarkdown content={settings.privacyPolicy} />
        </Container>
      </section>
    </>
  );
}
