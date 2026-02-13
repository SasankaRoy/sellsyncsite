export type SectionType =
  | 'navbar'
  | 'hero'
  | 'products'
  | 'features'
  | 'about'
  | 'services'
  | 'gallery'
  | 'blog'
  | 'contact'
  | 'footer'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'team';

export interface ButtonConfig {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

export interface ImageConfig {
  src: string;
  alt: string;
}

export interface SectionData {
  id: string;
  type: SectionType;
  variant?: string;
  data: {
    heading?: string;
    subheading?: string;
    description?: string;
    buttons?: ButtonConfig[];
    image?: ImageConfig;
    items?: Array<{
      id: string;
      [key: string]: any;
    }>;
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    [key: string]: any;
  };
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  sections: SectionData[];
}

export interface WebsiteConfig {
  id: string;
  name: string;
  pages: Page[];
  currentPage: string; // page id
  createdAt: string;
  updatedAt: string;
  deployed?: boolean;
}

export interface TemplateSection {
  id: string;
  name: string;
  type: SectionType;
  variant: string;
  thumbnail: string;
  defaultData: SectionData['data'];
}
