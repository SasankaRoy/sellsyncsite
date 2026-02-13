import { templateSections } from '@/lib/templates';
import { useBuilder } from '@/contexts/BuilderContext';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Menu,
  Star,
  Zap,
  Users,
  Briefcase,
  Image,
  Mail,
  FileText,
  Target,
  Palette,
  Sparkles,
  Circle,
  Smartphone,
  ArrowLeft,
  Grid3X3,
  List,
  LucideIcon,
  Quote,
  DollarSign,
  HelpCircle,
  UserCheck,
  ShoppingBag,
  BookOpen,
} from 'lucide-react';

export function TemplateSidebar() {
  const { addSection } = useBuilder();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (type: string) => {
    setOpenSections(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const getIcon = (type: string, variant?: string): LucideIcon => {
    switch (type) {
      case 'navbar':
        return Menu;
      case 'hero':
        switch (variant) {
          case 'centered':
            return Target;
          case 'split':
            return Palette;
          case 'gradient':
            return Sparkles;
          case 'minimal':
            return Circle;
          default:
            return Star;
        }
      case 'products':
        return ShoppingBag;
      case 'features':
        switch (variant) {
          case 'three-column':
            return Grid3X3;
          case 'two-column':
            return Smartphone;
          case 'icon-left':
            return ArrowLeft;
          default:
            return Zap;
        }
      case 'about':
        return Users;
      case 'services':
        switch (variant) {
          case 'grid':
            return Grid3X3;
          case 'list':
            return List;
          default:
            return Briefcase;
        }
      case 'gallery':
        return Image;
      case 'blog':
        return BookOpen;
      case 'contact':
        return Mail;
      case 'footer':
        return FileText;
      case 'testimonials':
        return Quote;
      case 'pricing':
        return DollarSign;
      case 'faq':
        return HelpCircle;
      case 'team':
        return UserCheck;
      default:
        return Star;
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'navbar':
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'hero':
        return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'products':
        return 'bg-violet-500/10 text-violet-600 border-violet-200';
      case 'features':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'about':
        return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'services':
        return 'bg-rose-500/10 text-rose-600 border-rose-200';
      case 'gallery':
        return 'bg-cyan-500/10 text-cyan-600 border-cyan-200';
      case 'blog':
        return 'bg-sky-500/10 text-sky-600 border-sky-200';
      case 'contact':
        return 'bg-indigo-500/10 text-indigo-600 border-indigo-200';
      case 'footer':
        return 'bg-slate-500/10 text-slate-600 border-slate-200';
      case 'testimonials':
        return 'bg-orange-500/10 text-orange-600 border-orange-200';
      case 'pricing':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'faq':
        return 'bg-pink-500/10 text-pink-600 border-pink-200';
      case 'team':
        return 'bg-teal-500/10 text-teal-600 border-teal-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getIconBgColor = (type: string): string => {
    return 'bg-muted';
  };

  const handleAddSection = (template: typeof templateSections[0]) => {
    const newSection = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      variant: template.variant,
      data: { ...template.defaultData },
    };
    addSection(newSection);
    toast.success(`${template.name} added!`, {
      description: 'Section added to your canvas',
    });
  };

  const groupedTemplates = templateSections.reduce((acc, template) => {
    if (!acc[template.type]) {
      acc[template.type] = [];
    }
    acc[template.type].push(template);
    return acc;
  }, {} as Record<string, typeof templateSections>);

  const sectionOrder = ['navbar', 'hero', 'products', 'features', 'about', 'services', 'gallery', 'blog', 'testimonials', 'team', 'pricing', 'faq', 'contact', 'footer'];

  const sortedGroups = Object.entries(groupedTemplates).sort(([a], [b]) => sectionOrder.indexOf(a) - sectionOrder.indexOf(b));

  return (
    <div className="w-full h-full flex flex-col bg-card/50 backdrop-blur-sm shadow-sm border-r">
      {/* Header */}
      <div className="px-4 md:px-6 pt-4 pb-2 bg-card/80 flex-shrink-0">
        <div className="space-y-1">
          <p className="text-base font-semibold text-foreground">Templates Library</p>
          <p className="text-sm text-muted-foreground">Click to add sections to your canvas</p>
        </div>
      </div>

      {/* Templates List */}
      <ScrollArea className="flex-1 min-h-0 [&>div>div[style]]:!overflow-y-auto [&>div>div[style]]:![scrollbar-width:none] [&>div>div[style]]:![-ms-overflow-style:none] [&>div>div[style*='overflow']]:![&::-webkit-scrollbar]:hidden">
        <div className="px-4 md:px-6 pb-4 pt-2 space-y-3">
          {sortedGroups.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-center">
              <p className="text-sm text-muted-foreground">No templates found</p>
            </div>
          ) : (
            sortedGroups.map(([type, templates]) => {
              const CategoryIcon = getIcon(type);
              const isOpen = openSections[type] ?? false;

              return (
                <Collapsible
                  key={type}
                  open={isOpen}
                  onOpenChange={() => toggleSection(type)}
                  className="space-y-2"
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${getIconBgColor(type)} flex items-center justify-center shadow-sm`}>
                          <CategoryIcon className="h-4 w-4 text-foreground" />
                        </div>
                        <span className="text-sm font-semibold capitalize">{type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs h-5 px-2 font-medium">
                          {templates.length}
                        </Badge>
                        <ChevronsUpDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pl-3">
                    {templates.map((template, index) => {
                      const Icon = getIcon(template.type, template.variant);
                      return (
                        <Card
                          key={template.id}
                          className="cursor-pointer group active:scale-95 hover:shadow-md hover:border-primary/30 transition-all duration-200 overflow-hidden bg-background/50 hover:bg-background animate-in fade-in slide-in-from-left-2"
                          style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                          onClick={() => handleAddSection(template)}
                        >
                          <CardContent className="p-2.5 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${getIconBgColor(template.type)} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                              <Icon className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{template.name}</p>
                              <p className="text-xs text-muted-foreground capitalize truncate">{template.variant}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 hover:bg-primary/10 flex-shrink-0"
                            >
                              <Plus className="h-4 w-4 text-primary" />
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
