import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const privacyPolicy = `## Information We Collect
When you submit our contact form, we collect the information you provide: your name, email address, company (if given), the service you're interested in, budget range, timeline, and your project description. We do not use cookies or tracking scripts to monitor your visit beyond basic, privacy-respecting analytics our hosting provider may include by default.

## How We Use Your Information
Your information is used only to respond to your inquiry, prepare a quote, and — if you become a client — deliver the agreed project. We do not sell, rent, or share your information with third parties for marketing purposes.

## Third-Party Services
Contact form submissions may be forwarded to our email inbox through a third-party form-delivery service. That service only processes the message content needed to deliver the notification and does not use it for any other purpose.

## Data Retention
Contact form submissions are retained so we can refer back to past conversations. You may request deletion of your information at any time by emailing us.

## Your Rights
You can request access to, correction of, or deletion of any personal information we hold about you by contacting us at the email address on our Contact page.

## Changes to This Policy
We may update this policy as the business grows. The version on this page is always the current one.`;

const termsOfService = `## Services
Aureth Tyrian designs, builds, repairs, and maintains websites and web applications, as described on our Services pages. The exact scope, deliverables, price, and timeline for any project are confirmed in writing before work begins.

## Revisions
Each package includes a stated number of revision rounds. A revision round means one consolidated list of change requests within the agreed scope. New pages, new features, or a change of design direction after approval are treated as new work and quoted separately.

## Payments
Pricing and payment terms are agreed in writing before work begins. Work starts only once scope and payment terms are confirmed. Completed, delivered, and approved work is non-refundable; if we're unable to deliver what was agreed, we'll offer a correction first, and a refund only if a correction isn't possible.

## Ownership & Intellectual Property
Upon full payment, you receive the complete source files and full ownership rights to your delivered website or application. We retain the right to display completed work in our portfolio unless you request confidentiality in writing before delivery.

## Confidentiality
Any business information, content, or credentials you share with us during a project are used only for that project and are never shared or reused elsewhere.

## Communication
Our standard response time is within one business day, seven days a week.

## Limitation of Liability
We take reasonable, industry-standard care to build and test every project, but we can't guarantee a website or application will be completely free of every possible issue. We are not liable for indirect or consequential losses arising from use of a delivered project.

## Changes to These Terms
We may update these terms as the business grows. The version on this page is always the current one.`;

type ServiceSeed = {
  title: string;
  slug: string;
  summary: string;
  included: string[];
  process: { title: string; description: string }[];
  timeline: string;
  startingPrice: string;
  faq: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
};

const services: ServiceSeed[] = [
  {
    title: "Website Design & Build",
    slug: "website-design-and-build",
    summary:
      "Custom-designed, hand-built websites — from a single page to a full multi-page business site — fast, responsive, and secure from day one.",
    included: [
      "Custom visual design matched to your brand — layout, color, typography, imagery direction",
      "Mobile-first responsive build, tested on real phones, tablets, and desktops",
      "Contact forms, image galleries, maps, and social links wired in",
      "SEO-ready structure — proper headings, meta descriptions, fast-loading pages",
      "Clean, hand-written code — no bloated page builders, no vulnerable plugins",
      "Complete source files, plus optional deployment to secure hosting with free HTTPS",
    ],
    process: [
      { title: "Brief", description: "Tell us about your business, your goals, and the pages you need." },
      { title: "Design", description: "We propose a visual direction. Nothing gets built until you approve it." },
      { title: "Build", description: "The full site is built from the approved design, page by page." },
      { title: "Test & Secure", description: "Every page is checked on real devices and reviewed for security before it ships." },
      { title: "Deliver", description: "You receive the complete source files, ready to launch." },
    ],
    timeline: "3–7 days, depending on scope",
    startingPrice: "From $60",
    faq: [
      { question: "Do I need to provide content?", answer: "Ideally yes — your own text and photos give the best result. If you're not ready, we can write professional placeholder content you replace later." },
      { question: "Will my website work on phones?", answer: "Yes. Every site is built mobile-first and tested on real phone, tablet, and desktop screens before delivery." },
      { question: "Do you build on WordPress?", answer: "No — we build custom, clean-code websites instead. They load faster, can't be hacked through plugin vulnerabilities, and carry no ongoing plugin subscription costs." },
      { question: "What do I receive at delivery?", answer: "The complete source files for your website, plus deployment if included in your package. You own everything — no lock-in, no recurring fees to us." },
      { question: "Can you redesign my existing site instead?", answer: "Yes — that's its own service. See Website Redesign for details." },
    ],
    metaTitle: "Website Design & Build",
    metaDescription: "Custom-designed, hand-built websites that are fast, responsive, and secure — from a single page to a full business site.",
  },
  {
    title: "Landing Pages",
    slug: "landing-pages",
    summary:
      "A focused, single-page site built to do one job well: turn visitors into customers, subscribers, or bookings.",
    included: [
      "Custom single-page design built around one clear goal",
      "Mobile-perfect layout — most visitors arrive on a phone",
      "Contact or signup form, wired and tested",
      "SEO-ready structure and fast loading",
      "Full source files, yours to keep",
    ],
    process: [
      { title: "Brief", description: "Tell us the product, offer, or event the page needs to support." },
      { title: "Design", description: "A focused layout built around a single call to action." },
      { title: "Build", description: "The page is built, animated, and connected to your form." },
      { title: "Test & Secure", description: "Checked on real devices and reviewed before delivery." },
      { title: "Deliver", description: "Full source files, ready to publish." },
    ],
    timeline: "1–3 days",
    startingPrice: "From $30",
    faq: [
      { question: "Can you deliver in 24 hours?", answer: "For a single landing page, yes — express delivery is available as an add-on. We never skip testing to hit a deadline." },
      { question: "What's a landing page good for?", answer: "Product launches, app downloads, events, restaurants, services, personal brands, and ad campaign traffic — anywhere you need one clear action from visitors." },
      { question: "Can I upgrade to a full site later?", answer: "Yes — a landing page can grow into a full multi-page site whenever you're ready." },
    ],
    metaTitle: "Landing Pages",
    metaDescription: "Focused, high-converting single pages for launches, campaigns, and offers — fast to build, fast to load.",
  },
  {
    title: "Website Redesign",
    slug: "website-redesign",
    summary:
      "A modern rebuild of your existing site — same content and brand, transformed into something fast, mobile-friendly, and current.",
    included: [
      "Full review of your current site — what's working, what isn't",
      "Modern redesign that preserves your content and brand identity",
      "Mobile responsiveness and performance improvements throughout",
      "A before/after summary so you can see exactly what changed",
      "Complete source files at delivery",
    ],
    process: [
      { title: "Review", description: "We audit your current site and note what to keep and what to change." },
      { title: "Design Direction", description: "A modernized visual direction, approved before we rebuild." },
      { title: "Rebuild", description: "The site is rebuilt page by page on clean, current code." },
      { title: "Test & Secure", description: "Full device and security checks before delivery." },
      { title: "Deliver", description: "Your modernized site, with a summary of what improved." },
    ],
    timeline: "4–7 days",
    startingPrice: "From $70",
    faq: [
      { question: "Will I lose my existing content?", answer: "No — your content and brand are preserved. We're changing the build quality and design, not your business identity." },
      { question: "Can you keep my current domain and hosting?", answer: "Yes — we can connect your existing domain to the new site, or recommend hosting if you'd like to move." },
      { question: "Why redesign instead of patching the old site?", answer: "Most outdated sites are slow or fragile at the foundation. A redesign fixes that foundation instead of layering more patches on top." },
    ],
    metaTitle: "Website Redesign",
    metaDescription: "Transform an outdated website into a modern, fast, mobile-friendly site while preserving your content and brand.",
  },
  {
    title: "Bug Fixing & Repair",
    slug: "bug-fixing-and-repair",
    summary:
      "Broken layout, a dead button, a form that won't submit? We find the cause, fix it, and test it — fast.",
    included: [
      "Full diagnosis of the reported issue before any commitment",
      "Fix implemented and tested on desktop and mobile",
      "Plain-language explanation of what was wrong",
      "Honest assessment upfront if something can't be fixed",
    ],
    process: [
      { title: "Report", description: "Send the link or files and describe the problem." },
      { title: "Diagnose", description: "We confirm the cause and the fixed price before you commit." },
      { title: "Fix", description: "The issue is repaired." },
      { title: "Test", description: "Checked on desktop and mobile to confirm it's actually resolved." },
      { title: "Deliver", description: "Fixed site, plus a plain-language note on what was wrong." },
    ],
    timeline: "1–3 days",
    startingPrice: "From $10",
    faq: [
      { question: "My site was hacked — can you fix it?", answer: "We don't offer forensic recovery of hacked sites. What we do instead: rebuild it clean on a security-first setup with no vulnerable plugins, so it doesn't happen again." },
      { question: "What if you can't fix it?", answer: "You'll be told honestly before any payment — we diagnose first, quote second." },
      { question: "Do you fix WordPress sites?", answer: "We can diagnose front-end issues on any site. If the root cause is a vulnerable plugin or theme, we'll usually recommend a clean rebuild instead of a patch." },
    ],
    metaTitle: "Bug Fixing & Repair",
    metaDescription: "Diagnosis and repair of broken layouts, non-working forms, slow pages, and console errors — fast, tested, explained.",
  },
  {
    title: "Care & Maintenance Plans",
    slug: "care-and-maintenance-plans",
    summary:
      "Ongoing updates, monitoring, and small changes — so your site stays fast, current, and secure without you thinking about it.",
    included: [
      "Monthly security and uptime checks",
      "Content updates and small changes included every month",
      "Priority response when something needs fixing",
      "Backups, so you're never starting from zero",
    ],
    process: [
      { title: "Choose a Plan", description: "Basic, Standard, or Business — matched to how often your site changes." },
      { title: "Baseline", description: "We take a monthly snapshot and confirm your update allowance." },
      { title: "Request Updates", description: "Send changes any time within your plan's allowance." },
      { title: "Monthly Check", description: "Security, uptime, and backup review, every month." },
    ],
    timeline: "Ongoing, monthly",
    startingPrice: "From $15/mo",
    faq: [
      { question: "What counts as a small update?", answer: "Text or image swaps, minor layout tweaks, and small content additions. Anything larger is quoted separately." },
      { question: "What if I need more than my plan covers in a given month?", answer: "We'll quote the extra work separately, clearly, before doing it." },
      { question: "Can I cancel anytime?", answer: "Yes — plans are month to month, no lock-in contract." },
    ],
    metaTitle: "Care & Maintenance Plans",
    metaDescription: "Monthly plans covering content updates, security checks, uptime monitoring, and backups for your website.",
  },
  {
    title: "Android Apps",
    slug: "android-apps",
    summary:
      "Turn your website into an installable Android app on the Google Play Store — web-first, so it's faster and cheaper to build and maintain.",
    included: [
      "Packaging of your existing, stable website or web app for Android",
      "Store listing setup — title, description, screenshots",
      "Submission for Google Play review",
      "Guidance through the Google Play Console developer account setup",
    ],
    process: [
      { title: "Confirm Readiness", description: "Your website or web app must be complete and stable first." },
      { title: "Package", description: "The site is packaged into an installable Android app." },
      { title: "Store Listing", description: "Title, description, and screenshots are prepared." },
      { title: "Submit", description: "Submitted for Google Play review." },
      { title: "Support", description: "We support you through Google's review process to launch." },
    ],
    timeline: "1–2 weeks, including Google's review period",
    startingPrice: "From $150",
    faq: [
      { question: "Do I need a website first?", answer: "Yes — our process is web-first. We build and stabilize your website or web app, then package it for Android." },
      { question: "Who owns the Play Store listing?", answer: "We recommend publishing under your own Google Play Console account, so you retain full ownership and control of the listing." },
      { question: "How long does Google's review take?", answer: "Typically a few days up to two weeks. Review timing belongs to Google, not us — we never promise a launch date Google controls." },
      { question: "Is there a Google fee?", answer: "Yes — a one-time $25 Google Play developer registration fee, paid directly by the account holder." },
    ],
    metaTitle: "Android Apps",
    metaDescription: "Web-first Android app packaging and Google Play publishing for your existing website or web application.",
  },
];

type ProjectSeed = {
  title: string;
  slug: string;
  summary: string;
  brief: string;
  approach: string;
  result: string;
  tags: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
};

const projects: ProjectSeed[] = [
  {
    title: "Meridian Studio — Portfolio Site",
    slug: "meridian-studio-portfolio",
    summary: "A minimal, image-forward portfolio for an independent design studio.",
    brief:
      "Meridian Studio needed a portfolio that let the work speak first — no template feel, no clutter, fast on mobile where most of their referral traffic arrives.",
    approach:
      "We built a hand-coded, static site with a restrained grid, generous whitespace, and a case-study layout for each project. No page builder, no plugins — just clean markup and CSS built for speed.",
    result:
      "A site that loads in under a second on mobile, reads clearly at any screen size, and gives every project room to breathe.",
    tags: "Website Design & Build,Portfolio",
    featured: true,
    order: 0,
  },
  {
    title: "Bramblewood Kitchen — Restaurant Website",
    slug: "bramblewood-kitchen",
    summary: "A warm, appetite-driven site for a neighborhood restaurant, with menu, hours, and a reservation form.",
    brief:
      "Bramblewood Kitchen's old site was slow, hard to update, and impossible to read on a phone — exactly where most diners were looking them up.",
    approach:
      "We designed a mobile-first single page with a clear hierarchy: hours and location up top, menu highlights, and a straightforward reservation form — all fast-loading with no unnecessary scripts.",
    result:
      "A site the owner can point to with confidence, with online reservation requests arriving directly by email from day one.",
    tags: "Website Design & Build,Restaurant",
    featured: true,
    order: 1,
  },
  {
    title: "LedgerFlow — SaaS Dashboard",
    slug: "ledgerflow-dashboard",
    summary: "A marketing site and product dashboard mockup for an early-stage SaaS product.",
    brief:
      "LedgerFlow needed a credible marketing site ahead of its public launch, plus a demo dashboard view to show prospective customers what the product actually does.",
    approach:
      "We built a fast marketing site with a clear pricing and feature structure, plus a static dashboard preview built from the founder's product screenshots to use in demos and outreach.",
    result:
      "A launch-ready site that gave the founder something credible to send to early customers and investors before the product itself was public.",
    tags: "Web Application,SaaS",
    featured: true,
    order: 2,
  },
];

const pricingPackages: {
  serviceArea: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  excluded: string[];
  order: number;
  highlighted: boolean;
}[] = [
  // Website Design & Build
  { serviceArea: "Website Design & Build", name: "Starter Page", price: "$35", description: "A single, polished page.", features: ["1-page website", "Responsive design", "Contact links"], excluded: ["Contact form", "Gallery or map"], order: 0, highlighted: false },
  { serviceArea: "Website Design & Build", name: "Business Site", price: "$75", description: "For a full small-business presence.", features: ["Up to 4 pages", "Responsive design", "Contact form, gallery, map"], excluded: ["Animations", "Speed optimization pass"], order: 1, highlighted: true },
  { serviceArea: "Website Design & Build", name: "Complete Presence", price: "$150", description: "A complete, launch-ready site.", features: ["Up to 7 pages", "Contact form, gallery, map", "Animations & SEO setup", "Speed optimization", "Deployment included"], excluded: [], order: 2, highlighted: false },

  // Landing Pages
  { serviceArea: "Landing Pages", name: "Landing Page", price: "$30", description: "One focused page built to convert.", features: ["Custom single-page design", "Animations", "Contact or signup form", "SEO-ready structure", "Full source files"], excluded: ["Multi-page navigation"], order: 0, highlighted: false },

  // Website Redesign
  { serviceArea: "Website Redesign", name: "Redesign", price: "From $70", description: "A modern rebuild of your existing site.", features: ["Full site review", "Modern responsive rebuild", "Before/after summary", "Full source files"], excluded: ["New content writing"], order: 0, highlighted: false },

  // Bug Fixing & Repair
  { serviceArea: "Bug Fixing & Repair", name: "Basic", price: "$15", description: "One issue, fixed fast.", features: ["1 small bug", "Fix + test"], excluded: ["Written explanation report"], order: 0, highlighted: false },
  { serviceArea: "Bug Fixing & Repair", name: "Standard", price: "$35", description: "A handful of issues, resolved.", features: ["Up to 3 bugs", "Fix + test", "Plain-language explanation"], excluded: ["Full mobile audit"], order: 1, highlighted: true },
  { serviceArea: "Bug Fixing & Repair", name: "Premium", price: "$70", description: "A full page repair.", features: ["Up to 7 bugs or full page repair", "Fix + test", "Full mobile check", "Written report"], excluded: [], order: 2, highlighted: false },

  // Care & Maintenance
  { serviceArea: "Care & Maintenance", name: "Basic", price: "$15/mo", description: "Light, occasional upkeep.", features: ["Up to 2 small updates / month", "Monthly security check"], excluded: ["Priority response"], order: 0, highlighted: false },
  { serviceArea: "Care & Maintenance", name: "Standard", price: "$30/mo", description: "Regular updates and faster response.", features: ["Up to 5 updates / month", "Priority response", "Monthly security check"], excluded: ["Same-day response"], order: 1, highlighted: true },
  { serviceArea: "Care & Maintenance", name: "Business", price: "$60/mo", description: "For sites that change often.", features: ["Unlimited small updates", "Same-day response", "Monthly security check"], excluded: [], order: 2, highlighted: false },

  // Android Apps
  { serviceArea: "Android Apps", name: "Android App", price: "From $150", description: "Package and publish your web app on Google Play.", features: ["Android packaging", "Store listing setup", "Submission for review", "One round of review fixes"], excluded: ["Native-only device features"], order: 0, highlighted: false },
];

const testimonials: { quote: string; clientName: string; role: string; visible: boolean; order: number }[] = [
  {
    quote: "Replace this with your first client's real words — add it from Admin → Testimonials once you have one.",
    clientName: "Sample Client",
    role: "Placeholder — not shown publicly until enabled",
    visible: false,
    order: 0,
  },
  {
    quote: "A second placeholder slot. Testimonials stay hidden from the public site until you toggle them visible.",
    clientName: "Sample Client",
    role: "Placeholder — not shown publicly until enabled",
    visible: false,
    order: 1,
  },
  {
    quote: "A third placeholder slot, ready whenever you have a quote worth featuring on the homepage.",
    clientName: "Sample Client",
    role: "Placeholder — not shown publicly until enabled",
    visible: false,
    order: 2,
  },
];

async function main() {
  console.log("Seeding services...");
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        summary: s.summary,
        included: JSON.stringify(s.included),
        process: JSON.stringify(s.process),
        timeline: s.timeline,
        startingPrice: s.startingPrice,
        faq: JSON.stringify(s.faq),
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        order: services.indexOf(s),
      },
      create: {
        title: s.title,
        slug: s.slug,
        summary: s.summary,
        included: JSON.stringify(s.included),
        process: JSON.stringify(s.process),
        timeline: s.timeline,
        startingPrice: s.startingPrice,
        faq: JSON.stringify(s.faq),
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        order: services.indexOf(s),
      },
    });
  }

  console.log("Seeding projects...");
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        brief: p.brief,
        approach: p.approach,
        result: p.result,
        tags: p.tags,
        liveUrl: p.liveUrl,
        featured: p.featured,
        order: p.order,
      },
      create: {
        title: p.title,
        slug: p.slug,
        summary: p.summary,
        brief: p.brief,
        approach: p.approach,
        result: p.result,
        tags: p.tags,
        liveUrl: p.liveUrl,
        featured: p.featured,
        order: p.order,
      },
    });
  }

  console.log("Seeding pricing packages...");
  await prisma.pricingPackage.deleteMany();
  for (const pkg of pricingPackages) {
    await prisma.pricingPackage.create({
      data: {
        serviceArea: pkg.serviceArea,
        name: pkg.name,
        price: pkg.price,
        description: pkg.description,
        features: JSON.stringify(pkg.features),
        excluded: JSON.stringify(pkg.excluded),
        order: pkg.order,
        highlighted: pkg.highlighted,
      },
    });
  }

  console.log("Seeding testimonials...");
  await prisma.testimonial.deleteMany();
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  console.log("Seeding site settings...");
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      contactEmail: "abu.talha.iv@gmail.com",
      privacyPolicy,
      termsOfService,
    },
    create: {
      id: 1,
      contactEmail: "abu.talha.iv@gmail.com",
      socialLinks: JSON.stringify({}),
      announcementText: "",
      announcementActive: false,
      privacyPolicy,
      termsOfService,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
