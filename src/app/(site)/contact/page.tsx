import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MailIcon, ShieldIcon } from "@/components/icons";
import { getSiteSettings } from "@/lib/settings";

const contactDescription =
  "Tell us about your business and what you need — send a project brief and we'll reply with next steps within one business day.";

export const metadata: Metadata = {
  title: "Start a Project",
  description: contactDescription,
  openGraph: { title: "Start a Project — Aureth Tyrian", description: contactDescription },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHero
        label="Start a Project"
        title="Tell us about your project."
        intro="Fill out the brief below — the more detail, the more accurate your quote. We reply within one business day."
      />

      <section className="bg-ivory">
        <Container className="grid grid-cols-1 gap-16 py-16 sm:py-20 lg:grid-cols-[1fr_300px] lg:gap-20">
          <div className="relative">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-10">
            <div>
              <SectionLabel>Prefer Email</SectionLabel>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mt-3 flex items-center gap-2 text-[15px] text-ink transition-colors duration-200 hover:text-plum"
              >
                <MailIcon className="h-4 w-4 text-plum" />
                {settings.contactEmail}
              </a>
            </div>

            <div>
              <SectionLabel>Response Time</SectionLabel>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
                We reply to every inquiry within one business day, seven days a week.
              </p>
            </div>

            <div>
              <SectionLabel>Your Information</SectionLabel>
              <p className="mt-3 flex items-start gap-2.5 text-[15px] leading-relaxed text-ink/65">
                <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
                <span>Used only to respond to your inquiry. Never shared or sold.</span>
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
