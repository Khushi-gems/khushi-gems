"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ImageMarquee } from '@/components/image-marquee';
import { heroSlides, silverCategories, collections, silverInstagramPosts } from '@/lib/data';
import { Instagram, Loader2 } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay"
import { Marquee } from '@/components/marquee';
import { ExhibitionCarousel } from '@/components/exhibition-carousel';
import ReviewsSection from "@/components/reviews-section"; 
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useProducts } from '@/components/product-provider';
import { LoadingLogo } from '@/components/loading-logo';


const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }
};

const itemAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const titleContainerAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const characterAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

export default function Home() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { bestsellers, isLoading: isProductsLoading } = useProducts();

  const displayedBestsellers = useMemo(() => 
    bestsellers.filter(p => p.material === 'Silver'), 
    [bestsellers]
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  if (isProductsLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <LoadingLogo size={96} />
          <p className="mt-4 text-muted-foreground">Loading Collection...</p>
        </div>
      );
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24 overflow-hidden">
      <motion.section 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Carousel
          setApi={setCarouselApi}
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
          data-ai-hint="hero slider"
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[60vh] md:h-[85vh] w-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    data-ai-hint={slide.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute inset-0 flex items-center justify-center text-center text-beige pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentSlide}
                variants={titleContainerAnimation}
                initial="initial"
                animate="animate"
                exit="initial"
                className="font-headline text-4xl md:text-6xl flex overflow-hidden py-4"
                style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}
              >
                {heroSlides[currentSlide]?.title.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    variants={characterAnimation}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-10 right-10 hidden md:flex gap-2">
            <CarouselPrevious className="static translate-y-0 text-white bg-black/20 border-white/50 hover:bg-black/50" />
            <CarouselNext className="static translate-y-0 text-white bg-black/20 border-white/50 hover:bg-black/50" />
          </div>
        </Carousel>
      </motion.section>

      <motion.section className="container mx-auto px-4" data-ai-hint="shop by category" {...sectionAnimation}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-headline text-3xl md:text-4xl mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {silverCategories.map((category) => (
              <Link href={`/category/${encodeURIComponent(category.name)}`} key={category.name}>
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
                    <h3 className="absolute bottom-4 left-4 font-headline text-lg text-beige">{category.name}</h3>
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
            <h2 className="text-center font-headline text-3xl md:text-4xl mb-2">Our Bestsellers</h2>
            <p className="text-center text-muted-foreground mb-8">Timeless pieces, handcrafted with love</p>
            
            {isProductsLoading ? (
               <div className="flex justify-center items-center h-48">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
            ) : displayedBestsellers && displayedBestsellers.length > 0 ? (
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
                    {displayedBestsellers.slice(0, 8).map((product) => (
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
      
       <motion.section className="container mx-auto px-4" data-ai-hint="introduction section" {...sectionAnimation}>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div className="w-full md:w-1/2 lg:w-1/3 overflow-hidden rounded-lg group" {...itemAnimation}>
            <Image
              src="https://i.ibb.co/xPFRtDC/imgi-8-AG0il-Szzl-Il40-s-Vwin-ZVT8-T3h0v-Un8dpsf-Ir-Fnn-Qs-Nh-FUQ9d9q-C5x-ZK-bwv-Nj46gy-WVzvx-AA87g-G.png"
              alt="Hawa Mahal in Jaipur"
              width={600}
              height={800}
              className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="Hawa Mahal"
            />
          </motion.div>
          <motion.div className="w-full md:w-1/2 lg:w-2/3 text-left" {...itemAnimation}>
            <h2 className="font-headline text-3xl md:text-4xl mb-4">About Us</h2>
            <p className="font-bold text-lg mb-4">Khushi Gems & Jewels – A Legacy of Jaipur's Timeless Craftsmanship</p>
            <div className="space-y-4 text-base text-foreground/80">
              <p>Rooted in the heart of the Old Pink City, Khushi Gems & Jewels stands as a proud custodian of Jaipur's rich jewellery heritage. With over <b>25 years of excellence</b>, our journey began in Johari Bazar, near the iconic Hawa Mahal, where <b>artistry, culture, and craftsmanship</b> come together to create jewellery that transcends time.</p>
              <p>Every creation at Khushi Gems & Jewels reflects the soul of Rajasthan—its regal history, intricate architecture, vibrant colours, and royal traditions. <b>Inspired by the grandeur of Rajasthani culture and the timeless beauty of Jaipur</b>, our designs celebrate heritage while embracing contemporary elegance.</p>
              <Button variant="link" asChild className="p-0 text-base font-bold text-black">
                <Link href="/about">Read Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-2 bg-black text-beige my-0" data-ai-hint="dynamic banner" {...sectionAnimation}>
        <Marquee baseVelocity={-2}>
             <span className="font-headline text-2xl mx-4">Khushi Gems and Jewellery</span>
             <span className="font-headline text-2xl mx-4">Handcrafted Bridal jewellery</span>
             <span className="font-headline text-2xl mx-4">Jaipur-Based Artisan</span>
        </Marquee>
      </motion.section>
      
      <motion.section id="exhibitions" className="w-full bg-secondary/50 py-16 md:py-24" data-ai-hint="exhibitions and collections" {...sectionAnimation}>
          <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                  <h2 className="text-center font-headline text-3xl md:text-4xl mb-8">Exhibitions</h2>
                  <ExhibitionCarousel collections={collections} />
                   <div className="text-center mt-12">
                      <Button variant="outline" className="border-black bg-transparent hover:bg-black hover:text-beige" asChild>
                          <Link href="/collections">View All Collections</Link>
                      </Button>
                  </div>
              </div>
          </div>
      </motion.section>
      
      <ReviewsSection />
      
      <motion.section className="bg-secondary/50 py-16 md:py-24" data-ai-hint="instagram feed" {...sectionAnimation}>
  <div className="container mx-auto px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-headline text-3xl md:text-4xl mb-2">Follow us on Instagram</h2>
        <p className="text-muted-foreground">@khushigemsandjewellery</p>
      </div>
      <ImageMarquee baseVelocity={-2}>
          {/* USE silverInstagramPosts HERE */}
          {silverInstagramPosts.map((post) => (
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