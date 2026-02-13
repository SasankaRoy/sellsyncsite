import { SectionData } from '@/types/builder';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function AboutSection({ data, variant = 'image-left', isPreview }: AboutSectionProps) {
  const {
    heading,
    description,
    image,
    buttons = [],
    backgroundColor,
    textColor,
    padding,
  } = data;

  const highlights = [
    'Professional expertise',
    'Dedicated support',
    'Proven results',
  ];

  // Centered About Variant
  if (variant === 'centered') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            About Us
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            {heading || 'About Us'}
          </h2>
          {description && (
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80">
              {description}
            </p>
          )}
          <div className="space-y-4 pt-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-base">{item}</span>
              </div>
            ))}
          </div>
          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size={btn.size as any}
                  onClick={(e) => isPreview && e.preventDefault()}
                  className={`group ${idx === 0 ? 'shadow-lg hover:shadow-xl' : ''} transition-all`}
                >
                  {btn.text}
                  {idx === 0 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // About with Stats Variant
  if (variant === 'with-stats') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              About Us
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              {heading || 'About Us'}
            </h2>
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80">
                {description}
              </p>
            )}
          </div>

          {data.stats && data.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {data.stats.map((stat: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size={btn.size as any}
                  onClick={(e) => isPreview && e.preventDefault()}
                  className={`group ${idx === 0 ? 'shadow-lg hover:shadow-xl' : ''} transition-all`}
                >
                  {btn.text}
                  {idx === 0 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Minimal About Variant
  if (variant === 'minimal') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '140px 24px',
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            {heading || 'About Us'}
          </h2>
          {description && (
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-70">
              {description}
            </p>
          )}
          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size={btn.size as any}
                  onClick={(e) => isPreview && e.preventDefault()}
                  className={`group ${idx === 0 ? 'shadow-lg hover:shadow-xl' : ''} transition-all`}
                >
                  {btn.text}
                  {idx === 0 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // About with Timeline Variant
  if (variant === 'timeline') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Our Journey
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              {heading || 'About Us'}
            </h2>
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80">
                {description}
              </p>
            )}
          </div>

          {data.timeline && data.timeline.length > 0 && (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"></div>

              <div className="space-y-12">
                {data.timeline.map((item: any, idx: number) => (
                  <div key={idx} className={`flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
                        <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                        <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center mt-16">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  variant={btn.variant as any}
                  size={btn.size as any}
                  onClick={(e) => isPreview && e.preventDefault()}
                  className={`group ${idx === 0 ? 'shadow-lg hover:shadow-xl' : ''} transition-all`}
                >
                  {btn.text}
                  {idx === 0 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  const renderContent = () => (
    <div className="space-y-8">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          About Us
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          {heading || 'About Us'}
        </h2>
      </div>
      {description && (
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed opacity-80">
          {description}
        </p>
      )}
      <div className="space-y-4">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground text-base">{item}</span>
          </div>
        ))}
      </div>
      {buttons.length > 0 && (
        <div className="flex flex-wrap gap-4 pt-6">
          {buttons.map((btn: any, idx: number) => (
            <Button
              key={idx}
              variant={btn.variant as any}
              size={btn.size as any}
              onClick={(e) => isPreview && e.preventDefault()}
              className={`group ${idx === 0 ? 'shadow-lg hover:shadow-xl' : ''} transition-all`}
            >
              {btn.text}
              {idx === 0 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  const renderImage = () => (
    image && (
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Decorative element */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-2xl -z-10"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
      </div>
    )
  );

  if (variant === 'image-right') {
    return (
      <section
        className="w-full transition-all overflow-hidden"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {renderContent()}
          {renderImage()}
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full transition-all overflow-hidden"
      style={{
        backgroundColor: backgroundColor || 'hsl(var(--background))',
        color: textColor || 'hsl(var(--foreground))',
        padding: padding || '100px 24px',
      }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {renderImage()}
        {renderContent()}
      </div>
    </section>
  );
}
