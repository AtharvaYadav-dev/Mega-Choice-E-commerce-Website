import React from 'react';
import { FaSpinner, FaHeart } from 'react-icons/fa';

const Loading = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text = '',
  fullScreen = false,
  overlay = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-primary-500 border-primary-500',
    secondary: 'text-gray-500 border-gray-500',
    white: 'text-white border-white',
    success: 'text-green-500 border-green-500',
    error: 'text-red-500 border-red-500',
    warning: 'text-yellow-500 border-yellow-500'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const LoadingSpinner = () => (
    <div className={`
      animate-spin rounded-full border-2 border-transparent
      ${sizeClasses[size]} ${colorClasses[color]}
      border-t-current border-r-current
    `} />
  );

  const LoadingDots = () => (
    <div className="flex space-x-1">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`
            ${sizeClasses[size]} ${colorClasses[color]}
            rounded-full animate-bounce bg-current
          `}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const LoadingPulse = () => (
    <div className={`
      ${sizeClasses[size]} ${colorClasses[color]}
      rounded-full animate-pulse-soft bg-current
    `} />
  );

  const LoadingBars = () => (
    <div className="flex space-x-1 items-end">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`
            w-1 ${colorClasses[color]} bg-current animate-pulse
            ${i === 0 ? 'h-4' : i === 1 ? 'h-6' : i === 2 ? 'h-8' : 'h-6'}
          `}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );

  const LoadingRing = () => (
    <div className={`
      ${sizeClasses[size]} rounded-full border-2
      ${colorClasses[color]} border-current border-t-transparent
      animate-spin
    `} />
  );

  const LoadingHeart = () => (
    <FaHeart className={`
      ${sizeClasses[size]} ${colorClasses[color]}
      animate-heart-beat
    `} />
  );

  const LoadingWave = () => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`
            w-1 h-8 ${colorClasses[color]} bg-current
            animate-bounce rounded-full
          `}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );

  const LoadingGradient = () => (
    <div className={`
      ${sizeClasses[size]} rounded-full
      bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600
      animate-spin
      relative overflow-hidden
    `}>
      <div className="absolute inset-1 bg-white rounded-full" />
    </div>
  );

  const LoadingShimmer = () => (
    <div className={`
      ${sizeClasses[size]} bg-gray-200 rounded-lg
      relative overflow-hidden
    `}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
    </div>
  );

  const renderLoadingVariant = () => {
    switch (variant) {
      case 'spinner':
        return <LoadingSpinner />;
      case 'dots':
        return <LoadingDots />;
      case 'pulse':
        return <LoadingPulse />;
      case 'bars':
        return <LoadingBars />;
      case 'ring':
        return <LoadingRing />;
      case 'heart':
        return <LoadingHeart />;
      case 'wave':
        return <LoadingWave />;
      case 'skeleton':
        return <LoadingSkeleton />;
      case 'gradient':
        return <LoadingGradient />;
      case 'shimmer':
        return <LoadingShimmer />;
      default:
        return <LoadingSpinner />;
    }
  };

  const LoadingContent = () => (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`} {...props}>
      {renderLoadingVariant()}
      {text && (
        <p className={`${textSizeClasses[size]} ${colorClasses[color]} font-medium animate-pulse-soft`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <LoadingContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-40">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <LoadingContent />
        </div>
      </div>
    );
  }

  return <LoadingContent />;
};

// Specialized loading components
export const PageLoader = ({ text = "Loading..." }) => (
  <Loading
    variant="gradient"
    size="lg"
    text={text}
    fullScreen
    color="primary"
  />
);

export const ComponentLoader = ({ text = "" }) => (
  <Loading
    variant="spinner"
    size="md"
    text={text}
    className="py-8"
  />
);

export const ButtonLoader = () => (
  <Loading
    variant="spinner"
    size="sm"
    color="white"
  />
);

export const InlineLoader = ({ text = "" }) => (
  <Loading
    variant="dots"
    size="xs"
    text={text}
    className="inline-flex"
  />
);

export const OverlayLoader = ({ text = "Please wait..." }) => (
  <Loading
    variant="ring"
    size="lg"
    text={text}
    overlay
  />
);

export const SkeletonLoader = ({ lines = 3, className = "" }) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-300 rounded ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 rounded-lg aspect-product mb-4" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-6 bg-gray-300 rounded w-1/3" />
    </div>
  </div>
);

export const ListSkeleton = ({ items = 5 }) => (
  <div className="space-y-4">
    {[...Array(items)].map((_, i) => (
      <div key={i} className="animate-pulse flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-300 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-10 h-10 bg-gray-300 rounded-full" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 rounded" />
      <div className="h-4 bg-gray-300 rounded" />
      <div className="h-4 bg-gray-300 rounded w-3/4" />
    </div>
  </div>
);

export default Loading;
