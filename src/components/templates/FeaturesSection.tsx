import { SectionData } from '@/types/builder';
import { Card, CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface FeaturesSectionProps {
  data: SectionData['data'];
  isPreview?: boolean;
}

export function FeaturesSection({ data, variant = 'three-column', isPreview }: FeaturesSectionProps & { variant?: string }) {
  const {
    heading,
    description,
    items = [],
    backgroundColor,
    textColor,
    padding,
  } = data;

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Star;
    return Icon;
  };

  const getGradientColor = (index: number): string => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-amber-500 to-amber-600',
      'from-rose-500 to-rose-600',
      'from-cyan-500 to-cyan-600',
    ];
    return gradients[index % gradients.length];
  };

  if (variant === 'four-column') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-0">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Features
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{color: textColor}}>
              {heading || 'Features'}
            </h2>
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{color: textColor}}>
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item.id}
                  className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm hover:-translate-y-1"
                >
                  <CardContent className="p-6 space-y-4 text-center">
                    {item.image?.src ? (
                      <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={item.image.src}
                          alt={item.image.alt || item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <h3 className="text-lg md:text-xl font-bold tracking-tight" style={{color: textColor}}>{item.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'with-images') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-0">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Features
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{color: textColor}}>
              {heading || 'Features'}
            </h2>
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{color: textColor}}>
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item.id}
                  className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm hover:-translate-y-1 overflow-hidden"
                >
                  <CardContent className="p-0">
                    {item.image?.src && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image.src}
                          alt={item.image.alt || item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold tracking-tight" style={{color: textColor}}>{item.title}</h3>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

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
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Features
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{color: textColor}}>
              {heading || 'Features'}
            </h2>
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{color: textColor}}>
                {description}
              </p>
            )}
          </div>

          <div className="space-y-12 mt-16">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.id} className="group max-w-2xl mx-auto">
                  <div className="flex flex-col items-center space-y-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight" style={{color: textColor}}>{item.title}</h3>
                      <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md mx-auto" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'two-column') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-0">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Features
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{color: textColor}}>
              {heading || 'Features'}
            </h2>
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{color: textColor}}>
                {description}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item.id}
                  className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm hover:-translate-y-1"
                >
                  <CardContent className="p-6 space-y-4">
                    {item.image?.src ? (
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={item.image.src}
                          alt={item.image.alt || item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    )}
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight" style={{color: textColor}}>{item.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'icon-left') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Why Choose Us
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{color: textColor}}>
              {heading || 'Features'}
            </h2>
            {description && (
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{color: textColor}}>
                {description}
              </p>
            )}
          </div>

          <div className="space-y-6 mt-16">
            {items.map((item: any, index: number) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item.id}
                  className="group flex gap-6 items-start p-6 rounded-2xl hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-border"
                >
                  {item.image?.src ? (
                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={item.image.src}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <div className="space-y-2 pt-0.5">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors" style={{color: textColor}}>{item.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Default three-column variant
  return (
    <section
      className="w-full transition-all"
      style={{
        backgroundColor: backgroundColor || 'hsl(var(--background))',
        color: textColor || 'hsl(var(--foreground))',
        padding: padding || '100px 24px',
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{color: textColor}}>
            {heading || 'Features'}
          </h2>
          {description && (
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{color: textColor}}>
              {description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {items.map((item: any, index: number) => {
            const Icon = getIcon(item.icon);
            return (
              <Card
                key={item.id}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm hover:-translate-y-1"
              >
                <CardContent className="p-6 space-y-4 text-center">
                  {item.image?.src ? (
                    <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={item.image.src}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight" style={{color: textColor}}>{item.title}</h3>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed" style={{color: textColor, opacity: 0.8}}>{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
