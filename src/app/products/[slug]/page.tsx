"use client";

import { useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { useProducts } from "@/components/product-provider";
// FIX: Removed deleted static bestsellers imports
import { ringSizes, ringSizeGuide, ringSizeGuideInches } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ImageZoom } from "@/components/image-zoom";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/components/wishlist-provider";
import { Heart, Plus, Minus, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LoadingLogo } from "@/components/loading-logo";


function Breadcrumbs({ product }: { product: Product }) {
  const categoryPath = product.material === 'Gold' ? `/gold/${encodeURIComponent(product.category)}` : `/category/${encodeURIComponent(product.category)}`;
  
  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-foreground">Home</Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      <Link href={categoryPath} className="hover:text-foreground">{product.category}</Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="text-foreground truncate">{product.name}</span>
    </nav>
  );
}

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const { addItem } = useCart();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
  
  const { products: allProducts, isLoading } = useProducts();

  // FIX: Look up product ONLY in the dynamic list
  const product = useMemo(() => {
    return allProducts.find((p) => p.slug === slug);
  }, [allProducts, slug]);

  const [activeImage, setActiveImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [customSize, setCustomSize] = useState('');
  
  useMemo(() => {
      if(product && product.images && product.images.length > 0) {
          setActiveImage(product.images[0]);
      }
  }, [product]);

  if (isLoading && !product) {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoadingLogo />
        </div>
    );
  }

  if (!product || !activeImage) {
    // If we have products loaded but still can't find this one, it doesn't exist.
    if (!isLoading) notFound();
    return null; // Don't render while loading
  }

  const inWishlist = isItemInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleAddToCart = () => {
    if (product.category === 'Rings') {
      const finalSize = size === 'Custom' ? customSize : size;
      if (!finalSize) {
        toast({
          variant: "destructive",
          title: "Please select a size",
          description: "You must select a ring size before adding to cart.",
        });
        return;
      }
      addItem(product, quantity, finalSize);
    } else {
      addItem(product, quantity);
    }
  };

  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 5);

  // FIX: Filter mostly by the 'isBestseller' flag we added earlier
  const bestsellers = allProducts
    .filter(p => p.material === product.material && p.isBestseller)
    .slice(0, 8);

  return (
    <motion.div 
      className="container mx-auto px-4 py-12 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumbs product={product} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6">
        
        <motion.div className="flex flex-col-reverse sm:flex-row gap-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex sm:flex-col gap-2 justify-center sm:justify-start">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "relative h-16 w-16 rounded-md overflow-hidden ring-2 ring-transparent transition shrink-0",
                    activeImage.url === image.url && "ring-primary"
                  )}
                  onClick={() => setActiveImage(image)}
                >
                  <Image
                    src={image.url}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    data-ai-hint={image.hint}
                  />
                </button>
              ))}
            </div>
            <div className="relative flex-1">
                <ImageZoom src={activeImage.url} alt={product.name} imageHint={activeImage.hint} />
            </div>
        </motion.div>

        <motion.div className="flex flex-col" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-headline text-4xl md:text-5xl">{product.name}</h1>
          <p className="text-2xl mt-2 mb-4">₹{product.price.toLocaleString()}</p>
          <Separator className="my-4 bg-black/10" />
          
          {product.tag && (
            <div className="flex items-center gap-2 text-sm text-green-700 font-semibold mb-6">
              <span className={cn("h-2 w-2 rounded-full", product.tag === 'READY TO SHIP' ? 'bg-green-700' : 'bg-green-700')}></span>
              {product.tag}
            </div>
          )}

          <p className="text-base text-foreground/80 mb-6">
            {product.description}
          </p>

          {product.category === 'Rings' && (
            <div className="space-y-4 my-6">
              <div className="flex items-center justify-between max-w-sm">
                <Label htmlFor="ring-size" className="font-semibold">Ring Size</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-sm text-muted-foreground hover:text-foreground underline">
                      Check Size Guide
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[90vw] md:max-w-[75vw] lg:max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl md:text-3xl">How to Measure your Ring Size?</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-8 py-4">
                        <div className="space-y-6 flex flex-col items-center justify-center">
                           <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="4"/>
                                <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="4" strokeDasharray="4 4"/>
                                <line x1="10" y1="50" x2="90" y2="50" stroke="black" strokeWidth="2"/>
                                <text x="50" y="48" textAnchor="middle" alignmentBaseline="middle" fill="black" fontSize="12" fontWeight="bold">DIA</text>
                            </svg>
                            <div>
                                <p className="text-muted-foreground text-center">Wrap a strip of paper around your finger where you'd like your ring to be and mark a spot on paper where it overlaps. Measure the distance with a ruler (mm).</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="font-semibold">If you're using an existing ring to measure:</p>
                            <ol className="list-decimal list-inside text-muted-foreground space-y-1 mt-2">
                                <li>Select an existing ring that fits the desired finger.</li>
                                <li>Measure the internal diameter of the ring.</li>
                                <li>Use the below chart to determine your ring size.</li>
                            </ol>
                        </div>
                    </div>
                    <Tabs defaultValue="mm" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="mm">Measurements in MM</TabsTrigger>
                        <TabsTrigger value="in">Measurements in IN</TabsTrigger>
                      </TabsList>
                      <TabsContent value="mm">
                        <div className="max-h-64 overflow-y-auto">
                          <Table>
                            <TableHeader className="sticky top-0 bg-background">
                              <TableRow>
                                <TableHead className="font-bold text-xs">Inside diameter (mm)</TableHead>
                                <TableHead className="font-bold text-xs">Inside circumference (mm)</TableHead>
                                <TableHead className="font-bold text-xs">United States, Canada and Mexico</TableHead>
                                <TableHead className="font-bold text-xs">United Kingdom, Ireland, Australia, South Africa and New Zealand</TableHead>
                                <TableHead className="font-bold text-xs">East Asia (China, Japan, South Korea), South America</TableHead>
                                <TableHead className="font-bold text-xs">India</TableHead>
                                <TableHead className="font-bold text-xs">Italy, Spain, Switzerland</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {ringSizeGuide.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>{row.insideDiameterMm}</TableCell>
                                  <TableCell>{row.insideCircumferenceMm}</TableCell>
                                  <TableCell>{row.usCanadaMexico}</TableCell>
                                  <TableCell>{row.ukAustralia}</TableCell>
                                  <TableCell>{row.eastAsia}</TableCell>
                                  <TableCell>{row.india}</TableCell>
                                  <TableCell>{row.italySpainSwitzerland}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                      <TabsContent value="in">
                         <div className="max-h-64 overflow-y-auto">
                          <Table>
                            <TableHeader className="sticky top-0 bg-background">
                               <TableRow>
                                <TableHead className="font-bold text-xs">Inside diameter (in)</TableHead>
                                <TableHead className="font-bold text-xs">Inside circumference (in)</TableHead>
                                <TableHead className="font-bold text-xs">United States, Canada and Mexico</TableHead>
                                <TableHead className="font-bold text-xs">Sizes Comparisons United Kingdom, Ireland, Australia, South Africa and New Zealand</TableHead>
                                <TableHead className="font-bold text-xs">East Asia (China, Japan, South Korea), South America</TableHead>
                                <TableHead className="font-bold text-xs">India</TableHead>
                                <TableHead className="font-bold text-xs">Italy, Spain, Switzerland</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {ringSizeGuideInches.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>{row.insideDiameterIn}</TableCell>
                                  <TableCell>{row.insideCircumferenceIn}</TableCell>
                                  <TableCell>{row.usCanadaMexico}</TableCell>
                                  <TableCell>{row.ukAustralia}</TableCell>
                                  <TableCell>{row.eastAsia}</TableCell>
                                  <TableCell>{row.india}</TableCell>
                                  <TableCell>{row.italySpainSwitzerland}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="ring-size" className="max-w-sm">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {ringSizes.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {size === 'Custom' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 overflow-hidden"
                >
                  <Label htmlFor="custom-ring-size">Enter custom size</Label>
                  <Input 
                    id="custom-ring-size" 
                    placeholder="e.g. 5 1/8"
                    className="max-w-sm"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                  />
                </motion.div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-4 mb-4">
            <p className="font-semibold">Quantity:</p>
            <div className="flex items-center gap-2 border rounded-md">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 max-w-sm">
             <Button onClick={handleAddToCart} size="lg" className="flex-grow">
                Add to Cart
             </Button>
             <Button variant="outline" onClick={handleWishlistClick} size="icon" className="px-4 h-12 w-12 flex-shrink-0">
                <Heart className={cn("h-6 w-6", inWishlist && "fill-destructive text-destructive")} />
                <span className="sr-only">Add to wishlist</span>
             </Button>
          </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-foreground underline mt-4 text-left w-fit">
                  Shipping &amp; returns
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Shipping &amp; Returns</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <h3 className="font-semibold mb-1">Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      You’ll find all delivery options and pricing at checkout. Every order is dispatched with a tracking number so you can follow its journey to you.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Returns</h3>
                    <p className="text-sm text-muted-foreground">
                      If something arrives damaged or isn’t what you expected, I’m here to help. Returns are accepted, and refunds are processed back to your original payment method. Just send me an email with photos and a brief description of the issue to start the return process.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-none">
                      <li>Email: <a href="mailto:anilsoni7104@gmail.com" className="underline">anilsoni7104@gmail.com</a></li>
                      <li>Phone: +91 9928070606 (Mon–Sat, Indian business hours; I usually reply within 1–2 hours.)</li>
                      <li>Instagram: <a href="https://www.instagram.com/khushigemsjaipur" target="_blank" rel="noopener noreferrer" className="underline">@khushigemsjaipur</a></li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
        </motion.div>
      </div>

      <motion.div className="mt-24" {...sectionAnimation}>
        <h2 className="font-headline text-3xl text-center mb-8">You may also like</h2>
        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {similarProducts.map((p) => (
              <CarouselItem key={p.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                <ProductCard product={p} />
              </CarouselItem>
            ))}
          </CarouselContent>
           <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </motion.div>

      {/* Only show this section if we found dynamic bestsellers */}
      {bestsellers.length > 0 && (
          <motion.div className="mt-24" {...sectionAnimation}>
            <h2 className="font-headline text-3xl text-center mb-8">Bestsellers</h2>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {bestsellers.map((p) => (
                  <CarouselItem key={p.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                    <ProductCard product={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
      )}
    </motion.div>
  );
}