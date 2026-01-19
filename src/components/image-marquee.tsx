
"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageMarqueeProps {
  children: ReactNode;
  baseVelocity: number;
  className?: string;
}

export function ImageMarquee({
  children,
  baseVelocity = 100,
  className,
}: ImageMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = { scrollY: useMotionValue(0) }; // Mock scrollY if not in a scroll container context
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [childrenCount, setChildrenCount] = useState(1);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
        setChildrenCount(React.Children.count(children));
    }
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / (childrenCount > 1 ? childrenCount : 2), 0, v)}%`);


  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  
  const duplicatedChildren = Array(Math.max(2, 4)).fill(0).map((_, i) => (
      <div key={i} className="flex" aria-hidden={i > 0}>
        {children}
      </div>
  ));

  return (
    <div className={cn("flex flex-nowrap overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex flex-nowrap" style={{ x }} ref={marqueeRef}>
        {duplicatedChildren}
      </motion.div>
    </div>
  );
}
