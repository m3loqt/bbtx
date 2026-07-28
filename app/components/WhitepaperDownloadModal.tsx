"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "./ArrowIcon";

type WhitepaperDownloadModalProps = {
  paper: { id: string; title: string } | null;
  onClose: () => void;
};

export function WhitepaperDownloadModal({ paper, onClose }: WhitepaperDownloadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const open = !!paper;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!paper) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!paper) return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/whitepapers/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whitepaperId: paper.id, name: name || undefined, email }),
      });
      const json = (await res.json()) as { success?: boolean; url?: string; error?: string };

      if (!res.ok || !json.success || !json.url) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setDownloadUrl(json.url);
      setStatus("success");
      window.open(json.url, "_blank", "noopener,noreferrer");
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
      aria-labelledby="whitepaper-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close download form"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 sm:p-8">
        {status === "success" ? (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ca3726]/10">
              <CheckCircle className="h-7 w-7 text-[#ca3726]" />
            </div>
            <p className="text-[20px] font-semibold text-[#1a1a1a]">Your download is ready.</p>
            <p className="mt-2 text-[15px] text-[#666666]">
              We opened it in a new tab and sent a copy to {email}.
            </p>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ca3726] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              Open the PDF
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Button variant="ghost" className="mt-3" type="button" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <h2 id="whitepaper-modal-title" className="text-2xl font-normal tracking-normal text-[#222222]">
              Get the PDF
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#555555]">
              &ldquo;{paper.title}&rdquo; — enter your email and we&apos;ll open it right away, plus send you a copy.
            </p>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                  Name <span className="normal-case text-[#999999]">(optional)</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                />
              </div>
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
                    Download PDF
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
