// Global copy for the site. Everything here is meant to be edited.
// House rules: CFY stays secondary to the personal brand (context, not branding).
// No dashes and no comma before "and" in the copy.

export const site = {
  name: "Mercedes Casares",
  fullName: "Mercedes Casares",
  role: "Product Designer",
  location: "Buenos Aires",
  focus: "B2B SaaS & AI",
  current: {
    short: "CFY",
    name: "Curated For You",
    role: "First Product Designer",
    what: "AI powered retail personalization",
    blurb:
      "I’m the **first product designer** at Curated For You, an AI platform that helps retailers like REVOLVE and Saks Off Fifth turn data and real world context into **shoppable stories**. I built the **design system** from zero and redesigned workflows that cut **manual product management by 25%**.",
    facts: [
      { label: "Where", value: "Austin, US · remote" },
      { label: "Stage", value: "$8.3M seed (2025)" },
      { label: "Retail partners", value: "REVOLVE, Lulus, Saks Off Fifth" },
      { label: "My impact", value: "**25%** less manual product work" },
    ],
    source: { label: "CFY seed announcement (2025)", href: "https://retailboss.co/shopping-stories-curated-for-you-ai/" },
  },
  email: "casaresmmercedes@gmail.com",
  links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mercedescasares" }],

  hero: {
    // Rendered as: lead + [struck word] with a handwritten correction.
    lead: "I like complicated problems. I just make them feel",
    struck: "complicated.",
    correction: "obvious.",
    supporting:
      "I studied **Communication**, learned **how products get built** and became a **Product Designer**. For 7+ years I’ve used **storytelling** to structure complex things until they feel obvious, then designed them next to the people who build them. Today I’m the first designer at **CFY**, an **AI powered retail** startup.",
    note: "a communicator who learned to design products",
  },

  // COMMUNICATION → STORYTELLING → PRODUCT → DEVELOPMENT → SIMPLICITY
  chain: [
    { word: "Communication", body: "Where I started. I studied it at UCA and never stopped using it." },
    { word: "Storytelling", body: "Putting information in the **right order** so people follow it without effort." },
    { word: "Product", body: "Connecting **user needs, business goals** and technology into one experience." },
    { word: "Development", body: "Knowing **how it gets built**. I talk constraints with engineers and sometimes write the code." },
    { word: "Simplicity", body: "The point of all of it: it **just makes sense**." },
  ],

  obvious: {
    title: "Usability isn’t only about screens.",
    body: "A handle that tells you to pull. A sign you only need to read once. Instructions you follow without thinking. They **don’t make you think** about how they work. **They just make sense.** That’s the bar I design for.",
    items: [
      { key: "door", label: "A handle that says pull" },
      { key: "sign", label: "A sign you read once" },
      { key: "steps", label: "Steps you just follow" },
      { key: "ui", label: "A button that says what it does" },
    ],
  },

  process: [
    { title: "Complex", body: "Start where it’s messy: **too many rules**, edge cases and opinions." },
    { title: "Structure", body: "Find the **real order** of things. Most of the work is figuring out what the problem actually is." },
    { title: "Communicate", body: "Tell it as a story: flows, words and **clear hierarchy**." },
    { title: "Simplify", body: "Cut what doesn’t help. Fewer, **stronger patterns**, built with engineering." },
    { title: "Obvious", body: "Ship something people **don’t have to think about**." },
  ],

  about: {
    title: "about me:",
    facts: [
      { label: "Name", value: "Mercedes Casares" },
      { label: "Based in", value: "Buenos Aires, Argentina" },
      { label: "Experience", value: "7+ years in product design" },
      { label: "Studied", value: "Communication at UCA" },
      { label: "Background", value: "Front end development" },
      { label: "Now", value: "First Product Designer at CFY (AI retail)" },
      { label: "Focus", value: "B2B SaaS and AI products" },
    ],
    who: "A **communicator who learned to design products**, understands how they get built and is a little obsessed with making **complicated things feel simple**.",
    body: [
      "Right now I’m the first designer at **Curated For You (CFY)**, an AI powered retail startup, where I set up the design system and helped cut **manual product management tasks by 25%**.",
      "Before CFY I worked on **fintech and SaaS products** at Settle Network, including Ping (YC S22), which grew to **20,000+ users and $10M+ in monthly volume**. Earlier I designed **B2B tools for hybrid workspaces** at Eden (YC S15).",
      "Coming from front end development, I’m usually **the designer closest to engineering**. I care about the component library as much as the hero screen.",
    ],
  },
};

export type Site = typeof site;
