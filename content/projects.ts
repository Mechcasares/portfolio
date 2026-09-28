// Project + case study content.
//
// Copy and images come from Mercedes' own case study material. Sections are
// only included where there's something real to say — no forced sections,
// no invented metrics.

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "contain" keeps the whole image visible on a neutral canvas (for cut-outs and composites). */
  fit?: "cover" | "contain";
};

export type Block =
  | { kind: "image"; image: Img; caption?: string }
  | { kind: "gallery"; images: Img[]; caption?: string }
  | { kind: "list"; items: { title: string; body: string }[] }
  | { kind: "quote"; text: string }
  | { kind: "facts"; items: { label: string; value: string }[] }
  | { kind: "stats"; items: { value: string; label: string }[]; note?: string }
  | { kind: "shipped"; items: string[] };

export type Section = {
  id: string;
  title: string;
  lead?: string;
  body?: string[];
  blocks?: Block[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  year: string;
  role: string;
  company: string;
  tags: string[];
  layout: "feature" | "media-left" | "media-right";
  cover: Img;
  sections: Section[];
};

const ping = (name: string) => `/images/ping/${name}`;
const eden = (name: string) => `/images/eden/${name}`;

export const projects: Project[] = [
  {
    slug: "ping",
    index: "01",
    title: "Ping",
    category: "Fintech / Crypto",
    summary:
      "Crypto payments that work like payments — a product and design system for fiat and crypto, built to feel like a bank app.",
    year: "2024 — 2026",
    role: "Product Designer",
    company: "Settle Network",
    tags: ["Product Design", "Design Systems", "Fintech", "Mobile & Desktop"],
    layout: "feature",
    cover: { src: ping("cover.png"), alt: "Ping brand and product overview", width: 1920, height: 1080, fit: "contain" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        lead: "Ping is Settle’s crypto payments platform: a digital account to send, receive and manage crypto across Latin America.",
        body: [
          "I joined Settle without much of a crypto background. Ping became my crash course: how wallets differ from each other, how networks actually behave, what dozens of payment apps can and can’t do. Nearly every project handed me something new to learn.",
        ],
        blocks: [
          {
            kind: "facts",
            items: [
              { label: "Role", value: "Product Designer" },
              { label: "Company", value: "Settle Network" },
              { label: "Timeline", value: "2024 — 2026" },
              { label: "Platforms", value: "Mobile, desktop, web" },
            ],
          },
        ],
      },
      {
        id: "context",
        title: "Context",
        lead: "Make crypto feel as familiar and reliable as a regular bank account.",
        body: [
          "The goal was simple to say and hard to do: make crypto accessible and trustworthy for everyday users across Latin America. Sending an invoice, receiving a payment, moving money between fiat and crypto — all of it needed to feel as familiar and reliable as using a bank.",
        ],
        blocks: [
          {
            kind: "image",
            image: { src: ping("wallets-dashboard.png"), alt: "Ping wallets dashboard", width: 883, height: 568, fit: "contain" },
            caption: "Wallets dashboard — fiat and stablecoin balances in one view.",
          },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        lead: "Crypto can feel overwhelming — especially to someone who’s never dealt with wallets, conversions or transaction flows.",
        body: [
          "My job wasn’t just to make the product look clean. It was to simplify that complexity without stripping away the clarity and control people need to feel in charge of their own money.",
          "On top of that, we started from a brandbook, and it had to become a product identity that held together across mobile, desktop and marketing — not a style guide that only looked good in a deck.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        lead: "Take every complex, unfamiliar action and break it down to one step at a time.",
        body: [
          "Every surface came back to the same balancing act: simplicity on top, real technical complexity underneath.",
        ],
        blocks: [
          {
            kind: "list",
            items: [
              {
                title: "Guided flows",
                body: "Invoicing, payments and currency conversion, step by step — so no moment felt like a technical decision the user wasn’t ready to make.",
              },
              {
                title: "Financial info at a glance",
                body: "Data had to read clearly and instantly, even for someone who’d never touched crypto.",
              },
              {
                title: "Speed & reliability",
                body: "Treated as design requirements at every touchpoint, not nice-to-haves.",
              },
            ],
          },
        ],
      },
      {
        id: "product",
        title: "Product / UX",
        lead: "Familiar patterns for unfamiliar money.",
        body: [
          "Invoices, activity, buy, sell, deposit, withdraw and swap live in one consistent structure, with the balance always visible. Confirmation states spell out exactly what was sent, to whom and for how much.",
        ],
        blocks: [
          {
            kind: "image",
            image: { src: ping("invoice-sent.png"), alt: "Ping invoice sent confirmation", width: 1126, height: 720 },
            caption: "Invoicing on desktop — a clear confirmation of what was sent, to whom, and for how much.",
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        lead: "From brandbook to a product identity that scales.",
        body: [
          "The brand had to work as a product identity, not just a brandbook: structured layouts, clear hierarchy and UI patterns that support the user rather than test them — one visual language across the mobile app, desktop app and marketing site.",
        ],
        blocks: [
          {
            kind: "image",
            image: { src: ping("brand-hero.png"), alt: "Ping brand hero", width: 1216, height: 516 },
          },
          {
            kind: "gallery",
            images: [
              { src: ping("icon-sheet.webp"), alt: "Ping icon sheet", width: 962, height: 1038 },
              { src: ping("color-palette.webp"), alt: "Ping color palette", width: 1236, height: 1241 },
            ],
            caption: "Iconography and colour, built as part of the design system.",
          },
        ],
      },
      {
        id: "collaboration",
        title: "Collaboration",
        lead: "I co-led the design system alongside one of the founders.",
        body: [
          "Together we translated the brandbook into structured layouts, clear hierarchy and UI patterns — a system built to scale with the product. The goal was for someone to navigate crypto with confidence, even on their very first try.",
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        lead: "A cohesive, launch-ready platform — mobile app, desktop app and marketing site under one unified system.",
        body: [
          "Managing money across fiat and crypto finally felt simple, secure and familiar. And the product did better than expected.",
        ],
        blocks: [
          {
            kind: "stats",
            items: [
              { value: "20,000+", label: "Users" },
              { value: "$10M+", label: "Monthly volume" },
              { value: "6 months", label: "To break-even" },
            ],
          },
          {
            kind: "gallery",
            images: [
              { src: ping("wallets-dashboard.png"), alt: "Ping desktop wallets", width: 883, height: 568, fit: "contain" },
              { src: ping("mobile-wallet.png"), alt: "Ping mobile wallet", width: 375, height: 740, fit: "contain" },
            ],
            caption: "The same system on desktop and mobile.",
          },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        lead: "Learning the domain was part of the design work.",
        blocks: [
          {
            kind: "quote",
            text: "I loved digging into that world and smoothing out its rough edges for the people using it.",
          },
        ],
      },
    ],
  },
  {
    slug: "eden",
    index: "02",
    title: "Eden",
    category: "B2B SaaS / Workplace",
    summary:
      "Office management for hybrid work — desk booking, meeting rooms, visitor access, ticketing and deliveries.",
    year: "2023",
    role: "Product Designer",
    company: "Eden",
    tags: ["Product Design", "B2B SaaS", "UX/UI", "Information Architecture"],
    layout: "media-right",
    cover: { src: eden("cover.png"), alt: "Eden brand and product overview", width: 1920, height: 1080, fit: "contain" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        lead: "Eden automates and simplifies office processes that are complex and bureaucratic.",
        body: [
          "I designed B2B tools for managing hybrid workspaces: desk booking, meeting room reservations, visitor access, internal ticketing and deliveries. My focus was the redesign of the office management experience — getting more teams to actually adopt the platform instead of falling back on spreadsheets and Slack threads.",
        ],
        blocks: [
          {
            kind: "facts",
            items: [
              { label: "Role", value: "Product Designer" },
              { label: "Timeline", value: "2023 · 8 months" },
              { label: "Product", value: "B2B SaaS" },
              { label: "Focus", value: "Office management redesign" },
            ],
          },
          {
            kind: "image",
            image: { src: eden("home-dashboard.png"), alt: "Eden home dashboard on desktop and mobile", width: 814, height: 740, fit: "contain" },
            caption: "Home: today’s reservations, visitors and tickets in one place.",
          },
        ],
      },
      {
        id: "context",
        title: "Context",
        lead: "Hybrid offices were hitting problems the product hadn’t caught up with yet.",
        body: [
          "User feedback and internal discussions kept surfacing the same pattern. When the tool didn’t fit, teams quietly went back to spreadsheets and Slack threads — and adoption stalled.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        lead: "One generic form stretched to fit three different jobs.",
        body: [
          "Desk booking, room reservations and visitor access each needed their own dedicated flow. And the existing dashboard architecture and navigation were slowing teams down: admins spent more time finding the right screen than actually managing their office.",
        ],
        blocks: [
          {
            kind: "gallery",
            images: [
              { src: eden("room-reservation.png"), alt: "Eden room reservation", width: 452, height: 512, fit: "contain" },
              { src: eden("visitor-management.png"), alt: "Eden visitor management", width: 592, height: 478, fit: "contain" },
            ],
            caption: "Dedicated flows for rooms and visitors.",
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        lead: "Give each job its own flow, and rebuild the structure around them.",
        body: [
          "The redesign focused on desk and room booking: dedicated flows for each job, and a rebuilt dashboard architecture and navigation so admins could get to the right place faster.",
        ],
      },
      {
        id: "collaboration",
        title: "Collaboration",
        lead: "Features stopped stalling in handoff.",
        body: [
          "I pushed to strengthen collaboration and documentation between design and development, which meant features started shipping faster instead of waiting on clarifications.",
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        lead: "Higher platform adoption, and less operational time for the teams using it every day.",
        body: [
          "The redesign of the office management experience increased platform adoption, and the rebuilt dashboard and navigation cut down operational time for daily users.",
        ],
        blocks: [
          { kind: "shipped", items: ["Internal ticketing", "Desk booking", "Deliveries"] },
          {
            kind: "gallery",
            images: [
              { src: eden("internal-ticketing.png"), alt: "Eden internal ticketing", width: 656, height: 491, fit: "contain" },
              { src: eden("desk-booking.png"), alt: "Eden desk booking", width: 560, height: 520, fit: "contain" },
              { src: eden("deliveries.png"), alt: "Eden deliveries", width: 518, height: 520, fit: "contain" },
            ],
          },
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
