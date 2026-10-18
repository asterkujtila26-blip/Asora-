import React from 'react';
import { AsoraEmblem } from './AsoraEmblem';
import { AsoraWordmark } from './AsoraWordmark';

interface AsoraLockupProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  emblemSize?: number;
}

/**
 * ASORA PARIS — Full Brand Lockup
 * Combining the Pierced Horizon signature emblem and high-contrast wordmark
 */
export const AsoraLockup: React.FC<AsoraLockupProps> = ({
  className = '',
  orientation = 'vertical',
  size = 'md',
  color = 'currentColor',
  emblemSize,
}) => {
  const defaultEmblemSizes = {
    sm: 24,
    md: 36,
    lg: 52,
  };

  const finalEmblemSize = emblemSize ?? defaultEmblemSizes[size];

  if (orientation === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-4 ${className}`} style={{ color }}>
        <AsoraEmblem size={finalEmblemSize} color={color} />
        <div className="h-6 w-px bg-current opacity-20" aria-hidden="true" />
        <AsoraWordmark size={size} color={color} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`} style={{ color }}>
      <AsoraEmblem size={finalEmblemSize} color={color} />
      <AsoraWordmark size={size} color={color} />
    </div>
  );
};

export default AsoraLockup;
