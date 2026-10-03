import Image from 'next/image';
import Link from 'next/link';

interface BentonLogoProps {
  className?: string;
  variant?: 'color' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

// Emblem source is 280×212; heights keep the stacked lockup inside the 88px header.
const emblemHeight = { sm: 31, md: 39, lg: 55 };

export default function BentonLogo({
  className = '',
  variant = 'color',
  size = 'md',
  showSubtitle = false
}: BentonLogoProps) {
  const isWhite = variant === 'white';
  const height = emblemHeight[size];

  // On dark backgrounds the cut-out emblem fringes, so show the full logo on its white card instead.
  if (isWhite) {
    return (
      <Link href="/" aria-label="Benton Homes — home" className={`inline-flex flex-col items-start shrink-0 ${className}`}>
        <span className="inline-flex flex-col items-center rounded-lg bg-white px-3 pt-1 pb-2 shadow-sm">
          {/* Source is 288×212 with white padding around the mark. */}
          <Image
            src="/images/benton-logo-white.png"
            alt=""
            width={Math.round(height * 1.4 * 288 / 212)}
            height={Math.round(height * 1.4)}
            className="object-contain"
          />
          <span className={`font-semibold tracking-wider uppercase font-serif leading-none -mt-1 text-brand-blue ${size === 'lg' ? 'text-lg' : 'text-sm sm:text-base'}`}>
            HOMES
          </span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] leading-tight tracking-tight font-medium mt-2 text-gray-400">
            Benton Homes &amp; Development Ltd
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link href="/" aria-label="Benton Homes — home" className={`inline-flex flex-col items-center text-center shrink-0 ${className}`}>
      <Image
        src="/images/benton-logo-transparent.png"
        alt=""
        width={Math.round(height * 280 / 212)}
        height={height}
        className="object-contain"
      />
      {/* -mt offsets the ~9% transparent padding baked into the emblem PNG. */}
      <span className="flex items-baseline justify-center gap-1.5 leading-none -mt-1">
        <span className={`font-semibold tracking-wider uppercase font-serif ${size === 'lg' ? 'text-lg' : 'text-sm sm:text-base'} text-brand-blue`}>
          HOMES
        </span>
      </span>
      {showSubtitle && (
        <span className="text-[10px] leading-tight tracking-tight font-medium mt-0.5 text-slate-500">
          Benton Homes &amp; Development Ltd
        </span>
      )}
    </Link>
  );
}
