# SEO/AEO Batch 3: large-screen cap and chat widget removal

**Branch:** `seo/batch-3-widget-and-large-screens` (from `main` at `63cff09`) · **Date:** 2026-11-19
**Status:** Merged to `main` (`55f81dd`) and **deployed to production 2026-11-19**. The widget removal is its own commit (`edb93f6`) so it can ship ahead of the layout change.

## 1. Chat widget removed

Covered in `batch-2-performance-images.md`, section 10. Summary: the Voxwins subscription was cancelled, the widget was the cause of all the layout shift Lighthouse still reported (0.42 to 0.63, down from 1.4 to 2.2 after the first guard), and it cost about 240 KiB of unused JavaScript per page. `tests/seo/third-party.test.mjs` keeps it out.

A fresh-tab measurement on a local production build without the widget: homepage CLS **0.0036**, `/cookies` **0**, no iframes, and Google Analytics is the only third-party script. This is a local, unthrottled measure; the live Lighthouse re-run after deploy is the real confirmation.

## 2. The large-screen problem

Measured on the live site at a 2560 px screen (the "Responsive Image" and "Aspect Ratio" checks flag exactly this):

| Image | Shown at | Source file | Shape, shown vs file |
|---|---|---|---|
| Homepage hero | 2545 x 1289 | 2048 x 1392 | 1.97 vs 1.47 |
| Closing banner | 2545 x 820 | 1652 x 952 | 3.1 vs 1.74 |

Full-bleed sections stretched to the whole monitor, enlarging photos past what their files hold and cropping them to extreme panoramas.

## 3. What changed

- **`app/globals.css`:** `body:not(:has([data-slot="sidebar-wrapper"])) { max-width: 1920px; margin-inline: auto }`. At or below 1920 px nothing changes; above it the page is centred and the white page colour continues on both sides. The admin shell is excluded because its sidebar is `position: fixed` to the viewport edge. No page files needed structural changes (several pages render through shared components, so a body-level rule was safer than editing each page root).
- **Two viewport-wide strips** (`Results.tsx` logo rows, `about/page.tsx` photo strip) used `w-screen max-w-[100vw]`; they now use `max-w-[min(100vw,1920px)]` so they end where the page ends.
- **16 full-bleed images** changed from `sizes="100vw"` to `sizes="(min-width: 1920px) 1920px, 100vw"`, so the browser asks for the width actually drawn.
- **`next.config.ts`:** `images.imageSizes` now includes 160 and 320, so the 160 px logos get exactly a 160 px file at 1x and a 320 px file at 2x (they were getting 256 and 384).
- **`tests/seo/layout-width.test.mjs`:** the cap rule and its admin exclusion, the capped `sizes` hint, the capped strips, and the image-size list.

## 4. Measured result (local production build, real browser, numbers only)

| Screen | Body | Hero |
|---|---|---|
| 2560 px | **1920 px, centred (313 px each side)**, was 2560 | 1920 x 1289, shape **1.49** vs photo 1.47 (was 1.97) |
| 2200 px | 1920 px, centred (133 px each side) | 1920 wide |
| 1920 px, 1440 px, 1280 px | full width (the 15 px gap is the scrollbar), unchanged | unchanged |

No horizontal overflow at any width. The closing banner at 2560 px is now 1920 px wide (shape 2.34, was 3.1). Narrower screens were checked by loading the page in same-origin frames of fixed width, because resizing the browser window did not change the page's viewport.

## 5. Not done, and what will still be flagged

- **Hero photo resolution on a 2x monitor.** The photo is 2048 px wide. On a 2560 screen at 2x density it needs 3840 px, so it is still upscaled about 1.9x (it was about 2.5x). A sharper hero needs a larger source photo from the original.
- **Banners cropped to wide strips.** The service pages' closing banner (`cta.png`) is a fixed-height strip: 3.48:1 from a 1.49:1 file at 2560 px, and the service hero photos are 2.4:1 from 1.5:1. The aspect-ratio check will probably still flag these. They crop, they do not stretch.
- **Possible follow-up:** replace the three abstract red banners (`cta.png` wave, `service.png` radial, `newcta.png` stepped blocks) with CSS gradients. That would remove them from the image checks entirely and shrink the page, but it changes the look, and the stepped blocks cannot be reproduced exactly in CSS. Needs a design decision.
- **Nothing was checked by eye** (standing preference). On screens wider than 1920 px the dark hero and banner sections now sit as a centred block with white page colour either side; whether that looks right is for Mel to judge.
- **Fonts and the build flake.** The only production build failure so far was a Google Fonts download error during `next build`, unrelated to this work. Self-hosting the fonts would remove that risk; not started, needs a decision.
