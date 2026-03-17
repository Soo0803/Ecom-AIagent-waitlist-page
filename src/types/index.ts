export interface WaitlistFormData {
  name: string;
  businessName: string;
  email: string;
  monthlyRevenue: string;
  frustrations: string[];
  otherFrustration?: string;
  automationNeeds?: string;
}

export type RevenueRange = '<$10k' | '$10k-$50k' | '$50k-$250k' | '$250k+';

export interface FormErrors {
  name?: string;
  businessName?: string;
  email?: string;
  frustrations?: string;
  otherFrustration?: string;
}
