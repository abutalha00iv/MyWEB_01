import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp } from "@/components/ui/FadeUp";
import { ShieldIcon, DeviceIcon, KeyIcon } from "@/components/icons";

const reasons = [
  {
    icon: ShieldIcon,
    title: "Security-first",
    description:
      "Every build follows hardened defaults — validated inputs, secure headers, and no secrets exposed to the browser.",
  },
  {
    icon: DeviceIcon,
    title: "Tested on real devices",
    description:
      "We check every project on actual phones, tablets, and desktops — not just a browser resize.",
  },
  {
    icon: KeyIcon,
    title: "Full ownership",
    description:
      "You receive the code, the content, and the keys. No lock-in, no recurring platform tax.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-ivory">
      <Container className="py-20 sm:py-28">
        <FadeUp>
          <SectionLabel>Why Aureth Tyrian</SectionLabel>
          <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            The details that separate a good site from a trustworthy one.
          </h2>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {reasons.map((reason, i) => (
            <FadeUp key={reason.title} delay={i * 90}>
              <reason.icon className="h-7 w-7 text-plum" />
              <h3 className="mt-5 font-display text-lg text-ink">{reason.title}</h3>
              <div className="mt-3 h-px w-10 bg-gold" />
              <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{reason.description}</p>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
