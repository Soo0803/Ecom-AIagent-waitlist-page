"use client";
import { motion } from 'framer-motion';
import { AuthCard } from '@/components/auth/AuthCard';
import { fadeIn } from '@/lib/animations';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-indigo/5 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-moss/5 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-3xl font-bold text-sumi mb-2">WaGa</div>
          <p className="text-stone">Pursuing Japanese Beauty and Functionality</p>
        </motion.div>

        {/* Auth Card */}
        <AuthCard onAuthSuccess={onAuthSuccess} />

        {/* Footer */}
        <motion.p 
          className="text-center text-sm text-stone mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} WaGa. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
