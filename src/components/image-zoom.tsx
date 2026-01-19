
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

type ImageZoomProps = {
  src: string;
  alt: string;
  imageHint: string;
};

const LENS_SIZE = 120;
const ZOOM_LEVEL = 2.5;

export function ImageZoom({ src, alt, imageHint }: ImageZoomProps) {
  const [showZoom, setShowZoom] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const isMobile = useIsMobile();
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setXY([x, y]);
    setImgSize([width, height]);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowZoom(true);
    }
  };

  return (
    <div className="relative flex items-start gap-4">
        <div 
            className="relative aspect-square w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleMouseMove}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover rounded-lg"
                data-ai-hint={imageHint}
                priority
            />
            
            <AnimatePresence>
            {showZoom && (
                <>
                    {/* Lens */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="pointer-events-none absolute z-10 border-2 border-primary bg-white/20"
                        style={{
                            width: LENS_SIZE,
                            height: LENS_SIZE,
                            top: y - LENS_SIZE / 2,
                            left: x - LENS_SIZE / 2,
                        }}
                    />

                    {/* Black and White Overlay */}
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.2 }}
                        className="pointer-events-none absolute inset-0 z-0 bg-black/40 backdrop-grayscale"
                        style={{
                            clipPath: `polygon(
                                0% 0%, 
                                0% 100%, 
                                ${((x - LENS_SIZE / 2) / imgWidth) * 100}% 100%, 
                                ${((x - LENS_SIZE / 2) / imgWidth) * 100}% ${((y - LENS_SIZE / 2) / imgHeight) * 100}%, 
                                ${((x + LENS_SIZE / 2) / imgWidth) * 100}% ${((y - LENS_SIZE / 2) / imgHeight) * 100}%, 
                                ${((x + LENS_SIZE / 2) / imgWidth) * 100}% ${((y + LENS_SIZE / 2) / imgHeight) * 100}%, 
                                ${((x - LENS_SIZE / 2) / imgWidth) * 100}% ${((y + LENS_SIZE / 2) / imgHeight) * 100}%, 
                                ${((x - LENS_SIZE / 2) / imgWidth) * 100}% 100%, 
                                100% 100%, 
                                100% 0%
                            )`
                        }}
                    />
                </>
            )}
            </AnimatePresence>
        </div>
        <AnimatePresence>
            {showZoom && (
                 <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="pointer-events-none absolute left-[105%] top-0 hidden h-full w-full overflow-hidden rounded-lg border bg-white shadow-xl lg:block"
                >
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage: `url(${src})`,
                            backgroundSize: `${imgWidth * ZOOM_LEVEL}px ${imgHeight * ZOOM_LEVEL}px`,
                            backgroundPosition: `-${(x * ZOOM_LEVEL) - (LENS_SIZE / 2 * (ZOOM_LEVEL - 1))}px -${(y * ZOOM_LEVEL) - (LENS_SIZE / 2 * (ZOOM_LEVEL - 1))}px`,
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
