
"use client";

import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import type { Order, OrderItem } from '@/lib/types';
import { motion } from "framer-motion";
import { LoadingLogo } from '@/components/loading-logo';

function OrderDetailsContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const isNewOrder = searchParams.get('new') === 'true';
  const { user } = useUser();
  const firestore = useFirestore();

  const orderDocRef = useMemoFirebase(() => {
    if (!firestore || !user || !orderId) return null;
    return doc(firestore, 'users', user.uid, 'orders', orderId);
  }, [firestore, user, orderId]);

  const { data: order, isLoading: isOrderLoading } = useDoc<Order>(orderDocRef);

  const orderItemsQuery = useMemoFirebase(() => {
    if (!orderDocRef) return null;
    return collection(orderDocRef, 'orderItems');
  }, [orderDocRef]);

  const { data: orderItems, isLoading: areItemsLoading } = useCollection<OrderItem>(orderItemsQuery);

  const isLoading = isOrderLoading || areItemsLoading;

  if (isLoading) {
    return (
       <div className="flex justify-center items-center h-64">
          <LoadingLogo size={96} />
       </div>
    )
  }

  if (!order) {
    return (
        <div className="text-center">
            <p className="font-bold text-destructive">Order not found.</p>
            <p className="text-muted-foreground mt-2">Could not retrieve order details. Please check your account for order history.</p>
            <Button asChild className="mt-4">
                <Link href="/account">Go to My Account</Link>
            </Button>
        </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          {isNewOrder && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4"
              >
              <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
          )}
          <CardTitle className="font-headline text-3xl">
              {isNewOrder ? "Thank You for Your Order!" : "Order Details"}
          </CardTitle>
          {isNewOrder && <p className="text-muted-foreground pt-2">Your order has been placed successfully.</p>}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-secondary/50 p-4 rounded-md">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-bold text-lg">{order.id.substring(0, 7).toUpperCase()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-semibold">{new Date(order.orderDate.seconds * 1000).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-semibold">{order.paymentMethod.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold">{order.status || order.orderStatus}</p>
            </div>
          </div>
          <Separator />
          
          <div className="space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              {orderItems && orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                          <div className="relative h-14 w-14 rounded-md overflow-hidden">
                          <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              data-ai-hint={`${item.name}`}
                          />
                          </div>
                          <div>
                              <p className="font-bold">{item.name} <span className="font-normal text-muted-foreground">× {item.quantity}</span></p>
                              {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                          </div>
                      </div>
                      <p>₹{(item.itemPrice * item.quantity).toLocaleString()}</p>
                  </div>
              ))}
              <Separator />
              <div className="space-y-1 text-sm">
                   <div className="flex justify-between font-bold">
                      <p>Total:</p>
                      <p>₹{order.totalAmount.toLocaleString()}</p>
                  </div>
              </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Billing Address</h3>
              <address className="not-italic text-muted-foreground">
                  {order.billingAddress.split(',').map((line, i) => <p key={i}>{line.trim()}</p>)}
              </address>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
               <address className="not-italic text-muted-foreground">
                  {order.shippingAddress.split(',').map((line, i) => <p key={i}>{line.trim()}</p>)}
              </address>
            </div>
          </div>

          <Separator />
          
          <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                  You will receive an email confirmation shortly. You can view your order details in your account.
              </p>
              <div className="flex gap-4 justify-center">
                  <Button asChild>
                      <Link href="/">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" asChild>
                      <Link href="/account">View My Account</Link>
                  </Button>
              </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function OrderDetailsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><LoadingLogo size={96} /></div>}>
            <OrderDetailsContent />
        </Suspense>
      </div>
    </div>
  );
}
