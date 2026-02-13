import React, { useEffect, useState } from 'react';
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";

interface Section {
  id: string;
  title: string;
}

interface PolicyLayoutProps {
  title: string;
  sections: Section[];
  children: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, sections, children }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#1C244B] text-white pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">{title}</h1>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 py-12 sm:py-20 relative">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">

            {/* Sidebar Navigation (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 relative">
              <div className="sticky top-32 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-extrabold uppercase tracking-wide mb-4 text-[#1C244B]">
                  On this page
                </h3>
                <nav className="flex flex-col space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left py-2 px-3 text-sm rounded-lg transition-all duration-200 block w-full ${activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                        }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#1C244B] prose-a:text-blue-600 prose-img:rounded-xl">
                {children}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyLayout;
