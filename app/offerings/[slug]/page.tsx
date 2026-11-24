import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { altFor } from "@/lib/seo/image-alt";
import {
  OFFERINGS,
  getOffering,
  offeringUrl,
  type Fee,
  type StandardOffering,
  type WorkshopOffering,
} from "@/lib/offerings/offerings";
import { serif } from "../fonts";
import { OfferingCta } from "./OfferingCta";

type Params = { slug: string };

// Only the four offerings exist; anything else under /offerings is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return OFFERINGS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) return {};
  const url = offeringUrl(offering.slug);
  return {
    title: offering.name,
    description: offering.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${offering.name} | BBTx`,
      description: offering.metaDescription,
      images: [{ url: offering.hero.og, width: 1200, height: 630, alt: altFor(offering.hero.image) }],
    },
    twitter: { card: "summary_large_image", title: `${offering.name} | BBTx`, description: offering.metaDescription, images: [offering.hero.og] },
  };
}

export default async function OfferingPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) notFound();

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Nav />

      {/* Full-bleed hero. id="hero" lets the site nav stay transparent over it until you scroll past. */}
      <section
        id="hero"
        className="relative h-[54.4svh] max-h-[576px] min-h-[432px] w-full overflow-hidden bg-black md:h-[51.2svh] md:min-h-[384px] md:max-h-[560px]"
      >
        <Image
          src={offering.hero.image}
          alt={altFor(offering.hero.image)}
          fill
          priority
          sizes="(min-width: 1920px) 1920px, 100vw"
          quality={80}
          className="object-cover"
          style={{ objectPosition: offering.hero.position }}
        />
        {/* Two soft shades: the top keeps the nav readable, the bottom keeps the headline readable on every image. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 to-transparent" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-[94%]"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.78) 42%, rgba(0,0,0,.44) 74%, rgba(0,0,0,0) 100%)" }}
          aria-hidden="true"
        />

        {/* The headline sits at the bottom left, on the same left edge and width as the text column below. */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-[720px] px-6 pb-10">
            <Header name={offering.name} eyebrow={offering.eyebrow} tagline={offering.tagline} />
          </div>
        </div>
      </section>

      <main>
        <article className="mx-auto w-full max-w-[720px] px-6 pb-20 pt-12 md:pt-16">
          <Paragraphs items={offering.intro} />
          {offering.layout === "standard" ? (
            <StandardBody offering={offering} />
          ) : (
            <WorkshopBody offering={offering} />
          )}
        </article>
        {offering.layout === "workshop" && <PrivateSection offering={offering} />}
      </main>

      <Footer />
    </div>
  );
}

function Header({ name, eyebrow, tagline }: { name: string; eyebrow: string; tagline: string }) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <span className="h-[2px] w-10 shrink-0 bg-[#C8102E]" aria-hidden="true" />
        <p className="text-xs font-medium tracking-[0.14em] text-white">{eyebrow}</p>
      </div>
      <h1
        className={`${serif.className} mt-5 text-balance text-[clamp(2.375rem,6.4vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white`}
      >
        <NoBreakHyphens text={name} />
      </h1>
      <p className="mt-4 text-balance text-[clamp(1.125rem,2.4vw,1.625rem)] leading-snug text-white/85">{tagline}</p>
    </header>
  );
}

/** Keeps a hyphenated word such as "AI-Driven" on one line, so a headline never breaks as "AI-" / "Driven". */
function NoBreakHyphens({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function Paragraphs({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <div className={`space-y-6 text-[1.1875rem] leading-[1.7] text-[#333333] ${className}`}>
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}

/** A section heading. Serif, with generous space above it. */
function SectionHeading({ children, level = 2 }: { children: React.ReactNode; level?: 2 | 3 }) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag className={`${serif.className} mt-16 text-[1.75rem] font-medium leading-tight tracking-[-0.01em] text-[#111111] md:text-[2rem]`}>
      {children}
    </Tag>
  );
}

/** What is included: one item per row, hairlines between, a small red dot to lead each. */
function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 border-t border-black/15">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4 border-b border-black/15 py-4 text-[1.125rem] leading-snug text-[#222222]">
          <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8102E]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** The price, large, with its button beside it (below on a phone), under a solid rule. */
function PriceBar({ fee, children }: { fee: Fee; children: React.ReactNode }) {
  return (
    <div className="mt-16 flex flex-col gap-8 border-t border-[#111111] pt-10 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {fee.label && <p className="text-sm font-medium tracking-[0.04em] text-[#555555]">{fee.label}</p>}
        <p className="flex items-baseline gap-3">
          <span className={`${serif.className} text-[3.5rem] font-medium leading-none tracking-[-0.02em] text-[#111111] md:text-[4rem]`}>
            {fee.amount}
          </span>
          {fee.note && <span className="text-base text-[#555555]">{fee.note}</span>}
        </p>
      </div>
      {children}
    </div>
  );
}

function StandardBody({ offering }: { offering: StandardOffering }) {
  return (
    <>
      <SectionHeading>What&apos;s Included</SectionHeading>
      <Checklist items={offering.included} />

      <SectionHeading>How It Works</SectionHeading>
      <Paragraphs items={offering.how} className="mt-6" />

      <PriceBar fee={offering.fee}>
        <OfferingCta label={offering.cta.label} inquiry={offering.cta.inquiry} offeringId={offering.id} />
      </PriceBar>
    </>
  );
}

function WorkshopBody({ offering }: { offering: WorkshopOffering }) {
  const w = offering.workshop;
  return (
    <>
      <SectionHeading>{w.heading}</SectionHeading>
      <Paragraphs items={w.paragraphs} className="mt-6" />

      <SectionHeading level={3}>{w.coverHeading}</SectionHeading>
      <Checklist items={w.cover} />
      <p className="mt-8 text-[1.1875rem] leading-[1.7] text-[#333333]">{w.closing}</p>

      <PriceBar fee={w.fee}>
        <OfferingCta label={w.cta.label} inquiry={w.cta.inquiry} offeringId={offering.id} option="workshop" />
      </PriceBar>
    </>
  );
}

/** The private option, set apart on a light band so it reads as the second choice. */
function PrivateSection({ offering }: { offering: WorkshopOffering }) {
  const p = offering.private;
  return (
    <section className="border-t border-black/10 bg-[#F6F6F6]">
      <div className="mx-auto w-full max-w-[720px] px-6 pb-24 pt-16 md:pt-20">
        <p className="text-[1.0625rem] text-[#666666]">{p.kicker}</p>
        <h2 className={`${serif.className} mt-3 text-balance text-[clamp(2rem,4.6vw,2.875rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#111111]`}>
          {p.heading}
        </h2>
        <Paragraphs items={p.paragraphs} className="mt-8" />

        <SectionHeading level={3}>What&apos;s Included</SectionHeading>
        <Checklist items={p.included} />
        <p className="mt-8 text-[1.1875rem] leading-[1.7] text-[#333333]">{p.closing}</p>

        <PriceBar fee={p.fee}>
          <OfferingCta label={p.cta.label} inquiry={p.cta.inquiry} offeringId={offering.id} option="private_analysis" variant="secondary" />
        </PriceBar>
      </div>
    </section>
  );
}
