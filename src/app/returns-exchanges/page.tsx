
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
        <h1 className="font-headline text-5xl font-bold">Returns & Exchanges</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Information about our returns and exchanges policy.
        </p>
      </header>
      <div className="prose prose-lg max-w-4xl mx-auto">
        <p>
          We want you to be completely satisfied with your purchase. If you are not, we are here to help.
        </p>
        <h2>Returns</h2>
        <p>
          You have 14 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.
        </p>
        <h2>Exchanges</h2>
        <p>
          We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at returns@khushigems.com.
        </p>
      </div>
    </motion.div>
  );
}
