import { SectionData } from '@/types/builder';
import { Button } from '@/components/ui/button';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';

interface NavbarSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function NavbarSection({ data, variant = 'simple', isPreview }: NavbarSectionProps) {
  const { config, switchPage } = useBuilder();
  const { websiteName, logo, links = [], buttons = [], backgroundColor, textColor, showSearch } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark Theme Variant
  if (variant === 'dark') {
    return (
      <nav
        className={`w-full py-4 px-6 border-b border-white/10 transition-all backdrop-blur-md ${isPreview ? 'relative' : 'sticky top-0 z-50'}`}
        style={{
          background: backgroundColor === '#1a1a1a'
            ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)'
            : backgroundColor || '#1a1a1a',
          color: textColor || '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
              {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : logo && logo.startsWith('data:image') ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold">
                  {(websiteName || 'S').charAt(0)}
                </span>
              )}
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {websiteName || 'Website'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-all relative group"
                style={{ color: textColor || '#ffffff' }}
                onClick={(e) => {
                  if (isPreview) {
                    e.preventDefault();
                    const href = link.href;
                    const page = config.pages.find(p => p.slug === href || p.id === href);
                    if (page) {
                      switchPage(page.id);
                    } else {
                      const targetId = href.startsWith('#') ? href.slice(1) : href;
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }
                }}
              >
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {buttons.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                size="sm"
                onClick={(e) => isPreview && e.preventDefault()}
                className={idx === buttons.length - 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg' : ''}
              >
                {btn.text}
              </Button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-2">
            {links.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-all"
                style={{ color: textColor || '#ffffff' }}
                onClick={(e) => {
                  if (isPreview) {
                    e.preventDefault();
                    const href = link.href;
                    const page = config.pages.find(p => p.slug === href || p.id === href);
                    if (page) {
                      switchPage(page.id);
                      setMobileMenuOpen(false);
                    }
                  }
                }}
              >
                {link.text}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="sm"
                  onClick={(e) => isPreview && e.preventDefault()}
                  className="w-full"
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Minimalist Variant
  if (variant === 'minimal') {
    return (
      <nav
        className={`w-full py-6 px-6 transition-all ${isPreview ? 'relative' : 'sticky top-0 z-50'}`}
        style={{
          backgroundColor: backgroundColor || '#ffffff',
          color: textColor || '#000000',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-light tracking-wide" style={{ color: textColor }}>
              {websiteName || 'Website'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm font-normal relative group py-1"
                style={{ color: textColor }}
                onClick={(e) => {
                  if (isPreview) {
                    e.preventDefault();
                    const href = link.href;
                    const page = config.pages.find(p => p.slug === href || p.id === href);
                    if (page) {
                      switchPage(page.id);
                    }
                  }
                }}
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            {buttons.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                size={btn.size as any}
                onClick={(e) => isPreview && e.preventDefault()}
                className="rounded-full px-6"
              >
                {btn.text}
              </Button>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-6 space-y-4">
            {links.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="block text-sm font-normal"
                style={{ color: textColor }}
              >
                {link.text}
              </a>
            ))}
            <div className="pt-2">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="sm"
                  className="w-full rounded-full"
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Boxed Variant
  if (variant === 'boxed') {
    return (
      <div
        className="w-full py-4 px-6"
        style={{
          backgroundColor: backgroundColor || '#f8f9fa',
          color: textColor || '#000000',
        }}
      >
        <nav
          className={`max-w-7xl mx-auto rounded-2xl px-6 py-4 shadow-lg border transition-all ${isPreview ? 'relative' : 'sticky top-0 z-50'}`}
          style={{
            backgroundColor: '#ffffff',
            borderColor: 'rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden">
                {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : logo && logo.startsWith('data:image') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-sm">
                    {(websiteName || 'S').charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-lg font-semibold" style={{ color: textColor }}>
                {websiteName || 'Website'}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {links.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-xl transition-all"
                  style={{ color: textColor }}
                  onClick={(e) => {
                    if (isPreview) {
                      e.preventDefault();
                      const href = link.href;
                      const page = config.pages.find(p => p.slug === href || p.id === href);
                      if (page) {
                        switchPage(page.id);
                      }
                    }
                  }}
                >
                  {link.text}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="sm"
                  onClick={(e) => isPreview && e.preventDefault()}
                  className="rounded-xl"
                >
                  {btn.text}
                </Button>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t space-y-2">
              {links.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-xl"
                  style={{ color: textColor }}
                >
                  {link.text}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                {buttons.map((btn: any, idx: number) => (
                  <Button
                    key={idx}
                    variant={btn.variant as any}
                    size="sm"
                    className="w-full rounded-xl"
                  >
                    {btn.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    );
  }

  // Split Navigation Variant
  if (variant === 'split') {
    const midPoint = Math.ceil(links.length / 2);
    const leftLinks = links.slice(0, midPoint);
    const rightLinks = links.slice(midPoint);

    return (
      <nav
        className={`w-full py-4 px-6 border-b transition-all backdrop-blur-md ${isPreview ? 'relative' : 'sticky top-0 z-50'}`}
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background) / 0.95)',
          color: textColor || 'hsl(var(--foreground))',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-1 flex-1">
              {leftLinks.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-all"
                  style={{ color: textColor }}
                  onClick={(e) => {
                    if (isPreview) {
                      e.preventDefault();
                      const href = link.href;
                      const page = config.pages.find(p => p.slug === href || p.id === href);
                      if (page) {
                        switchPage(page.id);
                      }
                    }
                  }}
                >
                  {link.text}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 px-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : logo && logo.startsWith('data:image') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold">
                    {(websiteName || 'S').charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-lg font-bold" style={{ color: textColor }}>
                {websiteName || 'Website'}
              </span>
            </div>

            <div className="flex items-center gap-1 flex-1 justify-end">
              {rightLinks.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-all"
                  style={{ color: textColor }}
                  onClick={(e) => {
                    if (isPreview) {
                      e.preventDefault();
                      const href = link.href;
                      const page = config.pages.find(p => p.slug === href || p.id === href);
                      if (page) {
                        switchPage(page.id);
                      }
                    }
                  }}
                >
                  {link.text}
                </a>
              ))}
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="sm"
                  onClick={(e) => isPreview && e.preventDefault()}
                  className="ml-2"
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : logo && logo.startsWith('data:image') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-sm">
                    {(websiteName || 'S').charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-lg font-bold" style={{ color: textColor }}>
                {websiteName || 'Website'}
              </span>
            </div>
            <button
              className="p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-2">
              {links.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg"
                  style={{ color: textColor }}
                >
                  {link.text}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                {buttons.map((btn: any, idx: number) => (
                  <Button
                    key={idx}
                    variant={btn.variant as any}
                    size="sm"
                    className="w-full"
                  >
                    {btn.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  // With Search Variant
  if (variant === 'with-search') {
    return (
      <nav
        className={`w-full py-4 px-6 border-b transition-all backdrop-blur-md ${isPreview ? 'relative' : 'sticky top-0 z-50'}`}
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background) / 0.95)',
          color: textColor || 'hsl(var(--foreground))',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden">
              {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : logo && logo.startsWith('data:image') ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-sm">
                  {(websiteName || 'S').charAt(0)}
                </span>
              )}
            </div>
            <span className="text-lg font-semibold" style={{ color: textColor }}>
              {websiteName || 'Website'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 flex-1 max-w-md">
            {links.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-all whitespace-nowrap"
                style={{ color: textColor }}
                onClick={(e) => {
                  if (isPreview) {
                    e.preventDefault();
                    const href = link.href;
                    const page = config.pages.find(p => p.slug === href || p.id === href);
                    if (page) {
                      switchPage(page.id);
                    }
                  }
                }}
              >
                {link.text}
              </a>
            ))}
          </div>

          {showSearch && (
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  style={{ color: textColor }}
                />
              </div>
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            {buttons.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                size="sm"
                onClick={(e) => isPreview && e.preventDefault()}
              >
                {btn.text}
              </Button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-muted/50 text-sm"
                  style={{ color: textColor }}
                />
              </div>
            )}
            {links.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg"
                style={{ color: textColor }}
              >
                {link.text}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="sm"
                  className="w-full"
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
  }

  if (variant === 'centered') {
    return (
      <nav
        className={`w-full py-4 px-6 border-b transition-all backdrop-blur-md ${isPreview ? 'relative' : 'sticky top-0 z-50'}`}
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background) / 0.95)',
          color: textColor || 'hsl(var(--foreground))',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : logo && logo.startsWith('data:image') ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-sm">
                    {(websiteName || 'S').charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ color: textColor }}>{websiteName || 'Website'}</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {links.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-all"
                  style={{ color: textColor }}
                  onClick={(e) => {
                    if (isPreview) {
                      e.preventDefault();
                      const href = link.href;
                      // Check if it's a page slug
                      const page = config.pages.find(p => p.slug === href || p.id === href);
                      if (page) {
                        switchPage(page.id);
                      } else {
                        const targetId = href.startsWith('#') ? href.slice(1) : href;
                        const element = document.getElementById(targetId);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }
                  }}
                >
                  {link.text}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="sm"
                  onClick={(e) => isPreview && e.preventDefault()}
                  className={idx === buttons.length - 1 ? 'shadow-sm' : ''}
                >
                  {btn.text}
                </Button>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-2">
              {links.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-all"
                  style={{ color: textColor }}
                  onClick={(e) => {
                    if (isPreview) {
                      e.preventDefault();
                      const href = link.href;
                      // Check if it's a page slug
                      const page = config.pages.find(p => p.slug === href || p.id === href);
                      if (page) {
                        switchPage(page.id);
                        setMobileMenuOpen(false);
                      } else {
                        const targetId = href.startsWith('#') ? href.slice(1) : href;
                        const element = document.getElementById(targetId);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }
                  }}
                >
                  {link.text}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                {buttons.map((btn: any, idx: number) => (
                  <Button
                    key={idx}
                    variant={btn.variant as any}
                    size="sm"
                    onClick={(e) => isPreview && e.preventDefault()}
                    className="w-full"
                  >
                    {btn.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  if (variant === 'transparent') {
    return (
      <nav
        className={`w-full py-5 px-6 transition-all ${isPreview ? 'relative' : 'absolute top-0 left-0 z-50'}`}
        style={{
          backgroundColor: backgroundColor || 'transparent',
          color: textColor || 'hsl(var(--foreground))',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden">
              {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : logo && logo.startsWith('data:image') ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold">
                  {(websiteName || 'S').charAt(0)}
                </span>
              )}
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: textColor }}>{websiteName || 'Website'}</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-all"
                style={{ color: textColor }}
                onClick={(e) => {
                  if (isPreview) {
                    e.preventDefault();
                    const href = link.href;
                    // Check if it's a page slug
                    const page = config.pages.find(p => p.slug === href || p.id === href);
                    if (page) {
                      switchPage(page.id);
                    } else {
                      const targetId = href.startsWith('#') ? href.slice(1) : href;
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }
                }}
              >
                {link.text}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {buttons.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                size="sm"
                onClick={(e) => isPreview && e.preventDefault()}
                className={idx === buttons.length - 1 ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' : ''}
              >
                {btn.text}
              </Button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    );
  }

  // Default simple variant
  return (
    <nav
      className={`w-full py-4 px-6 border-b transition-all backdrop-blur-md ${isPreview ? 'relative' : 'sticky top-0 z-50'}`}
      style={{
        backgroundColor: backgroundColor || 'hsl(var(--background) / 0.95)',
        color: textColor || 'hsl(var(--foreground))',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden">
            {logo && !logo.startsWith('data:image') && logo.includes('.') ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            ) : logo && logo.startsWith('data:image') ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold">
                {(websiteName || 'S').charAt(0)}
              </span>
            )}
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ color: textColor }}>{websiteName || 'Website'}</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link: any) => (
            <a
              key={link.id}
              href={link.href}
              className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-all"
              style={{ color: textColor }}
              onClick={(e) => {
                if (isPreview) {
                  e.preventDefault();
                  const href = link.href;
                  // Check if it's a page slug
                  const page = config.pages.find(p => p.slug === href || p.id === href);
                  if (page) {
                    switchPage(page.id);
                  } else {
                    const targetId = href.startsWith('#') ? href.slice(1) : href;
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }
              }}
            >
              {link.text}
            </a>
          ))}
        </div>        <div className="hidden md:flex items-center gap-3">
          {buttons.map((btn: any, idx: number) => (
            <Button
              key={idx}
              variant={btn.variant as any}
              size="sm"
              onClick={(e) => isPreview && e.preventDefault()}
              className={idx === buttons.length - 1 ? 'shadow-md hover:shadow-lg transition-shadow' : ''}
            >
              {btn.text}
            </Button>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-2">
          {links.map((link: any) => (
            <a
              key={link.id}
              href={link.href}
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-all"
              style={{ color: textColor }}
              onClick={(e) => {
                if (isPreview) {
                  e.preventDefault();
                  const href = link.href;
                  // Check if it's a page slug
                  const page = config.pages.find(p => p.slug === href || p.id === href);
                  if (page) {
                    switchPage(page.id);
                    setMobileMenuOpen(false);
                  } else {
                    const targetId = href.startsWith('#') ? href.slice(1) : href;
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }
              }}
            >
              {link.text}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            {buttons.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                size="sm"
                onClick={(e) => isPreview && e.preventDefault()}
                className="w-full"
              >
                {btn.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
