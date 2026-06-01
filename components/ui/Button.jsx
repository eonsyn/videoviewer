"use client";
import React from "react";

export function Button({ children, variant = "default", className = "", onClick, disabled, style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', padding: '12px 24px', borderRadius: '10px',
    fontSize: '15px', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.25s ease', border: 'none', fontFamily: 'DM Sans, sans-serif',
    opacity: disabled ? 0.5 : 1,
  };

  const variants = {
    default: {
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(59,130,246,0.3)',
    },
    outline: {
      background: 'rgba(255,255,255,0.04)',
      color: '#a0aec0',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: '#a0aec0',
      boxShadow: 'none',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.transform = 'translateY(-2px)'; if (variant === 'default') e.currentTarget.style.boxShadow = '0 8px 25px rgba(59,130,246,0.45)'; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; if (variant === 'default') e.currentTarget.style.boxShadow = '0 4px 15px rgba(59,130,246,0.3)'; }}
    >
      {children}
    </button>
  );
}

export default Button;
