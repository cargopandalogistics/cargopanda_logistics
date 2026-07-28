import React from "react";
import { Link } from "react-router-dom";
import LegalLayout, { LegalSection, LegalList } from "../components/LegalLayout";
import { companyDetails, contactConfig } from "../constants";

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="28 July 2026">
      <p>
        These terms govern your use of this website and any enquiry you send through it. They are
        not the terms on which we carry your goods &mdash; those are set out in the separate
        services agreement signed before any consignment moves. Where the two differ, the signed
        agreement wins.
      </p>

      <LegalSection id="who" heading="1. Who you are dealing with">
        <p>
          This site is operated by {companyDetails.legalName}, a One Person Company registered in
          India under CIN {companyDetails.cin}, incorporated on {companyDetails.incDate}, with its
          registered office at {companyDetails.registeredOffice}.
        </p>
      </LegalSection>

      <LegalSection id="use" heading="2. Using this website">
        <p>You may read this site and send us enquiries. You may not:</p>
        <LegalList
          items={[
            "Use it for any unlawful purpose, or in a way that interferes with its operation.",
            "Attempt to gain unauthorised access to any part of the site or the systems behind it.",
            "Scrape, harvest or otherwise systematically extract content for commercial reuse without our written permission.",
            "Submit false information, or another person's contact details without their consent.",
          ]}
        />
      </LegalSection>

      <LegalSection id="quotes" heading="3. Quotes and enquiries are not a contract">
        <p className="font-bold text-[#0D4715]">
          Submitting the quote form does not book a shipment, and our reply does not create a
          binding contract.
        </p>
        <p>
          Any rate, transit time, vehicle type or capacity we mention in response to an enquiry is
          an indication given in good faith on the information you provide. It is subject to
          confirmation, to vehicle and capacity availability at the time of booking, and to
          inspection of the actual consignment.
        </p>
        <p>
          A binding engagement arises only when both parties sign a services agreement or we
          confirm a specific booking in writing.
        </p>
      </LegalSection>

      <LegalSection id="services" heading="4. Service descriptions">
        <p>
          The services described on this site &mdash; last-mile delivery, intracity and intercity
          transport, cold chain and reefer movement, dark store and central kitchen distribution
          &mdash; are described in general terms. Availability varies by route, city, vehicle type
          and season.
        </p>
        <p>
          Statements such as same-day delivery, real-time tracking or temperature monitoring
          describe capabilities we offer, not guarantees applying to every consignment. Specific
          service levels, temperature ranges and delivery windows are agreed per contract.
        </p>
      </LegalSection>

      <LegalSection id="driver" heading="5. Driver partnership enquiries">
        <p>
          Submitting the driver partnership form is an expression of interest. It is not an offer
          of work, a contract, or a guarantee of earnings. Any engagement follows separate
          onboarding, document verification and a written agreement. Earnings depend on trips
          completed, route, vehicle and other factors, and we make no representation about what any
          individual will earn.
        </p>
      </LegalSection>

      <LegalSection id="ip" heading="6. Intellectual property">
        <p>
          The CargoPanda name and logo, the content of this site, and its design are owned by
          {" "}{companyDetails.legalName} or used under licence. You may not reproduce or reuse them
          commercially without our written permission. Quoting short extracts with attribution is
          fine.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="7. Liability for this website">
        <p>
          We keep this site accurate and available, but we do not warrant that it will be
          uninterrupted, error-free, or that the information on it is complete or current at any
          given moment. We may change or withdraw content without notice.
        </p>
        <p>
          To the extent permitted by law, we are not liable for loss arising from reliance on
          information published on this site, or from the site being unavailable. Nothing here
          limits liability that cannot be limited under Indian law, including liability for fraud.
        </p>
        <p>
          Liability for goods in our custody is governed by the signed services agreement and by
          applicable Indian carriage law &mdash; not by this page.
        </p>
      </LegalSection>

      <LegalSection id="third-party" heading="8. Third-party links">
        <p>
          This site links to our profiles on LinkedIn and Instagram, and to Google Maps. We are not
          responsible for the content or privacy practices of those services.
        </p>
      </LegalSection>

      <LegalSection id="privacy" heading="9. Personal data">
        <p>
          What we do with personal data you send us is set out in our{" "}
          <Link to="/privacy-policy" className="text-[#0D4715] font-bold hover:text-[#E9762B] underline decoration-[#E9762B]/40 underline-offset-2">
            Privacy Policy
          </Link>, which forms part of these terms.
        </p>
      </LegalSection>

      <LegalSection id="law" heading="10. Governing law and jurisdiction">
        <p>
          These terms are governed by the laws of India. The courts at Bengaluru, Karnataka have
          exclusive jurisdiction over any dispute arising from this website or these terms.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="11. Changes">
        <p>
          We may update these terms. The version published here at the time you use the site is the
          one that applies. The date at the top shows when it last changed.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="12. Contact">
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${contactConfig.servicesEmail}`} className="text-[#0D4715] font-bold hover:text-[#E9762B] underline decoration-[#E9762B]/40 underline-offset-2">
            {contactConfig.servicesEmail}
          </a>{" "}
          or {contactConfig.phone}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
