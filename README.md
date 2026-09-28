# portfolio

Personal portfolio — Next.js (App Router) + Motion, deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Editing content

- `content/site.ts` — name, hero copy, about, capabilities, email and links.
- `content/projects.ts` — projects and case studies (sections 01–09).
  Case study copy is a draft: replace it with real project facts.

## Screenshots

Product visuals are currently built-in mockups (`components/mockups`).
To use real screenshots, put them in `public/images` and replace a
`{ kind: "mock", ... }` visual with
`{ kind: "image", src: "/images/file.png", alt: "…", width: 2400, height: 1500 }`.
