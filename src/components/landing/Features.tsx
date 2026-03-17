"use client";
import { motion } from 'framer-motion';
import { Sparkles, Shield, Clock, Layout, BarChart3, Users } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/ScrollReveal';

const features = [
  {
    icon: Layout,
    title: 'Easy-to-Use Interface',
    subtitle: 'Intuitive Design',
    description: 'Intuitive design that feels natural from the first moment. Every interaction is thoughtfully crafted for clarity and ease.',
  },
  {
    icon: Sparkles,
    title: 'High-Quality Content',
    subtitle: 'Crafted with Care',
    description: 'Crafted with attention to every detail. Experience the difference that thoughtful design makes in your daily workflow.',
  },
  {
    icon: Clock,
    title: 'Support Anytime',
    subtitle: 'Always Here',
    description: "We're here when you need us. Our team is dedicated to ensuring your success around the clock.",
  },
];

const detailedFeatures = [
  {
    icon: BarChart3,
    title: 'Dashboard',
    subtitle: 'Your Command Center',
    description: 'Your command center with everything at a glance. Monitor key metrics, track progress, and make informed decisions with elegant visualizations.',
    imagePosition: 'right',
  },
  {
    icon: Shield,
    title: 'Analytics & Insights',
    subtitle: 'Data-Driven Decisions',
    description: 'Understand your data with elegant visualizations. Transform raw numbers into actionable insights that drive your business forward.',
    imagePosition: 'left',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    subtitle: 'Work Together',
    description: 'Work together seamlessly. Share projects, communicate in real-time, and achieve more as a unified team.',
    imagePosition: 'right',
  },
];

export function Features() {
  return (
    <section className="section-padding bg-washi">
      <div className="container-japanese">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-section text-sumi mb-4">
            Clarity in Simplicity
          </h2>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            Discover the essence of Japanese design philosophy applied to modern dashboard experiences
          </p>
        </ScrollReveal>

        {/* Feature cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="card-japanese h-full"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo" />
                </div>
                <h3 className="text-card-title text-sumi mb-1">{feature.title}</h3>
                <p className="text-sm text-stone mb-4">{feature.subtitle}</p>
                <p className="text-charcoal leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Detailed features */}
        <div className="space-y-24">
          {detailedFeatures.map((feature, index) => (
            <ScrollReveal 
              key={index} 
              animation={feature.imagePosition === 'right' ? 'slideLeft' : 'slideRight'}
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                feature.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <div className={feature.imagePosition === 'left' ? 'lg:order-2' : ''}>
                  <div className="w-12 h-12 rounded-lg bg-moss/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-moss" />
                  </div>
                  <h3 className="text-2xl font-semibold text-sumi mb-2">{feature.title}</h3>
                  <p className="text-sm text-stone mb-4">{feature.subtitle}</p>
                  <p className="text-charcoal leading-relaxed text-lg">{feature.description}</p>
                  
                  <motion.button
                    className="mt-6 text-indigo font-medium inline-flex items-center gap-2"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn more
                    <span>→</span>
                  </motion.button>
                </div>
                
                {/* Visual placeholder */}
                <div className={feature.imagePosition === 'left' ? 'lg:order-1' : ''}>
                  <motion.div 
                    className="aspect-[4/3] bg-white rounded-xl shadow-card p-8 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <feature.icon className="w-16 h-16 text-indigo/30 mx-auto mb-4" />
                      <p className="text-stone text-sm">{feature.subtitle} Preview</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
