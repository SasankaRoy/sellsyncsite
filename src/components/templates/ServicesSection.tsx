import { SectionData } from '@/types/builder';
import { Card, CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function ServicesSection({ data, variant = 'grid', isPreview }: ServicesSectionProps) {
  const {
    heading,
    description,
    items = [],
    backgroundColor,
    textColor,
    padding,
  } = data;

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Briefcase;
    return Icon;
  };

  const getGradientColor = (index: number): string => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-red-600',
      'from-cyan-500 to-blue-600',
    ];
    return gradients[index % gradients.length];
  };

  if (variant === 'list') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--muted))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              What We Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{color: textColor}}>
              {heading || 'Our Services'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{color: textColor, opacity: 0.8}}>
                {description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item.id}
                  className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:-translate-y-0.5"
                >
                  <CardContent className="p-6 flex gap-6 items-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{color: textColor}}>{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                      {item.link && (
                        <a
                          href={item.link}
                          className="inline-flex items-center text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                          onClick={(e) => isPreview && e.preventDefault()}
                        >
                          Learn more <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Services with Cards Variant
  if (variant === 'cards') {
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
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{color: textColor}}>
              {heading || 'Our Services'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{color: textColor, opacity: 0.8}}>
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card"
                >
                  <CardContent className="p-8 text-center space-y-4">
                    <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{color: textColor}}>{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                      {item.link && (
                        <a
                          href={item.link}
                          className="inline-flex items-center text-primary text-sm font-medium hover:text-primary/80 transition-colors mt-4"
                          onClick={(e) => isPreview && e.preventDefault()}
                        >
                          Learn more <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getGradientColor(index)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Services with Icons Variant
  if (variant === 'icons') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--muted))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{color: textColor}}>
              {heading || 'Our Services'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{color: textColor, opacity: 0.8}}>
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.id} className="group text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-colors">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{color: textColor}}>{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Minimal Services Variant
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
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{color: textColor}}>
              {heading || 'Our Services'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{color: textColor, opacity: 0.8}}>
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {items.map((item: any, index: number) => (
              <div key={item.id} className="group space-y-3 p-6 rounded-2xl hover:bg-card/30 transition-colors">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{color: textColor}}>{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Services with Process Variant
  if (variant === 'process') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--muted))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{color: textColor}}>
              {heading || 'Our Services'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{color: textColor, opacity: 0.8}}>
                {description}
              </p>
            )}
          </div>

          <div className="relative">
            {/* Process line */}
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-primary/20 hidden lg:block"></div>

            <div className="grid lg:grid-cols-5 gap-8">
              {items.map((item: any, index: number) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={item.id} className="group relative text-center">
                    {/* Step number */}
                    <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                      {item.step || (index + 1).toString().padStart(2, '0')}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{color: textColor}}>{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                    </div>

                    {/* Arrow for desktop */}
                    {index < items.length - 1 && (
                      <div className="hidden lg:block absolute top-24 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-primary/60" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{color: textColor}}>
            {heading || 'Our Services'}
          </h2>
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{color: textColor, opacity: 0.8}}>
              {description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, index: number) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card"
            >
              {item.image && (
                <div className="aspect-video overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-t ${getGradientColor(index)} opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10`}></div>
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{color: textColor}}>{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                <div className="pt-2">
                  {item.link ? (
                    <a
                      href={item.link}
                      className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all hover:text-primary/80"
                      onClick={(e) => isPreview && e.preventDefault()}
                    >
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
