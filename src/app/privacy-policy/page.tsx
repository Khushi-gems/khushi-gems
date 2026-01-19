
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your privacy is important to us.
        </p>
      </header>
      <div className="prose prose-lg max-w-4xl mx-auto">
        <p>
          This policy explains how we collect, use, and protect your personal information.
        </p>
        <h2>Information Collection</h2>
        <p>
          We collect information from you when you register on our site, place an order, or subscribe to our newsletter.
        </p>
        <h2>Information Use</h2>
        <p>
          The information we collect may be used to personalize your experience, improve our website, and process transactions.
        </p>
      </div>
    </motion.div>
  );
}
