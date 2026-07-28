"use client";

import { useEffect, useState } from "react";
import { Facebook, Linkedin, Twitter, Copy, Check } from "lucide-react";

type ShareModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
};

export function ShareModal({ open, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  function openShare(href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — nothing more we can do here.
    }
  }

  const options = [
    {
      label: "Share on X",
      description: "Post this to your followers",
      icon: Twitter,
      onClick: () =>
        openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`),
    },
    {
      label: "Share on LinkedIn",
      description: "Post this to your network",
      icon: Linkedin,
      onClick: () => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`),
    },
    {
      label: "Share on Facebook",
      description: "Post this to your feed",
      icon: Facebook,
      onClick: () => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-3 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close share dialog"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 sm:p-8">
        <h2 id="share-modal-title" className="text-2xl font-normal tracking-normal text-[#222222]">
          Share this post
        </h2>
        <p className="mt-2 truncate text-sm text-[#555555]">{title}</p>

        <div className="mt-6 space-y-1.5">
          {options.map(({ label, description, icon: Icon, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="flex w-full items-center gap-3 rounded-md border border-black/10 px-4 py-3 text-left transition-colors hover:border-black/20 hover:bg-black/[0.02]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2] text-[#374151]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-medium text-[#222222]">{label}</span>
                <span className="block truncate text-xs text-[#9ca3af]">{description}</span>
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={copyLink}
            className="flex w-full items-center gap-3 rounded-md border border-black/10 px-4 py-3 text-left transition-colors hover:border-black/20 hover:bg-black/[0.02]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2] text-[#374151]">
              {copied ? <Check className="h-4 w-4 text-[#ca3726]" /> : <Copy className="h-4 w-4" />}
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-medium text-[#222222]">
                {copied ? "Link copied" : "Copy link"}
              </span>
              <span className="block truncate text-xs text-[#9ca3af]">{url}</span>
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 text-sm font-medium text-[#555555] underline underline-offset-2 hover:text-[#222222]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
