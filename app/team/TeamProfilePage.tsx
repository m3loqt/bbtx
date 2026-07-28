"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Linkedin } from "lucide-react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowLeft } from "@/app/components/ArrowIcon";
import type { TeamMember } from "./team-data";

export function TeamProfilePage({ person }: { person: TeamMember }) {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <section className="relative z-[1] w-full bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#555555] transition-colors hover:text-[#222222]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the team
          </Link>

          <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Team
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl">
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-4xl font-medium tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
                {person.name}
              </h1>
              <p className="mt-3 text-lg text-[#555555]">{person.role}</p>
              {person.location && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#999999]">
                  <MapPin className="h-4 w-4" />
                  {person.location}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#ca3726] transition-colors hover:text-[#a82e20] hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {person.email}
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#ca3726] transition-colors hover:text-[#a82e20] hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>

              {/* Description — sits in the same column as the contact info, next to the photo */}
              <div className="mt-8 space-y-4">
                {person.bio.map((line, i) => (
                  <p key={i} className="text-base leading-relaxed text-[#555555] sm:text-lg">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />

      <Footer />
    </div>
  );
}
