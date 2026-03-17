"use client";
import { motion } from 'framer-motion';
import { ClipboardCopy, Bot, ShieldAlert, CalendarX, Moon } from 'lucide-react';
import { ScrollReveal, StaggerItem } from '@/components/ScrollReveal';
import { staggerContainer } from '@/lib/animations';

const painPoints = [
  {
    icon: ClipboardCopy,
    title: 'The Endless Copy-Paste Loop',
    description: 'Hours wasted compiling evidence and copying Case IDs, order numbers, and ASINs into templates that never seem to work.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Bot,
    title: "Fighting Amazon's Bot Army",
    description: 'Generic automated responses that don\'t address your actual issue. Waiting days just to get another bot reply.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: ShieldAlert,
    title: 'Account Health Anxiety',
    description: 'One wrong move and your Account Health Rating (AHR) tanks. The fear of an ODR violation and sudden suspension is real.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: CalendarX,
    title: 'The SLA Black Hole',
    description: 'Cases go unanswered. Deadlines are missed. You\'re left wondering if anyone at Amazon is actually working on your issue.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Moon,
    title: 'Lost Sleep & Revenue',
    description: 'Stranded inventory. Frozen listings. Every hour your issue isn\'t resolved is money walking out the door.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export function ProblemSection() {
  return (
    <section id="features" className="section-padding bg-slate-50">
      <div className="container-max">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            The Amazon Seller Support Nightmare
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Every seller knows the struggle. Here's what you're dealing with:
          </p>
        </ScrollReveal>

        {/* Pain Point Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {painPoints.map((point, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-full"
                whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-12 h-12 rounded-xl ${point.color} flex items-center justify-center mb-4`}>
                  <point.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </motion.div>

        {/* Stats Row */}
        <ScrollReveal delay={0.2} className="mt-12 md:mt-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10+', label: 'Hours wasted on Seller Central weekly' },
                { value: '87%', label: 'Sellers feeling treated as transactions' },
                { value: '2-5 Days', label: 'Resolution time for complex cases' },
                { value: '1-3%', label: 'Annual revenue lost to FBA errors' },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl md:text-4xl font-bold text-blue-700 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
