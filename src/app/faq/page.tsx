
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion";

const faqs = [
    {
        question: "What materials do you use?",
        answer: "We use high-quality materials including 22k gold, sterling silver, and ethically sourced gemstones."
    },
    {
        question: "How do I care for my jewelry?",
        answer: "To keep your jewelry looking its best, avoid contact with chemicals and store it in a dry place. Clean gently with a soft cloth."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 14-day return policy for unused items in their original packaging. Please see our Returns & Exchanges page for more details."
    }
];

const itemAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function FaqPage() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header className="text-center mb-12" {...itemAnimation}>
        <h1 className="font-headline text-5xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Find answers to common questions.
        </p>
      </motion.header>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                 <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                 >
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                 </motion.div>
            ))}
        </Accordion>
      </div>
    </motion.div>
  );
}
