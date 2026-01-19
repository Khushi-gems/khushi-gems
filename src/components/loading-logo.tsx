
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function LoadingLogo({ className, size = 96 }: { className?: string; size?: number }) {
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <Image
        src="https://i.ibb.co/6cQw4w7G/Gemini-Generated-Image-pi53fxpi53fxpi53-removebg-preview.png"
        alt="Loading..."
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
