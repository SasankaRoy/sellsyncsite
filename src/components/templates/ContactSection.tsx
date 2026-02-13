import { SectionData } from '@/types/builder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { Send } from 'lucide-react';

interface ContactSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function ContactSection({ data, variant = 'centered', isPreview }: ContactSectionProps) {
  const {
    heading,
    description,
    contactInfo = [],
    backgroundColor,
    textColor,
    padding,
  } = data;

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Mail;
    return Icon;
  };

  const getGradientColor = (index: number): string => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-purple-500 to-pink-600',
    ];
    return gradients[index % gradients.length];
  };

  if (variant === 'split') {
    return (
      <section
        className="w-full transition-all"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--muted))',
          color: textColor || 'hsl(var(--foreground))',
          padding: padding || '100px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {heading || 'Contact Us'}
            </h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                {contactInfo.map((info: any, index: number) => {
                  const Icon = getIcon(info.icon);
                  return (
                    <div key={info.id} className="group flex gap-5 items-start p-4 rounded-2xl hover:bg-card transition-all duration-300">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-1 pt-1">
                        <p className="font-bold text-lg">{info.label}</p>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-card">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      placeholder="John Doe" 
                      className="h-12 bg-muted/50 border-0 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="h-12 bg-muted/50 border-0 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Message</label>
                    <Textarea 
                      placeholder="Tell us about your project..." 
                      rows={5} 
                      className="bg-muted/50 border-0 focus:bg-background transition-colors resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 shadow-lg hover:shadow-xl transition-all group" size="lg">
                    Send Message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
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
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {heading || 'Get In Touch'}
          </h2>
          {description && (
            <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>

        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input 
                    placeholder="John" 
                    className="h-12 bg-muted/50 border-0 focus:bg-background transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    className="h-12 bg-muted/50 border-0 focus:bg-background transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="h-12 bg-muted/50 border-0 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Message</label>
                <Textarea
                  placeholder="How can we help you?"
                  rows={6}
                  className="bg-muted/50 border-0 focus:bg-background transition-colors resize-none"
                />
              </div>
              <Button type="submit" className="w-full h-12 shadow-lg hover:shadow-xl transition-all group" size="lg">
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
