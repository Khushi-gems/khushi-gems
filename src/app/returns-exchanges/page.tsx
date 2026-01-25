"use client";

import { motion } from "framer-motion";

export default function ReturnsAndExchangesPage() {
  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <div className="inline-block rounded-2xl  from-muted/40 to-muted/20 px-8 py-4">
          <h1 className="font-headline text-5xl font-bold">
            Returns & Exchanges Policy
          </h1>
        </div>
        <p className="text-muted-foreground mt-4 text-lg">
          Please read our policy carefully before placing your order.
        </p>
      </header>

      <div className="prose prose-lg max-w-4xl mx-auto space-y-6">
        <p>
          All my products are handmade with love, so each piece is one of a kind.
        </p>

        <p>
          This means your purchase may differ slightly from the image you see on
          the website, and there may be minor irregularities. For example, stone
          shades vary considerably within an acceptable tolerance, an effect
          which may be magnified by computer screens.
        </p>

        <p>
          Please carefully read the product description and follow the size chart
          and other guides mentioned along with each item before placing the
          order. Also, check the item status (Ready to Ship or Made to Order)
          before purchasing.
        </p>

        {/* Exchanges */}
        <h2 className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-2">
          Exchanges
        </h2>
        <ul>
          <li>
            <strong>Ready to Ship items:</strong> Exchanges are accepted within
            14 days of receipt.
          </li>
          <li>
            <strong>Made to Order items:</strong> Exchanges are not accepted
            unless the item is damaged or incorrect.
          </li>
        </ul>

        <p>
          To request an exchange, please call or WhatsApp{" "}
          <strong>+91 9928070606</strong>. For damaged or incorrect items, photos
          are required so the quality team can investigate.
        </p>

        {/* Order Cancellation Policy */}
        <h2 className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-2">
          Order Cancellation Policy
        </h2>

        <h3>Ready to Ship Items</h3>
        <p>
          Orders can be cancelled within 24 hours of placing them for a full
          refund. After 24 hours, cancellation may not be possible as shipping
          may have already begun.
        </p>

        <h3>Made to Order Items</h3>
        <p>
          Cancellations are accepted only within 24 hours of placing the order.
          After this period, cancellations cannot be accommodated as production
          begins on your custom piece.
        </p>

        {/* How to Cancel */}
        <h2 className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-2">
          How to Cancel
        </h2>
        <p>
          Please email <strong>priyanshabz.290@gmail.com</strong> or call/WhatsApp{" "}
          <strong>+91 9928070606</strong> with your order details.
        </p>

        {/* Refund Processing */}
        <h2 className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-2">
          Refund Processing
        </h2>
        <p>
          Refunds for cancelled orders are processed within 7–10 business days
          after confirmation.
        </p>

        {/* Repairs */}
        <h2 className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-2">
          Repairs
        </h2>
        <p>
          Repair services (including replating) are available for all jewellery
          products.
        </p>

        <p>
          Please email <strong>priyanshabz.290@gmail.com</strong> or call/WhatsApp{" "}
          <strong>+91 9928070606</strong> with your order details to receive an
          estimate. Repair and shipping costs are to be borne by the customer.
        </p>

        {/* Other Information */}
        <h2 className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-2">
          Other Information
        </h2>
        <p>
          This policy does not cover damage caused by wear and tear, accidental,
          or random damage resulting from use.
        </p>

        <p>
          No warranties are provided, express or implied, including warranties of
          merchantability, quality, compliance with description, or fitness for a
          particular purpose.
        </p>
      </div>
    </motion.div>
  );
}
