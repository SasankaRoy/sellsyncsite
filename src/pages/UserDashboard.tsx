import { useBuilder } from '@/contexts/BuilderContext';
import { SectionRenderer } from '@/components/templates/SectionRenderer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Layers, Sparkles, FileText, Wand2, ArrowRight, Palette, Zap, Eye, MousePointer, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { useState } from 'react';

export default function UserDashboard() {
  const { config, sections, isLoading } = useBuilder();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const isDeployed = location.pathname === '/website';
  const isFromBuilder = location.pathname === '/dashboard';

  const features = [
    {
      icon: Layers,
      title: 'Drag & Drop Builder',
      description: 'Easily build websites by dragging and dropping pre-built sections onto your canvas.',
    },
    {
      icon: Palette,
      title: 'Customizable Templates',
      description: 'Choose from multiple variants and customize colors, text, and images to match your brand.',
    },
    {
      icon: Sparkles,
      title: 'Professional Designs',
      description: 'Every template is crafted with modern design principles for a stunning result.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Build and preview your website in real-time with instant updates.',
    },
  ];

  const allSections = sections;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading website...</p>
        </div>
      </div>
    );
  }

  if (isDeployed && !config.deployed) {
    return null;
  }

  if (allSections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="text-center space-y-4 sm:space-y-8 p-6 sm:p-8 max-w-lg">
          <div className="relative mx-auto w-16 h-16 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">No Website Content</h1>
            <p className="text-sm sm:text-lg text-muted-foreground">
              Your website canvas is empty. Head to the builder to create something amazing.
            </p>
          </div>
          
          <Button 
            size="sm"
            onClick={() => navigate('/builder')}
            className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all sm:size-lg px-6 sm:px-8 h-10 sm:h-14 text-sm sm:text-base gap-1 sm:gap-2"
          >
            <Wand2 className="h-4 w-4 sm:h-5 sm:w-5" />
            Start Building
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {isFromBuilder && (
        <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-background/80 backdrop-blur-xl rounded-full border shadow-lg">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Layers className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium">Preview Mode</span>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/builder')}
            className="shadow-lg hover:shadow-xl transition-all bg-white/90 backdrop-blur-xl border border-slate-200 h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm gap-1 sm:gap-2 text-slate-900 font-medium"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Back to Editor</span>
          </Button>
        </div>
      )}

      {allSections.map((section) => (
        <SectionRenderer key={section.id} section={section} isPreview />
      ))}
    </div>
  );
}





