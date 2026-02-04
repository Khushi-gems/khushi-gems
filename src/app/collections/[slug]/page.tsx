"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { collections } from "@/lib/data";
import { ArrowLeft, ArrowDownRight, Globe, Sparkles, ImageIcon } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/components/product-provider";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMemo, useRef } from "react";
import { LoadingLogo } from "@/components/loading-logo";

// Helper to check for video files
const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url);

const Marquee = ({ text }: { text: string }) => {
  return (
    <div className="relative flex overflow-hidden py-6 bg-foreground text-background border-y border-border">
      <div className="animate-marquee whitespace-nowrap flex gap-8">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl font-headline font-bold uppercase tracking-wider mx-4">
            {text} <span className="text-muted-foreground/40 mx-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// NEW: Editorial Gallery Section
const GallerySection = ({ images }: { images: string[] }) => {
    // Fallback if no images provided
    if (!images || images.length === 0) return null;

    // Helper component to render Media (Video or Image)
    const MediaItem = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
        if (isVideo(src)) {
            return (
                <video
                    src={src}
                    className={className}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            );
        }
        return (
            <Image 
                src={src} 
                alt={alt} 
                fill 
                className={className} 
            />
        );
    };

    return (
        <section className="py-24 px-4 md:px-12 max-w-[1800px] mx-auto bg-background">
            <div className="flex items-end justify-between mb-12 ">
                 <h3 className="text-3xl font-headline font-bold ">Visual Narrative</h3>
                 <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">[ 01 — 0{images.length} ]</span>
            </div>
            
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 h-auto md:h-[800px]">
                
                {/* Main Feature Image (Left) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-6 md:row-span-2 relative h-[400px] md:h-full rounded-sm overflow-hidden group"
                >
                    <MediaItem 
                        src={images[0]} 
                        alt="Gallery 1" 
                        className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full absolute inset-0"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-xs font-mono">FIG. 01</div>
                </motion.div>

                {/* Top Right Landscape */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="md:col-span-6 md:row-span-1 relative h-[300px] md:h-full rounded-sm overflow-hidden group"
                >
                    <MediaItem 
                        src={images[1] || images[0]} 
                        alt="Gallery 2" 
                        className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full absolute inset-0"
                    />
                     <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-xs font-mono">FIG. 02</div>
                </motion.div>

                {/* Bottom Right Vertical (Split) */}
                <div className="md:col-span-6 md:row-span-1 grid grid-cols-2 gap-4 md:gap-8">
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative h-[250px] md:h-full rounded-sm overflow-hidden group"
                    >
                         <MediaItem 
                            src={images[2] || images[0]} 
                            alt="Gallery 3" 
                            className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full absolute inset-0"
                        />
                         <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-xs font-mono">FIG. 03</div>
                    </motion.div>
                    
                    {/* Text/Quote Block instead of 4th image (Optional) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-zinc-100 dark:bg-zinc-900 p-6 flex flex-col justify-center items-center text-center rounded-sm"
                    >
                        <ImageIcon className="w-8 h-8 mb-4 text-muted-foreground opacity-50 " />
                        <p className="font-serif italic text-muted-foreground text-sm ">
                            "A closer look at the textures and forms that define this series."
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// --- Main Page Component ---

export default function CollectionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { products: allProducts, isLoading } = useProducts();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const collection = collections.find(c => c.slug === slug);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: containerRef });

    const relatedProducts = useMemo(() => {
        if (!collection) return [];
        return allProducts.filter(p => p.category?.toLowerCase().includes(collection.title.slice(0,4).toLowerCase())).slice(0,4);
    }, [allProducts, collection]);

    // MOCK DATA: In a real app, you would fetch `collection.gallery`
    // If your collection object doesn't have a gallery array, this creates a fallback using the main image
    // so you can see the UI immediately.
    const galleryImages = (collection as any)?.gallery || [
        collection?.imageUrl, 
        collection?.imageUrl, // In real app, these should be different URLs
        collection?.imageUrl
    ];

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 justify-center items-center h-screen bg-zinc-950 text-zinc-50">
                <LoadingLogo size={80} />
            </div>
        );
    }

    if (!collection) notFound();

    return (
        <div ref={containerRef} className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
            
            {/* Film Grain Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
            {/* Hero Section */}
            <section className="relative h-[90vh] w-full flex flex-col justify-end pb-20 px-4 md:px-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div 
                        initial={{ scale: 1.1, filter: "brightness(0.5)" }}
                        animate={{ scale: 1, filter: "brightness(1)" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative h-full w-full"
                    >
                        {isVideo(collection.imageUrl) ? (
                            <video
                                src={collection.imageUrl}
                                className="object-cover w-full h-full"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <Image
                                src={collection.imageUrl}
                                alt={collection.title}
                                fill
                                className="object-cover"
                                priority
                                data-ai-hint={collection.imageHint}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                </div>

                <div className="relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                        className="border-l-2 border-white/30 pl-6 md:pl-12 mb-8"
                    >
                         <p className="text-white/80 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <Sparkles className="w-3 h-3" />
                            Exhibition 01
                        </p>
                        <h1 className="text-7xl md:text-9xl font-headline font-black text-white tracking-tighter leading-[0.85] uppercase">
                            {collection.title}
                        </h1>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col md:flex-row justify-between items-end gap-6 pl-6 md:pl-12"
                    >
                        <p className="text-white/70 max-w-md text-lg font-light leading-relaxed backdrop-blur-sm">
                            {collection.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* NEW: Gallery Section */}
            <GallerySection images={collection.gallery || []} />

            {/* Marquee Separator */}
            <Marquee text={collection.title} />

            {/* QUOTE SECTION ADDED HERE */}
            {(collection as any).quote && (
                <section className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900 flex justify-center items-center">
                    <motion.blockquote
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl text-center"
                    >
                        <p className="font-serif text-3xl md:text-5xl italic leading-tight text-foreground/80">
                            {(collection as any).quote}
                        </p>

                    </motion.blockquote>
                </section>
            )}
        </div>
    );
}