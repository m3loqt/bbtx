import type { Metadata } from "next";
import { LegalPageLayout } from "@/app/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "BBTx | Privacy Policy",
  description: "How BBTx collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="July 19, 2026"
      intro={
        <>
          <p>
            BBTx Consulting (&quot;BBTx,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            respects your privacy and is committed to handling your information responsibly. This
            Privacy Policy explains what information we collect through bbtx.ai (the
            &quot;Site&quot;), why we collect it, how we use and protect it, and the choices
            available to you.
          </p>
          <p>
            This policy applies to information collected through the Site, including our
            contact forms, Digital Twin Snapshot, newsletter signup,
            and scheduling tools. It does not apply to information exchanged in the course of an
            active consulting or coaching engagement, which is governed by the terms of the
            written agreement covering that engagement.
          </p>
        </>
      }
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>
                <span className="font-medium text-[#222222]">Information you provide directly.</span>{" "}
                We collect information you choose to share with us, including when you:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Submit a contact form or request a consultation</li>
                <li>Complete a Digital Twin Snapshot</li>
                <li>Subscribe to our newsletter</li>
                <li>Book a session through our scheduling tools</li>
              </ul>
              <p>
                Depending on the form, this may include your name, email address, phone number,
                job title, organization name, industry, organization size, and any additional
                details you choose to provide, such as the substance of your inquiry or your
                responses to assessment questions. For the Digital Twin Snapshot, we also
                process the public website URL you submit, along with publicly available
                information about that organization, in order to generate the report.
              </p>
              <p>
                <span className="font-medium text-[#222222]">Information collected automatically.</span>{" "}
                When you visit the Site, our servers automatically log limited technical
                information, such as IP address, browser type, general device information,
                referring page, and request timestamps. We use this information to operate,
                secure, and troubleshoot the Site, and to prevent abuse of our forms (for
                example, by rate-limiting repeated submissions from the same source). We do not
                currently use this information to build individual browsing profiles.
              </p>
              <p>
                <span className="font-medium text-[#222222]">Information from third parties.</span>{" "}
                If you schedule time with us through a third-party scheduling tool or interact
                with us through a third-party platform, that platform may share limited
                information with us, such as your name, email address, and the details of the
                meeting you booked, consistent with that platform&apos;s own privacy policy.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use Your Information",
          body: (
            <>
              <p>We use the information we collect to:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Respond to inquiries and deliver the tools, assessments, or reports you request</li>
                <li>Prepare for and conduct consultations and scheduled sessions</li>
                <li>Send newsletter updates and other communications, if you have subscribed</li>
                <li>Operate, maintain, and improve the Site and its security</li>
                <li>Understand general usage patterns so we can improve the tools and content we offer</li>
                <li>Comply with applicable legal obligations and enforce our Terms of Service</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How We Share Your Information",
          body: (
            <>
              <p>We do not sell your personal information. We may share it in the following circumstances:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  With service providers who perform functions on our behalf, such as email
                  delivery, appointment scheduling, data storage, and hosting, under obligations
                  to protect that information and use it only to provide services to us
                </li>
                <li>With professional advisors, such as legal or accounting counsel, when necessary</li>
                <li>
                  If required to do so by law, or in a good faith belief that disclosure is
                  necessary to comply with a legal process, protect our rights, or protect the
                  safety of others
                </li>
                <li>
                  In connection with a merger, acquisition, financing, or sale of business
                  assets, in which case information may be transferred as part of that
                  transaction
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Data Security",
          body: (
            <p>
              We use reasonable administrative and technical safeguards designed to protect your
              information against unauthorized access, alteration, disclosure, or destruction.
              No method of transmission or storage is completely secure, however, and we cannot
              guarantee absolute security.
            </p>
          ),
        },
        {
          heading: "Data Retention",
          body: (
            <p>
              We retain personal information for as long as reasonably necessary to fulfill the
              purposes described in this policy, maintain accurate business records, and comply
              with applicable legal, accounting, or reporting obligations. When information is no
              longer needed for these purposes, we take reasonable steps to delete or anonymize
              it.
            </p>
          ),
        },
        {
          heading: "Cookies and Tracking Technologies",
          body: (
            <p>
              bbtx.ai uses only essential cookies required for the Site to function properly; we
              do not currently use advertising cookies or third-party analytics. Details are
              available in our{" "}
              <a href="/cookies" className="font-medium text-[#222222] underline underline-offset-2 hover:text-[#ca3726]">
                Cookie Policy
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Your Privacy Rights",
          body: (
            <>
              <p>Depending on where you live, you may have the right to:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Request access to the personal information we hold about you</li>
                <li>Request that we correct inaccurate or incomplete information</li>
                <li>Request that we delete your personal information</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Object to, or request that we restrict, certain uses of your information</li>
              </ul>
              <p>
                You can unsubscribe from newsletter emails using the link included in any such
                email, or exercise any of these rights by contacting us at{" "}
                <a href="mailto:grant@bbtx.ai" className="font-medium text-[#222222] underline underline-offset-2 hover:text-[#ca3726]">
                  grant@bbtx.ai
                </a>
                . We will respond to verified requests within a reasonable time and in accordance
                with applicable law. Residents of the European Economic Area, the United
                Kingdom, and certain U.S. states such as California may have additional
                statutory rights under their local law.
              </p>
            </>
          ),
        },
        {
          heading: "International Data Transfers",
          body: (
            <p>
              We are based in the United States, and the service providers we use to operate the
              Site are located in or process data in the United States. If you are accessing the
              Site from outside the United States, your information may be transferred to,
              stored, and processed in the United States, where privacy laws may differ from
              those of your home jurisdiction.
            </p>
          ),
        },
        {
          heading: "Third-Party Links",
          body: (
            <p>
              Our Site links to third-party platforms, including Substack, Medium, Gumroad,
              Calendly, and LinkedIn. Each of these platforms maintains its own privacy policy,
              which governs any information you provide directly to them. We encourage you to
              review those policies before sharing information with a third-party site.
            </p>
          ),
        },
        {
          heading: "Children's Privacy",
          body: (
            <p>
              bbtx.ai is intended for business audiences and is not directed at children. We do
              not knowingly collect personal information from anyone under 16. If you believe a
              child has provided us with personal information, please contact us so we can
              delete it.
            </p>
          ),
        },
        {
          heading: "Changes to This Policy",
          body: (
            <p>
              We may update this policy from time to time to reflect changes in our practices or
              for other operational, legal, or regulatory reasons. The &quot;Last updated&quot;
              date at the top of this page reflects the most recent revision. Material changes
              will be reflected on this page.
            </p>
          ),
        },
        {
          heading: "Contact Us",
          body: (
            <p>
              If you have questions about this policy or how we handle your information, contact
              us at{" "}
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
