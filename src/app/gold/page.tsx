"use client";

import Link from "next/link";
import Image from "next/image";
import { goldCategories, goldBannerSlides, instagramPosts } from "@/lib/data";
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
import { useProducts } from "@/components/product-provider";
import { LoadingLogo } from "@/components/loading-logo";
import { ImageMarquee } from "@/components/image-marquee";
import { Button } from "@/components/ui/button";
import { Instagram, Loader2 } from "lucide-react";
import { useMemo } from "react";

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }
};

export default function GoldPage() {
  const { bestsellers, isLoading } = useProducts();

  // Filter gold bestsellers
  const goldBestsellers = useMemo(() => 
    bestsellers.filter(p => p.material === 'Gold'), 
    [bestsellers]
  );

  if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <LoadingLogo size={96} />
          <p className="mt-4 text-muted-foreground">Loading Gold Collection...</p>
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
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {goldBannerSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[50vh] md:h-[70vh] w-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    data-ai-hint={slide.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center text-center text-beige pointer-events-none">
                     
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex text-white bg-black/20 border-white/50 hover:bg-black/50" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex text-white bg-black/20 border-white/50 hover:bg-black/50" />
        </Carousel>
      </motion.section>

      <motion.section className="container mx-auto px-4 py-12 md:py-16" {...sectionAnimation}>
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl mb-2">Browse by Category</h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Discover our exquisite gold jewelry.
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {goldCategories.map((category) => (
              <Link href={`/gold/${encodeURIComponent(category.name)}`} key={category.name}>
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
      </motion.section>

      <motion.section className="w-full bg-secondary/50 py-16 md:py-24" data-ai-hint="bestsellers carousel" {...sectionAnimation}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center font-headline text-3xl md:text-4xl mb-2">Our Gold Bestsellers</h2>
            <p className="text-center text-muted-foreground mb-8">Timeless gold pieces, handcrafted with love</p>
            
            {isLoading ? (
               <div className="flex justify-center items-center h-48">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
            ) : goldBestsellers && goldBestsellers.length > 0 ? (
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
                    {goldBestsellers.map((product) => (
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

      <motion.section className="bg-secondary/50 py-16 md:py-24" data-ai-hint="instagram feed" {...sectionAnimation}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-headline text-3xl md:text-4xl mb-2">Follow us on Instagram</h2>
              <p className="text-muted-foreground">@khushigemsandjewellery</p>
            </div>
            <ImageMarquee baseVelocity={-2}>
                {instagramPosts.map((post) => (
                   <Link href={post.slug} key={post.id} target="_blank" rel="noopener noreferrer">
                    <div className="relative aspect-square w-48 md:w-72 overflow-hidden rounded-lg group mx-4">
                      <Image
                        src={post.imageUrl}
                        alt="Instagram post"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={post.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Instagram className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
            </ImageMarquee>
             <div className="text-center mt-8">
               <Button asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-5 w-5" /> Follow Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}