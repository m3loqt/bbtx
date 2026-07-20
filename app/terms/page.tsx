import type { Metadata } from "next";
import { LegalPageLayout } from "@/app/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "BBTx | Terms of Service",
  description: "The terms that govern your use of bbtx.ai.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="July 19, 2026"
      intro={
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of bbtx.ai
          (the &quot;Site&quot;), operated by BBTx Consulting (&quot;BBTx,&quot;
          &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using the Site,
          you agree to be bound by these Terms. If you do not agree, please do not use the Site.
        </p>
      }
      sections={[
        {
          heading: "Eligibility",
          body: (
            <p>
              You must be at least 18 years old, and authorized to act on behalf of your
              organization where applicable, to use this Site or submit information through it.
            </p>
          ),
        },
        {
          heading: "Use of This Site",
          body: (
            <>
              <p>
                The content on bbtx.ai, including our services pages, articles, and tools, is
                provided for general informational purposes. Using the Site does not create a
                consulting or coaching relationship between you and BBTx. That relationship
                begins only once we have agreed to work together under a separate, written
                engagement agreement.
              </p>
              <p>You agree not to use the Site to:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Violate any applicable law or regulation</li>
                <li>Submit false, misleading, or fraudulent information through our forms or tools</li>
                <li>Attempt to gain unauthorized access to any part of the Site or its underlying systems</li>
                <li>
                  Interfere with the Site&apos;s normal operation, including through scraping,
                  automated data collection, or excessive automated requests
                </li>
                <li>Transmit spam, malicious code, or unsolicited communications through our forms</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Intellectual Property",
          body: (
            <p>
              The text, graphics, logos, and other materials on this Site are owned by BBTx or
              used with permission, and are protected by applicable intellectual property laws.
              We grant you a limited, non-exclusive, non-transferable license to view and use
              this content for personal or internal business evaluation purposes. You may not
              reproduce, distribute, modify, or create derivative works from any part of the
              Site without our prior written consent.
            </p>
          ),
        },
        {
          heading: "Assessments & Tools",
          body: (
            <p>
              Our Digital Twin Snapshot is a directional tool
              intended to generate useful starting points for a conversation, based on the
              information you provide and, where applicable, publicly available sources. Results
              are generated using automated analysis and should be treated as informational
              hypotheses, not verified conclusions. We do not guarantee the accuracy,
              completeness, or applicability of any output, and these tools are not a substitute
              for a full engagement with our team.
            </p>
          ),
        },
        {
          heading: "Consulting & Coaching Engagements",
          body: (
            <p>
              These Terms govern your use of the Site itself. Any consulting, coaching, or
              advisory engagement with BBTx is governed by a separate written agreement between
              you (or your organization) and BBTx, which will control in the event of any
              conflict with these Terms as it relates to that engagement.
            </p>
          ),
        },
        {
          heading: "No Professional Advice",
          body: (
            <p>
              Nothing on this Site constitutes formal business, legal, financial, or other
              professional advice. Decisions about your organization should be made in the
              context of a direct engagement with us, and not solely on the basis of general
              information published on this Site.
            </p>
          ),
        },
        {
          heading: "User Submissions",
          body: (
            <p>
              When you submit information through our forms, you represent that you have the
              right to share that information and that it is accurate to the best of your
              knowledge. You grant us the right to use the information you submit to respond to
              you, provide the requested tool or service, and otherwise as described in our{" "}
              <a href="/privacy" className="font-medium text-[#222222] underline underline-offset-2 hover:text-[#ca3726]">
                Privacy Policy
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Third-Party Links and Services",
          body: (
            <p>
              The Site links to third-party platforms we use or recommend, including Substack,
              Medium, Gumroad, Calendly, and LinkedIn. We do not control those platforms and are
              not responsible for their content, availability, or practices. Purchases made
              through third-party platforms, such as courses sold via Gumroad, are subject to
              that platform&apos;s own terms in addition to ours.
            </p>
          ),
        },
        {
          heading: "Disclaimer of Warranties",
          body: (
            <p>
              The Site and its content are provided &quot;as is&quot; and &quot;as
              available,&quot; without warranties of any kind, whether express or implied,
              including warranties of merchantability, fitness for a particular purpose, or
              non-infringement. We do not warrant that the Site will be uninterrupted, secure,
              or error-free.
            </p>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <p>
              To the fullest extent permitted by law, BBTx and its owners, employees, and
              contractors will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or revenue, arising
              from or related to your use of, or inability to use, the Site or its tools, even if
              we have been advised of the possibility of such damages.
            </p>
          ),
        },
        {
          heading: "Indemnification",
          body: (
            <p>
              You agree to indemnify and hold BBTx harmless from any claims, damages, or expenses
              arising out of your misuse of the Site or your violation of these Terms.
            </p>
          ),
        },
        {
          heading: "Governing Law and Venue",
          body: (
            <p>
              These Terms are governed by the laws of the Commonwealth of Virginia, without
              regard to its conflict-of-law principles. Any dispute arising from these Terms or
              your use of the Site will be subject to the exclusive jurisdiction of the state and
              federal courts located in Virginia.
            </p>
          ),
        },
        {
          heading: "Severability",
          body: (
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining
              provisions will continue in full force and effect.
            </p>
          ),
        },
        {
          heading: "Changes to These Terms",
          body: (
            <p>
              We may update these Terms from time to time. The &quot;Last updated&quot; date at
              the top of this page reflects the most recent revision. Continued use of the Site
              after changes take effect constitutes acceptance of the revised Terms.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these Terms? Reach us at{" "}
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
