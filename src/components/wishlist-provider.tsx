
"use client";

import { createContext, useContext, ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { doc, setDoc, deleteDoc, collection } from "firebase/firestore";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (itemId: number | string) => void;
  isItemInWishlist: (itemId: number | string) => boolean;
  wishlistCount: number;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  
  const [localWishlist, setLocalWishlist] = useState<Product[]>([]);

  const wishlistCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `users/${user.uid}/wishlist`);
  }, [user, firestore]);

  const { data: firestoreWishlist, isLoading: isFirestoreLoading } = useCollection<Product>(wishlistCollectionRef);

  useEffect(() => {
    if (firestoreWishlist) {
      setLocalWishlist(firestoreWishlist as Product[]);
    } else if (!isUserLoading && !isFirestoreLoading) {
      setLocalWishlist([]);
    }
  }, [firestoreWishlist, isUserLoading, isFirestoreLoading]);
  
  const isLoading = isUserLoading || (user && isFirestoreLoading);
  
  const addToWishlist = useCallback(async (item: Product) => {
    if (!user || !firestore) {
      toast({ variant: "destructive", title: "Please log in", description: "You need to be logged in to save items to your wishlist." });
      return;
    }

    const previousWishlist = localWishlist;
    setLocalWishlist(prev => [...prev, item]);

    try {
      const docRef = doc(firestore, `users/${user.uid}/wishlist`, String(item.id));
      await setDoc(docRef, item);
      toast({
        title: "Added to wishlist",
        description: `${item.name} is now in your wishlist.`,
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not add item to wishlist." });
      setLocalWishlist(previousWishlist);
    }
  }, [user, firestore, toast, localWishlist]);

  const removeFromWishlist = useCallback(async (itemId: number | string) => {
    if (!user || !firestore) return;

    const previousWishlist = localWishlist;
    setLocalWishlist(prev => prev.filter(item => String(item.id) !== String(itemId)));

    try {
      const docRef = doc(firestore, `users/${user.uid}/wishlist`, String(itemId));
      await deleteDoc(docRef);
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist.",
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not remove item from wishlist." });
      setLocalWishlist(previousWishlist);
    }
  }, [user, firestore, toast, localWishlist]);

  const isItemInWishlist = useCallback((itemId: number | string) => {
    return localWishlist.some((item) => String(item.id) === String(itemId));
  }, [localWishlist]);

  const wishlistCount = localWishlist.length;
  
  const contextValue = useMemo(() => ({
    wishlist: localWishlist,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    wishlistCount,
    isLoading
  }), [localWishlist, addToWishlist, removeFromWishlist, isItemInWishlist, wishlistCount, isLoading]);

  return (
    <WishlistContext.Provider
      value={contextValue}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
