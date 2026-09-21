import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BentonLogoProps {
  className?: string;
  variant?: 'color' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function BentonLogo({
  className = '',
  variant = 'color',
  size = 'md',
  showSubtitle = false
}: BentonLogoProps) {
  const isWhite = variant === 'white';
  
  // Height sizing
  const heightClasses = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16'
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Official Benton Logo Graphic */}
      <div className="relative flex items-center justify-center">
        <Image
          src="/images/benton-logo-transparent.png"
          alt="Benton Estates Logo"
          width={size === 'lg' ? 64 : size === 'md' ? 48 : 36}
          height={size === 'lg' ? 48 : size === 'md' ? 36 : 28}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-black tracking-wider uppercase text-lg sm:text-xl font-serif ${isWhite ? 'text-white' : 'text-[#0304CE]'}`}>
            BENTON
          </span>
          <span className={`font-bold tracking-tight text-xs sm:text-sm uppercase ${isWhite ? 'text-gray-300' : 'text-[#143F9D]'}`}>
            ESTATES
          </span>
        </div>
        {/* Red signature accent bar */}
        <div className="h-[2.5px] w-full bg-[#E40C05] rounded-full mt-0.5" />
        
        {showSubtitle && (
          <span className={`text-[10px] tracking-tight font-medium mt-1 ${isWhite ? 'text-gray-400' : 'text-slate-500'}`}>
            Benton Homes &amp; Development Ltd
          </span>
        )}
      </div>
    </Link>
  );
}
