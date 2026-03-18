"use client";
import { motion } from 'framer-motion';
import { Search, FileText, MousePointerClick, Clock, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'AI Analyzes Your Issues',
    description: 'Our AI securely connects to Seller Central via browser automation and scans for stranded inventory, A-to-Z claims, pricing flags, reimbursement opportunities, and more.',
    color: 'bg-blue-700',
  },
  {
    number: '02',
    icon: FileText,
    title: 'AI Drafts Compliant Responses',
    description: "Using Amazon's policies and your account history, the AI drafts precise, professional responses with all the right details — no more template guesswork.",
    color: 'bg-blue-600',
  },
  {
    number: '03',
    icon: MousePointerClick,
    title: 'One-Click Injection',
    description: "Review the draft, click 'Approve', and the AI injects it directly into your Amazon Case Log or Live Chat widget. Done in seconds, not hours.",
    color: 'bg-blue-500',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How Terny.sellersupport Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Three simple steps to reclaim your time:
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-700/20 via-blue-500/20 to-blue-400/20" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  className="relative text-center"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Step Number & Icon */}
                  <div className="inline-flex flex-col items-center mb-6">
                    <span className="text-xs font-bold text-blue-500 tracking-widest mb-2">{step.number}</span>
                    <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-blue-700/20`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Bonus Feature */}
        <ScrollReveal delay={0.4} className="mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  SLA Monitoring & Auto-Follow Up
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  The AI monitors response times and automatically follows up on stalled cases.
                  Never let a case fall through the cracks again. Set custom reminders and escalation rules.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#waitlist"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300 transition-colors group cursor-pointer"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
