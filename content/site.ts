// Global copy for the site. Everything here is meant to be edited.
// House rules: CFY stays secondary to the personal brand (context, not branding).
// No dashes and no comma before "and" in the copy.

export const site = {
  name: "Mercedes Casares",
  fullName: "Mercedes Casares",
  role: "Staff Product Designer",
  location: "Buenos Aires",
  current: {
    short: "CFY",
    name: "Curated For You",
    role: "Staff Product Designer",
    what: "AI for retail",
    blurb:
      "CFY uses **AI** to help retailers like REVOLVE and Saks Off Fifth decide what to show, to whom and when. I design the tools behind it and the **design system** that holds them together.",
    facts: [
      { label: "Stage", value: "$8.3M seed (2025)" },
      { label: "Partners", value: "REVOLVE, Lulus, Saks Off Fifth" },
      { label: "So far", value: "**25%** less manual product work" },
    ],
    source: { label: "CFY seed announcement (2025)", href: "https://retailboss.co/shopping-stories-curated-for-you-ai/" },
  },
  email: "casaresmmercedes@gmail.com",
  links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mercedescasares" }],

  hero: {
    title: "I untangle complicated products.",
    supporting:
      "**Communication** taught me to tell a story. **Code** taught me how things get built. Product design is where I get to use both, to make **complex things feel simple**.",
  },

  obvious: {
    title: "Usability isn’t only about screens.",
    body: "A handle that says pull. A sign you read once. Good things **don’t make you think**. That’s the bar.",
    items: [
      { key: "door", label: "A handle that says pull" },
      { key: "sign", label: "A sign you read once" },
      { key: "steps", label: "Steps you just follow" },
      { key: "ui", label: "A button that says what it does" },
    ],
  },

  process: [
    { title: "Complex", body: "Start where it’s messy: **too many rules** and opinions." },
    { title: "Structure", body: "Find the **real order**. That’s most of the work." },
    { title: "Communicate", body: "Tell it as a story, with a **clear hierarchy**." },
    { title: "Simplify", body: "Cut what doesn’t help. Build it **with engineering**." },
    { title: "Obvious", body: "Ship something people **don’t have to think about**." },
  ],

  about: {
    title: "about me:",
    body: [
      "I studied **Communication**, spent time writing code and found product design somewhere in between. It’s the one job where **storytelling, systems and technology** fit together.",
      "I like the messy part: too many rules, too many opinions. I work **close to product and engineering** and keep going until it feels obvious.",
    ],
    // How I got here: each stage adds one layer to the next.
    // My story in five chapters, oldest to today. Each one hands a layer to the next.
    path: [
      { era: "Where it started", stage: "Communication", art: "talk", body: "Studied it, then worked in marketing. Learned to tell a story.", adds: "storytelling" },
      { era: "Going digital", stage: "Digital", art: "screen", body: "Content and web. Saw what people actually do on a screen.", adds: "clarity" },
      { era: "Learning to build", stage: "Development", art: "code", body: "HTML and CSS/SASS. Built the interfaces myself.", adds: "feasibility" },
      { era: "Finding design", stage: "UX/UI", art: "wire", body: "Flows where words and interface work together.", adds: "structure" },
      { era: "Today", stage: "Product Design", art: "product", body: "Eden, Settle, now Staff at CFY. All of it, at once.", adds: "product thinking", now: true },
    ],
    sum: ["storytelling", "design", "technology", "product thinking"],
    more: "Want the full story?",
  },
};

export type Site = typeof site;
