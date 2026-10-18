import React from 'react';

interface AsoraEmblemProps {
  className?: string;
  size?: number | string;
  color?: string;
  variant?: 'solid' | 'satin-stitch' | 'embossed' | 'fine';
  title?: string;
}

/**
 * THE PIERCED HORIZON — Official ASORA Signature Symbol
 *
 * Geometry:
 * - Open circular horizon ring with a precise gap at the top
 * - Pierced by a central pointed monolithic blade rising through the top opening
 * - A clean horizontal gap dividing upper blade and lower form
 * - A separate lower trapezoid-like pedestal form beneath the gap
 * Suggests a threshold and abstract 'A' without literally spelling the letter.
 */
export const AsoraEmblem: React.FC<AsoraEmblemProps> = ({
  className = '',
  size = 40,
  color = 'currentColor',
  variant = 'solid',
  title = 'ASORA Pierced Horizon Emblem',
}) => {
  const isEmbossed = variant === 'embossed';
  const isSatin = variant === 'satin-stitch';
  const isFine = variant === 'fine';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
      aria-label={title}
      role="img"
    >
      <title>{title}</title>
      <defs>
        {isEmbossed && (
          <filter id="asora-emboss" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="0.8" floodColor="#000" floodOpacity="0.45" />
            <feDropShadow dx="-1" dy="-1" stdDeviation="0.8" floodColor="#fff" floodOpacity="0.15" />
          </filter>
        )}
        {isSatin && (
          <filter id="asora-satin">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
            <feBlend in="SourceGraphic" in2="noise" mode="soft-light" />
          </filter>
        )}
      </defs>

      <g filter={isEmbossed ? 'url(#asora-emboss)' : isSatin ? 'url(#asora-satin)' : undefined}>
        {/*
          1. Open Circular Horizon Ring:
          Ring centered at (50, 52), radius 38, with a clean symmetric top gap between x=37 and x=63.
          Drawn as two clean symmetric arcs (or single open arc with gap at zenith).
        */}
        <path
          d="M 37 17.5 A 38 38 0 1 0 63 17.5"
          stroke={color}
          strokeWidth={isFine ? 3.2 : 4.4}
          strokeLinecap="square"
          strokeMiterlimit="10"
        />

        {/*
          2. Central Pointed Monolithic Blade:
          Rises through the open zenith of the ring.
          Apex at (50, 6), tapering down to a base at y=54, with clean geometric facets.
        */}
        <path
          d="M 50 6 L 61 54 L 39 54 Z"
          fill={color}
        />

        {/*
          3. Clean Horizontal Gap (between y=54 and y=60):
          Clear negative space separating blade and lower trapezoid.
        */}

        {/*
          4. Lower Trapezoid Pedestal:
          Positioned beneath the horizontal gap (from y=60 to y=88).
          Geometry widens downward, continuing the monolithic triangular horizon vector.
        */}
        <path
          d="M 37 60 L 63 60 L 68 88 L 32 88 Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default AsoraEmblem;
