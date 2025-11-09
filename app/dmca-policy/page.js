import React from "react";
import Link from "next/link";

export const metadata = {
  title: "DMCA Policy | TeraFetch",
  description:
    "Read the DMCA Policy for TeraFetch. Learn how to report copyright infringement and understand our compliance and takedown procedures.",
  keywords: [
    "DMCA Policy",
    "TeraFetch DMCA",
    "Copyright infringement",
    "TeraBox downloader policy",
    "TeraFetch legal notice",
  ],
  openGraph: {
    title: "DMCA Policy | TeraFetch",
    description:
      "Understand how TeraFetch handles copyright claims under the DMCA. Learn how to report infringement and our compliance practices.",
    url: "https://terafetch.netlify.app/dmca-policy",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "DMCA Policy | TeraFetch",
    description:
      "Learn about TeraFetch’s DMCA compliance process and how to report infringement responsibly.",
  },
};

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-14 pb-20 leading-relaxed text-gray-900 dark:text-gray-100">
      {/* Header */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-4 text-pink-600 dark:text-pink-400">
          DMCA Policy
        </h1>
        <p className="text-lg">
          This DMCA Policy explains how{" "}
          <Link
            href="https://TeraFetch.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline dark:text-pink-400 font-medium"
          >
            TeraFetch
          </Link>{" "}
          handles copyright infringement claims in accordance with the Digital
          Millennium Copyright Act (DMCA). We respect intellectual property
          rights and respond promptly to valid takedown requests.
        </p>
      </section>

      {/* Reporting Copyright Infringement */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-pink-500">
          Reporting Copyright Infringement
        </h2>
        <p className="mb-4">
          If you believe that your copyrighted work has been posted, linked, or
          otherwise made available through{" "}
          <span className="font-medium text-orange-500">TeraFetch</span>{" "}
          without proper authorization, please contact us via Telegram:
        </p>

        <Link
          href="https://t.me/+2fvOF7WT0YBjZDM9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-4 px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-all"
        >
          📩 Join Telegram Group
        </Link>

        <p className="mb-3">
          To help us review your claim, please include the following details:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Your full name and contact details (email, address, phone number).
          </li>
          <li>
            A clear description of the copyrighted work you believe was
            infringed.
          </li>
          <li>
            The URL or description of the allegedly infringing material on our
            website.
          </li>
          <li>
            A statement confirming your good-faith belief that the use is not
            authorized by the copyright owner, its agent, or the law.
          </li>
          <li>
            A statement that the information provided is accurate and that you
            are authorized to act on behalf of the copyright owner.
          </li>
          <li>An electronic or physical signature of the authorized person.</li>
        </ul>
      </section>

      {/* Repeat Infringer Policy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-pink-500">
          Repeat Infringer Policy
        </h2>
        <p>
          We take DMCA compliance seriously. Users who repeatedly violate
          copyright rules may be permanently restricted from using{" "}
          <Link
            href="https://TeraFetch.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline dark:text-pink-400"
          >
            TeraFetch
          </Link>
          . This ensures a safe and lawful platform for all users.
        </p>
      </section>

      {/* Updates */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-pink-500">
          Updates to This Policy
        </h2>
        <p>
          This policy may be updated from time to time to comply with legal or
          operational changes. We recommend checking this page periodically for
          the latest version.
        </p>
      </section>

      {/* Contact / Support */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-pink-500">
          Contact & Support
        </h2>
        <p>
          For any DMCA-related questions or support requests, please contact us
          through our Telegram group:
        </p>
        <Link
          href="https://t.me/+2fvOF7WT0YBjZDM9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-all"
        >
          💬 Join Telegram Group
        </Link>
      </section>
    </main>
  );
}
