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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  // Reset form state when modal closes
  useEffect(() => {
    if (!open) {
      setSubmitStatus("idle");
      setErrorMessage("");
      setIsSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const inquiryType = showOthersAsInput
      ? `Others: ${otherSpecify.trim()}`
      : helpWith;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: (data.get("name") as string)?.trim(),
          email: (data.get("email") as string)?.trim(),
          inquiry_type: inquiryType,
          message: (data.get("message") as string)?.trim(),
          website: (data.get("website") as string) ?? "",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong. Please try again or email us directly.");
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again or email us directly.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-start pt-16 pb-6 sm:pt-[100px] sm:pb-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Subtle black overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close contact form"
        onClick={onClose}
      />

      <div className="relative z-10 min-h-0 flex-1 w-full overflow-y-auto px-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[960px] flex-col items-center">
          {/* Modal panel */}
          <div className="w-full rounded-lg bg-white">
            {/* Top: heading + contact info */}
            <div className="px-4 py-4 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <h2
                  id="contact-modal-title"
                  className="text-2xl font-normal tracking-tighter text-[#222222] sm:mb-[15px] sm:text-4xl"
                >
                  Send us a message
                </h2>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-0.5 sm:flex-col sm:gap-1 sm:text-right">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm font-semibold text-[#222222] underline underline-offset-2 hover:text-[#555] sm:text-xl"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="text-sm font-semibold text-[#222222] underline underline-offset-2 hover:text-[#555] sm:text-xl"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>
              <div className="mx-1 mt-4 border-t border-black/10 sm:mt-10" aria-hidden />
            </div>

            {/* Success state */}
            {submitStatus === "success" ? (
              <div className="px-4 pb-8 pt-2 sm:px-6 sm:pb-10">
                <div className="rounded-lg bg-[#f7f7f7] px-6 py-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ca3726]/10">
                    <svg className="h-6 w-6 text-[#ca3726]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-[#222222]">Thank you.</p>
                  <p className="mt-1 text-sm text-[#555555]">Grant will be in touch shortly.</p>
                </div>
              </div>
            ) : (
              /* Form */
              <form
                className="grid gap-3 p-4 sm:grid-cols-[1fr_1fr] sm:gap-6 sm:items-stretch sm:p-6"
                onSubmit={handleSubmit}
              >
                {/* Honeypot — hidden from real users, catches bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                      Your name
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={isSubmitting}
                      className="rounded border border-black/12 bg-[#ebebeb] px-3 py-2.5 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10 disabled:opacity-60"
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
                          disabled={isSubmitting}
                          className="rounded border border-black/12 bg-[#ebebeb] pr-8 py-2.5 pl-3 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10 disabled:opacity-60"
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
                          disabled={isSubmitting}
                          onClick={() => setDropdownOpen((o) => !o)}
                          className="flex w-full items-center justify-between rounded border border-black/12 bg-[#ebebeb] py-2.5 pl-3 pr-3 text-left text-[15px] text-[#222222] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10 disabled:opacity-60"
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
                                    selected ? "bg-[#ca3726]" : "hover:bg-white/10"
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
                      disabled={isSubmitting}
                      className="rounded border border-black/12 bg-[#ebebeb] px-3 py-2.5 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10 disabled:opacity-60"
                      placeholder=""
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-3 sm:h-full">
                  <label className="flex min-h-0 flex-col gap-1.5 sm:h-full">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                      Your message
                    </span>
                    <textarea
                      name="message"
                      required
                      disabled={isSubmitting}
                      className="min-h-[90px] flex-1 resize-y rounded border border-black/12 bg-[#ebebeb] px-3 py-2.5 text-[15px] text-[#222222] placeholder:text-[#888] focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/10 sm:min-h-0 disabled:opacity-60"
                      placeholder=""
                    />
                  </label>
                  {submitStatus === "error" && (
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  )}
                </div>
                <div className="flex justify-end sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
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
