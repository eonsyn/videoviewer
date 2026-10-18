import React from 'react';

export const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-lg shadow-md bg-card p-4 ${className}`} {...props}>
    {children}
  </div>
);
