"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Ticket,
  ChevronDown,
  ChevronUp,
  Book,
  Video,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/ScrollReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What are the main features of WaGa Dashboard?',
    answer: 'WaGa Dashboard provides project management, team collaboration, data analytics, and reporting features. It offers a simple and user-friendly interface inspired by Japanese design philosophy.',
  },
  {
    question: 'How do I invite team members?',
    answer: 'Go to the "Team" page and click the "Invite Member" button. Enter the email address of the person you want to invite. An invitation email will be sent, and they can join by clicking the link.',
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'Go to "Settings" > "Billing" page to view your current plan and click the "Change Plan" button. You can choose from available plans that suit your needs.',
  },
  {
    question: 'Is it possible to export my data?',
    answer: 'Yes, you can export data in CSV or JSON format from each project page. You can also bulk export all your data from "Settings" > "Privacy".',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can contact us through live chat, email, or support ticket from the "Contact" section on this page. Live chat provides the fastest response during business hours.',
  },
];

const supportChannels = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    subtitle: 'Instant Support',
    description: 'Get immediate assistance during business hours',
    availability: 'Mon-Fri 9:00 - 18:00',
    action: 'Start Chat',
    color: 'bg-indigo/10 text-indigo',
  },
  {
    icon: Mail,
    title: 'Email Support',
    subtitle: '24/7 Support',
    description: 'We reply within 24 hours',
    availability: '24/7',
    action: 'Send Email',
    color: 'bg-moss/10 text-moss',
  },
  {
    icon: Ticket,
    title: 'Support Ticket',
    subtitle: 'Detailed Help',
    description: 'For complex inquiries',
    availability: '24/7',
    action: 'Create Ticket',
    color: 'bg-terracotta/10 text-terracotta',
  },
];

const resources = [
  { icon: Book, title: 'Documentation', description: 'Detailed guides and references', href: '#' },
  { icon: Video, title: 'Video Tutorials', description: 'Step-by-step explanations', href: '#' },
  { icon: FileText, title: 'Blog', description: 'Latest updates and tips', href: '#' },
  { icon: HelpCircle, title: 'Community', description: 'Connect with other users', href: '#' },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg border border-stone/10 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-washi/50 transition-colors"
          >
            <span className="font-medium text-sumi pr-4">{item.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-stone flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-stone flex-shrink-0" />
            )}
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 pb-4 text-charcoal leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqItems.filter(
    item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-sumi mb-2">Help Center</h1>
          <p className="text-stone">
            Need help? We're here for you
          </p>
        </div>
      </ScrollReveal>

      {/* Search */}
      <ScrollReveal delay={0.1}>
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Support channels */}
      <ScrollReveal delay={0.15}>
        <h2 className="text-lg font-semibold text-sumi mb-4">Contact Us</h2>
        <StaggerContainer className="grid md:grid-cols-3 gap-4">
          {supportChannels.map((channel, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white rounded-xl p-6 shadow-card h-full"
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-12 h-12 rounded-lg ${channel.color} flex items-center justify-center mb-4`}>
                  <channel.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sumi mb-1">{channel.title}</h3>
                <p className="text-sm text-stone mb-3">{channel.subtitle}</p>
                <p className="text-sm text-charcoal mb-4">{channel.description}</p>
                <div className="flex items-center gap-2 text-sm text-stone mb-4">
                  <span className="w-2 h-2 bg-moss rounded-full" />
                  {channel.availability}
                </div>
                <Button variant="outline" className="w-full">
                  {channel.action}
                </Button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollReveal>

      {/* Resources */}
      <ScrollReveal delay={0.2}>
        <h2 className="text-lg font-semibold text-sumi mb-4">Resources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <motion.a
              key={index}
              href={resource.href}
              className="bg-white rounded-xl p-6 shadow-card flex items-start gap-4 hover:shadow-card-hover transition-shadow"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-lg bg-washi flex items-center justify-center flex-shrink-0">
                <resource.icon className="w-5 h-5 text-stone" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sumi mb-1">{resource.title}</h3>
                <p className="text-sm text-stone">{resource.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-stone" />
            </motion.a>
          ))}
        </div>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal delay={0.25}>
        <h2 className="text-lg font-semibold text-sumi mb-4">Frequently Asked Questions</h2>
        <FAQAccordion items={filteredFAQs.length > 0 ? filteredFAQs : faqItems} />
        
        {filteredFAQs.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-stone">No results found</p>
            <p className="text-sm text-stone mt-1">
              Try different keywords
            </p>
          </div>
        )}
      </ScrollReveal>

      {/* Contact CTA */}
      <ScrollReveal delay={0.3}>
        <div className="bg-indigo/5 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-sumi mb-2">
            Still need help?
          </h3>
          <p className="text-stone mb-4">
            Can't find what you're looking for? Contact us directly
          </p>
          <Button className="bg-indigo hover:bg-indigo-dark text-white">
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}
