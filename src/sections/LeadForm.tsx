"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Lock, Rocket, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { WaitlistFormData, FormErrors } from '@/types';

const revenueOptions = [
  { value: '', label: 'Select revenue range...' },
  { value: '<$10k', label: 'Under $10,000' },
  { value: '$10k-$50k', label: '$10,000 - $50,000' },
  { value: '$50k-$250k', label: '$50,000 - $250,000' },
  { value: '$250k+', label: '$250,000+' },
];

const frustrationOptions = [
  { id: 'templates', label: 'Copy/pasting templates constantly' },
  { id: 'bot-responses', label: 'Getting generic/automated responses' },
  { id: 'stranded', label: 'Resolving stranded inventory / catalog issues' },
  { id: 'reimbursements', label: 'Winning FBA reimbursements' },
  { id: 'account-health', label: 'Account health / Policy warnings' },
  { id: 'other', label: 'Other (please specify)' },
];

export function LeadForm() {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    businessName: '',
    email: '',
    monthlyRevenue: '',
    frustrations: [],
    otherFrustration: '',
    automationNeeds: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Please enter your full name';
    }

    if (!formData.businessName.trim() || formData.businessName.length < 2) {
      newErrors.businessName = 'Please enter your business name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.frustrations.length === 0) {
      newErrors.frustrations = 'Please select at least one frustration';
    }

    if (formData.frustrations.includes('other') && !formData.otherFrustration?.trim()) {
      newErrors.otherFrustration = 'Please specify your other frustration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'landing_page',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission Error:', error);
      setErrors(prev => ({
        ...prev,
        email: error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFrustrationChange = (id: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      frustrations: checked
        ? [...prev.frustrations, id]
        : prev.frustrations.filter(f => f !== id),
    }));
    if (errors.frustrations) {
      setErrors(prev => ({ ...prev, frustrations: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="waitlist" className="section-padding bg-slate-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                You're on the list!
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Thank you for your interest in Terny.sellersupport. We've received your request
                for early access and will be in touch soon.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700">
                  <strong>What's next?</strong> We're onboarding select sellers in batches.
                  You'll receive an email when it's your turn to try Terny.sellersupport.
                </p>
              </div>
              <p className="text-sm text-slate-500">
                Have questions? Email us at{' '}
                <a href="mailto:terny.sellersupport@gmail.com" className="text-blue-600 hover:underline">
                  terny.sellersupport@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="section-padding bg-slate-50">
      <div className="container-max">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10">
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 px-4 py-1.5 text-sm font-medium mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            Limited spots available for beta access
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get Early Access
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join the waitlist to be among the first to use Terny.sellersupport.
            We're onboarding select sellers in batches.
          </p>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="space-y-6">
                {/* Name & Business Name Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      className={`mt-1.5 ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="businessName" className="text-sm font-medium text-slate-700">
                      Business Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Acme Brands LLC"
                      value={formData.businessName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, businessName: e.target.value }));
                        if (errors.businessName) setErrors(prev => ({ ...prev, businessName: undefined }));
                      }}
                      className={`mt-1.5 ${errors.businessName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                    {errors.businessName && (
                      <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@yourcompany.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    className={`mt-1.5 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Monthly Revenue */}
                <div>
                  <Label htmlFor="revenue" className="text-sm font-medium text-slate-700">
                    Monthly Amazon Revenue <span className="text-slate-400 font-normal">(Optional)</span>
                  </Label>
                  <select
                    id="revenue"
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyRevenue: e.target.value }))}
                    className="w-full mt-1.5 h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all duration-150"
                  >
                    {revenueOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Frustrations */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    What is your biggest frustration with Amazon Seller Support? <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {frustrationOptions.map((option) => (
                      <div key={option.id} className="flex items-start gap-3">
                        <Checkbox
                          id={option.id}
                          checked={formData.frustrations.includes(option.id)}
                          onCheckedChange={(checked) =>
                            handleFrustrationChange(option.id, checked as boolean)
                          }
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={option.id}
                          className="text-sm text-slate-600 font-normal cursor-pointer leading-tight"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.frustrations && (
                    <p className="mt-2 text-sm text-red-500">{errors.frustrations}</p>
                  )}

                  {/* Other Frustration Text Input */}
                  <AnimatePresence>
                    {formData.frustrations.includes('other') && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <Input
                          type="text"
                          placeholder="Please specify your frustration..."
                          value={formData.otherFrustration}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, otherFrustration: e.target.value }));
                            if (errors.otherFrustration) setErrors(prev => ({ ...prev, otherFrustration: undefined }));
                          }}
                          className={`mt-3 ${errors.otherFrustration ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        />
                        {errors.otherFrustration && (
                          <p className="mt-1 text-sm text-red-500">{errors.otherFrustration}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Automation Needs */}
                <div>
                  <Label htmlFor="automationNeeds" className="text-sm font-medium text-slate-700 mb-3 block">
                    Do you need any other IT / Automation / Software solutions to manage Amazon?{' '}
                    <span className="text-slate-400 font-normal">(Optional)</span>
                  </Label>
                  <p className="text-sm text-slate-500 mb-2">
                    Where do you need the most consultation/help?
                  </p>
                  <textarea
                    id="automationNeeds"
                    rows={4}
                    placeholder="Tell us about your biggest operational challenges, manual processes you'd like to automate, or software gaps you're trying to fill..."
                    value={formData.automationNeeds}
                    onChange={(e) => setFormData(prev => ({ ...prev, automationNeeds: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all duration-150 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-6 text-lg shadow-lg shadow-blue-700/30 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Request Early Access'
                    )}
                  </Button>
                </div>

                {/* Privacy Note */}
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Lock className="w-4 h-4" />
                  <span>Your information is secure. We never share your data with third parties.</span>
                </div>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
