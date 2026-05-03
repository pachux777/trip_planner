import React from 'react';
import { Loader2 } from 'lucide-react';
import './PremiumButton.css';

const PremiumButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props 
}) => {
  const classes = [
    'premium-btn',
    `premium-btn--${variant}`,
    `premium-btn--${size}`,
    fullWidth && 'premium-btn--full-width',
    (loading || disabled) && 'premium-btn--disabled',
    className
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="premium-btn__spinner" />
          <span>Loading...</span>
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          <span className="premium-btn__icon premium-btn__icon--left">{icon}</span>
          <span>{children}</span>
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          <span>{children}</span>
          <span className="premium-btn__icon premium-btn__icon--right">{icon}</span>
        </>
      );
    }

    return <span>{children}</span>;
  };

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={loading || disabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default PremiumButton;
