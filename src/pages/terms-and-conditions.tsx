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
          content="Terms and Conditions of Use for Reply Master"
        />
      </Head>
      <main className="mx-auto max-w-4xl px-6 py-12 text-gray-900">
        <h1 className="mb-6 text-3xl font-bold">Terms and Conditions of Use</h1>
        <p className="mb-4 text-sm text-gray-600">
          <strong>Effective Date:</strong> {new Date().toDateString()}
          <br />
          <strong>Last Updated:</strong> Tue 01 Jul 2025
        </p>

        <p className="mb-6">
          Welcome to Reply Master (“we,” “our,” “us”). These Terms and
          Conditions (“Terms”) govern your use of our platform and services
          accessible at{" "}
          <a
            href="https://reply-master.com"
            className="text-blue-600 underline"
          >
            reply-master.com
          </a>{" "}
          and any related applications, features, or content (collectively, the
          “Service”).
        </p>

        <p className="mb-6">
          By using the Service, you (“User,” “you,” “your”) agree to be legally
          bound by these Terms. If you do not agree, you must not use the
          Service.
        </p>

        <ol className="list-decimal space-y-6 pl-6">
          <li>
            <strong>Service Description</strong>
            <p>
              Reply Master is a software-as-a-service (SaaS) platform that
              connects to users’ Instagram accounts to automate comment replies
              using AI technology. The AI generates responses based on the
              context and profile information provided by the user.
            </p>
          </li>

          <li>
            <strong>Eligibility</strong>
            <p>
              You must be at least 18 years old or the age of majority in your
              jurisdiction and have the legal authority to bind your
              organization to these Terms (if applicable).
            </p>
          </li>

          <li>
            <strong>No Warranty on Content Quality</strong>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                The quality, tone, and appropriateness of AI-generated replies
                may vary.
              </li>
              <li>
                The AI may generate inaccurate, irrelevant, or undesired
                responses.
              </li>
              <li>
                We do not guarantee the accuracy, appropriateness, legality, or
                effectiveness of any replies generated.
              </li>
              <li>
                You are solely responsible for monitoring and managing any
                replies posted through your Instagram account.
              </li>
              <li>
                All replies are generated via a “black-box” system, and you
                accept full responsibility for their use and consequences.
              </li>
            </ul>
          </li>

          <li>
            <strong>Limitation of Liability</strong>
            <p>
              To the fullest extent permitted by law, we shall not be liable for
              any damages, including but not limited to direct, indirect,
              incidental, punitive, or consequential damages arising from:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Inaccurate or inappropriate AI-generated content.</li>
              <li>
                Instagram account suspension, flagging, or rate-limiting due to
                reply frequency or spam detection.
              </li>
              <li>Reputational or financial damage due to AI replies.</li>
              <li>
                Errors, delays, or downtime in the operation of the Service.
              </li>
              <li>Unauthorized access to your data or account.</li>
            </ul>
            <p>Use of the Service is at your own risk.</p>
          </li>

          <li>
            <strong>Service Availability</strong>
            <p>
              We strive to maintain uninterrupted access to the Service but do
              not guarantee continuous, error-free, or secure access.
              Maintenance, updates, or unforeseen issues may result in temporary
              service interruptions or downtime.
            </p>
          </li>

          <li>
            <strong>Third-Party Platforms and APIs</strong>
            <p>
              You acknowledge that Reply Master interacts with third-party
              platforms (e.g., Instagram via Meta APIs), and those platform
              functionalities, rate limits, or terms may impact our Service. We
              are not responsible for disruptions caused by changes to
              third-party APIs or platform behavior.
            </p>
          </li>

          <li>
            <strong>User Responsibilities</strong>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                You provide accurate and complete profile data to help tailor
                replies.
              </li>
              <li>
                You will not use the Service to post offensive, defamatory, or
                illegal content.
              </li>
              <li>
                You remain responsible for your Instagram account’s behavior and
                public communications.
              </li>
              <li>
                You understand and accept the limitations of AI-generated
                replies.
              </li>
            </ul>
          </li>

          <li>
            <strong>Plan Usage and Billing</strong>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                Your usage of Reply Master is subject to the plan you choose.
              </li>
              <li>
                Comment reply limits, intervals, and capabilities vary by plan.
              </li>
              <li>Plan upgrades take effect immediately and are prorated.</li>
              <li>
                You authorize us to charge your payment method automatically on
                a recurring basis until canceled.
              </li>
              <li>
                Downtime or non-usage does not entitle you to refunds unless
                required by law.
              </li>
            </ul>
          </li>

          <li>
            <strong>Cancellation and Refund Policy</strong>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                You may cancel your subscription at any time from your account
                dashboard.
              </li>
              <li>
                No refunds are issued for partial months or unused service
                unless legally mandated.
              </li>
              <li>
                Upon cancellation, your access will remain active until the end
                of the billing period.
              </li>
            </ul>
          </li>

          <li>
            <strong>Data Privacy and Deletion</strong>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                We only collect data necessary to provide the Service, including
                Instagram authentication and profile metadata.
              </li>
              <li>
                We do not sell or share your data with third parties for
                advertising.
              </li>
              <li>
                You may request deletion of all your data at any time by
                contacting us at instareplymaster@gmail.com
              </li>
              <li>
                Deleted data is permanently removed from our systems within 30
                days.
              </li>
            </ul>
          </li>

          <li>
            <strong>Account Security</strong>
            <p>
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activity conducted under your
              account. Notify us immediately if you suspect unauthorized access.
            </p>
          </li>

          <li>
            <strong>Intellectual Property</strong>
            <p>
              All intellectual property related to the Service (excluding user
              content) belongs to Reply Master. You may not copy, modify, or
              distribute any part of the Service without our written consent.
            </p>
          </li>

          <li>
            <strong>Termination</strong>
            <p>
              We may suspend or terminate your access to the Service at our sole
              discretion if you violate these Terms or engage in abusive,
              fraudulent, or illegal conduct.
            </p>
          </li>

          <li>
            <strong>Indemnification</strong>
            <p>
              You agree to indemnify, defend, and hold harmless Reply Master,
              its affiliates, and their respective officers, directors, and
              employees from any claims, liabilities, damages, losses, and
              expenses arising out of or related to your use of the Service or
              violation of these Terms.
            </p>
          </li>

          <li>
            <strong>Changes to Terms</strong>
            <p>
              We may update these Terms at any time. Changes will be effective
              upon posting to our website. Your continued use of the Service
              after changes constitutes acceptance of the updated Terms.
            </p>
          </li>

          <li>
            <strong>Governing Law</strong>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of Florida, USA. Any disputes shall be resolved in the courts
              of Florida.
            </p>
          </li>

          <li>
            <strong>Contact</strong>
            <p>
              If you have questions regarding these Terms, contact us at:
              <br />
              📧 instareplymaster@gmail.com
            </p>
          </li>
        </ol>
      </main>
    </>
  );
}
