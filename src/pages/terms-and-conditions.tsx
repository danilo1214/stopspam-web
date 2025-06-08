import React from "react";
import { type Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Terms and Conditions | Reply Master",
  description:
    "Read the Terms and Conditions for using Reply Master, an AI-powered Instagram comment reply tool.",
};

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Reply Master</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for using Reply Master, an AI-powered Instagram comment reply tool."
        />
      </Head>
      <main className="mx-auto max-w-3xl px-4 py-12 text-gray-800">
        <h1 className="mb-8 text-3xl font-bold">Terms and Conditions</h1>
        <p className="mb-10 text-sm text-gray-500">
          Last updated: {new Date().toDateString()}
        </p>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">1. Service Overview</h2>
          <p>
            Reply Master provides AI-generated responses to Instagram comments
            on behalf of customers. The Service is intended to help businesses
            maintain engagement but does so automatically and without human
            review of each comment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            2. Use of AI and Disclaimer of Liability
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>No Guarantee of Output:</strong> Responses may be
              unpredictable, inappropriate, incorrect, or offensive. We do not
              monitor or vet each reply.
            </li>
            <li>
              <strong>Customer Responsibility:</strong> You are solely
              responsible for all AI-generated content.
            </li>
            <li>
              <strong>No Liability:</strong> We are not liable for damages
              arising from replies, business loss, or platform actions.
            </li>
            <li>
              <strong>Indemnification:</strong> You agree to indemnify and hold
              us harmless from any related claims.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            3. Subscriptions & Billing
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Subscription Plans:</strong> Various plans are offered as
              detailed on our pricing page.
            </li>
            <li>
              <strong>Payments:</strong> Handled securely by Stripe. We don’t
              store card info.
            </li>
            <li>
              <strong>Proration:</strong> Plan changes are prorated for the
              billing cycle.
            </li>
            <li>
              <strong>Cancellations:</strong> You may cancel anytime. Features
              continue until the period ends.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            4. Data Deletion and Termination
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Account Deletion:</strong> All associated data is
              permanently erased and this action is irreversible.
            </li>
            <li>
              <strong>Termination by Us:</strong> We may suspend or terminate
              access at our discretion.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            5. Privacy and Data Handling
          </h2>
          <p>
            We respect your privacy. Personal and business data are only used
            for service operations and subscriptions. See our Privacy Policy for
            more info.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            6. Governing Law and Legal Limitations
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Jurisdiction:</strong> These Terms are governed by the
              laws of United States of America.
            </li>
            <li>
              <strong>Limitation of Actions:</strong> Claims must be made within
              one (1) year of arising.
            </li>
            <li>
              <strong>Class Action Waiver:</strong> Disputes must be resolved
              individually.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">7. Changes to Terms</h2>
          <p>
            We may update these Terms. Continued use constitutes acceptance of
            the changes. The latest version is always on our website.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">8. Contact</h2>
          <p>
            For questions, contact us at:{" "}
            <span className="underline">instareplymaster@gmail.com</span>
          </p>
        </section>
      </main>
    </>
  );
}
