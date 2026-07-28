"use client";

import { useState } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter-page" }),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !json.success) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <section className="relative z-[1] w-full bg-white px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-medium tracking-tight text-[#222222] sm:text-4xl">
            Newsletter
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#555555]">
            Get occasional updates on AI strategy, leadership, and what we&apos;re learning. No
            spam, unsubscribe anytime.
          </p>

          <div className="mt-8">
            {status === "success" ? (
              <div className="flex flex-col items-center rounded-lg border border-black/10 bg-[#f7f7f7] px-6 py-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ca3726]/10">
                  <CheckCircle className="h-7 w-7 text-[#ca3726]" />
                </div>
                <p className="mt-4 text-lg font-semibold text-[#1a1a1a]">You&apos;re subscribed.</p>
                <p className="mt-1.5 text-sm text-[#666666]">
                  Thanks for joining — we&apos;ll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="h-12 w-full flex-1 rounded-lg border border-black/10 bg-[#f7f7f7] px-4 text-[15px] text-[#222222] placeholder-[#999999] outline-none transition-colors focus:border-[#ca3726] focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#ca3726] px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-95 disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-[#ca3726]">{errorMessage}</p>
            )}
          </div>

          <p className="mt-6 text-sm text-[#999999]">
            Prefer to browse first?{" "}
            <a
              href="https://chaoticconfluence.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#555555] underline underline-offset-2 transition-colors hover:text-[#222222]"
            >
              Read past issues on Substack
            </a>
            .
          </p>
        </div>
      </section>

      <CTA />

      <Footer />
    </div>
  );
}
