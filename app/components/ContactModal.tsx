"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "./ArrowIcon";

const CONTACT_EMAIL = "grant@bbtx.ai";
const CONTACT_PHONE = "+1 (434) 466-4655";

const HELP_OPTIONS = [
  "Transformational Strategy & Implementation Plan",
  "Organizational AI Assessment",
  "AI Organizational Model",
  "General Inquiry",
  "Others: Specify",
] as const;

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [helpWith, setHelpWith] = useState<string>(HELP_OPTIONS[0]);
  const [otherSpecify, setOtherSpecify] = useState("");
  const [showOthersAsInput, setShowOthersAsInput] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current?.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-start pt-[100px] pb-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Subtle black overlay – navbar uses higher z-index so only the bar stays clear */}
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close contact form"
        onClick={onClose}
      />

      <div className="relative z-10 flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[960px] flex-col items-center">
          {/* Modal panel - same width as navbar */}
          <div className="w-full rounded-lg bg-white">
          {/* Top: heading + contact info */}
          <div className="px-6 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <h2
                id="contact-modal-title"
                className="mb-[15px] text-4xl font-normal tracking-tighter text-[#222222] sm:text-5xl"
              >
                Send us a message
              </h2>
              <div className="flex flex-col gap-1 text-right">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-lg font-semibold text-[#222222] underline underline-offset-2 hover:text-[#555] sm:text-xl"
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="text-lg font-semibold text-[#222222] underline underline-offset-2 hover:text-[#555] sm:text-xl"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>
            <div className="mx-1 mt-10 border-t border-black/10" aria-hidden />
          </div>

          {/* Form */}
          <form
            className="grid gap-4 p-6 sm:grid-cols-[1fr_1fr] sm:gap-6 sm:items-stretch"
            onSubmit={(e) => {
              e.preventDefault();
              // Placeholder: wire to your backend or mailto
            }}
          >
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                  Your name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded border border-black/12 bg-[#ebebeb] px-3 py-2.5 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10"
                  placeholder=""
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                  What can we help you with
                </span>
                {showOthersAsInput ? (
                  <>
                    <input
                      type="text"
                      name="other_specify"
                      value={otherSpecify}
                      onChange={(e) => setOtherSpecify(e.target.value)}
                      placeholder="Please specify"
                      className="rounded border border-black/12 bg-[#ebebeb] pr-8 py-2.5 pl-3 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10"
                    />
                    <input type="hidden" name="help_with" value="Others: Specify" />
                    <button
                      type="button"
                      onClick={() => setShowOthersAsInput(false)}
                      className="text-left text-xs text-[#555555] underline underline-offset-2 hover:text-[#222222]"
                    >
                      Choose from list
                    </button>
                  </>
                ) : (
                  <div ref={dropdownRef} className="relative">
                    <input type="hidden" name="help_with" value={helpWith} />
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="flex w-full items-center justify-between rounded border border-black/12 bg-[#ebebeb] py-2.5 pl-3 pr-3 text-left text-[15px] text-[#222222] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10"
                    >
                      <span className="truncate pr-2">{helpWith}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#555555]" />
                    </button>
                    {dropdownOpen && (
                      <div
                        className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-lg bg-[#363636] py-1 shadow-lg"
                        role="listbox"
                      >
                        {HELP_OPTIONS.map((opt) => {
                          const selected = helpWith === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDropdownOpen(false);
                                setHelpWith(opt);
                                if (opt === "Others: Specify") setShowOthersAsInput(true);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-[15px] text-white ${
                                selected
                                  ? "bg-[#ca3726]"
                                  : "hover:bg-white/10"
                              }`}
                            >
                              <span className="block truncate">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded border border-black/12 bg-[#ebebeb] px-3 py-2.5 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10"
                  placeholder=""
                />
              </label>
            </div>
            <label className="flex min-h-0 flex-col gap-1.5 sm:h-full">
              <span className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                Your message
              </span>
              <textarea
                name="message"
                required
                className="min-h-[120px] flex-1 resize-y rounded border border-black/12 bg-[#ebebeb] px-3 py-2.5 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10 sm:min-h-0"
                placeholder=""
              />
            </label>
            <div className="flex justify-end sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                Send message
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
          </div>

          {/* Close link */}
          <button
            type="button"
            onClick={onClose}
            className="mt-6 text-sm font-medium text-[#222222] underline underline-offset-2 hover:text-[#555]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
