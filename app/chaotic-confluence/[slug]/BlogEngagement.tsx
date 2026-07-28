"use client";

import { useEffect, useState } from "react";
import { Heart, Facebook, Linkedin, Copy, Check } from "lucide-react";
import type { BlogComment } from "@/lib/admin/types";
import { SubscribeModal } from "@/app/components/SubscribeModal";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const ADJECTIVES = [
  "Curious", "Quiet", "Restless", "Sharp", "Steady", "Candid", "Bold",
  "Thoughtful", "Wandering", "Grounded", "Skeptical", "Earnest",
];
const NOUNS = [
  "Falcon", "Comet", "Harbor", "Maple", "Compass", "Ridge", "Ember",
  "Cedar", "Lantern", "Current", "Summit", "Otter",
];

function generateNickname(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const suffix = Math.floor(100 + Math.random() * 900);
  return `${adjective} ${noun} ${suffix}`;
}

function getOrCreateVisitorId(): string {
  const key = "bbtx_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function getNickname(): string {
  const key = "bbtx_comment_nickname";
  let nickname = localStorage.getItem(key);
  if (!nickname) {
    nickname = generateNickname();
    localStorage.setItem(key, nickname);
  }
  return nickname;
}

function getHeartedPostIds(): Set<string> {
  try {
    const raw = localStorage.getItem("bbtx_hearted_posts");
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function setHeartedPostId(blogId: string, hearted: boolean) {
  const ids = getHeartedPostIds();
  if (hearted) ids.add(blogId);
  else ids.delete(blogId);
  localStorage.setItem("bbtx_hearted_posts", JSON.stringify(Array.from(ids)));
}

function formatRelativeTime(value: string): string {
  const diffMs = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogEngagement({
  blogId,
  slug,
  postUrl,
  initialHeartCount,
  initialComments,
}: {
  blogId: string;
  slug: string;
  postUrl: string;
  initialHeartCount: number;
  initialComments: BlogComment[];
}) {
  const [heartCount, setHeartCount] = useState(initialHeartCount);
  const [hearted, setHearted] = useState(false);
  const [heartBusy, setHeartBusy] = useState(false);

  const [copied, setCopied] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const [comments, setComments] = useState(initialComments);
  const [nickname, setNickname] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setHearted(getHeartedPostIds().has(blogId));
    setNickname(getNickname());
  }, [blogId]);

  async function toggleHeart() {
    if (heartBusy) return;
    setHeartBusy(true);
    const fingerprint = getOrCreateVisitorId();

    // Optimistic update — reconciled with the server response below.
    const nextHearted = !hearted;
    setHearted(nextHearted);
    setHeartCount((c) => c + (nextHearted ? 1 : -1));

    try {
      const res = await fetch("/api/blogs/heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, fingerprint }),
      });
      const json = (await res.json()) as { heart_count?: number; hearted?: boolean };
      if (res.ok && typeof json.heart_count === "number") {
        setHeartCount(json.heart_count);
        setHearted(Boolean(json.hearted));
        setHeartedPostId(blogId, Boolean(json.hearted));
      } else {
        // Roll back on failure.
        setHearted(!nextHearted);
        setHeartCount((c) => c - (nextHearted ? 1 : -1));
      }
    } catch {
      setHearted(!nextHearted);
      setHeartCount((c) => c - (nextHearted ? 1 : -1));
    } finally {
      setHeartBusy(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — nothing more we can do here.
    }
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    setCommentError("");
    const trimmed = commentText.trim();
    if (!trimmed) {
      setCommentError("Write something first.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/blogs/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, nickname, content: trimmed }),
      });
      const json = (await res.json()) as { comment?: BlogComment; error?: string };
      if (!res.ok || !json.comment) {
        setCommentError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setComments((prev) => [...prev, json.comment as BlogComment]);
      setCommentText("");
    } catch {
      setCommentError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const shareLinks = [
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    },
  ];

  return (
    <div className="px-5 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
      {/* Heart + share row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-black/[0.08] py-5">
        <button
          type="button"
          onClick={toggleHeart}
          aria-pressed={hearted}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            hearted
              ? "border-[#ca3726] bg-[#ca3726]/10 text-[#ca3726]"
              : "border-black/10 text-[#374151] hover:border-black/20"
          }`}
        >
          <Heart className="h-4 w-4" fill={hearted ? "#ca3726" : "none"} />
          {heartCount > 0 ? heartCount : "Heart"}
        </button>

        <div className="flex items-center gap-2">
          {shareLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#374151] transition-colors hover:border-black/20 hover:text-[#111111]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <button
            type="button"
            onClick={copyLink}
            aria-label="Copy link"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#374151] transition-colors hover:border-black/20 hover:text-[#111111]"
          >
            {copied ? <Check className="h-4 w-4 text-[#ca3726]" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Subscribe CTA */}
      <div className="flex flex-col items-start gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-[#555555]">
          Enjoyed this? Get new posts on AI strategy, leadership, organizations, and the human cost of AI.
        </p>
        <button
          type="button"
          onClick={() => setSubscribeOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-95"
        >
          Subscribe to our newsletter
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* Comments */}
      <div className="border-t border-black/[0.08] pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
          {comments.length > 0 ? `Comments (${comments.length})` : "Comments"}
        </h2>

        <form onSubmit={submitComment} className="mt-5">
          <div className="mb-2 text-xs font-medium text-[#9ca3af]">
            Commenting as <span className="text-[#374151]">{nickname || "…"}</span>
          </div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts…"
            rows={3}
            maxLength={2000}
            className="w-full rounded-md border border-black/10 bg-[#fafafa] p-3 text-[15px] text-[#111111] outline-none placeholder:text-[#9ca3af] focus:border-black/20"
          />
          {commentError && <p className="mt-2 text-sm text-[#ca3726]">{commentError}</p>}
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg border border-[#ca3726] px-4 py-2.5 text-sm font-medium text-[#ca3726] transition-colors hover:bg-[#ca3726]/5 disabled:opacity-50"
            >
              {submitting ? "Posting…" : "Post comment"}
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-col gap-6">
          {comments.length === 0 && (
            <p className="text-[15px] text-[#6b7280]">Be the first to comment.</p>
          )}
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-[#111111]">{comment.nickname}</span>
                <span className="text-[#9ca3af]">{formatRelativeTime(comment.created_at)}</span>
              </div>
              <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-[#374151]">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      <SubscribeModal
        key={subscribeOpen ? "open" : "closed"}
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />
    </div>
  );
}
