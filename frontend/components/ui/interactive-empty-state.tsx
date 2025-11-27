import React, { memo, useId, forwardRef } from 'react';
import { motion, LazyMotion, domAnimation, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

const ICON_VARIANTS = {
  left: {
    initial: { scale: 0.8, opacity: 0, x: 0, y: 0, rotate: 0 },
    animate: { scale: 1, opacity: 1, x: 0, y: 0, rotate: -6, transition: { duration: 0.4, delay: 0.1 } },
    hover: { x: -22, y: -5, rotate: -15, scale: 1.1, transition: { duration: 0.2 } }
  },
  center: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
    hover: { y: -10, scale: 1.15, transition: { duration: 0.2 } }
  },
  right: {
    initial: { scale: 0.8, opacity: 0, x: 0, y: 0, rotate: 0 },
    animate: { scale: 1, opacity: 1, x: 0, y: 0, rotate: 6, transition: { duration: 0.4, delay: 0.3 } },
    hover: { x: 22, y: -5, rotate: 15, scale: 1.1, transition: { duration: 0.2 } }
  }
};

const CONTENT_VARIANTS = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
};

const BUTTON_VARIANTS = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
};

// Types for props
interface IconContainerProps {
  children: React.ReactNode;
  variant: 'left' | 'center' | 'right';
  className?: string;
  theme?: 'light' | 'dark' | 'neutral';
}

const IconContainer = memo(({ children, variant, className = '', theme }: IconContainerProps) => (
  <motion.div
    variants={ICON_VARIANTS[variant]}
    className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center relative shadow-lg transition-all duration-300",
      theme === 'dark' && "bg-[#171717] border border-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-white/20",
      theme === 'neutral' && "bg-stone-100 border border-stone-200 group-hover:shadow-xl group-hover:border-stone-300",
      (!theme || theme === 'light') && "bg-white border border-gray-200 group-hover:shadow-xl group-hover:border-gray-300",
      className
    )}
  >
    <div className={cn(
      "text-sm transition-colors duration-300",
      theme === 'dark' && "text-gray-400 group-hover:text-brand-yellow",
      theme === 'neutral' && "text-stone-500 group-hover:text-stone-700",
      (!theme || theme === 'light') && "text-gray-500 group-hover:text-gray-700"
    )}>
      {children}
    </div>
  </motion.div>
));
IconContainer.displayName = "IconContainer";

interface MultiIconDisplayProps {
  icons: React.ReactNode[];
  theme?: 'light' | 'dark' | 'neutral';
}

const MultiIconDisplay = memo(({ icons, theme }: MultiIconDisplayProps) => {
  if (!icons || icons.length < 3) return null;

  return (
    <div className="flex justify-center isolate relative">
      <IconContainer variant="left" className="left-2 top-1 z-10" theme={theme}>
        {icons[0]}
      </IconContainer>
      <IconContainer variant="center" className="z-20" theme={theme}>
        {icons[1]}
      </IconContainer>
      <IconContainer variant="right" className="right-2 top-1 z-10" theme={theme}>
        {icons[2]}
      </IconContainer>
    </div>
  );
});
MultiIconDisplay.displayName = "MultiIconDisplay";

const Background = ({ theme }: { theme: string }) => (
  <div
    aria-hidden="true"
    className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500"
    style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#FFD439' : '#000'} 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}
  />
);

export interface EmptyStateProps extends Omit<HTMLMotionProps<"section">, "ref"> {
  title: string;
  description?: string;
  icons?: React.ReactNode[];
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
  };
  variant?: 'default' | 'subtle' | 'error';
  size?: 'sm' | 'default' | 'lg';
  theme?: 'light' | 'dark' | 'neutral';
  isIconAnimated?: boolean;
}

export const EmptyState = forwardRef<HTMLElement, EmptyStateProps>(({
  title,
  description,
  icons,
  action,
  variant = 'default',
  size = 'default',
  theme = 'light',
  isIconAnimated = true,
  className = '',
  ...props
}, ref) => {
  const titleId = useId();
  const descriptionId = useId();

  // Changed rounded-3xl to rounded-2xl to match Testimonials
  const baseClasses = "group transition-all duration-300 rounded-2xl relative overflow-hidden text-center flex flex-col items-center justify-center";

  const sizeClasses = {
    sm: "p-6",
    default: "p-8",
    lg: "p-12"
  };

  const getVariantClasses = (variant: string, theme: string) => {
    const variants: Record<string, Record<string, string>> = {
      default: {
        light: "bg-white border-dashed border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50/50",
        // Updated dark theme to match Testimonials: bg-[#0a0a0a], solid border-white/5, hover:border-white/10
        dark: "bg-[#0a0a0a] border border-white/5 hover:border-white/10 shadow-xl", 
        neutral: "bg-stone-50 border-dashed border-2 border-stone-300 hover:border-stone-400 hover:bg-stone-100/50"
      },
      subtle: {
        light: "bg-white border border-transparent hover:bg-gray-50/30",
        dark: "bg-[#0a0a0a] border border-white/5 hover:border-white/10 shadow-xl", // Made consistent with default for this specific request
        neutral: "bg-stone-50 border border-transparent hover:bg-stone-100/30"
      },
      error: {
        light: "bg-white border border-red-200 bg-red-50/50 hover:bg-red-50/80",
        dark: "bg-[#0a0a0a] border border-red-900/30 bg-red-950/10 hover:bg-red-950/20",
        neutral: "bg-stone-50 border border-red-300 bg-red-50/50 hover:bg-red-50/80"
      }
    };
    return variants[variant][theme];
  };

  const getTextClasses = (type: 'title' | 'description', size: string, theme: string) => {
    const sizes: Record<string, Record<string, string>> = {
      title: {
        sm: "text-base",
        default: "text-xl",
        lg: "text-2xl"
      },
      description: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base"
      }
    };

    const colors: Record<string, Record<string, string>> = {
      title: {
        light: "text-gray-900",
        dark: "text-white",
        neutral: "text-stone-900"
      },
      description: {
        light: "text-gray-600",
        dark: "text-gray-400",
        neutral: "text-stone-600"
      }
    };

    return cn(sizes[type][size], colors[type][theme], type === 'title' ? "font-bold" : "font-medium", "transition-colors duration-200");
  };

  const getButtonClasses = (size: string, theme: string) => {
    const sizeClasses: Record<string, string> = {
      sm: "text-xs px-4 py-2",
      default: "text-sm px-5 py-2.5",
      lg: "text-base px-6 py-3"
    };

    const themeClasses: Record<string, string> = {
      light: "border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
      // Match website button style: bg-[#333333] border-white/20
      dark: "border-white/20 bg-[#333333] hover:bg-[#404040] text-white shadow-lg",
      neutral: "border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700"
    };

    return cn(
      "inline-flex items-center gap-2 border rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group/button disabled:opacity-50 disabled:cursor-not-allowed",
      sizeClasses[size],
      themeClasses[theme]
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.section
        ref={ref}
        role="region"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          baseClasses,
          sizeClasses[size as keyof typeof sizeClasses],
          getVariantClasses(variant, theme),
          className
        )}
        initial="initial"
        animate="animate"
        whileHover={isIconAnimated ? "hover" : "animate"}
        {...props}
      >
        <Background theme={theme} />
        <div className="relative z-10 flex flex-col items-center">
          {icons && (
            <div className="mb-6">
              <MultiIconDisplay icons={icons} theme={theme} />
            </div>
          )}

          <motion.div variants={CONTENT_VARIANTS} className="space-y-3 mb-8">
            <h2 id={titleId} className={getTextClasses('title', size, theme)}>
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className={cn(
                  getTextClasses('description', size, theme),
                  "max-w-xs mx-auto leading-relaxed"
                )}
              >
                {description}
              </p>
            )}
          </motion.div>

          {action && (
            <motion.div variants={BUTTON_VARIANTS}>
              <motion.button
                type="button"
                onClick={action.onClick}
                disabled={action.disabled}
                className={getButtonClasses(size, theme)}
                whileTap={{ scale: 0.98 }}
              >
                {action.icon && (
                  <motion.div
                    className="transition-transform group-hover/button:rotate-90"
                    whileHover={{ rotate: 90 }}
                  >
                    {action.icon}
                  </motion.div>
                )}
                <span className="relative z-10">{action.label}</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.section>
    </LazyMotion>
  );
});
EmptyState.displayName = "EmptyState";