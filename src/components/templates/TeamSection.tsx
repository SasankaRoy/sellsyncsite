import { SectionData } from '@/types/builder';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

interface TeamSectionProps {
  data: SectionData['data'];
  isPreview?: boolean;
}

export function TeamSection({ data, variant = 'grid', isPreview }: TeamSectionProps & { variant?: string }) {
  const {
    heading,
    description,
    items = [],
    backgroundColor,
    textColor,
    padding,
  } = data;

  if (variant === 'list') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {heading || 'Meet Our Team'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="space-y-8">
            {items.map((item: any) => (
              <Card
                key={item.id}
                className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={getImageUrl(item.image?.src)} alt={item.name} />
                      <AvatarFallback className="text-lg">{item.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-2xl font-bold">{item.name}</h3>
                        <p className="text-primary font-medium">{item.role}</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item.bio}</p>
                      <div className="flex gap-3">
                        {item.email && (
                          <a href={`mailto:${item.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                        {item.linkedin && (
                          <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {item.twitter && (
                          <a href={item.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default grid variant
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
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {heading || 'Meet Our Team'}
          </h2>
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <Card
              key={item.id}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm hover:-translate-y-1 text-center"
            >
              <CardContent className="p-8 space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={getImageUrl(item.image?.src)} alt={item.name} />
                  <AvatarFallback className="text-xl">{item.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-primary font-medium">{item.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.bio}</p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  {item.email && (
                    <a href={`mailto:${item.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {item.linkedin && (
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {item.twitter && (
                    <a href={item.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
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
