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

## Visual language

Two layers: a precise digital layer (Inter Tight, grid, real screenshots) and a
hand layer (red pen `--pen`, pencil `--pencil`, Reenie Beanie notes, Courier
Prime labels, paper grain). Hand strokes are generated in `lib/rough.ts` and
drawn with `components/hand.tsx`. The "How I work" section
(`components/Process.tsx`) scrubs from a pencil sketch to the shipped Ping screen.

Copy rule: no dashes in the text.
