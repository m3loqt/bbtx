"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "./ArrowIcon";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CONTACT_EMAIL = "grant@bbtx.ai";
const CONTACT_PHONE = "+1 (434) 466-4655";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

type ContactFormData = {
  full_name: string;
  email: string;
  inquiry_type: string;
  message: string;
  website: string;
};

const INQUIRY_OPTIONS = [
  "Transformational Strategy & Implementation Plan",
  "Organizational AI Assessment",
  "AI Organizational Model",
  "General Inquiry",
] as const;

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_OPTIONS[0]);

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
      setIsLoading(false);
      setIsSuccess(false);
      setError(null);
      setInquiryType(INQUIRY_OPTIONS[0]);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: ContactFormData = {
      full_name: (data.get("full_name") as string | null)?.trim() ?? "",
      email: (data.get("email") as string | null)?.trim() ?? "",
      inquiry_type: inquiryType,
      message: (data.get("message") as string | null)?.trim() ?? "",
      website: ((data.get("website") as string | null) ?? "").trim(),
    };

    void handleSubmit(payload);
  };

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

            {isSuccess ? (
              <div className="px-4 pb-8 pt-2 sm:px-6 sm:pb-10 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ca3726]/10">
                  <CheckCircle className="h-7 w-7 text-[#ca3726]" />
                </div>
                <p className="text-[20px] font-semibold text-[#1a1a1a]">Message sent.</p>
                <p className="mt-2 text-[15px] text-[#666666]">
                  Thank you. Grant will be in touch shortly.
                </p>
                <Button
                  variant="ghost"
                  className="mt-6"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            ) : (
              <form
                className="grid gap-4 p-4 sm:grid-cols-[1fr_1fr] sm:gap-6 sm:items-stretch sm:p-6"
                onSubmit={onSubmit}
              >
                {/* Honeypot — hidden from real users, catches bots */}
                <input
                  type="text"
                  name="website"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  value=""
                  onChange={() => {}}
                />

                <div className="flex flex-col gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                      Your Name
                    </Label>
                    <Input
                      name="full_name"
                      type="text"
                      required
                      disabled={isLoading}
                      className="h-11 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                      What can we help you with?
                    </Label>
                    <Select
                      value={inquiryType}
                      onValueChange={(val) => setInquiryType(val ?? INQUIRY_OPTIONS[0])}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="h-11 w-full min-w-0 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {INQUIRY_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                      Email Address
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      required
                      disabled={isLoading}
                      className="h-11 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:h-full">
                  <div className="space-y-1.5 flex min-h-0 flex-col sm:h-full">
                    <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                      Your Message
                    </Label>
                    <Textarea
                      name="message"
                      rows={4}
                      required
                      disabled={isLoading}
                      className="min-h-[100px] flex-1 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive" className="sm:col-span-2">
                      <AlertCircle className="h-4 w-4" />
                      <div>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </div>
                    </Alert>
                  )}
                </div>

                <div className="flex justify-end sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 rounded-md bg-[#ca3726] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Close link */}
          {!isSuccess && (
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-sm font-medium text-[#222222] underline underline-offset-2 hover:text-[#555]"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
