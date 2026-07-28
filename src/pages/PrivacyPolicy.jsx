import React from "react";
import { Link } from "react-router-dom";
import LegalLayout, { LegalSection, LegalList } from "../components/LegalLayout";
import { companyDetails, contactConfig } from "../constants";

/**
 * Written from what the site actually does, not from a template:
 *   · two Formspree-backed forms (Get Quote, Driver Partnership)
 *   · fields collected: first name, last name, email, phone, message
 *   · no analytics, no advertising pixels, no cookies set by this site
 *   · processors: Formspree (form delivery), Vercel (hosting)
 * If any of that changes, this page must change with it.
 */
export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="28 July 2026">
      <p>
        This policy explains what personal data {companyDetails.legalName} (&ldquo;CargoPanda&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through this website, why we collect it, and what
        rights you have over it. It covers this website only. Data we process under a signed
        logistics services agreement is governed by that agreement.
      </p>

      <LegalSection id="who-we-are" heading="1. Who we are">
        <p>
          {companyDetails.legalName} is a logistics company registered in India
          (CIN {companyDetails.cin}), with its registered office at{" "}
          {companyDetails.registeredOffice}.
        </p>
        <p>
          For the purposes of the Digital Personal Data Protection Act, 2023, we are the Data
          Fiduciary for the personal data described in this policy. You can reach us at{" "}
          <a href={`mailto:${contactConfig.servicesEmail}`} className="text-[#0D4715] font-bold hover:text-[#E9762B] underline decoration-[#E9762B]/40 underline-offset-2">
            {contactConfig.servicesEmail}
          </a>.
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" heading="2. What we collect">
        <p>
          We collect personal data only when you choose to send it to us through one of the two
          forms on this site &mdash; the quote request form and the driver partnership form. Both
          collect the same fields:
        </p>
        <LegalList
          items={[
            "First name and last name",
            "Email address",
            "Phone number",
            "Any message or delivery requirements you choose to write",
          ]}
        />
        <p>
          There are no other forms on this site, and no field is collected that is not visible to
          you at the point you fill it in.
        </p>
        <p className="font-bold text-[#0D4715]">
          This website does not use analytics, advertising pixels, session recording, or tracking
          cookies. We set no cookies of our own.
        </p>
      </LegalSection>

      <LegalSection id="why" heading="3. Why we use it">
        <p>We use what you send us for a single purpose in each case:</p>
        <LegalList
          items={[
            "Quote requests — to prepare a response to your enquiry, contact you about it, and if you become a customer, to set up and run the service.",
            "Driver partnership enquiries — to assess your enquiry and contact you about working with us.",
          ]}
        />
        <p>
          We do not sell your data, share it with advertisers, or use it to build profiles. We do
          not send marketing to people who only asked for a quote, unless you separately ask us to.
        </p>
      </LegalSection>

      <LegalSection id="legal-basis" heading="4. Our basis for processing">
        <p>
          We process this data on the basis of your consent, given when you submit a form having
          read this policy. Where you become a customer or partner, we then process data as
          necessary to perform our contract with you and to meet legal and tax obligations.
        </p>
        <p>
          You may withdraw consent at any time (see section 8). Withdrawal does not affect
          processing already carried out, and may mean we cannot respond to your enquiry.
        </p>
      </LegalSection>

      <LegalSection id="sharing" heading="5. Who else handles it">
        <p>
          We keep the number of third parties deliberately small. Two are involved in running this
          website:
        </p>
        <LegalList
          items={[
            "Formspree — receives and delivers form submissions to our email. Your form data passes through and is stored on Formspree's systems, which are located outside India.",
            "Vercel — hosts this website and processes standard server request logs, which may include IP addresses.",
          ]}
        />
        <p>
          We may also disclose data where we are required to by law, court order, or a lawful
          request from a government authority.
        </p>
        <p>
          Beyond these, we share data with no one. We do not transfer your enquiry data to other
          logistics operators, brokers, or marketing companies.
        </p>
      </LegalSection>

      <LegalSection id="transfers" heading="6. Transfers outside India">
        <p>
          Because Formspree and Vercel operate infrastructure outside India, personal data you
          submit through this site is processed outside India. We use these providers under their
          standard terms and rely on the contractual protections they offer.
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="7. How long we keep it">
        <p>
          We keep enquiry data only as long as it serves the purpose it was collected for:
        </p>
        <LegalList
          items={[
            "Enquiries that do not become business — up to 24 months from your last contact with us, then deleted.",
            "Customer and partner records — for the life of the relationship and afterwards for as long as Indian tax, accounting and company law requires.",
          ]}
        />
        <p>You can ask us to delete your data sooner. See below.</p>
      </LegalSection>

      <LegalSection id="your-rights" heading="8. Your rights">
        <p>Under the Digital Personal Data Protection Act, 2023, you have the right to:</p>
        <LegalList
          items={[
            "Ask what personal data of yours we hold, and a summary of how we process it.",
            "Have inaccurate or incomplete data corrected, completed, or updated.",
            "Have your data erased where we no longer need it for the purpose it was collected.",
            "Withdraw consent you previously gave.",
            "Nominate another person to exercise these rights on your behalf in the event of your death or incapacity.",
            "Raise a grievance with us, and escalate to the Data Protection Board of India if we do not resolve it.",
          ]}
        />
        <p>
          To exercise any of these, email{" "}
          <a href={`mailto:${contactConfig.servicesEmail}`} className="text-[#0D4715] font-bold hover:text-[#E9762B] underline decoration-[#E9762B]/40 underline-offset-2">
            {contactConfig.servicesEmail}
          </a>{" "}
          with enough detail for us to identify your record. We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection id="grievance" heading="9. Grievance officer">
        <p>
          If you are unhappy with how we have handled your data or your request, contact:
        </p>
        <div className="bg-white/40 border border-[#41644A]/20 rounded-2xl p-5 md:p-6">
          <p className="font-black text-[#0D4715] uppercase tracking-wide text-sm">
            {contactConfig.contactPerson.name}
          </p>
          <p className="text-xs md:text-sm text-[#41644A] mb-2">
            {contactConfig.contactPerson.designation} &middot; Grievance Officer
          </p>
          <p className="text-sm">
            <a href={`mailto:${contactConfig.servicesEmail}`} className="text-[#0D4715] font-bold hover:text-[#E9762B]">
              {contactConfig.servicesEmail}
            </a>
          </p>
          <p className="text-sm">
            <a href={`tel:+${contactConfig.phone.replace(/\D/g, "")}`} className="text-[#0D4715] font-bold hover:text-[#E9762B]">
              {contactConfig.phone}
            </a>
          </p>
        </div>
        <p>
          If we do not resolve your grievance to your satisfaction, you may complain to the Data
          Protection Board of India.
        </p>
      </LegalSection>

      <LegalSection id="children" heading="10. Children">
        <p>
          This site is aimed at businesses and at adults seeking driver partnerships. We do not
          knowingly collect data from anyone under 18. If you believe a child has sent us personal
          data, contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="security" heading="11. Security">
        <p>
          This site is served over HTTPS. Form submissions are encrypted in transit. We limit
          access to enquiry data to the people who need it to respond to you. No system is perfectly
          secure, and we cannot guarantee absolute security, but we will notify you and the Data
          Protection Board as required if a breach affects your data.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="12. Changes to this policy">
        <p>
          If we change how we handle personal data, we will update this page and the date at the
          top. Material changes will be highlighted here. See also our{" "}
          <Link to="/terms-of-service" className="text-[#0D4715] font-bold hover:text-[#E9762B] underline decoration-[#E9762B]/40 underline-offset-2">
            Terms of Service
          </Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
