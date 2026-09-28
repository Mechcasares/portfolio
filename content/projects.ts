// Project + case study content.
//
// NOTE: The copy below is a structured first draft written to show the shape
// of each story. Replace it with the real facts of each project — especially
// Context, Collaboration and Outcome. No metrics are invented on purpose:
// add numbers only where you can stand behind them.
//
// To use real screenshots instead of the built-in mockups, drop files in
// /public/images and swap a `{ kind: "mock" }` visual for:
//   { kind: "image", src: "/images/file.png", alt: "...", width: 2400, height: 1500 }

export type MockKey =
  | "curated-app"
  | "curated-brief"
  | "curated-system"
  | "ping-app"
  | "ping-detail"
  | "settle-app"
  | "settle-flow"
  | "eden-sketch";

export type Visual =
  | { kind: "mock"; mock: MockKey; caption?: string; size?: "full" | "wide" }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      size?: "full" | "wide";
    };

export type Block =
  | Visual
  | { kind: "flow"; caption?: string; steps: { label: string; note: string }[] }
  | { kind: "list"; items: { title: string; body: string }[] }
  | { kind: "quote"; text: string }
  | { kind: "facts"; items: { label: string; value: string }[] };

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
  team: string;
  tags: string[];
  layout: "feature" | "media-left" | "media-right" | "band";
  status: "shipped" | "in-progress";
  cover: Visual;
  sections: Section[];
};

export const projects: Project[] = [
  {
    slug: "curated-for-you",
    index: "01",
    title: "Curated For You",
    category: "AI-powered retail",
    summary:
      "Turning an AI recommendation engine into a product merchandising teams can understand, steer and trust.",
    year: "2023 — Now",
    role: "Lead Product Designer",
    team: "Product, ML, Engineering, Merchandising",
    tags: ["Product Design", "AI", "UX/UI", "Design Systems"],
    layout: "feature",
    status: "shipped",
    cover: { kind: "mock", mock: "curated-app" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        lead: "Curated For You helps retail teams build personalised product edits with AI — without handing their brand over to a black box.",
        body: [
          "The product combines a recommendation model with the tools merchandisers use every day: collections, rules, campaigns and approvals. I lead product design across the platform, from strategy and information architecture to the interface and the design system underneath it.",
        ],
        blocks: [
          {
            kind: "facts",
            items: [
              { label: "Role", value: "Lead Product Designer" },
              { label: "Scope", value: "Strategy, UX, UI, Design system" },
              { label: "Team", value: "Product, ML, Engineering" },
              { label: "Timeline", value: "2023 — Now" },
            ],
          },
        ],
      },
      {
        id: "context",
        title: "Context",
        lead: "Retailers wanted the reach of personalisation, but merchandising is still a craft — and craft needs control.",
        body: [
          "Teams were being asked to produce more collections, for more audiences, more often. The model could generate thousands of candidate edits, but every one of them still had to pass a human who knew the brand, the stock position and the season.",
          "If the AI felt unpredictable, people simply stopped using it and went back to spreadsheets.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        lead: "The product had grown around the model, not around the people using it.",
        body: [
          "Configuration lived in five different places. Rules, overrides and model settings interacted in ways nobody could predict, and the interface exposed the model’s internals rather than the decisions merchandisers were trying to make.",
        ],
        blocks: [
          {
            kind: "list",
            items: [
              {
                title: "No mental model",
                body: "Users couldn’t tell why a product appeared in an edit, so they couldn’t fix it when it was wrong.",
              },
              {
                title: "Fragmented workflow",
                body: "Creating one collection meant jumping between setup, rules, preview and publishing screens.",
              },
              {
                title: "Inconsistent UI",
                body: "Each feature had been built with its own patterns, which made the product feel bigger than it was.",
              },
            ],
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        lead: "Reframe the product around a single object — the brief — and make the AI explain itself in the language of that brief.",
        body: [
          "Instead of configuring a model, merchandisers describe what they want: an audience, a mood, a price range, a few must-haves. The system proposes an edit, and every product carries a short, legible reason tied back to the brief.",
          "I mapped every existing setting to the decision it represented, removed the ones that didn’t map to a real decision, and grouped the rest into the brief, rules and review.",
        ],
        blocks: [
          {
            kind: "flow",
            caption: "From five configuration screens to one brief-led workflow.",
            steps: [
              { label: "Brief", note: "Describe the edit in plain language and constraints" },
              { label: "Generate", note: "Model proposes a ranked selection" },
              { label: "Review", note: "Every product explains why it’s there" },
              { label: "Steer", note: "Pin, remove or adjust — the edit re-ranks live" },
              { label: "Publish", note: "Approve and schedule across channels" },
            ],
          },
        ],
      },
      {
        id: "product",
        title: "Product / UX",
        lead: "The brief became the spine of the product.",
        body: [
          "Everything a merchandiser does now hangs off the brief: generation, review, rules and publishing. That gave the team a shared model to design, build and talk about — and gave users one place to look when something felt off.",
        ],
        blocks: [
          {
            kind: "mock",
            mock: "curated-brief",
            size: "full",
            caption: "Brief and review, side by side. Changing the brief re-ranks the edit in place.",
          },
          {
            kind: "list",
            items: [
              {
                title: "Explanations over scores",
                body: "We tested confidence scores and dropped them. A short reason (“Linen, neutral, under €180”) was more useful than a number.",
              },
              {
                title: "Steering, not overriding",
                body: "Pinning or removing a product teaches the edit instead of breaking it, so manual work isn’t lost on the next generation.",
              },
              {
                title: "Progressive complexity",
                body: "Rules are still there for power users, but they start collapsed and are written as sentences.",
              },
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        lead: "A quieter interface, so the products can be loud.",
        body: [
          "The UI steps back: a neutral canvas, one accent for AI-generated states, dense but calm tables, and product imagery given as much room as possible. I rebuilt the component library around these decisions with tokens shared between Figma and code.",
        ],
        blocks: [
          {
            kind: "mock",
            mock: "curated-system",
            size: "wide",
            caption: "Core tokens and components. AI states use a single accent so they’re recognisable everywhere.",
          },
        ],
      },
      {
        id: "collaboration",
        title: "Collaboration",
        lead: "Designing with the model team, not after it.",
        body: [
          "I worked with ML engineers to understand what the model could reliably explain, and shaped the explanation format together so it was both honest and useful. With frontend engineering, I co-owned the component library — reviewing PRs, adjusting spacing and states directly in code, and documenting patterns where they were used.",
        ],
        blocks: [
          {
            kind: "quote",
            text: "The most useful design artefact on this project was a shared vocabulary: brief, edit, reason, pin. Once product, ML and engineering used the same words, most interface questions answered themselves.",
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        lead: "One workflow, one system, and an AI feature people choose to use.",
        body: [
          "The brief-led workflow and the new component library shipped across the platform. Creating an edit moved from a multi-screen setup into a single flow, and explanations gave merchandisers a way to correct the model instead of working around it.",
          "The design system now underpins new features, which has made it faster for the team to build consistent interfaces.",
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        lead: "AI products don’t need more controls; they need better reasons.",
        body: [
          "The biggest shift came from removing settings, not adding them. When people understand why the system did something, they’re comfortable letting it do more.",
        ],
      },
    ],
  },
  {
    slug: "ping",
    index: "02",
    title: "Ping",
    category: "Communication",
    summary:
      "A calmer way for small teams to know what needs their attention — and what can wait.",
    year: "2022",
    role: "Product Designer",
    team: "Founder, 2 Engineers",
    tags: ["Product Design", "Interaction", "Mobile", "UX/UI"],
    layout: "media-left",
    status: "shipped",
    cover: { kind: "mock", mock: "ping-app" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        lead: "Ping is a notification layer for small teams: one feed that separates what needs you now from what’s just nice to know.",
        body: [
          "I was the only designer, working with the founder and two engineers from the first prototype to launch.",
        ],
        blocks: [
          {
            kind: "facts",
            items: [
              { label: "Role", value: "Product Designer" },
              { label: "Scope", value: "Product, UX, Interaction, UI" },
              { label: "Team", value: "Founder, 2 Engineers" },
              { label: "Year", value: "2022" },
            ],
          },
        ],
      },
      {
        id: "context",
        title: "Context",
        lead: "Small teams live across a dozen tools, and every one of them wants attention.",
        body: [
          "The result is a stream of alerts with no sense of priority. People either mute everything or check everything — both are expensive.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        lead: "Priority is personal, and it changes during the day.",
        body: [
          "A static rules engine would never keep up. The product had to learn what mattered to each person without asking them to configure it upfront.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        lead: "Design the feed around two questions: does this need me, and does it need me now?",
        body: [
          "Rather than categories, every item lands in one of two states — Now or Later — with a digest that gathers the rest. Every action on an item is also a signal that tunes the next one.",
        ],
        blocks: [
          {
            kind: "flow",
            steps: [
              { label: "Arrive", note: "Events from connected tools" },
              { label: "Sort", note: "Now, Later or Digest" },
              { label: "Act", note: "Reply, snooze or dismiss in place" },
              { label: "Learn", note: "Each action tunes priority" },
            ],
          },
        ],
      },
      {
        id: "product",
        title: "Product / UX",
        lead: "Every action happens where the notification is.",
        body: [
          "Opening another app to act on a notification is where attention leaks. Ping supports quick replies, snoozing and hand-off inline, with one gesture per action.",
        ],
        blocks: [
          {
            kind: "mock",
            mock: "ping-detail",
            size: "full",
            caption: "Now, Later and the daily digest. Swipe to snooze, tap to act in place.",
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        lead: "Quiet by default, loud only when it matters.",
        body: [
          "The visual language uses weight and position rather than colour to show priority, keeping the single accent for items that truly need you now. Motion is short and functional: items settle into place so you always know where something went.",
        ],
      },
      {
        id: "collaboration",
        title: "Collaboration",
        body: [
          "With a small team, I prototyped interactions directly in code so we could feel gestures on a real device early, and paired with engineers on the priority signals the interface depended on.",
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        body: [
          "Ping launched to its first teams with the Now / Later model at its core. Early feedback centred on the digest: people described checking notifications less often without feeling like they were missing things.",
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        lead: "The best notification is the one you didn’t need to see.",
      },
    ],
  },
  {
    slug: "settle",
    index: "03",
    title: "Settle",
    category: "Fintech",
    summary:
      "Shared expenses without the awkward part — a clearer way to see who owes what and settle it in one step.",
    year: "2021",
    role: "Product Designer",
    team: "PM, 3 Engineers",
    tags: ["Product Design", "Fintech", "UX/UI"],
    layout: "media-right",
    status: "shipped",
    cover: { kind: "mock", mock: "settle-app" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        lead: "Settle is a mobile app for groups who share costs — flatmates, trips, couples.",
        body: [
          "I owned the product design of the core experience: adding expenses, understanding balances and settling up.",
        ],
        blocks: [
          {
            kind: "facts",
            items: [
              { label: "Role", value: "Product Designer" },
              { label: "Scope", value: "UX, UI, Interaction" },
              { label: "Team", value: "PM, 3 Engineers" },
              { label: "Year", value: "2021" },
            ],
          },
        ],
      },
      {
        id: "context",
        title: "Context",
        lead: "Money between friends is more social than financial.",
        body: [
          "Nobody likes asking for money. The existing app was accurate, but it made people do maths in their heads and then have an awkward conversation.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        lead: "Balances were correct, but not understandable.",
        body: [
          "Group debts were shown as a long list of individual expenses. Users couldn’t answer the only question they had: what do I need to do right now?",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        lead: "Answer the question first, show the working second.",
        body: [
          "We simplified group debts into the fewest possible payments and put a single, clear number at the top of every group. The expense history is still there, one tap away.",
        ],
        blocks: [
          {
            kind: "flow",
            steps: [
              { label: "Add", note: "Split an expense in seconds" },
              { label: "Simplify", note: "Debts reduced to fewest payments" },
              { label: "Nudge", note: "A friendly, pre-written reminder" },
              { label: "Settle", note: "Pay or mark as settled" },
            ],
          },
        ],
      },
      {
        id: "product",
        title: "Product / UX",
        lead: "Settling up became a single, reversible step.",
        blocks: [
          {
            kind: "mock",
            mock: "settle-flow",
            size: "full",
            caption: "Group balance, simplified payments and the settle-up confirmation.",
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        body: [
          "Large, confident numbers; neutral language (“owes” rather than “debt”); and a tone that keeps things light. Confirmation states were designed to be reversible, because mistakes with money feel worse than they are.",
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        body: [
          "The simplified balances and settle-up flow shipped as the new core of the app. Support conversations shifted from “why do I owe this?” to feature requests — a good sign the basics had become clear.",
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        lead: "Clarity is a feature, especially when the subject is uncomfortable.",
      },
    ],
  },
  {
    slug: "eden",
    index: "04",
    title: "Eden",
    category: "In progress",
    summary:
      "A new product exploration, currently being designed. The full case study will be published once it ships.",
    year: "2026",
    role: "Product Designer",
    team: "—",
    tags: ["Product Design", "AI", "Exploration"],
    layout: "band",
    status: "in-progress",
    cover: { kind: "mock", mock: "eden-sketch" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        lead: "Eden is in progress.",
        body: [
          "I’m currently working on this project. Early thinking, sketches and decisions will be shared here as it takes shape — happy to walk through it in a conversation in the meantime.",
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
