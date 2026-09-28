# portfolio

Personal portfolio — Next.js (App Router) + Motion, deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Editing content

- `content/site.ts` — name, hero copy, about, capabilities, email and links.
- `content/projects.ts` — projects and case studies (sections 01–09; only the
  sections with real content are included).
- Images live in `public/images/<project>/`. Reference them from
  `content/projects.ts` with their real width/height; use `fit: "contain"` for
  cut-outs and composites so they're never cropped.
