'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = pathname + searchParams.toString();

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};
