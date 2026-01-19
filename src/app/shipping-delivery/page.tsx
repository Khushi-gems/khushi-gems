
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShippingAndDeliveryPage() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Shipping & Delivery</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Information on our shipping and delivery process.
        </p>
      </header>
      <div className="prose prose-lg max-w-4xl mx-auto">
        <p>
          We are committed to delivering your order in a timely manner.
        </p>
        <h2>Shipping</h2>
        <p>
          All orders are processed within 2-3 business days. We offer standard and express shipping options.
        </p>
        <h2>Delivery</h2>
        <p>
          Delivery times will vary based on your location and the shipping method selected. You will receive a tracking number once your order has shipped.
        </p>
      </div>
    </motion.div>
  );
}
