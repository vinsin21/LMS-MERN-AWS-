import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price?: string;
  badge?: {
    text: string;
    color: string; // hex or tailwind class text color
  };
  category: string;
  duration: string;
  rating?: number;
  studentsCount: string;
  author: string;
  slug: string;
  visualStyle: 'genai' | 'mern' | 'backend' | 'go';
  status: 'open' | 'waitlist';
}