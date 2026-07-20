import type { Metadata } from "next";
import { LegalPageLayout } from "@/app/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "BBTx | Cookie Policy",
  description: "How bbtx.ai uses cookies.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy"
      lastUpdated="July 19, 2026"
      intro={
        <p>
          This Cookie Policy explains how BBTx Consulting (&quot;BBTx,&quot; &quot;we,&quot;
          &quot;our,&quot; or &quot;us&quot;) uses cookies and similar technologies on bbtx.ai
          (the &quot;Site&quot;), and the choices available to you. It should be read alongside
          our{" "}
          <a href="/privacy" className="font-medium text-[#222222] underline underline-offset-2 hover:text-[#ca3726]">
            Privacy Policy
          </a>
          .
        </p>
      }
      sections={[
        {
          heading: "What Are Cookies and Similar Technologies",
          body: (
            <p>
              Cookies are small text files that a website stores on your device through your
              browser. They are commonly used to keep a site functioning correctly, remember
              information between visits, and, on many sites, track behavior for advertising or
              analytics purposes. Related technologies include local storage and tracking pixels,
              which serve similar functions.
            </p>
          ),
        },
        {
          heading: "Types of Cookies We Use",
          body: (
            <>
              <p>
                <span className="font-medium text-[#222222]">Strictly necessary cookies.</span>{" "}
                These cookies are required for core site functionality, including maintaining a
                secure, authenticated session for authorized staff accessing our internal admin
                tools. Without these cookies, that functionality would not work correctly. They
                are not used to identify or track visitors browsing the public Site.
              </p>
              <p>
                <span className="font-medium text-[#222222]">Analytics cookies.</span> We do not
                currently use analytics cookies or any third-party analytics service on this
                Site.
              </p>
              <p>
                <span className="font-medium text-[#222222]">Advertising cookies.</span> We do
                not use advertising or retargeting cookies, and we do not share visitor data with
                advertising networks.
              </p>
            </>
          ),
        },
        {
          heading: "Third-Party Cookies",
          body: (
            <p>
              The Site links out to third-party platforms, including Substack, Medium, Gumroad,
              Calendly, and LinkedIn. These are standard hyperlinks, not embedded content, so
              visiting bbtx.ai does not itself trigger cookies from those platforms. Once you
              click through and visit one of those sites directly, however, its own cookie
              practices will apply, and are governed by its own policy rather than ours. If we
              embed any third-party tool directly on the Site in the future, such as a scheduling
              widget, we will update this policy to reflect any resulting cookies.
            </p>
          ),
        },
        {
          heading: "How to Control Cookies",
          body: (
            <p>
              Most browsers allow you to view, block, or delete cookies through their settings.
              Because bbtx.ai relies only on essential cookies for the public-facing Site,
              disabling cookies in your browser will not affect your ability to browse the Site,
              though it may affect access to our internal admin tools for authorized staff.
              Consult your browser&apos;s help documentation for instructions specific to your
              browser.
            </p>
          ),
        },
        {
          heading: "Changes to This Policy",
          body: (
            <p>
              If our use of cookies changes, for example if we introduce analytics or a
              third-party integration that sets its own cookies, we will update this page and
              the &quot;Last updated&quot; date above to reflect that change.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about this policy? Reach us at{" "}
              <a href="mailto:grant@bbtx.ai" className="font-medium text-[#222222] underline underline-offset-2 hover:text-[#ca3726]">
                grant@bbtx.ai
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
