import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-[#FFD439] text-black hover:bg-[#ffe066] shadow-[0_0_20px_rgba(255,212,57,0.3)]",
    secondary: "bg-[#262626] text-white border border-[#333] hover:bg-[#333] hover:border-[#444]",
    outline: "border border-[#333] text-white hover:bg-[#262626]",
    ghost: "text-gray-300 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={20} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={20} />}
    </button>
  );
};