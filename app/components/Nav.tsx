"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "./ArrowIcon";
import { ContactModal } from "./ContactModal";

const navLinks = [
  { label: "Services", hasDropdown: true, href: "#" },
  { label: "Resources", hasDropdown: true, href: "#" },
  { label: "About", hasDropdown: false, href: "/about" },
  { label: "Community", hasDropdown: false, href: "/community" },
];

const DROPDOWNS: Record<
  string,
  { title: string; description: string; href?: string }[]
> = {
  Services: [
    {
      title: "Transformational Strategy & Implementation Plan",
      description:
        "Focused AI transformation strategy with prioritized initiatives, ownership, and a sequenced rollout.",
      href: "/services/strategy-roadmap",
    },
    {
      title: "Organizational AI Assessment",
      description:
        "Assess workflows, leadership alignment, and initiatives to surface where AI can create real impact.",
      href: "/services/organizational-ai-assessment",
    },
    {
      title: "AI Organizational Model",
      description:
        "Define where AI fits, how responsibilities are assigned, and how initiatives align with priorities.",
      href: "/services/ai-organizational-model",
    },
  ],
  Resources: [
    {
      title: "Blogs",
      description: "AI strategy, implementation insights, and industry perspectives.",
      href: "/blog",
    },
    {
      title: "Newsletter",
      description: "Structured updates and resources for leaders integrating AI.",
      href: "/newsletter",
    },
  ],
};

const DROPDOWN_TRANSITION_MS = 200;

export function Nav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string, hasDropdown: boolean) => {
    if (!hasDropdown) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
    setPanelVisible(false);
  };

  const handleLeave = () => {
    setPanelVisible(false);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, DROPDOWN_TRANSITION_MS);
  };

  useEffect(() => {
    if (!activeDropdown) return;
    const id = requestAnimationFrame(() => setPanelVisible(true));
    return () => cancelAnimationFrame(id);
  }, [activeDropdown]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const openContact = () => setContactOpen(true);
    window.addEventListener("openContact", openContact);
    return () => window.removeEventListener("openContact", openContact);
  }, []);

  const dropdownItems = activeDropdown ? DROPDOWNS[activeDropdown] : null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full px-4 pt-[18px] sm:px-6 lg:px-8">
      <div
        className={`relative mx-auto max-w-[960px] ${dropdownItems ? "pb-[420px]" : ""}`}
        onMouseLeave={handleLeave}
      >
        <div className="relative">
          <header
            className={`flex items-center justify-between gap-6 rounded-lg border border-black/[0.06] bg-white px-3 py-3.5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:px-4 lg:gap-8 lg:px-5 ${contactOpen ? "relative z-[250]" : ""}`}
          >
          <a href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/node.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-[#222222]">
              BBTx Consulting
            </span>
          </a>

          <div className="hidden items-center gap-4 lg:flex lg:gap-5">
            {navLinks.map(({ label, hasDropdown, href }) =>
              hasDropdown ? (
                <button
                  key={label}
                  type="button"
                  onMouseEnter={() => handleEnter(label, hasDropdown)}
                  className={`relative flex items-center gap-1 text-[15px] font-normal transition-colors ${
                    activeDropdown === label
                      ? "text-[#222222]"
                      : "text-[#222222] hover:text-[#555]"
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-[#222222]">
                    <ChevronDown />
                  </span>
                </button>
              ) : (
                <a
                  key={label}
                  href={href ?? "#"}
                  className="relative flex items-center gap-1 text-[15px] font-normal text-[#222222] transition-colors hover:text-[#555]"
                >
                  {label}
                </a>
              )
            )}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="text-[15px] font-normal text-[#222222] transition-colors hover:text-[#555]"
            >
              Contact
            </button>
          </div>

          <a
            href="/assessment"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#ca3726] px-4 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
          >
            Start assessment
            <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </a>
        </header>

        {dropdownItems && (
          <div className="pointer-events-auto">
            <div
              className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-lg border border-black/[0.06] bg-[#f7f7f7] shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out ${
                panelVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[-8px] opacity-0"
              }`}
            >
              <div
                className={`grid gap-2 p-3 sm:gap-3 sm:p-4 ${dropdownItems?.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
              >
                {dropdownItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href ?? "#"}
                    className="group flex min-h-[150px] flex-col justify-between rounded-lg border border-black/[0.06] bg-white px-4 py-4 text-left transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)] sm:min-h-[170px] sm:px-5 sm:py-5"
                  >
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-[#222222] sm:text-[15px]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#555555] sm:text-[13px]">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ca3726] text-white transition-colors group-hover:bg-[#b02f21]">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

