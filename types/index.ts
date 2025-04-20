export interface PreviewData {
  id: string;
  previewPdfUrl: string;
  actualPdfUrl: string;
  expiresAt: string;
  isPaid: boolean;
  createdAt: string;
  stripeSessionId: string;
  paidAt: string;
}

export interface PdfData {
  isPaid: boolean;
  expiresAt: string;
  actualPdfUrl: string;
  stripeSessionId?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface PricingFeature {
  feature: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  available?: boolean;
}
