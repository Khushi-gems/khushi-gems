
"use client";

import { useWishlist } from "@/components/wishlist-provider";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { LoadingLogo } from "@/components/loading-logo";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, removeFromWishlist, isLoading } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    removeFromWishlist(product.id);
  }

  if (isLoading) {
    return (
      <motion.div
        className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingLogo size={96} className="text-muted-foreground" />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="hover:bg-transparent px-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your collection of saved treasures.
        </p>
      </header>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div key={product.id} className="flex flex-col gap-2">
              <ProductCard product={product} />
              <Button onClick={() => handleAddToCart(product)} >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
            <p className="text-lg">Your wishlist is empty.</p>
            <p className="text-muted-foreground mt-2">
                Find something beautiful to add.
            </p>
            <Button asChild className="mt-4">
                <Link href="/">Start Shopping</Link>
            </Button>
        </div>
      )}
    </motion.div>
  );
}
