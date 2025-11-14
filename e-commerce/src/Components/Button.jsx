import React, { forwardRef } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200 transform 
    relative overflow-hidden
  `.trim();

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600 text-white
      hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500
      shadow-md hover:shadow-lg hover:scale-102
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50 focus:ring-primary-500
      shadow-sm hover:shadow-md
    `,
    outline: `
      bg-transparent text-primary-600 border border-primary-300
      hover:bg-primary-50 hover:border-primary-400 focus:ring-primary-500
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 focus:ring-primary-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white
      hover:from-red-600 hover:to-red-700 focus:ring-red-500
      shadow-md hover:shadow-lg hover:scale-102
    `,
    success: `
      bg-gradient-to-r from-green-500 to-green-600 text-white
      hover:from-green-600 hover:to-green-700 focus:ring-green-500
      shadow-md hover:shadow-lg hover:scale-102
    `,
    warning: `
      bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900
      hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-500
      shadow-md hover:shadow-lg hover:scale-102
    `,
    gradient: `
      bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white
      hover:from-purple-600 hover:via-pink-600 hover:to-red-600
      focus:ring-pink-500 shadow-md hover:shadow-lg hover:scale-102
    `,
  };

  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${loading || disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const iconClass = iconSizeClasses[size];

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
      </span>

      {/* Content */}
      <span className="relative flex items-center justify-center">
        {loading ? (
          <FaSpinner className={`animate-spin ${iconClass} ${leftIcon || rightIcon ? 'mr-2' : ''}`} />
        ) : leftIcon ? (
          <span className={`${iconClass} mr-2 flex-shrink-0`}>
            {leftIcon}
          </span>
        ) : null}

        {!loading && (
          <span className={loading ? 'opacity-0' : ''}>{children}</span>
        )}

        {!loading && rightIcon && (
          <span className={`${iconClass} ml-2 flex-shrink-0`}>
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

// Button variants for easy usage
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;
export const DangerButton = (props) => <Button variant="danger" {...props} />;
export const SuccessButton = (props) => <Button variant="success" {...props} />;
export const WarningButton = (props) => <Button variant="warning" {...props} />;
export const GradientButton = (props) => <Button variant="gradient" {...props} />;

// Icon button component
export const IconButton = ({ icon, tooltip, ...props }) => (
  <Button
    className="rounded-full p-2"
    title={tooltip}
    {...props}
  >
    {icon}
  </Button>
);

// Loading button component
export const LoadingButton = ({ loading, children, ...props }) => (
  <Button loading={loading} {...props}>
    {loading ? 'Loading...' : children}
  </Button>
);
