
"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { collections } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/components/product-provider";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { LoadingLogo } from "@/components/loading-logo";

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

export default function CollectionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { products: allProducts, isLoading } = useProducts();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const collection = collections.find(c => c.slug === slug);

    const relatedProducts = useMemo(() => {
        if (!collection) return [];
        return allProducts.filter(p => p.category?.toLowerCase().includes(collection.title.slice(0,4).toLowerCase())).slice(0,4);
    }, [allProducts, collection]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingLogo />
            </div>
        );
    }

    if (!collection) {
        notFound();
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative mb-8">
                 <Button 
                    variant="ghost" 
                    onClick={() => router.push('/collections')}
                    className="absolute -top-8 hover:bg-transparent px-0 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Exhibitions
                </Button>
            </div>

            <motion.div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28" {...sectionAnimation}>
                <motion.div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg" {...itemAnimation}>
                   <Image
                      src={collection.imageUrl}
                      alt={collection.title}
                      fill
                      className="object-cover"
                      data-ai-hint={collection.imageHint}
                      priority
                    />
                </motion.div>
                <motion.div className="w-full" {...itemAnimation}>
                   <div className="space-y-4">
                    <h1 className="font-headline text-5xl md:text-6xl font-bold">{collection.title}</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {collection.description}
                    </p>
                    <p className="text-foreground pt-4">
                        A curated selection of pieces that embody the spirit of the <span className="font-bold">{collection.title}</span> collection.
                    </p>
                  </div>
                </motion.div>
            </motion.div>

            {relatedProducts.length > 0 && (
                 <motion.div className="max-w-5xl mx-auto mt-24 border-t border-black/10 pt-16" {...sectionAnimation}>
                    <h2 className="text-3xl font-bold font-headline mb-8 text-center">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {relatedProducts.map((product, index) => (
                            <motion.div key={product.id} {...itemAnimation} transition={{delay: index * 0.1}}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
