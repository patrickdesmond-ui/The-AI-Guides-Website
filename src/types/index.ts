export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  categories?: string[];
  tags?: string[];
  featuredImage?: string;
  readingTime?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  categories?: string[];
  tags?: string[];
  featuredImage?: string;
  readingTime?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  challenge: string;
  whatWeDo: string;
  outcomes: string;
}

export interface Package {
  title: string;
  price: string;
  timeline: string;
  includes: string[];
  whatYouGet: string;
  bestFor: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface Resource {
  title: string;
  description: string;
  image: string;
  url: string;
}
