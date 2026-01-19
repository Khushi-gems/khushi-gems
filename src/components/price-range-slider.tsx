"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { Slider } from "@/components/ui/slider";

type PriceRangeSliderProps = {
  products: Product[];
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  priceRange: [number, number];
};

const NUM_BINS = 20;

export function PriceRangeSlider({
  products,
  minPrice,
  maxPrice,
  onPriceChange,
  priceRange
}: PriceRangeSliderProps) {
  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);
  
  const histogramData = useMemo(() => {
    if (products.length === 0 || maxPrice <= minPrice) return [];

    const bins = Array(NUM_BINS).fill(0);
    const binSize = (maxPrice - minPrice) / NUM_BINS;

    if (binSize <= 0) return Array(NUM_BINS).fill(0);

    for (const product of products) {
      if (product.price >= minPrice && product.price <= maxPrice) {
        const binIndex = Math.min(
          Math.floor((product.price - minPrice) / binSize),
          NUM_BINS - 1
        );
        bins[binIndex]++;
      }
    }

    const maxCount = Math.max(...bins, 1);
    return bins.map((count) => (count / maxCount) * 100);
  }, [products, minPrice, maxPrice]);

  const handleValueChange = (newRange: [number, number]) => {
    setLocalRange(newRange);
  };
  
  const handleValueCommit = (newRange: [number, number]) => {
    onPriceChange(newRange[0], newRange[1]);
  };

  return (
    <div>
      <div className="relative h-24 w-full">
        <div className="absolute bottom-6 flex h-16 w-full items-end justify-between px-1">
          {histogramData.map((height, index) => (
            <div
              key={index}
              className={cn(
                "w-[3%] bg-gray-300 rounded-sm transition-colors duration-300",
                (minPrice + (index / NUM_BINS) * (maxPrice - minPrice)) >= localRange[0] &&
                (minPrice + ((index + 1) / NUM_BINS) * (maxPrice - minPrice)) <= localRange[1]
                ? 'bg-primary/50'
                : 'bg-gray-300'
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        
        <Slider
          value={localRange}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          min={minPrice}
          max={maxPrice}
          step={100}
          className="absolute bottom-0"
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        <span>INR {Math.round(localRange[0]).toLocaleString()}</span>
        <span>INR {Math.round(localRange[1]).toLocaleString()}</span>
      </div>
    </div>
  );
}
