"use client";

import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

export default function CollectionsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-12">
        
        {/* Navigation / Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center relative"
        >

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center justify-center p-2 bg-secondary/30 rounded-full mb-4">
               <Sparkles className="w-4 h-4 text-primary mr-2" />
               <span className="text-xs font-bold tracking-widest uppercase text-primary">Curated Selections</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              The Exhibitions
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
              Explore our seasonally curated narratives. Each collection is a unique journey designed to inspire and captivate.
            </p>
          </div>
        </motion.div>

        {/* Collection Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {collections.map((collection) => (
            <motion.div key={collection.id} variants={itemVariants} className="h-full">
              <Link href={`/collections/${collection.slug}`} className="block h-full cursor-none-target">
                <Card className="group relative h-full overflow-hidden rounded-2xl border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 h-full">
                    {/* Aspect Ratio Container */}
                    <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
                      
                      {/* Image */}
                      <Image
                        src={collection.imageUrl}
                        alt={collection.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        data-ai-hint={collection.imageHint}
                      />
                      
                      {/* Overlay Gradient - darker at bottom for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                      
                      {/* Content Positioned Bottom */}
                      <div className="absolute bottom-0 left-0 w-full p-8 text-white translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                        <div className="overflow-hidden">
                            <h3 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
                            {collection.title}
                            </h3>
                        </div>
                        
                        {/* Animated Button/Link */}
                        <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
                          <div className="flex items-center text-sm font-medium pt-2">
                            <span className="border-b border-white pb-0.5">Explore Collection</span>
                            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}