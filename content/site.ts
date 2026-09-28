// Global copy for the site. Everything here is meant to be edited.
// House rules: don't name the current employer. No dashes and no comma before "and" in the copy.

export const site = {
  name: "Mercedes Casares",
  fullName: "Mercedes Casares",
  role: "Product Designer",
  location: "Buenos Aires",
  focus: "B2B SaaS & AI",
  email: "casaresmmercedes@gmail.com",
  links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mercedescasares" }],

  hero: {
    // Rendered as: lead + circled accent
    lead: "Product designer making complex products",
    accent: "feel simple.",
    supporting:
      "I’ve spent **7+ years** designing digital products from the first question to the last detail: **strategy, UX, interface and the systems** behind them. These days I work on **B2B SaaS and AI products**, close to engineering and sometimes **directly in code**.",
    note: "from sketch to shipped",
  },

  process: [
    {
      title: "Explore",
      body: "Questions, sketches and messy flows. Most of the work is figuring out **what the problem actually is**.",
    },
    {
      title: "Define",
      body: "Wireframes, decisions and the **system underneath**. Fewer, stronger patterns.",
    },
    {
      title: "Design",
      body: "Precise UI with a **clear hierarchy**, where craft is there to make things easier to understand.",
    },
    {
      title: "Ship",
      body: "I work in the **same repo as engineering** when it helps, so details get shipped instead of handed off.",
    },
  ],

  about: {
    title: "about me:",
    facts: [
      { label: "Name", value: "Mercedes Casares" },
      { label: "Based in", value: "Buenos Aires, Argentina" },
      { label: "Experience", value: "7+ years in product design" },
      { label: "Studied", value: "Communication at UCA" },
      { label: "Background", value: "Front end development" },
      { label: "Focus", value: "B2B SaaS and AI products" },
    ],
    who: "A product designer who likes the messy middle of the work: the moment a product has too many edge cases, settings and opinions, when someone has to decide what it actually is.",
    body: [
      "I designed **B2B tools for hybrid workspaces** at Eden (YC S15). After that I worked on **fintech and SaaS products** at Settle Network, including Ping (YC S22), which grew to **20,000+ users and $10M+ in monthly volume**.",
      "Coming from front end development, I’m usually **the designer closest to engineering**. I care about the component library as much as the hero screen.",
    ],
  },
};

export type Site = typeof site;
