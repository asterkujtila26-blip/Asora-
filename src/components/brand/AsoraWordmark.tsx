import React from 'react';

interface AsoraWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  color?: string;
  showDescriptor?: boolean;
}

/**
 * ASORA PARIS — Official High-Contrast Serif Wordmark
 *
 * Typography & Spacing:
 * - Brand Name: ASORA (~0.6em generous tracking, uppercase, high contrast)
 * - Descriptor: PARIS (~1.2em wide tracking, centered underneath)
 */
export const AsoraWordmark: React.FC<AsoraWordmarkProps> = ({
  className = '',
  size = 'md',
  color = 'currentColor',
  showDescriptor = true,
}) => {
  const sizeStyles = {
    sm: {
      wordmark: 'text-base tracking-[0.5em] pl-[0.5em]',
      descriptor: 'text-[9px] tracking-[1.15em] pl-[1.15em] mt-0.5',
    },
    md: {
      wordmark: 'text-xl tracking-[0.6em] pl-[0.6em]',
      descriptor: 'text-[10px] tracking-[1.25em] pl-[1.25em] mt-1',
    },
    lg: {
      wordmark: 'text-2xl sm:text-3xl tracking-[0.6em] pl-[0.6em]',
      descriptor: 'text-xs tracking-[1.3em] pl-[1.3em] mt-1.5',
    },
    xl: {
      wordmark: 'text-4xl sm:text-5xl tracking-[0.6em] pl-[0.6em]',
      descriptor: 'text-sm tracking-[1.35em] pl-[1.35em] mt-2',
    },
    hero: {
      wordmark: 'text-5xl sm:text-7xl lg:text-8xl tracking-[0.65em] pl-[0.65em]',
      descriptor: 'text-sm sm:text-lg tracking-[1.4em] pl-[1.4em] mt-3 sm:mt-4',
    },
  }[size];

  return (
    <div
      className={`flex flex-col items-center justify-center text-center select-none font-serif-asora ${className}`}
      style={{ color }}
    >
      <span className={`font-semibold uppercase leading-none whitespace-nowrap ${sizeStyles.wordmark}`}>
        ASORA
      </span>
      {showDescriptor && (
        <span
          className={`font-sans font-medium uppercase leading-none opacity-85 whitespace-nowrap ${sizeStyles.descriptor}`}
        >
          PARIS
        </span>
      )}
    </div>
  );
};

export default AsoraWordmark;
