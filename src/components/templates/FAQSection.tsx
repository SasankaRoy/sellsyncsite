import { SectionData } from '@/types/builder';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  data: SectionData['data'];
  isPreview?: boolean;
}

export function FAQSection({ data, isPreview }: FAQSectionProps) {
  const {
    heading,
    description,
    items = [],
    backgroundColor,
    textColor,
    padding,
    variant = 'accordion',
  } = data;

  if (variant === 'grid') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--background))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {heading || 'Frequently Asked Questions'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default accordion variant
  return (
    <section
      className="w-full transition-all"
      style={{
        backgroundColor: backgroundColor || 'hsl(var(--muted))',
        color: textColor || 'hsl(var(--foreground))',
        padding: padding || '100px 24px',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {heading || 'Frequently Asked Questions'}
          </h2>
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item: any) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border rounded-2xl px-6 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-9">
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
