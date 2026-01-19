
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
};

const itemAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" }
};

export default function CollectionsPage() {
  const router = useRouter();

  return (
    <motion.div 
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <motion.header className="text-center mb-12" {...itemAnimation}>
        <h1 className="font-headline text-5xl font-bold">Our Exhibitions</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Discover curated collections, each with a unique story and inspiration.
        </p>
      </motion.header>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" {...sectionAnimation}>
        {collections.map((collection) => (
          <motion.div key={collection.id} {...itemAnimation}>
            <Link href={`/collections/${collection.slug}`}>
              <Card className="group relative overflow-hidden rounded-lg border-black/10 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-0 h-full">
                  <div className="relative aspect-[3/4] h-full">
                    <Image
                      src={collection.imageUrl}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={collection.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-headline text-3xl text-beige">{collection.title}</h3>
                      <div className="flex items-center mt-2 text-sm font-semibold text-beige opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
