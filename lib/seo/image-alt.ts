/**
 * Alt text for every image on the public site, in one place.
 *
 * Rules these were written under (see docs/seo/batch-2-performance-images.md):
 * - Describe what the picture shows, in plain words. Alt text is for people who
 *   cannot see the image first; search and AI assistants benefit second.
 * - Name a person only where the site already identifies them (Dr. Grant Tate
 *   on his own photos). Nobody else is named from appearance.
 * - A site term (a service, "workshop", "plan") appears only where the scene
 *   really shows it. No keyword is added to make an image "rank".
 * - Logos say what the logo says, nothing more. No client or results claim.
 * - Purely decorative images are NOT listed here. They keep alt="" together
 *   with aria-hidden, which is the correct treatment (see DECORATIVE_IMAGES).
 */

export const IMAGE_ALT = {
  "/grant.jpg": "Dr. Grant Tate presenting to a workshop group in front of a projected slide",
  "/grantt.jpg": "Dr. Grant Tate, founder of BBTx Consulting, in profile holding a small colorful object",

  // Service page hero photos
  "/serv1.png": "Two men in conversation across a table, one taking notes with a coffee cup beside him",
  "/serv2.png": "A leadership team around a table working through a plan with documents and sticky notes",
  "/serv3.png": "Four colleagues in a candid conversation outside an office building",
  "/serv4.png": "A team studying large printed plans spread across a table while one person points",
  "/serv5.png": "A team reviewing project plans and sticky notes on a wall",
  "/serv6.png": "A leader speaking with colleagues across a conference table",

  // Workshop photos (About strip, Services, Coaching, Courses)
  "/about/one.jpg": "A facilitator pointing to the word “Decide!” on a whiteboard",
  "/about/two.png": "A facilitator writing on a whiteboard in a meeting room with flip-chart notes on the wall",
  "/about/three.png": "A participant pointing to sticky notes on a paper-covered wall during a workshop",
  "/about/four.jpg": "A facilitator writing on a flip chart during a workshop",
  "/about/five.png": "A presenter in a blue shirt speaking beside a flip chart in a training room",
  "/about/six.jpg": "A facilitator wearing a name badge speaking in front of a projection screen",
} as const;

export type AltKey = keyof typeof IMAGE_ALT;

export function altFor(src: AltKey): string {
  return IMAGE_ALT[src];
}

/** Logos read exactly as printed on the logo. */
export const COMPANY_LOGO_ALT: Record<string, string> = {
  "RIV.png": "Rivanna Authorities",
  "alz.png": "Alzheimer’s Association",
  "bar.png": "Barton Malow",
  "ber.png": "Berkley Group",
  "bra.png": "Branch",
  "bri.png": "BrightSpec",
  "cha.png": "City of Charlottesville, Virginia seal",
  "chg.png": "CHG, Castle Hill Gaming",
  "cho.png": "CHO Airport",
  "con.png": "Contraline",
  "csp.png": "CSPDC, Central Shenandoah Planning District Commission",
  "cvi.png": "Cville BioHub",
  "dou.png": "DoubleTree by Hilton",
  "flo.png": "Village of Key Biscayne, Florida seal",
  "inb.png": "inbio",
  "lum.png": "Lumos",
  "main.png": "Bridge Business Transformations",
  "rob.png": "Robbins Staffing, professional staffing and recruiting services",
  "shri.png": "Shriver Center on Poverty Law",
  "wes.png": "Westminster-Canterbury of the Blue Ridge",
};

/** Alt for a logo path such as "/companies-nobg/cha.png". */
export function companyLogoAlt(path: string): string {
  const file = path.split("/").pop() ?? "";
  const alt = COMPANY_LOGO_ALT[file];
  if (!alt) throw new Error(`No alt text for company logo "${path}". Add it to COMPANY_LOGO_ALT.`);
  return alt;
}

/**
 * Images that are decoration only (textures and gradients behind text, the
 * small logo mark next to the written name). They render with alt="" and
 * aria-hidden. A test enforces that nothing else uses an empty alt.
 */
export const DECORATIVE_IMAGES = ["/cta.png", "/newcta.png", "/service.png", "/oglogo.webp"] as const;
