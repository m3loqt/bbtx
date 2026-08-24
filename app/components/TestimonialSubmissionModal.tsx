"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, Loader2, Upload, X } from "lucide-react";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type TestimonialSubmissionModalProps = {
  open: boolean;
  onClose: () => void;
};

// CTA copy ("Share Your Experience") is a placeholder — Grant is choosing the
// final wording from four options (Share Your Experience / Share Your Story /
// Tell Us About Your Experience / Share Your Thoughts With Us). Swap the
// title string below once he picks.
export function TestimonialSubmissionModal({ open, onClose }: TestimonialSubmissionModalProps) {
  const [fullName, setFullName] = useState("");
  const [roleCompany, setRoleCompany] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [permission, setPermission] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function resetAndClose() {
    setFullName("");
    setRoleCompany("");
    setTestimonial("");
    setPermission(false);
    setPhotoFile(null);
    setPhotoPreview(null);
    setStatus("idle");
    setErrorMessage("");
    onClose();
  }

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      let photoUrl: string | undefined;

      if (photoFile) {
        setPhotoUploading(true);
        const formData = new FormData();
        formData.append("file", photoFile);
        const uploadRes = await fetch("/api/testimonials/photo-upload", {
          method: "POST",
          body: formData,
        });
        const uploadJson = (await uploadRes.json()) as { url?: string; error?: string };
        setPhotoUploading(false);

        if (!uploadRes.ok || !uploadJson.url) {
          setStatus("error");
          setErrorMessage(uploadJson.error ?? "Photo upload failed. Please try again.");
          return;
        }
        photoUrl = uploadJson.url;
      }

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          role_company: roleCompany,
          testimonial,
          photo_url: photoUrl,
          permission_to_publish: permission,
          website,
        }),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !json.success) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setPhotoUploading(false);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-y-auto px-3 py-8 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-title"
    >
      <button
        type="button"
        className="fixed inset-0 bg-black/30"
        aria-label="Close testimonial form"
        onClick={resetAndClose}
      />

      <div className={`relative z-10 w-full rounded-lg bg-white p-6 sm:p-8 ${status === "success" ? "max-w-md" : "max-w-2xl"}`}>
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#999999] transition-colors hover:bg-black/[0.05] hover:text-[#222222]"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ca3726]/10">
              <CheckCircle className="h-7 w-7 text-[#ca3726]" />
            </div>
            <p className="text-[20px] font-semibold text-[#1a1a1a]">Thank you for sharing your story.</p>
            <p className="mt-2 text-[15px] text-[#666666]">
              Grant reads every testimonial personally.
            </p>
          </div>
        ) : (
          <>
            <h2 id="testimonial-modal-title" className="pr-10 text-2xl font-normal tracking-normal text-[#222222]">
              Share Your Experience
            </h2>
            <p className="mt-2 pr-10 text-sm text-[#555555]">
              What changed for you or your organization after working with Grant?
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              {/* Honeypot — hidden from real users, visible to bots that fill every field */}
              <div className="hidden" aria-hidden>
                <label htmlFor="testimonial-website">Website</label>
                <input
                  id="testimonial-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                    Name
                  </Label>
                  <Input
                    name="full_name"
                    type="text"
                    required
                    maxLength={100}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-11 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                    Role / Company
                  </Label>
                  <Input
                    name="role_company"
                    type="text"
                    maxLength={150}
                    value={roleCompany}
                    onChange={(e) => setRoleCompany(e.target.value)}
                    className="h-11 rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                  Your Testimonial
                </Label>
                <Textarea
                  name="testimonial"
                  required
                  maxLength={3000}
                  rows={5}
                  placeholder="What changed for you or your organization after working with Grant?"
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  className="rounded-md border-black/10 bg-[#f2f2f2] text-[15px]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">
                  Photo <span className="normal-case text-[#999999]">(optional)</span>
                </Label>
                {photoPreview ? (
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob: object URL, next/image can't load it */}
                    <img
                      src={photoPreview}
                      alt=""
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#555555] underline underline-offset-2 hover:text-[#222222]"
                    >
                      <X className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-md border border-dashed border-black/15 bg-[#f2f2f2] px-4 py-3 text-sm font-medium text-[#555555] hover:border-black/25"
                  >
                    <Upload className="h-4 w-4" />
                    Upload a photo
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={onPhotoChange}
                  className="hidden"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="permission_to_publish"
                  name="permission_to_publish"
                  type="checkbox"
                  required
                  checked={permission}
                  onChange={(e) => setPermission(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-[#ca3726] focus:ring-[#ca3726]"
                />
                <label htmlFor="permission_to_publish" className="text-sm leading-snug text-[#555555]">
                    I give BBTx Consulting permission to publish my testimonial, name, and role on bbtx.ai.
                </label>
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
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {photoUploading ? "Uploading photo…" : "Submitting…"}
                  </>
                ) : (
                  <>
                    Submit Your Testimonial
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
