import React from 'react';
import './GlassCard.css';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  padding = 'md',
  rounded = 'xl',
  shadow = true,
  border = true,
  ...props 
}) => {
  const classes = [
    'glass-card',
    `glass-card--${variant}`,
    `glass-card--padding-${padding}`,
    `glass-card--rounded-${rounded}`,
    hover && 'glass-card--hover',
    shadow && 'glass-card--shadow',
    border && 'glass-card--border',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
