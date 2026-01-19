
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
};

const itemAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const imageSlideLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const imageSlideRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};


export default function AboutPage() {
  const router = useRouter();

  const expertise = [
    { 
      title: "Kundan Meena & Jadau Jewellery",
      description: "preserving age-old techniques with unmatched detailing"
    },
    {
      title: "Polki & Diamond Jewellery",
      description: "where raw elegance meets refined luxury"
    },
    {
      title: "Open Setting & Fusion Jewellery",
      description: "a perfect blend of tradition and modern aesthetics"
    },
    {
      title: "Traditional Indian & Designer Jewellery",
      description: "crafted for celebrations, heirlooms, and timeless grace"
    },
    {
      title: "Silver Jewellery",
      description: "versatile designs rooted in classic craftsmanship. Each piece is thoughtfully handcrafted, ensuring exceptional quality, authenticity, and artistry in every detail."
    },
  ];

  const factoryImages = [
    { src: "https://i.ibb.co/v69hJkc2/imgi-156-dsc-0427.png", alt: "Jewellery manufacturing process", hint: "jewelry factory" },
    { src: "https://picsum.photos/seed/factory2/600/400", alt: "Artisan working on a jewelry piece", hint: "jewelry artisan" },
    { src: "https://picsum.photos/seed/factory3/600/400", alt: "Close-up of crafting tools", hint: "crafting tools" },
    { src: "https://picsum.photos/seed/factory4/600/400", alt: "Finished jewelry pieces", hint: "jewelry collection" },
  ]

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <motion.div 
        className="container mx-auto px-4 py-16 sm:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <motion.header className="text-center mx-auto mb-16 md:mb-24" {...itemAnimation}>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">
            Our Legacy, Your Heirlooms
          </h1>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            Khushi Gems & Jewels—where Jaipur's heritage is transformed into masterpieces, handcrafted with tradition, inspired by royalty, and cherished worldwide.
          </p>
        </motion.header>

        <motion.div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28" {...sectionAnimation}>
            <motion.div className="w-full aspect-video rounded-lg flex items-center justify-center" {...imageSlideLeft}>
               <Image
                  src="https://i.ibb.co/pjcWqTmw/imgi-155-jal-mahal-jaipur-tour.png"
                  alt="Video of handcrafting jewellery"
                  width={800}
                  height={450}
                  className="object-cover rounded-lg shadow-lg w-full h-full"
                  data-ai-hint="handcrafting jewellery"
                />
            </motion.div>
            <motion.div className="w-full" {...itemAnimation}>
               <div className="space-y-4">
                <h2 className="font-headline text-3xl text-foreground">Handcrafted with Passion</h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  We specialize in an exquisite range of handcrafted fine jewellery, meticulously designed and crafted by skilled artisans at our in-house factory and manufacturing unit in Jaipur.
                </p>
                 <p className="text-foreground font-semibold pt-4">Our expertise spans across:</p>
                 <div className="space-y-3">
                  {expertise.map((item, index) => (
                    <motion.div key={index} {...itemAnimation} transition={{delay: index * 0.1}}>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                 </div>
              </div>
            </motion.div>
        </motion.div>
        
        <motion.div className="bg-secondary/30 rounded-lg p-8 lg:p-12 my-20 md:my-28 text-center" {...sectionAnimation}>
            <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-8">Our Factory & Manufacturing</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {factoryImages.map((img, index) =>(
                    <motion.div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md" {...itemAnimation} transition={{delay: index * 0.1}}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            data-ai-hint={img.hint}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28" {...sectionAnimation}>
            <motion.div className="w-full order-last md:order-first" {...itemAnimation}>
               <div className="space-y-4">
                <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-4">From Jaipur to the World</h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    Our craftsmanship has earned recognition far beyond Jaipur. <strong className="text-foreground">We actively participate in prestigious exhibitions across India, including Mumbai, Delhi, Ludhiana, Chandigarh, Hyderabad, Bangalore, Indore, Ahmedabad, and of course, Jaipur.</strong>
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                    <strong className="text-foreground">Internationally, we have successfully showcased our collections in the UAE</strong>, receiving outstanding customer appreciation and trust. Additionally, we are proud wholesalers of gold and silver jewellery, <strong className="text-foreground">supplying to reputed international brands in the United States</strong>, who retail our creations globally.
                </p>
              </div>
            </motion.div>
             <motion.div className="w-full aspect-video rounded-lg flex items-center justify-center order-first md:order-last" {...imageSlideRight}>
               <Image
                  src="https://picsum.photos/seed/world/800/450"
                  alt="Global map showing shipping routes"
                  width={800}
                  height={450}
                  className="object-cover rounded-lg shadow-lg w-full h-full"
                  data-ai-hint="world map"
                />
            </motion.div>
        </motion.div>

        <motion.div className="max-w-4xl mx-auto text-center space-y-8 my-20 md:my-28" {...sectionAnimation}>
            <motion.div {...itemAnimation}>
                <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-4">Our Promise</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                   At Khushi Gems & Jewels, we believe jewellery is more than adornment—it is a story, a legacy, and an emotion. With <strong className="text-foreground">complete control over design and manufacturing, we ensure uncompromised quality, ethical craftsmanship, and timeless designs</strong> that resonate across generations.
                </p>
            </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}
