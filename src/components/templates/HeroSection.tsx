import { SectionData } from '@/types/builder';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function HeroSection({ data, variant = 'centered', isPreview }: HeroSectionProps) {
  const {
    heading,
    subheading,
    description,
    buttons = [],
    image,
    backgroundImage,
    backgroundColor,
    textColor,
    padding,
  } = data;

  const backgroundStyle = backgroundImage?.src
    ? {
      backgroundImage: `url(${backgroundImage.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
    : {
      background: backgroundColor || 'hsl(var(--background))',
    };

  const renderButton = (btn: any, idx: number) => {
    return (
      <Button
        key={idx}
        variant={btn.variant as any}
        size={btn.size as any}
        onClick={(e) => isPreview && e.preventDefault()}
        className="group transition-all duration-300"
      >
        {btn.text}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    );
  };

  // Gradient Hero Variant
  if (variant === 'gradient') {
    return (
      <section
        className="w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${backgroundColor || '#6366f1'}, #8b5cf6, #ec4899)`,
          color: textColor || '#ffffff',
          padding: padding || '120px 24px',
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMy4zMTMgMi42ODctNiA2LTZzNi0yLjY4NyA2LTZ2MzZjMCAzLjMxMy0yLjY4NyA2LTYgNnMtNiAyLjY4Ny02IDZWMTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {subheading && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium">
              {subheading}
            </div>
          )}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            {heading || 'Your Heading Here'}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95 leading-relaxed">
              {description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            {buttons.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                size={btn.size as any}
                onClick={(e) => isPreview && e.preventDefault()}
                className={`group transition-all duration-300 text-white ${btn.variant === 'outline' || btn.variant === 'secondary'
                  ? 'border-2 border-white bg-white/10 hover:bg-white hover:text-purple-600'
                  : 'bg-white/20 hover:bg-white hover:text-purple-600'
                  }`}
              >
                {btn.text}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Video Background Hero Variant  
  if (variant === 'video') {
    return (
      <section className="w-full relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {data.videoUrl ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={data.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: backgroundImage?.src ? `url(${backgroundImage.src})` : undefined,
                backgroundColor: backgroundColor || '#000000',
              }}
            />
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/50 to-black/65 z-10"></div>

        {/* Content */}
        <div className="relative z-20 w-full px-6 py-20">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            {subheading && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                {subheading}
              </div>
            )}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white tracking-tight">
              {heading || 'Your Heading Here'}
            </h1>
            {description && (
              <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed text-white/90">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="lg"
                  onClick={(e) => isPreview && e.preventDefault()}
                  className={`px-8 py-6 text-lg font-semibold ${btn.variant === 'primary' ? 'bg-white text-black hover:bg-gray-100' : ''
                    }`}
                >
                  {idx === 0 && <Play className="mr-2 h-5 w-5" />}
                  {btn.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Image Right Hero Variant
  if (variant === 'image-right') {
    return (
      <section
        className="w-full"
        style={{
          ...backgroundStyle,
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            {subheading && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                {subheading}
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{ color: textColor }}>
              {heading || 'Your Heading Here'}
            </h1>
            {description && (
              <p className="text-lg md:text-xl leading-relaxed opacity-80" style={{ color: textColor }}>
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 pt-2">
              {buttons.map((btn: any, idx: number) => renderButton(btn, idx))}
            </div>
          </div>

          {image && (
            <div className="relative order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Full Screen Hero Variant
  if (variant === 'fullscreen') {
    return (
      <section
        className="w-full relative flex items-center justify-center min-h-screen"
        style={{
          backgroundColor: backgroundColor || '#000000',
        }}
      >
        {image && image.src && (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
          </>
        )}

        <div className="relative z-20 w-full px-6 py-20">
          <div className="max-w-7xl mx-auto text-center space-y-10">
            {subheading && (
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium">
                {subheading}
              </div>
            )}

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none text-white tracking-tight max-w-6xl mx-auto">
              {heading || 'Your Heading Here'}
            </h1>

            {description && (
              <p className="text-2xl md:text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed text-white/90">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-6 justify-center pt-10">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size="lg"
                  onClick={(e) => isPreview && e.preventDefault()}
                  className={`px-12 py-7 text-xl font-bold text-white ${btn.variant === 'primary'
                    ? 'bg-white/20 hover:bg-white hover:text-black'
                    : 'border-2 border-white bg-white/10 hover:bg-white hover:text-black'
                    }`}
                >
                  {btn.text}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // CTA Focused Hero Variant
  if (variant === 'cta-focused') {
    return (
      <section
        className="w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor || '#10b981'} 0%, #059669 100%)`,
          color: textColor || '#ffffff',
          padding: padding || '120px 24px',
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {subheading && (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white font-bold shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              {subheading}
            </div>
          )}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
            {heading || 'Your Heading Here'}
          </h1>
          {description && (
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-medium">
              {description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 justify-center pt-8">
            {buttons.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                size="lg"
                onClick={(e) => isPreview && e.preventDefault()}
                className="px-12 py-7 text-xl font-bold hover:scale-105 transition-transform"
              >
                {btn.text}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            ))}
          </div>

          {data.stats && data.stats.length > 0 && (
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              {data.stats.map((stat: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Minimal Hero Variant
  if (variant === 'minimal') {
    return (
      <section
        className="w-full"
        style={{
          ...backgroundStyle,
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '140px 24px',
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight" style={{ color: textColor }}>
            {heading || 'Your Heading Here'}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-70" style={{ color: textColor }}>
              {description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            {buttons.map((btn: any, idx: number) => renderButton(btn, idx))}
          </div>
        </div>
      </section>
    );
  }

  // Split Hero Variant
  if (variant === 'split') {
    return (
      <section
        className="w-full"
        style={{
          ...backgroundStyle,
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {subheading && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                {subheading}
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{ color: textColor }}>
              {heading || 'Your Heading Here'}
            </h1>
            {description && (
              <p className="text-lg md:text-xl leading-relaxed opacity-80" style={{ color: textColor }}>
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 pt-2">
              {buttons.map((btn: any, idx: number) => renderButton(btn, idx))}
            </div>
          </div>

          {image && (
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default Centered Hero
  return (
    <section
      className="w-full"
      style={{
        ...backgroundStyle,
        color: textColor || 'hsl(var(--foreground))',
        padding: padding || '100px 24px',
      }}
    >
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {subheading && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {subheading}
          </div>
        )}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight" style={{ color: textColor }}>
          {heading || 'Your Heading Here'}
        </h1>
        {description && (
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{ color: textColor }}>
            {description}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          {buttons.map((btn: any, idx: number) => renderButton(btn, idx))}
        </div>
      </div>
    </section>
  );
}
