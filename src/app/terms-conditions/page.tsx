
"use client";

import { motion } from "framer-motion";

const terms = [
  {
    title: "These Terms and Conditions May Change",
    content: <p>I reserve the right to update or modify these terms and conditions at any time without prior notice. Your use of KhushiJewels.com following any such change constitutes your agreement to follow and be bound by the terms and conditions as changed. For this reason, I encourage you to review these terms and conditions whenever you use this website.</p>,
  },
  {
    title: "Limitations of Liability",
    content: (
      <div className="space-y-4">
        <p>Khushi Jewels / Khushi Gems & Jewels shall not assume any responsibility, and shall not be liable for any damages to, or viruses that may infect, your computer, telecommunication equipment, or other property caused by or arising from your access to, use of, or browsing this website or your downloading of any materials from this website.</p>
        <p>IN NO EVENT WILL KHUSHI JEWELS, KHUSHI GEMS & JEWELS, NOR THEIR RESPECTIVE OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, SUCCESSORS, ASSIGNS, MANUFACTURING PARTNERS, NOR ANY PARTY INVOLVED IN THE CREATION, PRODUCTION, OR TRANSMISSION OF THIS WEBSITE BE LIABLE TO ANY PARTY FOR ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL DAMAGES (INCLUDING, WITHOUT LIMITATION, THOSE RESULTING FROM LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION) ARISING OUT OF THE USE, INABILITY TO USE, OR THE RESULTS OF USE OF THIS WEBSITE, ANY WEBSITES LINKED TO THIS WEBSITE, OR THE MATERIALS, INFORMATION, OR SERVICES CONTAINED AT ANY OR ALL SUCH SITES, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY AND WHETHER OR NOT ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
        <p>THE FOREGOING LIMITATIONS OF LIABILITY DO NOT APPLY TO THE EXTENT PROHIBITED BY LAW. PLEASE REFER TO YOUR LOCAL LAWS FOR ANY SUCH PROHIBITIONS.</p>
        <p>IN THE EVENT OF ANY PROBLEM WITH THIS WEBSITE OR ANY CONTENT, YOU AGREE THAT YOUR SOLE REMEDY IS TO CEASE USING THIS WEBSITE.</p>
        <p>IN THE EVENT OF ANY PROBLEM WITH THE PRODUCTS OR SERVICES THAT YOU HAVE PURCHASED ON OR THROUGH THIS WEBSITE, YOU AGREE THAT YOUR REMEDY, IF ANY, IS FROM THE MANUFACTURER OR SUPPLIER IN ACCORDANCE WITH THEIR WARRANTY, OR TO SEEK A RETURN/REFUND IN ACCORDANCE WITH THE RETURN & REFUND POLICY ON THIS WEBSITE.</p>
        <p>This site may include inaccuracies, mistakes, or typographical errors. Khushi Jewels / Khushi Gems & Jewels does not warrant that the content will be uninterrupted or error-free.</p>
      </div>
    ),
  },
  {
    title: "Copyright and Trademark",
    content: (
      <div className="space-y-4">
        <p>Unless otherwise indicated, all material on this website—including but not limited to text, images, illustrations, software, audio clips, video clips, and animations—is subject to the copyright and trademark rights of Khushi Jewels / Khushi Gems & Jewels.</p>
        <p>No material may be copied, reproduced, modified, posted, transmitted, or distributed, in whole or in part, in any form whatsoever, without prior written consent of Khushi Jewels / Khushi Gems & Jewels. All rights reserved.</p>
      </div>
    ),
  },
  {
    title: "Products, Content, and Specifications",
    content: (
      <div className="space-y-4">
        <p>All features, content, specifications, products, and prices of products and services described or depicted on this website are subject to change at any time without notice.</p>
        <p>Certain weights, measurements, and descriptions are approximate and provided for convenience only. I make all reasonable efforts to accurately display product attributes, including applicable colors, but the actual color you see depends on your device display.</p>
        <p>The inclusion of any product or service at any time does not imply or warrant availability.</p>
        <p>It is your responsibility to obey all local, state, and international laws regarding possession, use, and sale of any item purchased from this website. By placing an order, you represent that the products will be used only in a lawful manner.</p>
      </div>
    ),
  },
  {
    title: "Shipping Limitations",
    content: (
      <div className="space-y-4">
        <p>Orders will be shipped to the address designated by the purchaser, provided the address complies with all shipping restrictions listed on this website.</p>
        <p>All purchases are made pursuant to a shipment contract. Risk of loss and title for items pass to you upon delivery to the carrier.</p>
        <p>You are responsible for filing claims with carriers for damaged or lost shipments.</p>
      </div>
    ),
  },
  {
    title: "Duties and Taxes",
    content: <p>You are responsible for duties and taxes outside India. All items entering a foreign country are subject to customs inspection and assessment based on that country's laws.</p>,
  },
  {
    title: "Your Account",
    content: (
      <div className="space-y-4">
        <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
        <p>This website and Khushi Jewels / Khushi Gems & Jewels reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at any time.</p>
        <p>By placing an order, you warrant that:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>You are over 18 years of age.</li>
          <li>You are providing Khushi Jewels / Khushi Gems & Jewels with accurate and truthful information.</li>
          <li>You have full authority to place the order.</li>
        </ul>
      </div>
    ),
  },
   {
    title: "General",
    content: (
      <div className="space-y-4">
        <p>Welcome to Khushi Gems and Jewellery. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Khushi Gems and Jewellery's relationship with you in relation to this website.</p>
        <p>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>
      </div>
    ),
  },
  {
    title: "Products and Pricing",
    content: <p>All products are subject to availability. We reserve the right to limit the quantity of products we supply. Prices for our products are subject to change without notice.</p>,
  },
  {
    title: "Intellectual Property",
    content: <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>,
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
        <h1 className="font-headline text-5xl font-bold">Terms & Conditions</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Please read our terms and conditions carefully.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12">
        {terms.map((term, index) => (
          <div key={index}>
            <h2 className="font-headline text-3xl font-bold text-foreground mb-4">{term.title}</h2>
            <div className="prose prose-lg max-w-none">{term.content}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
