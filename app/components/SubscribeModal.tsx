"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "./ArrowIcon";
import { CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SubscribeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SubscribeModal({ open, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "modal" }),
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
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-3 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close subscribe form"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 sm:p-8">
        {status === "success" ? (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ca3726]/10">
              <CheckCircle className="h-7 w-7 text-[#ca3726]" />
            </div>
            <p className="text-[20px] font-semibold text-[#1a1a1a]">You&apos;re subscribed.</p>
            <p className="mt-2 text-[15px] text-[#666666]">Thanks for joining the newsletter.</p>
            <Button variant="ghost" className="mt-6" type="button" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <h2 id="subscribe-modal-title" className="text-2xl font-normal tracking-normal text-[#222222]">
              Subscribe to our newsletter
            </h2>
            <p className="mt-2 text-sm text-[#555555]">
              Get occasional updates on AI strategy, leadership, and what we&apos;re learning.
            </p>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                  Email Address
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-[#ca3726]">{errorMessage}</p>
              )}
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#ca3726] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                {status === "submitting" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}

        {status !== "success" && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 text-sm font-medium text-[#555555] underline underline-offset-2 hover:text-[#222222]"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
