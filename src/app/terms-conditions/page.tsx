
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <div className="prose prose-lg max-w-4xl mx-auto">
        <p>
          Welcome to Khushi Gems and Jewellery. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Khushi Gems and Jewellery's relationship with you in relation to this website.
        </p>
        <h2>1. General</h2>
        <p>
          The content of the pages of this website is for your general information and use only. It is subject to change without notice.
        </p>
        <h2>2. Products and Pricing</h2>
        <p>
          All products are subject to availability. We reserve the right to limit the quantity of products we supply. Prices for our products are subject to change without notice.
        </p>
         <h2>3. Intellectual Property</h2>
        <p>
          This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
        </p>
      </div>
    </motion.div>
  );
}
