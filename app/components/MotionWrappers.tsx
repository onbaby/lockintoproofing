'use client';

import { motion, type Variants, type Transition } from 'framer-motion';
import type React from 'react';

// Wrapper for motion.div
interface MotionDivProps {
  children: React.ReactNode;
  className?: string;
  initial?: Record<string, any> | string;
  animate?: Record<string, any> | string;
  whileInView?: Record<string, any>;
  viewport?: Record<string, any>;
  transition?: Transition;
  variants?: Variants;
  // Explicitly pass other div props if needed, e.g., id
  id?: string;
}

export const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  className,
  initial,
  animate,
  whileInView,
  viewport,
  transition,
  variants,
  id
}) => {
  return (
    <motion.div
      id={id}
      className={className}
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Wrapper for motion.a
interface MotionLinkProps {
    children: React.ReactNode;
    className?: string;
    href: string;
    // Motion props
    initial?: Record<string, any> | string;
    animate?: Record<string, any> | string;
    whileHover?: Record<string, any>;
    transition?: Transition;
    // Specific anchor props
    target?: string;
    rel?: string;
    // Add onClick if needed for smooth scrolling in client components
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const MotionLink: React.FC<MotionLinkProps> = ({
    children,
    className,
    href,
    initial,
    animate,
    whileHover,
    transition,
    target,
    rel,
    onClick
}) => {
    return (
        <motion.a
            href={href}
            className={className}
            initial={initial}
            animate={animate}
            whileHover={whileHover}
            transition={transition}
            target={target}
            rel={rel}
            onClick={onClick}
        >
            {children}
        </motion.a>
    );
}; 