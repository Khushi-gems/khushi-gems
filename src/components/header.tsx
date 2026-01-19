"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, User, ShoppingBag, Heart } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  VisuallyHidden,
  SheetTrigger,
} from "@/components/ui/sheet";
import { silverCategories, goldCategories } from "@/lib/data";
import { Category } from "@/lib/types";
import { useCart } from "./cart-provider";
import { CartDrawer } from "./cart-drawer";
import { useWishlist } from "./wishlist-provider";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const isGoldPage = pathname.startsWith('/gold');

  // Logic to select the correct categories based on the current URL
  const currentCategories = isGoldPage ? goldCategories : silverCategories;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/' + id);
    } else {
      const element = document.getElementById(id.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
     setMobileMenuOpen(false);
  };

  // Button Logic: 
  // If on Gold Page -> Show "Silver Jewellery" button (Silver styling)
  // If on Silver Page -> Show "Gold Jewellery" button (Gold styling)
  const toggleButtonText = isGoldPage ? "Silver Jewellery" : "Gold Jewellery";
  const toggleButtonLink = isGoldPage ? "/" : "/gold";
  const toggleButtonStyles = isGoldPage
    ? "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-900 hover:from-slate-300 hover:to-slate-500" // Removed ring-slate-400
    : "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-yellow-900 hover:from-yellow-300 hover:to-yellow-500"; // Removed ring-yellow-400

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary-foreground/20 bg-primary text-primary-foreground backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] p-0 flex flex-col">
               <SheetHeader className="p-4 border-b border-black/10">
                 <VisuallyHidden>
                    <SheetTitle>Menu</SheetTitle>
                 </VisuallyHidden>
                 <Logo />
               </SheetHeader>
               <ScrollArea className="flex-grow">
                 <nav className="p-4 flex flex-col gap-4">
                  <p className="font-bold">Shop</p>
                  {currentCategories.map((category: Category) => (
                     <Link 
                       key={category.name} 
                       href={isGoldPage ? `/gold/${encodeURIComponent(category.name)}` : `/category/${encodeURIComponent(category.name)}`}
                       className="text-muted-foreground hover:text-foreground" 
                       onClick={() => setMobileMenuOpen(false)}
                     >
                       {category.name}
                     </Link>
                  ))}
                   <Link href="/collections" className="font-bold text-sm mt-4" onClick={() => setMobileMenuOpen(false)}>EXHIBITIONS</Link>
                   <Link href="/about" className="font-bold text-sm">ABOUT US</Link>
                   <Link href="/#reviews-anchor" onClick={(e) => handleScroll(e, '#reviews-anchor')} className="font-bold text-sm">REVIEWS</Link>
                   <Link href="/location" className="font-bold text-sm">LOCATION</Link>

                   <div className="border-t border-black/10 mt-4 pt-4 flex flex-col gap-4">
                      <Link href="/wishlist" className="font-bold text-sm flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        <Heart className="h-5 w-5" /> Wishlist
                      </Link>
                      <Link href="/account" className="font-bold text-sm flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        <User className="h-5 w-5" /> My Account
                      </Link>
                   </div>
                 </nav>
               </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="hidden lg:flex lg:items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* Updated Trigger: transparent background to avoid black box */}
                <NavigationMenuTrigger 
                   className="font-bold text-sm bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-primary-foreground"
                >
                  SHOP
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-auto min-w-[400px] grid-cols-2 gap-x-12 gap-y-6 p-6">
                    {/* CATEGORIES COLUMN - Dynamically shows Gold or Silver categories */}
                    <div className="flex flex-col">
                      <h3 className="mb-4 font-bold font-body text-base text-foreground">
                        CATEGORIES
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {currentCategories.map((category: Category) => (
                          <li key={category.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={isGoldPage ? `/gold/${encodeURIComponent(category.name)}` : `/category/${encodeURIComponent(category.name)}`}
                                className="text-sm text-muted-foreground hover:text-foreground"
                              >
                                {category.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* MATERIALS COLUMN */}
                    <div className="flex flex-col">
                       <h3 className="mb-4 font-bold font-body text-base text-foreground">
                        MATERIALS
                      </h3>
                      <ul className="flex flex-col gap-2">
                         <li>
                            <NavigationMenuLink asChild>
                              <Link href="/gold" className="text-sm text-muted-foreground hover:text-foreground">Gold</Link>
                            </NavigationMenuLink>
                         </li>
                         <li>
                            <NavigationMenuLink asChild>
                              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Silver</Link>
                            </NavigationMenuLink>
                         </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/collections" className="font-bold text-sm mx-4 hover:text-muted-foreground">EXHIBITIONS</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className="font-bold text-sm mr-4 hover:text-muted-foreground">ABOUT US</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#reviews-anchor" onClick={(e) => handleScroll(e, '#reviews-anchor')} className="font-bold text-sm hover:text-muted-foreground">REVIEWS</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/location" className="font-bold text-sm ml-4 hover:text-muted-foreground">LOCATION</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-background text-xs font-bold text-primary">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" asChild>
            <Link href="/wishlist">
              <div className="relative">
                <Heart className={cn("h-5 w-5", wishlistCount > 0 && "fill-destructive text-destructive")}/>
                {wishlistCount > 0 && (
                   <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-background text-xs font-bold text-primary">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">My Account</span>
            </Link>
          </Button>
            
            {/* Toggle Button: Removed 'ring' conditions so size is consistent */}
            <Button asChild className={cn(
              "inline-flex flex-shrink-0 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 text-xs px-3 h-8 md:text-sm md:px-4 md:h-auto",
              toggleButtonStyles
            )}>
              <Link href={toggleButtonLink}>
                 {toggleButtonText}
              </Link>
            </Button>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}