
"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const itemAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const post = blogPosts.find(p => p.slug === `/blog/${slug}`);

    if (!post) {
        notFound();
    }

    const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

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
                    onClick={() => router.push('/blog')}
                    className="absolute -top-8 hover:bg-transparent px-0 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Button>
            </div>
            <article className="max-w-3xl mx-auto">
                <motion.header className="mb-12 text-center" {...itemAnimation}>
                    <p className="text-muted-foreground text-sm mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h1 className="font-headline text-5xl md:text-6xl font-bold mb-4">{post.title}</h1>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg mt-8">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            data-ai-hint={post.imageHint}
                            priority
                        />
                    </div>
                </motion.header>

                <motion.div 
                    className="prose prose-lg max-w-none text-foreground/90 mx-auto leading-relaxed space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {post.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </motion.div>
            </article>

             <motion.div className="max-w-5xl mx-auto mt-24 border-t border-black/10 pt-16" {...itemAnimation}>
                <h2 className="text-3xl font-bold font-headline mb-8 text-center">Continue Reading</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {otherPosts.map((p, index) => (
                         <motion.div key={p.id} {...itemAnimation} transition={{delay: index * 0.1}}>
                             <Link href={p.slug} className="group flex flex-col gap-4">
                                <div className="overflow-hidden rounded-lg">
                                    <Image
                                        src={p.imageUrl}
                                        alt={p.title}
                                        width={600}
                                        height={400}
                                        className="object-cover w-full aspect-video transition-transform duration-500 group-hover:scale-105"
                                        data-ai-hint={p.imageHint}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <h3 className="font-headline text-xl font-semibold group-hover:underline">{p.title}</h3>
                                </div>
                            </Link>
                         </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
