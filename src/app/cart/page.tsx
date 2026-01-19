
"use client";

import { useCart } from "@/components/cart-provider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeItem, increaseQuantity, decreaseQuantity, cartTotal } = useCart();
  
  const gst = cartTotal * 0.03;
  const totalWithGst = cartTotal + gst;

  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Shopping Cart</h1>
      </header>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <div className="flex flex-col">
                    {cart.map(item => (
                        <div key={`${item.id}-${item.size || ''}`}>
                            <div className="flex gap-6 py-6 items-center">
                                <div className="relative h-32 w-32 rounded-md overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={`${item.imageHint}`}
                                    />
                                </div>
                                <div className="flex flex-col flex-grow gap-1">
                                    <p className="font-bold text-lg">{item.name}</p>
                                    {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                                    <p className="text-muted-foreground">{item.category}</p>
                                    <p className="font-bold text-lg mt-2">
                                        ₹{item.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-4">
                                     <div className="flex items-center gap-2">
                                        <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => decreaseQuantity(item.id, item.size)}
                                        >
                                        <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                                        <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => increaseQuantity(item.id, item.size)}
                                        >
                                        <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground hover:text-destructive hover:bg-transparent"
                                        onClick={() => removeItem(item.id, item.size)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            <Separator className="bg-black/10"/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-1">
                 <div className="sticky top-24 border border-black/10 rounded-lg p-6">
                    <h2 className="font-headline text-2xl mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>₹{cartTotal.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>GST (3%)</p>
                            <p>₹{gst.toLocaleString()}</p>
                        </div>
                        <Separator className="bg-black/10" />
                        <div className="flex justify-between font-bold text-xl">
                            <p>Total</p>
                            <p>₹{totalWithGst.toLocaleString()}</p>
                        </div>
                    </div>
                     <Button asChild size="lg" className="w-full mt-6">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                 </div>
            </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
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
