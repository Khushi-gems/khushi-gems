
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Collection } from '@/lib/types';
import { cn } from '@/lib/utils';

type ExhibitionCarouselProps = {
  collections: Collection[];
};

export function ExhibitionCarousel({ collections }: ExhibitionCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  const getAnimationProps = (index: number) => {
    const distance = Math.abs(current - index);
    const isCenter = distance === 0;
    const isAdjacent = distance === 1;
    const isFar = distance > 1;

    let scale = 1;
    let opacity = 1;
    let zIndex = 0;

    if (isCenter) {
      scale = 1;
      opacity = 1;
      zIndex = 3;
    } else if (isAdjacent) {
      scale = 0.85;
      opacity = 0.6;
      zIndex = 2;
    } else if (isFar) {
      scale = 0.7;
      opacity = 0.4;
      zIndex = 1;
    }

    return { scale, opacity, zIndex };
  };


  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'center',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {collections.map((collection, index) => {
          const { scale, opacity, zIndex } = getAnimationProps(index);
          return (
            <CarouselItem key={collection.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <Link href={`/collections/${collection.slug}`}>
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden rounded-lg"
                  animate={{ scale, opacity, zIndex }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={collection.imageUrl}
                    alt={collection.title}
                    fill
                    className="object-cover"
                    data-ai-hint={collection.imageHint}
                  />
                  <div
                    className={cn(
                      'absolute inset-0 transition-colors duration-300',
                      scale === 1 ? 'bg-black/20' : 'bg-black/50'
                    )}
                  />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-headline text-3xl text-beige">{collection.title}</h3>
                  </div>
                </motion.div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:flex" />
      <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:flex" />
    </Carousel>
  );
}
