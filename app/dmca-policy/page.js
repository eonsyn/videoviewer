
import React from "react";

export const metadata = {
  title: "DMCA Policy | TeraDownloader",
  description:
    "Read the DMCA Policy for TeraDownloader. Learn how to report copyright infringement and understand our compliance procedures.",
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 pt-14 leading-relaxed text-gray-900 dark:text-gray-100">
      
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          DMCA Policy
        </h1>
        <p className="mb-6">
          This DMCA Policy explains how{" "}
          <a
            href="https://teradownloader.netlify.app/"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            TeraDownloader
          </a>{" "}
          handles copyright infringement claims in accordance with the Digital
          Millennium Copyright Act (DMCA). We respect intellectual property
          rights and act promptly on valid infringement notices.
        </p>
      </section>

      {/* Reporting Copyright Infringement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Reporting Copyright Infringement</h2>
        <p className="mb-3">
          If you believe your copyrighted work has been used on our website
          without authorization, please join our Telegram group and ask your query:{" "}
          <a
            href="https://t.me/+2fvOF7WT0YBjZDM9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Telegram Group
          </a>
        </p>
        <p className="mb-3">Your notice should include the following information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A physical or electronic signature of the person authorized to act on behalf of the copyright owner.</li>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Description of the infringing material and its location on our website.</li>
          <li>Your contact details (address, telephone number, and email address).</li>
          <li>A statement of good faith belief that the use is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement that the information provided is accurate and that you are authorized to act on behalf of the copyright owner.</li>
        </ul>
      </section>

      {/* Repeat Infringer Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Repeat Infringer Policy</h2>
        <p>
          We strictly adhere to DMCA guidelines. Users who repeatedly infringe
          copyrights will have their access to{" "}
          <a
            href="https://teradownloader.netlify.app/"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            TeraDownloader
          </a>{" "}
          terminated. This ensures compliance and protection of intellectual
          property rights.
        </p>
      </section>

      {/* Updates */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Updates to This Policy</h2>
        <p>
          We may update this DMCA Policy periodically to comply with regulations and laws. 
          Please check back regularly for any revisions.
        </p>
      </section>

      {/* Contact / Support */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact / Support</h2>
        <p>
          For questions about this DMCA Policy or support, join our Telegram group and ask your query:{" "}
          <a
            href="https://t.me/+2fvOF7WT0YBjZDM9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Telegram Group
          </a>
          .
        </p>
      </section>

    </main>
  );
}
