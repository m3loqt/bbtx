"use client";

import { useState } from "react";
import Image from "next/image";
import { SubscribeModal } from "@/app/components/SubscribeModal";

const USEFUL_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", action: "contact" as const },
  { label: "FAQs", href: "/#faq" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const SERVICES_LINKS = [
  { label: "Organizational Assessment & Analysis", href: "/services/organizational-assessment" },
  { label: "Strategy & Advisory Services", href: "/services/strategy-advisory" },
  { label: "Leadership & Team Development", href: "/services/leadership-development" },
  { label: "AI Integration & Innovation", href: "/services/ai-integration" },
  { label: "Implementation & Change Support", href: "/services/implementation-support" },
];

const RESOURCES_LINKS = [
  { label: "Digital Twin Snapshot", href: "/digital-twin-snapshot" },
  { label: "Whitepapers", href: "/whitepapers" },
  { label: "1:1 Coaching", href: "/coaching" },
  { label: "Courses", href: "/courses" },
  { label: "Articles", href: "https://chaoticconfluence.substack.com", external: true },
  { label: "Subscribe", action: "subscribe" as const },
];

const SOCIAL_LINKS = [
  { label: "Medium", href: "https://rgranttate.medium.com/" },
  { label: "Substack", href: "https://chaoticconfluence.substack.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/granttate" },
];

const ALL_LINKS_HREF = "/links";

function FooterLinkGroup({
  heading,
  links,
  onAction,
}: {
  heading: string;
  links: { label: string; href?: string; external?: boolean; action?: "contact" | "subscribe" }[];
  onAction: (action: "contact" | "subscribe") => void;
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
      <h3 className="shrink-0 text-[15px] font-semibold text-[#222222]">{heading}</h3>
      <ul className="space-y-2.5">
        {links.map((link) =>
          link.action ? (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => onAction(link.action!)}
                className="text-left text-sm text-[#777777] transition-colors hover:text-[#222222]"
              >
                {link.label}
              </button>
            </li>
          ) : (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-[#777777] transition-colors hover:text-[#222222]"
              >
                {link.label}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export function Footer() {
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  const [footerStatus, setFooterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleAction = (action: "contact" | "subscribe") => {
    if (action === "contact") {
      window.dispatchEvent(new Event("openContact"));
    } else {
      setSubscribeOpen(true);
    }
  };

  async function handleFooterSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFooterStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: footerEmail, source: "footer" }),
      });
      const json = (await res.json()) as { success?: boolean };

      if (!res.ok || !json.success) {
        setFooterStatus("error");
        return;
      }

      setFooterStatus("success");
      setFooterEmail("");
    } catch {
      setFooterStatus("error");
    }
  }

  return (
    <footer className="bg-white text-[#222222]">
      <div className="w-full px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* Nav columns + subscribe */}
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4 lg:gap-10">
          <FooterLinkGroup heading="Useful Links" links={USEFUL_LINKS} onAction={handleAction} />
          <FooterLinkGroup heading="Services" links={SERVICES_LINKS} onAction={handleAction} />
          <FooterLinkGroup heading="Resources" links={RESOURCES_LINKS} onAction={handleAction} />

          <div>
            <h3 className="text-[15px] font-semibold text-[#222222]">Subscribe</h3>
            {footerStatus === "success" ? (
              <p className="mt-2 text-sm text-[#777777]">You&apos;re subscribed — thanks for joining.</p>
            ) : (
              <>
                <p className="mt-2 text-sm text-[#777777]">Join our community to receive updates</p>
                <form className="mt-4 flex w-full max-w-sm items-center gap-2" onSubmit={handleFooterSubscribe}>
                  <input
                    type="email"
                    required
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 rounded-full border border-black/10 bg-[#f7f7f7] px-4 py-2.5 text-sm text-[#222222] placeholder:text-[#999] focus:outline-none focus:ring-0"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    disabled={footerStatus === "submitting"}
                    className="shrink-0 rounded-full bg-[#ca3726] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-95 disabled:opacity-70"
                  >
                    {footerStatus === "submitting" ? "..." : "Subscribe"}
                  </button>
                </form>
                {footerStatus === "error" && (
                  <p className="mt-2 text-xs text-[#ca3726]">Something went wrong. Please try again.</p>
                )}
              </>
            )}
            <p className="mt-2 text-xs text-[#999]">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-black/[0.08] lg:mt-20" />

        {/* Wordmark + social logos */}
        <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:justify-between lg:pt-12">
          <div className="flex flex-col gap-1">
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/oglogo.webp"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-semibold tracking-normal text-[#222222]">
                BBTx Consulting
              </span>
            </a>
            <span className="text-sm text-[#999999]">Charlottesville, VA, USA</span>
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#777777] transition-colors hover:text-[#222222]"
              >
                {social.label}
              </a>
            ))}
            <a
              href={ALL_LINKS_HREF}
              className="text-sm font-medium text-[#ca3726] transition-colors hover:text-[#222222]"
            >
              All Links
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-black/[0.08] lg:mt-12" />

        {/* Legal links + copyright */}
        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/privacy" className="text-sm text-[#777777] transition-colors hover:text-[#222222]">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-[#777777] transition-colors hover:text-[#222222]">
              Terms of Service
            </a>
            <a href="/cookies" className="text-sm text-[#777777] transition-colors hover:text-[#222222]">
              Cookie Policy
            </a>
          </div>
          <span className="text-sm text-[#999999]">
            © {new Date().getFullYear()} BBTx Consulting. All rights reserved.
          </span>
        </div>
      </div>

      {/* "Contact Us" dispatches the global openContact event, handled by Nav's ContactModal */}
      <SubscribeModal
        key={subscribeOpen ? "open" : "closed"}
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />
    </footer>
  );
}
