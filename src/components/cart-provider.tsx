
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Product, quantity?: number, size?: string) => void;
  removeItem: (itemId: number, size?: string) => void;
  increaseQuantity: (itemId: number, size?: string) => void;
  decreaseQuantity: (itemId: number, size?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isCartLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        localStorage.removeItem('cart');
    } finally {
        setIsCartLoaded(true);
    }
  }, []);

  const updateCartAndStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addItem = (item: Product, quantity: number = 1, size?: string) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === size
    );
    let newCart;
    if (existingItem) {
      newCart = cart.map((cartItem) =>
        cartItem.id === item.id && cartItem.size === size
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity, size }];
    }
    updateCartAndStorage(newCart);
    setIsCartOpen(true);
  };

  const removeItem = (itemId: number, size?: string) => {
    const newCart = cart.filter(
      (item) => !(item.id === itemId && item.size === size)
    );
    updateCartAndStorage(newCart);
  };
  
  const increaseQuantity = (itemId: number, size?: string) => {
    const newCart = cart.map((item) =>
      item.id === itemId && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartAndStorage(newCart);
  };

  const decreaseQuantity = (itemId: number, size?: string) => {
    const newCart = cart
      .map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCartAndStorage(newCart);
  };

  const clearCart = () => {
    updateCartAndStorage([]);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ 
          cart, 
          addItem, 
          removeItem, 
          clearCart, 
          cartCount, 
          cartTotal, 
          increaseQuantity, 
          decreaseQuantity, 
          isCartOpen, 
          setIsCartOpen,
          isCartLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
