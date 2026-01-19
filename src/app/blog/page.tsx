
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { blogPosts } from "@/lib/data";
import { motion } from "framer-motion";

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


export default function BlogPage() {
    const router = useRouter();

    return (
        <motion.div 
            className="container mx-auto px-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.header className="text-center mb-12" {...itemAnimation}>
                <h1 className="font-headline text-5xl font-bold">Gupshup</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-lg mx-auto">Welcome to Gupshup. A collection of musings, discoveries & realisations. Here are some articles you may enjoy.</p>
            </motion.header>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12" {...sectionAnimation}>
                {blogPosts.map((post, index) => (
                    <motion.div key={post.id} {...itemAnimation} transition={{ ...itemAnimation.transition, delay: index * 0.1 }}>
                        <Link href={post.slug} className="group flex flex-col gap-4">
                            <div className="overflow-hidden rounded-lg">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    width={600}
                                    height={800}
                                    className="object-cover w-full aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
                                    data-ai-hint={post.imageHint}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <h2 className="font-headline text-2xl font-semibold group-hover:underline">{post.title}</h2>
                                <p className="text-foreground/80 leading-relaxed mt-1">{post.excerpt}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
