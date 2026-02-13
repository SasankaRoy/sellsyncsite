import React, { createContext, useContext, useState, useEffect } from 'react';
import { SectionData, WebsiteConfig, Page } from '@/types/builder';
import { templateSections } from '@/lib/templates';

interface BuilderContextType {
  config: WebsiteConfig;
  sections: SectionData[];
  selectedSection: string | null;
  currentPage: Page | null;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  addSection: (section: SectionData) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, data: Partial<SectionData['data']>) => void;
  reorderSections: (sections: SectionData[]) => void;
  selectSection: (id: string | null) => void;
  addPage: (name: string, slug: string, templateId?: string) => void;
  removePage: (pageId: string) => void;
  switchPage: (pageId: string) => void;
  saveWebsite: () => Promise<void>;
  loadWebsite: () => void;
  deployWebsite: () => Promise<void>;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// Default sections for new websites
const getDefaultSections = (): SectionData[] => [
  {
    id: 'navbar-default',
    type: 'navbar',
    variant: 'simple',
    data: {
      websiteName: 'My Website',
      logo: '',
      links: [
        { id: '1', text: 'Home', href: '#home' },
        { id: '2', text: 'Products', href: '#products' },
        { id: '3', text: 'Blog', href: '#blog' },
        { id: '4', text: 'Contact', href: '#contact' },
      ],
      buttons: [
        {
          text: 'Get Started',
          href: '#contact',
          variant: 'primary' as const,
          size: 'md' as const,
        },
      ],
      backgroundColor: '#ffffff',
      textColor: '#000000',
    },
  },
  {
    id: 'hero-default',
    type: 'hero',
    variant: 'centered',
    data: {
      heading: 'Welcome to My Website',
      subheading: 'Build something amazing',
      description: 'Create stunning websites with our intuitive drag-and-drop builder. No coding required.',
      buttons: [
        {
          text: 'Get Started',
          href: '#contact',
          variant: 'primary' as const,
          size: 'lg' as const,
        },
        {
          text: 'Learn More',
          href: '#about',
          variant: 'outline' as const,
          size: 'lg' as const,
        },
      ],
      backgroundColor: '#ffffff',
      textColor: '#000000',
      padding: '120px 24px',
    },
  },
  {
    id: 'about-default',
    type: 'about',
    variant: 'image-right',
    data: {
      heading: 'About Us',
      description: 'We are passionate about helping businesses create stunning online experiences. Our platform empowers users to build professional websites without any coding knowledge.',
      image: {
        src: 'https://sellsynctemplatebackend.onrender.com/assets/about-default.jpg',
        alt: 'About Us',
      },
      buttons: [
        {
          text: 'Learn More',
          href: '#services',
          variant: 'primary' as const,
          size: 'md' as const,
        },
      ],
      backgroundColor: '#f1f5f9',
      textColor: '#000000',
      padding: '80px 24px',
    },
  },
  {
    id: 'services-default',
    type: 'services',
    variant: 'grid',
    data: {
      heading: 'Our Services',
      description: 'Comprehensive solutions for your digital needs',
      items: [
        {
          id: '1',
          image: { src: 'https://sellsynctemplatebackend.onrender.com/assets/service-1.jpg', alt: 'Web Development' },
          title: 'Web Development',
          description: 'Custom websites built with modern technologies',
          link: '#contact',
        },
        {
          id: '2',
          image: { src: 'https://sellsynctemplatebackend.onrender.com/assets/service-2.jpg', alt: 'Mobile Apps' },
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile solutions',
          link: '#contact',
        },
        {
          id: '3',
          image: { src: 'https://sellsynctemplatebackend.onrender.com/assets/service-3.jpg', alt: 'Branding' },
          title: 'Branding & Design',
          description: 'Complete brand identity and design services',
          link: '#contact',
        },
      ],
      backgroundColor: '#ffffff',
      textColor: '#000000',
      padding: '80px 24px',
    },
  },
  {
    id: 'contact-default',
    type: 'contact',
    variant: 'centered',
    data: {
      heading: 'Get In Touch',
      description: 'Have a question? We\'d love to hear from you.',
      backgroundColor: '#f1f5f9',
      textColor: '#000000',
      padding: '80px 24px',
    },
  },
  {
    id: 'footer-default',
    type: 'footer',
    variant: 'simple',
    data: {
      logo: 'My Website',
      description: 'Build beautiful websites with ease.',
      links: [
        { id: '1', text: 'Privacy', href: '#' },
        { id: '2', text: 'Terms', href: '#' },
        { id: '3', text: 'Contact', href: '#' },
      ],
      copyright: '© 2024 My Website. All rights reserved.',
      backgroundColor: '#f1f5f9',
      textColor: '#000000',
      padding: '40px 24px',
    },
  },
];

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<WebsiteConfig>({
    id: '1',
    name: 'My Website',
    pages: [{
      id: 'home',
      name: 'Home',
      slug: 'home',
      sections: getDefaultSections(),
    }],
    currentPage: 'home',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deployed: false,
  });

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = config.pages.find(p => p.id === config.currentPage) || null;
  const sections = currentPage ? currentPage.sections : [];

  // Load website on mount
  useEffect(() => {
    loadWebsite();
  }, []);

  // Auto-save when there are unsaved changes (debounced)
  useEffect(() => {
    if (!hasUnsavedChanges || isLoading) return;

    const autoSaveTimer = setTimeout(() => {
      saveWebsite().catch(error => {
        console.error('Auto-save failed:', error);
        // Keep hasUnsavedChanges = true so user is aware
      });
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [hasUnsavedChanges, config]);

  const loadWebsite = async () => {
    try {
      const response = await fetch('https://sellsynctemplatebackend.onrender.com/api/website');
      if (response.ok) {
        const website = await response.json();
        if (website) {
          // Migrate old config to new structure if needed
          let migratedConfig = website;
          if (!website.pages) {
            migratedConfig = {
              ...website,
              pages: [{
                id: 'home',
                name: 'Home',
                slug: 'home',
                sections: website.sections || [],
              }],
              currentPage: 'home',
            };
            delete migratedConfig.sections; // remove old sections
          }
          setConfig(migratedConfig);
        }
      } else if (response.status === 404) {
        // No website exists yet, use defaults
        console.log('No website found, using defaults');
      } else {
        throw new Error(`Failed to load website: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to load website config from backend:', error);
      // Don't fallback to localStorage - require backend to be available
      throw error;
    }
    setIsLoading(false);
  };

  const saveWebsite = async () => {
    const updated = {
      ...config,
      updatedAt: new Date().toISOString(),
    };
    setConfig(updated);

    try {
      const response = await fetch('https://sellsynctemplatebackend.onrender.com/api/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      });

      if (response.ok) {
        setHasUnsavedChanges(false);
      } else {
        throw new Error(`Failed to save to server: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to save to server:', error);
      setHasUnsavedChanges(true);
      throw error;
    }
  };

  const deployWebsite = async () => {
    const updated = {
      ...config,
      deployed: true,
      updatedAt: new Date().toISOString(),
    };
    setConfig(updated);

    try {
      const response = await fetch('https://sellsynctemplatebackend.onrender.com/api/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      });

      if (response.ok) {
        setHasUnsavedChanges(false);
      } else {
        throw new Error(`Failed to deploy to server: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to deploy to server:', error);
      setHasUnsavedChanges(true);
      throw error;
    }
  };

  const addSection = (section: SectionData) => {
    setConfig((prev) => {
      const updatedPages = prev.pages.map(page => {
        if (page.id === prev.currentPage) {
          const newSections = [...page.sections, section];

          // Sort sections in logical website order
          const sortedSections = newSections.sort((a, b) => {
            const typeOrder: Record<string, number> = {
              navbar: 0,
              hero: 1,
              products: 2,
              features: 3,
              about: 4,
              services: 5,
              gallery: 6,
              blog: 7,
              testimonials: 6,
              team: 9,
              pricing: 10,
              faq: 11,
              contact: 12,
              footer: 13,
            };

            const orderA = typeOrder[a.type] ?? 99;
            const orderB = typeOrder[b.type] ?? 99;

            if (orderA !== orderB) {
              return orderA - orderB;
            }

            // For same type, sort by id (which contains timestamp)
            return a.id.localeCompare(b.id);
          });

          return { ...page, sections: sortedSections };
        }
        return page;
      });

      return {
        ...prev,
        pages: updatedPages,
      };
    });
    setHasUnsavedChanges(true);
  };

  const removeSection = (id: string) => {
    const updatedConfig = {
      ...config,
      pages: config.pages.map(page =>
        page.id === config.currentPage
          ? { ...page, sections: page.sections.filter((s) => s.id !== id) }
          : page
      ),
      updatedAt: new Date().toISOString(),
    };

    setConfig(updatedConfig);

    if (selectedSection === id) {
      setSelectedSection(null);
    }

    // Save immediately - don't wait for auto-save
    fetch('https://sellsynctemplatebackend.onrender.com/api/website', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedConfig),
    })
      .then(response => {
        if (response.ok) {
          setHasUnsavedChanges(false);
          console.log('Section deleted and saved to backend');
        } else {
          setHasUnsavedChanges(true);
          console.error('Failed to save deletion to backend');
        }
      })
      .catch(error => {
        console.error('Error saving deletion:', error);
        setHasUnsavedChanges(true);
      });
  };

  const updateSection = (id: string, data: Partial<SectionData['data']>) => {
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === prev.currentPage
          ? {
            ...page, sections: page.sections.map((s) =>
              s.id === id ? { ...s, data: { ...s.data, ...data } } : s
            )
          }
          : page
      ),
    }));
    setHasUnsavedChanges(true);
  };

  const reorderSections = (sections: SectionData[]) => {
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === prev.currentPage
          ? { ...page, sections }
          : page
      ),
    }));
    setHasUnsavedChanges(true);
  };

  const addPage = (name: string, slug: string, templateId?: string) => {
    // Find the current navbar section
    const currentNavbar = sections.find(s => s.type === 'navbar');
    let initialSections = currentNavbar ? [currentNavbar] : [];

    if (templateId) {
      const template = templateSections.find(t => t.id === templateId);
      if (template) {
        const sectionData: SectionData = {
          id: `${template.type}-${Date.now()}`,
          type: template.type,
          variant: template.variant,
          data: { ...template.defaultData },
        };
        initialSections.push(sectionData);
      }
    }

    const newPage: Page = {
      id: slug,
      name,
      slug,
      sections: initialSections,
    };

    setConfig((prev) => {
      // Add the new page
      const updatedPages = [...prev.pages, newPage];

      // Update all navbar sections to include the new page link
      const pagesWithUpdatedNavbars = updatedPages.map(page => {
        const updatedSections = page.sections.map(section => {
          if (section.type === 'navbar') {
            const links = [...(section.data.links || [])];
            // Check if link already exists
            const linkExists = links.some(link => link.href === slug);
            if (!linkExists) {
              links.push({
                id: `link-${slug}`,
                text: name,
                href: slug,
              });
            }
            return {
              ...section,
              data: {
                ...section.data,
                links,
              },
            };
          }
          return section;
        });
        return {
          ...page,
          sections: updatedSections,
        };
      });

      return {
        ...prev,
        pages: pagesWithUpdatedNavbars,
      };
    });
    setHasUnsavedChanges(true);
  };

  const switchPage = (pageId: string) => {
    setConfig((prev) => ({
      ...prev,
      currentPage: pageId,
    }));
    setSelectedSection(null);
  };

  const removePage = (pageId: string) => {
    setConfig((prev) => {
      const newPages = prev.pages.filter(p => p.id !== pageId);
      let newCurrentPage = prev.currentPage;
      if (prev.currentPage === pageId) {
        newCurrentPage = newPages[0]?.id || 'home';
      }
      return {
        ...prev,
        pages: newPages,
        currentPage: newCurrentPage,
      };
    });
    setHasUnsavedChanges(true);
  };

  const selectSection = (id: string | null) => {
    setSelectedSection(id);
  };

  return (
    <BuilderContext.Provider
      value={{
        config,
        sections,
        selectedSection,
        currentPage,
        hasUnsavedChanges,
        isLoading,
        addSection,
        removeSection,
        updateSection,
        reorderSections,
        selectSection,
        addPage,
        removePage,
        switchPage,
        saveWebsite,
        loadWebsite,
        deployWebsite,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider');
  }
  return context;
}
