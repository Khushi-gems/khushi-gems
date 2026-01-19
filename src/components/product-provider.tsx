'use client';

import { createContext, useContext, useMemo, ReactNode, FC } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, Query } from 'firebase/firestore';
import type { Product as ProductType } from '@/lib/types';

interface ProductFromDB {
  name: string;
  price: number | string;
  imageUrl?: string;
  iageUrl?: string; 
  imageUrls?: string[]; 
  category?: string;
  description: string;
  type?: string; 
  material?: 'Gold' | 'Silver';
  availability?: string;
  sizes?: any;
  [key: string]: any; 
}

interface ProductsContextType {
  products: ProductType[];
  isLoading: boolean;
  error: Error | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Helper to determine category from any text string
function detectCategory(input: string | undefined): string | null {
    if (!input || typeof input !== 'string') return null;
    const lower = input.toLowerCase();
    
    if (lower.includes('earring') || lower.includes('jhumka') || lower.includes('stud') || lower.includes('bali')) return 'Earrings';
    if (lower.includes('necklace') || lower.includes('chain') || lower.includes('mangalsutra')) return 'Necklaces';
    if (lower.includes('pendant') || lower.includes('locket')) return 'Pendants';
    if (lower.includes('ring') && !lower.includes('nose') && !lower.includes('toe')) return 'Rings';
    if (lower.includes('bangle') || lower.includes('bracelet') || lower.includes('kada') || lower.includes('cuff')) return 'Bangles/bracelets';
    if (lower.includes('nose') || lower.includes('nath')) return 'Nosepin';
    if (lower.includes('choker')) return 'Chokers';
    if (lower.includes('maang') || lower.includes('tikka')) return 'Maang Tikka';
    if (lower.includes('diamond')) return 'Diamond Jewellery';
    
    return null;
}

function transformProduct(product: ProductFromDB & { id: string }): ProductType | null {
    try {
        // 1. Validate Name
        if (typeof product.name !== 'string' || !product.name) return null;
        
        // 2. Validate and Sanitize Price (Default to 0 if missing)
        let price: number = 0;
        if (typeof product.price === 'string') {
            const cleanPrice = product.price.replace(/[^0-9.]/g, '');
            price = parseFloat(cleanPrice) || 0;
        } else if (typeof product.price === 'number') {
            price = product.price;
        }

        // 3. Determine Material ('Gold' or 'Silver')
        let material: 'Gold' | 'Silver' | undefined;
        const typeStr = typeof product.type === 'string' ? product.type : '';
        const materialStr = typeof product.material === 'string' ? product.material : '';
        const sizesTypeStr = (typeof product.sizes === 'object' && product.sizes?.type) ? product.sizes.type : '';

        const allInfoForMaterial = (typeStr + ' ' + materialStr + ' ' + sizesTypeStr).toLowerCase();
        
        if (allInfoForMaterial.includes('gold')) material = 'Gold';
        else if (allInfoForMaterial.includes('silver')) material = 'Silver';

        if (!material) {
            // Optional: Default to Silver if you want to be very lenient, but safer to skip unknown materials
             return null; 
        }

        // 4. Determine Category 
        let finalCategory = 'Uncategorized';
        const detectedFromType = detectCategory(typeStr);
        const detectedFromName = detectCategory(product.name);
        const detectedFromCat = detectCategory(product.category);

        if (detectedFromType) finalCategory = detectedFromType;
        else if (detectedFromCat) finalCategory = detectedFromCat;
        else if (detectedFromName) finalCategory = detectedFromName;
        else if (product.category) finalCategory = product.category; // Use raw category if we can't detect standard one

        // 5. Find the primary image URL (Use placeholder if missing)
        let mainImageUrl = "https://placehold.co/600x400?text=No+Image"; // Default Placeholder
        let images: { url: string; hint: string }[] = [];

        if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
            const validImageUrls = product.imageUrls.filter(url => typeof url === 'string' && url);
            if (validImageUrls.length > 0) {
                mainImageUrl = validImageUrls[0];
                images = validImageUrls.map(url => ({ url, hint: product.name }));
            }
        } else if (typeof product.imageUrl === 'string' && product.imageUrl) {
            mainImageUrl = product.imageUrl;
        } else if (typeof (product as any).iageUrl === 'string' && (product as any).iageUrl) {
            mainImageUrl = (product as any).iageUrl;
        }
        
        if (images.length === 0) {
            images.push({ url: mainImageUrl, hint: product.name });
        }

        const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        return {
            id: product.id,
            name: product.name.trim(),
            price: price,
            slug: slug,
            material: material,
            tag: product.availability || 'READY TO SHIP',
            imageUrl: mainImageUrl,
            images: images,
            imageHint: product.name,
            category: finalCategory,
            description: product.description || '',
        };
    } catch (e: any) {
        console.error(`Error transforming product ${product.id}:`, e);
        return null;
    }
}

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const firestore = useFirestore();
    
    const productsCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'products');
    }, [firestore]);

    const { data: rawProducts, isLoading, error } = useCollection<ProductFromDB>(productsCollection as Query | null);

    const products = useMemo(() => {
        if (!rawProducts) return [];
        return rawProducts
            .map(p => transformProduct(p as ProductFromDB & { id: string }))
            .filter((p): p is ProductType => p !== null);
    }, [rawProducts]);

    const value = {
        products,
        isLoading,
        error: error as Error | null,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};