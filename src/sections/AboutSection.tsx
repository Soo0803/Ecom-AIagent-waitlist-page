"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { GraduationCap, ShoppingCart, Code, Wrench, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';

const credentials = [
  {
    icon: GraduationCap,
    title: 'University of Michigan Engineering',
    description: 'Built by Elite Software Engineers',
  },
  {
    icon: ShoppingCart,
    title: 'Active 6-Figure Amazon Seller',
    description: 'Built for Sellers, by Sellers',
  },
  {
    icon: Code,
    title: 'Custom IT & Automation',
    description: 'We code solutions for real FBA problems',
  },
];

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
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
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function AboutSection() {
  const scrollToWaitlist = () => {
    const element = document.querySelector('#waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight">
                Built by Sellers,{' '}
                <span className="text-blue-400">Powered by Engineers</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-4 text-slate-300 leading-relaxed mb-8 text-lg">
                <p>
                  Terny.sellersupport isn't just another SaaS tool built by developers who've never dealt with an ASIN suppression.
                  It was built from inside the trenches of Amazon Seller Central.
                </p>
                <p>
                  Our founder is an active <span className="text-white font-semibold">6-figure Amazon Seller</span> AND a
                  <span className="text-white font-semibold"> Software Engineer from the University of Michigan</span>.
                  We know firsthand the sheer panic of an Account Health warning, the exhaustion of copy-pasting Case IDs at 2 AM,
                  and exactly how to write code to automate the pain away.
                </p>
                <p>
                  We understand both the complex backend engineering needed to build robust AI agents, AND the brutal reality of
                  protecting your Amazon business. Every feature in Terny.sellersupport was built to solve our own problems first.
                </p>
              </div>
            </ScrollReveal>

            {/* Credentials */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                {credentials.map((cred, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <cred.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{cred.title}</h4>
                      <p className="text-sm text-slate-400">{cred.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - CTA Box */}
          <div className="flex flex-col justify-center h-full">
            <ScrollReveal delay={0.3}>
              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl p-8 border border-orange-500/30 shadow-2xl">
                <div className="flex flex-col items-start gap-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 tracking-wide">
                      Looking for more than just support automation?
                    </h4>
                    <p className="text-base text-slate-300 leading-relaxed mb-6">
                      As engineering partners, we can build custom IT and automation solutions
                      tailored to your entire Amazon business pipeline. From inventory forecasting to
                      proprietary pricing algorithms — let's talk about what you need to scale.
                    </p>
                    <Button
                      onClick={scrollToWaitlist}
                      className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-semibold shadow-lg shadow-orange-500/20 px-8 py-5 text-base"
                    >
                      Discuss Custom Solutions
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
