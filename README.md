# Vexoraa

Marketing site for **Vexoraa**, a music marketing agency that grows artists on Spotify, YouTube, SoundCloud and Apple Music through real playlist placements reaching 500K to 2M+ monthly listeners.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, **GSAP** (ScrollTrigger + SplitText), **Three.js** and **Lenis** smooth scrolling.

## What is on the page

- A WebGL scene where the swooshes of the Vexoraa V become sound: ribbons start as the V, then unfold into a waveform field as you scroll.
- A pinned scroll story of the four playlist tiers (25K up to 2M+ listeners).
- Platform services, animated results, a pinned horizontal case-study track, a week-by-week process.
- A live 90-day growth projector that drives the 3D field.
- Testimonials, pricing, FAQ and a contact form.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/app/            layout, global design tokens, page composition
src/components/     one file per section (Hero, Ladder, Services, ...) plus Scene.tsx (Three.js)
src/lib/data.ts     all copy, demo case studies, testimonials and pricing
src/lib/sceneState.ts   shared state that scroll triggers tween and the 3D scene reads
```

## Before launch

- All case studies, testimonials, metrics, playlist names and prices in `src/lib/data.ts` are **demo content**. Replace them with real, verifiable data.
- The contact form opens a prefilled email to `CONTACT_EMAIL` in `src/lib/data.ts`. Wire it to a backend or form service when ready.
- Update the social links in `FOOTER_LINKS` and set the real site URL in `src/app/layout.tsx`.
