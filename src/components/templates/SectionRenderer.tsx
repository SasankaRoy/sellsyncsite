import { SectionData } from '@/types/builder';
import { NavbarSection } from './NavbarSection';
import { HeroSection } from './HeroSection';
import { ProductsSection } from './ProductsSection';
import { FeaturesSection } from './FeaturesSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { GallerySection } from './GallerySection';
import { BlogSection } from './BlogSection';
import { ContactSection } from './ContactSection';
import { FooterSection } from './FooterSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { TeamSection } from './TeamSection';

interface SectionRendererProps {
  section: SectionData;
  isPreview?: boolean;
}

const sectionIdMap: Record<string, string> = {
  hero: 'home',
  products: 'products',
  features: 'features',
  about: 'about',
  services: 'services',
  gallery: 'gallery',
  blog: 'blog',
  contact: 'contact',
  footer: 'footer',
  testimonials: 'testimonials',
  pricing: 'pricing',
  faq: 'faq',
  team: 'team',
  navbar: 'navbar'
};

export function SectionRenderer({ section, isPreview }: SectionRendererProps) {
  const renderSection = () => {
    switch (section.type) {
      case 'navbar':
        return <NavbarSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'hero':
        return <HeroSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'products':
        return <ProductsSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'features':
        return <FeaturesSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'about':
        return <AboutSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'services':
        return <ServicesSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'gallery':
        return <GallerySection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'blog':
        return <BlogSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'contact':
        return <ContactSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'footer':
        return <FooterSection data={section.data} isPreview={isPreview} />;
      case 'testimonials':
        return <TestimonialsSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'pricing':
        return <PricingSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      case 'faq':
        return <FAQSection data={section.data} isPreview={isPreview} />;
      case 'team':
        return <TeamSection data={section.data} variant={section.variant} isPreview={isPreview} />;
      default:
        return null;
    }
  };

  return (
    <div id={sectionIdMap[section.type] || section.type}>
      {renderSection()}
    </div>
  );
}
