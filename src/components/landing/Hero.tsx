"use client";
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroLoad, heroItem } from '@/lib/animations';

interface HeroProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export function Hero({ onGetStarted, onLearnMore }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cloud">
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-indigo/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-40 right-40 w-48 h-48 rounded-full bg-moss/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
      />
      
      {/* Content container - positioned left (38% width) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-xl lg:max-w-2xl"
          variants={heroLoad}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={heroItem} className="mb-6">
            <span className="inline-block px-4 py-2 text-sm font-medium text-indigo bg-indigo/10 rounded-full">
              WaGa Dashboard
            </span>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1 
            variants={heroItem}
            className="text-4xl sm:text-5xl lg:text-hero font-bold text-sumi leading-tight mb-6"
          >
            Find Clarity in
            <br />
            Simplicity
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            variants={heroItem}
            className="text-xl text-charcoal mb-4 font-medium"
          >
            Japanese-Inspired Design Philosophy
          </motion.p>
          
          {/* Description */}
          <motion.p 
            variants={heroItem}
            className="text-lg text-stone leading-relaxed mb-10 max-w-lg"
          >
            A dashboard experience designed with the wisdom of wabi-sabi, 
            where every element serves a purpose and beauty emerges from restraint.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={heroItem}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={onGetStarted}
              className="btn-primary inline-flex items-center justify-center gap-2 text-base font-medium"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={onLearnMore}
              className="btn-secondary inline-flex items-center justify-center gap-2 text-base font-medium"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
          
          {/* Stats row */}
          <motion.div 
            variants={heroItem}
            className="mt-16 pt-8 border-t border-stone/20"
          >
            <div className="flex gap-12">
              <div>
                <div className="text-3xl font-bold text-sumi">10K+</div>
                <div className="text-sm text-stone mt-1">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sumi">4.8</div>
                <div className="text-sm text-stone mt-1">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sumi">99.9%</div>
                <div className="text-sm text-stone mt-1">Uptime</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-stone"
        >
          <span className="text-xs mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
