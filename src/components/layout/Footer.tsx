import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { footerNav, siteConfig } from "@/lib/site";
import { MailIcon } from "@/components/icons";

export function Footer({ contactEmail }: { contactEmail?: string }) {
  const email = contactEmail || siteConfig.defaultEmail;

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="ivory" />
            <p className="measure mt-5 text-sm leading-relaxed text-ivory/70">
              {siteConfig.tagline} A premium web design and software studio
              building websites that are beautiful, fast, and secure.
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-ivory/85 transition-colors duration-200 hover:text-gold-light"
            >
              <MailIcon className="h-4 w-4" />
              {email}
            </a>
          </div>

          <div>
            <p className="section-label !text-gold-light">Studio</p>
            <ul className="mt-4 flex flex-col gap-3">
              {footerNav.studio.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/75 transition-colors duration-200 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label !text-gold-light">Connect</p>
            <ul className="mt-4 flex flex-col gap-3">
              {footerNav.connect.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/75 transition-colors duration-200 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-ivory/15" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-ivory/55 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Est. {siteConfig.founded}.
          </p>
          <p>Designed &amp; built by {siteConfig.founder}.</p>
        </div>
      </div>
    </footer>
  );
}
