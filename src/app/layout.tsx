
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/components/cart-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { WishlistProvider } from '@/components/wishlist-provider';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ProductProvider } from '@/components/product-provider';

export const metadata: Metadata = {
  title: 'Khushi Gems and Jewellery',
  description: 'A curated collection of fine handmade jewelry from Jaipur.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <FirebaseClientProvider>
          <ProductProvider>
            <WishlistProvider>
              <CartProvider>
                <div className="flex min-h-screen flex-col">
                  <div className="bg-secondary text-secondary-foreground text-center py-2 text-sm">
                    Free shipping throughout india
                  </div>
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                <Toaster />
                <WhatsAppButton />
              </CartProvider>
            </WishlistProvider>
          </ProductProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
