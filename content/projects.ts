// Project + case study content.
//
// Copy and images come from Mercedes' own case study material. Sections are
// only included where there's something real to say. No forced sections,
// no invented metrics, no dashes in the copy.
// Company context comes from public sources, linked in `about.sources`.
// Wrap keywords in **double asterisks** to render them bold and highlighted.

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "contain" keeps the whole image visible on a neutral canvas (for cut-outs and composites). */
  fit?: "cover" | "contain";
};

export type Block =
  | { kind: "image"; image: Img; caption?: string; placement?: "full" | "bleed" | "inset-left" | "inset-right"; tape?: boolean }
  | { kind: "gallery"; images: Img[]; caption?: string }
  /** A large desktop shot with a phone overlapping its corner. */
  | { kind: "composite"; main: Img; overlay: Img; caption?: string }
  | { kind: "list"; items: { title: string; body: string }[] }
  | { kind: "quote"; text: string }
  | { kind: "facts"; items: { label: string; value: string }[] }
  | { kind: "stats"; items: { value: string; label: string }[]; note?: string }
  | { kind: "shipped"; items: string[] };

export type Section = {
  id: string;
  title: string;
  lead?: string;
  /** Phrase inside the lead that gets a red pen underline. */
  mark?: string;
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
  /** Handwritten note that appears on hover. */
  note: string;
  /** What I actually owned, in one line. */
  roleDetail: string;
  /** What I owned. */
  scope: string[];
  /** What made it hard, in one line. */
  complexity: string;
  /** How I thought about it, in one line. */
  approach: string;
  /** Real outcomes only. `value` is big, `label` explains it. */
  outcomes: { value: string; label: string }[];
  /** Small stickers (accelerator, stage…). */
  badges: string[];
  /** Public context about the company, shown as a strip in the case study. */
  about: {
    items: { label: string; value: string }[];
    sources: { label: string; href: string }[];
  };
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
      "Crypto felt like a technical decision. I turned it into **guided, bank like flows** on one design system. Ping grew to **20k+ users** and **$10M+ a month**.",
    year: "2024 to 2026",
    role: "Product Designer",
    company: "Settle Network",
    tags: ["Product Design", "Design Systems", "Fintech", "Mobile & Desktop"],
    layout: "feature",
    note: "20k+ users, $10M+ a month",
    roleDetail: "Owned the experience **end to end** and led the **design system** with a founder",
    complexity: "Crypto rules people never asked to learn, across **three platforms** and one brand",
    approach: "Guided flows **one step at a time**, familiar banking patterns, **one system**",
    scope: ["End to end product design", "Design system (co led)", "Brand to product identity", "Mobile, desktop and web"],
    outcomes: [
      { value: "20k+", label: "users" },
      { value: "$10M+", label: "monthly volume" },
      { value: "6 mo", label: "to break even" },
    ],
    badges: ["Y Combinator S22"],
    about: {
      items: [
        { label: "What", value: "Global **neobank** for contractors and freelancers" },
        { label: "Founded", value: "**2021** in Buenos Aires" },
        { label: "Backed by", value: "Y Combinator S22 and a **$15M** seed (2022)" },
        { label: "Reach", value: "Users in **16 countries** at seed" },
      ],
      sources: [
        { label: "Ping on Y Combinator", href: "https://www.ycombinator.com/companies/ping" },
        { label: "Seed round, Business Wire (2022)", href: "https://www.businesswire.com/news/home/20221109005365/en/Ping-Raises-$15M-Seed-Round-to-Expand-Payment-Platform-For-Freelancers-and-the-Gig-Economy" },
        { label: "Settle Network", href: "https://www.settlenetwork.com/" },
      ],
    },
    cover: { src: ping("cover.png"), alt: "Ping brand and product overview", width: 1920, height: 1080, fit: "contain" },
    sections: [
      {
        id: "context",
        title: "Context",
        lead: "Ping wanted crypto to feel as familiar as a regular bank account.",
        mark: "bank account",
        body: [
          "Ping is Settle’s crypto payments platform: one account to **send, receive and manage money** across fiat and crypto, for freelancers and contractors across **Latin America**.",
          "I joined as Product Designer and owned the experience **end to end**, across mobile, desktop and web.",
        ],
        blocks: [
          {
            kind: "image",
            image: { src: ping("wallets-dashboard.png"), alt: "Ping wallets dashboard", width: 883, height: 568, fit: "contain" },
            caption: "fiat + stablecoins, all in one view",
            placement: "inset-right",
            tape: true,
          },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        lead: "For most people, crypto still feels like a technical decision.",
        mark: "technical decision",
        body: [
          "Wallets, networks, conversions and fees are **rules people never asked to learn**. Sending an invoice or receiving a payment had to feel **accessible and trustworthy**, because it’s real money on the other side.",
        ],
      },
      {
        id: "complexity",
        title: "Complexity",
        lead: "Simple on top, real technical complexity underneath.",
        mark: "real technical complexity",
        body: [
          "The product had to **simplify that complexity** without hiding **clarity and control**: people still needed to know what they were sending, how and what the other side would receive.",
          "And we started from a brandbook that had to become a **product identity** holding together across **three platforms**. Not a style guide that only looked good in a deck.",
          "I joined without much of a crypto background, so Ping became my **crash course**: how wallets differ, how networks actually behave, what dozens of payment apps can and can’t do.",
        ],
      },
      {
        id: "thinking",
        title: "Thinking",
        lead: "Tell every unfamiliar action like a story, one step at a time.",
        mark: "one step at a time",
        blocks: [
          {
            kind: "list",
            items: [
              {
                title: "Guided flows",
                body: "Invoicing, payments and currency conversion broken into steps, so no moment felt like a **technical decision** the user wasn’t ready to make.",
              },
              {
                title: "Money at a glance",
                body: "Balances and activity had to **read clearly and instantly**, even for someone who’d never touched crypto.",
              },
              {
                title: "Speed & reliability",
                body: "Treated as **design requirements** at every touchpoint, not as extras.",
              },
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        lead: "Familiar patterns for unfamiliar money.",
        body: [
          "Invoices, activity, buy, sell, deposit, withdraw and swap live in **one consistent structure**, with the balance always visible. Confirmations spell out exactly **what was sent, to whom and for how much**.",
          "I led the **design system** together with one of the founders, turning the brandbook into layouts, hierarchy and UI patterns that support people rather than test them.",
        ],
        blocks: [
          {
            kind: "image",
            image: { src: ping("invoice-sent-clean.png"), alt: "Ping invoice sent confirmation", width: 924, height: 704, fit: "contain" },
            caption: "what was sent, to who, how much. no guessing",
          },
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
            caption: "icons + colour live in the system, not in a deck",
          },
        ],
      },
      {
        id: "result",
        title: "Result",
        lead: "One platform, one system, ready for launch on mobile, desktop and web.",
        mark: "one system",
        body: [
          "Managing money across fiat and crypto finally felt **simple, secure and familiar**. And the product did **better than expected**.",
        ],
        blocks: [
          {
            kind: "stats",
            items: [
              { value: "20,000+", label: "Users" },
              { value: "$10M+", label: "Monthly volume" },
              { value: "6 months", label: "To break even" },
            ],
          },
          {
            kind: "composite",
            main: { src: ping("wallets-dashboard.png"), alt: "Ping desktop wallets", width: 883, height: 568 },
            overlay: { src: ping("mobile-wallet.png"), alt: "Ping mobile wallet", width: 375, height: 740 },
            caption: "same system, desktop and mobile",
          },
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
      "Hybrid offices had gone back to spreadsheets. I gave each job **its own flow** and rebuilt the navigation. **Adoption went up.**",
    year: "2023",
    role: "Product Designer",
    company: "Eden",
    tags: ["Product Design", "B2B SaaS", "UX/UI", "Information Architecture"],
    layout: "media-right",
    note: "adoption went up!",
    roleDetail: "Product Designer on the **office management redesign**",
    complexity: "**Three jobs** squeezed into one generic form, plus navigation that slowed admins down",
    approach: "A **dedicated flow per job**, a rebuilt dashboard structure and better handoff docs",
    scope: ["Office management redesign", "Dashboard architecture and navigation", "Desk and room booking flows", "Design to dev documentation"],
    outcomes: [
      { value: "↑", label: "platform adoption" },
      { value: "↓", label: "operational time" },
      { value: "3", label: "features shipped" },
    ],
    badges: ["Y Combinator S15"],
    about: {
      items: [
        { label: "What", value: "Workplace platform for **hybrid offices**" },
        { label: "Founded", value: "**2015** in San Francisco" },
        { label: "Backed by", value: "Y Combinator S15 and a **$25M** Series B (2019)" },
        { label: "Products", value: "Desks, rooms, visitors, tickets and deliveries" },
      ],
      sources: [
        { label: "Eden on Y Combinator", href: "https://www.ycombinator.com/companies/eden" },
        { label: "Series B, Business Wire (2019)", href: "https://www.businesswire.com/news/home/20191119005244/en/Eden-Announces-25M-Series-Led-Reshape" },
        { label: "Eden products", href: "https://www.edenworkplace.com/products" },
      ],
    },
    cover: { src: eden("cover.png"), alt: "Eden brand and product overview", width: 1920, height: 1080, fit: "contain" },
    sections: [
      {
        id: "context",
        title: "Context",
        lead: "Hybrid offices were running on spreadsheets and Slack threads.",
        mark: "spreadsheets and Slack threads",
        body: [
          "Eden is a workplace platform for **hybrid offices**: desk booking, meeting rooms, visitor access, internal ticketing and deliveries.",
          "I worked on the **redesign of the office management experience**, with one goal: get more teams to **actually adopt the platform**.",
        ],
        blocks: [
          {
            kind: "image",
            image: { src: eden("home-dashboard.png"), alt: "Eden home dashboard on desktop and mobile", width: 814, height: 740, fit: "contain" },
            caption: "today at a glance: desks, rooms, visitors, tickets",
            placement: "inset-left",
            tape: true,
          },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        lead: "When the tool didn’t fit, teams quietly stopped using it.",
        mark: "stopped using it",
        body: [
          "User feedback and internal discussions kept surfacing the same pattern: hybrid schedules were creating problems **the product hadn’t caught up with**. **Adoption stalled.**",
        ],
      },
      {
        id: "complexity",
        title: "Complexity",
        lead: "One generic form stretched to fit three different jobs.",
        mark: "three different jobs",
        body: [
          "Desk booking, room reservations and visitor access each needed **their own dedicated flow**. On top of that, the dashboard architecture and navigation slowed teams down: admins spent more time **finding the right screen** than managing their office.",
        ],
        blocks: [
          {
            kind: "gallery",
            images: [
              { src: eden("room-reservation.png"), alt: "Eden room reservation", width: 452, height: 512, fit: "contain" },
              { src: eden("visitor-management.png"), alt: "Eden visitor management", width: 592, height: 478, fit: "contain" },
            ],
            caption: "one flow per job, not one form for everything",
          },
        ],
      },
      {
        id: "thinking",
        title: "Thinking",
        lead: "Give each job its own flow, then rebuild the structure around it.",
        mark: "its own flow",
        body: [
          "Start with the most frequent jobs, **desk and room booking**, and make each one obvious on its own. Then fix the **dashboard architecture and navigation** so admins land in the right place without searching.",
        ],
      },
      {
        id: "design",
        title: "Design",
        lead: "Features stopped stalling in handoff.",
        mark: "stalling in handoff",
        body: [
          "Alongside the flows, I pushed to strengthen **collaboration and documentation** between design and development, so features started **shipping faster** instead of waiting on clarifications.",
        ],
      },
      {
        id: "result",
        title: "Result",
        lead: "Higher platform adoption and less operational time for the teams using it every day.",
        body: [
          "The redesign **increased platform adoption**. The rebuilt dashboard and navigation **cut down operational time** for daily users.",
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
