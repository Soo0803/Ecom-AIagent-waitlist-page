"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/ScrollReveal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    content: "WaGa has transformed how our team works. The intuitive interface and thoughtful design make every interaction a pleasure. It's not just a tool—it's an experience.",
    author: {
      name: 'Yuki Tanaka',
      role: 'Product Manager',
      company: 'TechFlow Inc.',
      avatar: '',
    },
    rating: 5,
  },
  {
    content: "The attention to detail is remarkable. Every feature feels intentional, every animation purposeful. This is what happens when design meets functionality.",
    author: {
      name: 'Sarah Chen',
      role: 'Design Director',
      company: 'Studio Kanso',
      avatar: '',
    },
    rating: 5,
  },
  {
    content: "We've tried many dashboard solutions, but WaGa stands apart. The Japanese design philosophy creates a calm, focused environment that our team loves.",
    author: {
      name: 'Michael Roberts',
      role: 'CEO',
      company: 'ClearMind Labs',
      avatar: '',
    },
    rating: 5,
  },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Active Users' },
  { value: 4.8, suffix: '/5', label: 'Average Rating', isDecimal: true },
  { value: 99.9, suffix: '%', label: 'Uptime', isDecimal: true },
  { value: 50, suffix: '+', label: 'Countries' },
];

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = '', 
  isDecimal = false 
}: { 
  value: number; 
  suffix?: string; 
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const displayValue = isDecimal 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="section-padding bg-white">
      <div className="container-japanese">
        {/* Stats row */}
        <ScrollReveal className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-stat text-sumi mb-2">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <div className="text-sm text-stone">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-section text-sumi mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-stone">
            Trusted by teams worldwide
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-washi rounded-xl p-8 h-full flex flex-col"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-indigo/30 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-terracotta text-terracotta" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-charcoal leading-relaxed flex-grow mb-6">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.author.avatar} />
                    <AvatarFallback className="bg-indigo/10 text-indigo">
                      {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sumi">{testimonial.author.name}</div>
                    <div className="text-sm text-stone">
                      {testimonial.author.role}, {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust badges */}
        <ScrollReveal className="mt-20 pt-12 border-t border-stone/20">
          <p className="text-center text-sm text-stone mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['TechFlow', 'Studio Kanso', 'ClearMind', 'Zenith', 'Nippon Labs'].map((company, index) => (
              <motion.div
                key={index}
                className="text-xl font-semibold text-stone"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
