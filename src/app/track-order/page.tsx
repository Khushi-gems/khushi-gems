
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TrackOrderPage() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Track Your Order</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Enter your order number to see its status.
        </p>
      </header>
      <div className="max-w-md mx-auto">
        <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Order Number" />
            <Button type="submit">Track</Button>
        </div>
      </div>
    </motion.div>
  );
}
