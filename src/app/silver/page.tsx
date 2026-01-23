"use client";

import Link from "next/link";
import Image from "next/image";
import { silverCategories as sourceCategories } from "@/lib/data"; 
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { useMemo } from "react";
import { useProducts } from "@/components/product-provider";
import { LoadingLogo } from "@/components/loading-logo";
import { Loader2 } from "lucide-react";

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }
};

export default function SilverPage() {
    const { bestsellers, products, isLoading } = useProducts();

    const silverProducts = useMemo(() => products.filter(p => p.material === 'Silver'), [products]);
    
    // Use bestsellers from provider instead of Firestore query
    const silverBestsellers = useMemo(() => 
        bestsellers.filter(p => p.material === 'Silver'), 
        [bestsellers]
    );

    const silverCategories = useMemo(() => {
        const uniqueCategoryNames = [...new Set(silverProducts.map(p => p.category))];
        return sourceCategories.filter(c => uniqueCategoryNames.includes(c.name));
    }, [silverProducts]);

    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <LoadingLogo size={96} />
          <p className="mt-4 text-muted-foreground">Loading Silver Collection...</p>
        </div>
      );
    }

  return (
    <div className="flex flex-col overflow-hidden">
      <motion.section 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-[50vh] md:h-[70vh] w-full">
            <Image
            src="https://picsum.photos/seed/silver-banner/1920/1080"
            alt="Model wearing silver jewelry"
            fill
            className="object-cover"
            priority
            data-ai-hint="silver jewelry model"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-beige pointer-events-none">
                <h1 className="font-headline text-4xl md:text-6xl" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                The Silver Collection
                </h1>
            </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold">Browse by Category</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Discover our exquisite silver jewelry.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
          {silverCategories.map((category) => (
            <Link href={`/silver/${encodeURIComponent(category.name)}`} key={category.name}>
              <Card className="group relative overflow-hidden rounded-lg border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      width={400}
                      height={400}
                      className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={category.imageHint}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-headline text-xl text-beige">{category.name}</h3>
                  </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <motion.section className="w-full bg-secondary/50 py-16 md:py-24" data-ai-hint="bestsellers carousel" {...sectionAnimation}>
            <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center font-headline text-3xl md:text-4xl mb-2">Our Silver Bestsellers</h2>
                <p className="text-center text-muted-foreground mb-8">Timeless silver pieces, handcrafted with love</p>
                
                {isLoading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : silverBestsellers && silverBestsellers.length > 0 ? (
                    <Carousel 
                    opts={{ align: 'start', loop: true }} 
                    plugins={[
                        Autoplay({
                        delay: 4000,
                        stopOnInteraction: true,
                        }),
                    ]}
                    className="w-full"
                    >
                    <CarouselContent className="-ml-4">
                        {silverBestsellers.map((product) => (
                        <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                            <ProductCard product={product} />
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
                        <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
                    </div>
                    </Carousel>
                ) : (
                     <p className="text-center text-muted-foreground">No bestseller products found.</p>
                )}
            </div>
            </div>
        </motion.section>
    </div>
  );
}