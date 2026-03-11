import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export function StarRating({ rating, maxRating = 5, size = 'md', showNumber = false }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? 'fill-white text-white'
              : 'text-white/20'
          }`}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm font-['Raleway'] text-white">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
