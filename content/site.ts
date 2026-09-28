// Global copy for the site. Everything here is meant to be edited.
// Don't name the current employer anywhere on the site.

export const site = {
  name: "Mercedes Casares",
  fullName: "Mercedes Casares",
  role: "Product Designer",
  location: "Buenos Aires",
  focus: "B2B SaaS & AI",
  email: "casaresmmercedes@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mercedescasares" },
  ],

  hero: {
    // Rendered as: lead + <em>accent</em> + tail
    lead: "Product designer making complex products",
    accent: "feel simple.",
    supporting:
      "Seven years designing digital products end to end — framing the problem, shaping the strategy, then the UX, interface and systems that carry it. Lately that means AI-powered products, built side by side with engineering, and sometimes directly in code.",
  },

  about: {
    intro:
      "I’m a product designer who likes the unglamorous middle of the work: the moment a product has grown too many edge cases, too many settings and too many opinions, and someone has to decide what it actually is.",
    body: [
      "I studied Communication at UCA before moving into product, and I still design with a background in front-end development — which is why I’m usually the designer closest to engineering, and why I care about the component library as much as the hero screen.",
      "I designed B2B tools for hybrid workspaces at Eden, and worked across fintech and SaaS products at Settle Network — including Ping, which grew to 20,000+ users and $10M+ in monthly volume. Right now I’m focused on B2B SaaS and AI products.",
    ],
    principles: [
      {
        title: "Start with the decision, not the screen",
        body: "Most interface problems are unmade product decisions. I try to name them first.",
      },
      {
        title: "Fewer, stronger patterns",
        body: "A system with ten components used well beats forty used once.",
      },
      {
        title: "Design in the medium",
        body: "Real data, real constraints, real code when it helps. Mockups are a means, not the deliverable.",
      },
    ],
  },

  capabilities: [
    {
      label: "Product strategy",
      body: "Framing problems, defining scope and sequencing bets with product and leadership.",
    },
    {
      label: "UX & workflows",
      body: "Untangling complex, multi-step workflows into flows people can hold in their head.",
    },
    {
      label: "Interface design",
      body: "Precise, quiet UI with a clear hierarchy — craft in service of comprehension.",
    },
    {
      label: "Design systems",
      body: "Tokens, components and documentation that engineering actually adopts.",
    },
    {
      label: "AI products",
      body: "Designing for probabilistic output: trust, explanation, control and recovery.",
    },
    {
      label: "Engineering collaboration",
      body: "Working in the same repo when useful — prototyping, reviewing and shipping details.",
    },
  ],
};

export type Site = typeof site;
