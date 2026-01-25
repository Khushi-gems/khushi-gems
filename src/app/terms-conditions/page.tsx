"use client";

import { motion } from "framer-motion";

const terms = [
  {
    title: "These Terms and Conditions May Change",
    content: (
      <p>
        I reserve the right to update or modify these terms and conditions at any
        time without prior notice. Your use of KhushiJewels.com following any such
        change constitutes your agreement to follow and be bound by the terms and
        conditions as changed. For this reason, I encourage you to review these
        terms and conditions whenever you use this website.
      </p>
    ),
  },
  {
    title: "Limitations of Liability",
    content: (
      <div className="space-y-4">
        <p>
          Khushi Jewels / Khushi Gems & Jewels shall not assume any responsibility,
          and shall not be liable for any damages to, or viruses that may infect,
          your computer, telecommunication equipment, or other property caused by
          or arising from your access to, use of, or browsing this website or your
          downloading of any materials from this website.
        </p>
        <p>
          IN NO EVENT WILL KHUSHI JEWELS, KHUSHI GEMS & JEWELS, NOR THEIR
          RESPECTIVE OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, SUCCESSORS,
          ASSIGNS, MANUFACTURING PARTNERS, NOR ANY PARTY INVOLVED IN THE
          CREATION, PRODUCTION, OR TRANSMISSION OF THIS WEBSITE BE LIABLE TO
          ANY PARTY FOR ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, OR
          CONSEQUENTIAL DAMAGES (INCLUDING, WITHOUT LIMITATION, THOSE
          RESULTING FROM LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION)
          ARISING OUT OF THE USE, INABILITY TO USE, OR THE RESULTS OF USE OF
          THIS WEBSITE.
        </p>
        <p>
          THE FOREGOING LIMITATIONS OF LIABILITY DO NOT APPLY TO THE EXTENT
          PROHIBITED BY LAW.
        </p>
      </div>
    ),
  },
  {
    title: "Copyright and Trademark",
    content: (
      <div className="space-y-4">
        <p>
          Unless otherwise indicated, all material on this website is subject to
          the copyright and trademark rights of Khushi Jewels / Khushi Gems &
          Jewels.
        </p>
        <p>
          No material may be copied, reproduced, modified, posted, transmitted,
          or distributed without prior written consent.
        </p>
      </div>
    ),
  },
  {
    title: "Products, Content, and Specifications",
    content: (
      <div className="space-y-4">
        <p>
          All features, content, specifications, products, and prices are
          subject to change without notice.
        </p>
        <p>
          Certain weights, measurements, and descriptions are approximate and
          provided for convenience only.
        </p>
      </div>
    ),
  },
  {
    title: "Shipping Limitations",
    content: (
      <div className="space-y-4">
        <p>
          Orders will be shipped to the address designated by the purchaser.
        </p>
        <p>
          Risk of loss and title pass to you upon delivery to the carrier.
        </p>
      </div>
    ),
  },
  {
    title: "Duties and Taxes",
    content: (
      <p>
        You are responsible for duties and taxes outside India.
      </p>
    ),
  },
  {
    title: "Your Account",
    content: (
      <div className="space-y-4">
        <p>
          You are responsible for maintaining the confidentiality of your
          account and password.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>You are over 18 years of age.</li>
          <li>You are providing accurate information.</li>
          <li>You have full authority to place the order.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "General",
    content: (
      <div className="space-y-4">
        <p>
          By using this website, you agree to comply with these terms and
          conditions.
        </p>
      </div>
    ),
  },
  {
    title: "Products and Pricing",
    content: (
      <p>
        All products are subject to availability and price changes without
        notice.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p>
        This website contains material owned by or licensed to us.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <div className="inline-block rounded-2xl from-muted/40 to-muted/20 px-8 py-4">
          <h1 className="font-headline text-5xl font-bold">
            Terms & Conditions
          </h1>
        </div>
        <p className="text-muted-foreground mt-4 text-lg">
          Please read our terms and conditions carefully.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12">
        {terms.map((term, index) => (
          <div key={index}>
            <h2 className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-2 font-headline text-3xl font-bold text-foreground mb-4">
              {term.title}
            </h2>
            <div className="prose prose-lg max-w-none">
              {term.content}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
