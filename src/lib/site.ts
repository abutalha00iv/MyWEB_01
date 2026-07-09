export const siteConfig = {
  name: "Aureth Tyrian",
  tagline: "Crafted like gold. Guarded like a secret.",
  motto: "Every website deserves to be beautiful, fast, and safe.",
  description:
    "Aureth Tyrian is a premium web design and software studio building websites that are beautiful, fast, and secure.",
  // TODO: switch to the custom domain once it's connected, then run
  // Search Console's "Change of Address" tool to migrate indexing cleanly.
  url: "https://aureth-tyrian.vercel.app",
  founder: "Abu Talha",
  founderRole: "Founder & Managing Director",
  founded: 2026,
  // Real working inbox until the aurethtyrian.com domain + hello@ mailbox are live.
  // Editable any time from Admin → Settings.
  defaultEmail: "abu.talha.iv@gmail.com",
};

export const mainNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  studio: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
  ],
  connect: [
    { label: "Start a Project", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const serviceSlugs = [
  "website-design-and-build",
  "landing-pages",
  "website-redesign",
  "bug-fixing-and-repair",
  "care-and-maintenance-plans",
  "android-apps",
] as const;
