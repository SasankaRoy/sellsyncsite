import { SectionData } from '@/types/builder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  data: SectionData['data'];
  isPreview?: boolean;
}

export function PricingSection({ data, variant = 'three-column', isPreview }: PricingSectionProps & { variant?: string }) {
  const {
    heading,
    description,
    items = [],
    backgroundColor,
    textColor,
    padding,
  } = data;

  if (variant === 'two-column') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '60px 16px sm:80px 24px md:100px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-0">
          <div className="text-center mb-10 sm:mb-16 space-y-2 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-4">
              Pricing
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {heading || 'Choose Your Plan'}
            </h2>
            {description && (
              <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {items.map((item: any, index: number) => (
              <Card
                key={item.id}
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  item.popular ? 'ring-2 ring-primary' : 'bg-card/50 backdrop-blur-sm'
                }`}
              >
                {item.popular && (
                  <Badge className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-primary text-xs sm:text-sm">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-3 sm:pb-4 px-3 sm:px-6 pt-4 sm:pt-6">
                  <CardTitle className="text-lg sm:text-2xl">{item.name}</CardTitle>
                  <div className="mt-3 sm:mt-4">
                    <span className="text-3xl sm:text-4xl font-bold">${item.price}</span>
                    <span className="text-xs sm:text-base text-muted-foreground">/{item.period || 'month'}</span>
                  </div>
                  <p className="text-xs sm:text-base text-muted-foreground mt-2">{item.description}</p>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
                  <ul className="space-y-2 sm:space-y-3">
                    {item.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-base">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={item.popular ? 'default' : 'outline'}
                    size="sm"
                  >
                    {item.buttonText || 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
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
        backgroundColor: backgroundColor || 'hsl(var(--muted))',
        color: textColor || 'hsl(var(--foreground))',
        padding: padding || '60px 16px sm:80px 24px md:100px 24px',
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-10 sm:mb-16 space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-4">
            Pricing
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {heading || 'Choose Your Plan'}
          </h2>
          {description && (
            <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item: any, index: number) => (
            <Card
              key={item.id}
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                item.popular ? 'ring-2 ring-primary lg:scale-105' : 'bg-card/50 backdrop-blur-sm'
              }`}
            >
              {item.popular && (
                <Badge className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-primary text-xs sm:text-sm">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-3 sm:pb-4 px-3 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="text-base sm:text-xl">{item.name}</CardTitle>
                <div className="mt-3 sm:mt-4">
                  <span className="text-2xl sm:text-3xl font-bold">${item.price}</span>
                  <span className="text-xs sm:text-base text-muted-foreground">/{item.period || 'month'}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{item.description}</p>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
                <ul className="space-y-1.5 sm:space-y-2">
                  {item.features?.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={item.popular ? 'default' : 'outline'}
                  size="sm"
                >
                  {item.buttonText || 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
