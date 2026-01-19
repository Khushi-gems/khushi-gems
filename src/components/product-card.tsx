
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { useCart } from "./cart-provider";
import { Plus, Heart } from "lucide-react";
import { useWishlist } from "./wishlist-provider";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
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

  return (
    <Card className="group w-full overflow-hidden border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/products/${product.slug}`}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.imageHint}
              />
            </div>
          </Link>
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
             <Button 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleWishlistClick}
              aria-label={`Add ${product.name} to wishlist`}
              variant="secondary"
            >
              <Heart className={cn("h-4 w-4", inWishlist ? "fill-destructive text-destructive" : "text-foreground")} />
            </Button>
            <Button 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => addItem(product)}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="h-4 w-4"/>
            </Button>
          </div>
           <div className="absolute top-2 right-2">
            {product.tag && (
              <div className="rounded-full bg-background/80 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
                {product.tag}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 text-left">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-base truncate">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">₹{product.price.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
