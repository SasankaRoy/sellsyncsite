import { useBuilder } from '@/contexts/BuilderContext';
import { templateSections } from '@/lib/templates';
import { API_ENDPOINTS, getImageUrl } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ColorPicker } from '@/components/ui/color-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Settings2, Type, Image, Palette, MousePointer } from 'lucide-react';
import { useState } from 'react';


export function PropertyPanel() {
  const { config, sections, selectedSection, updateSection, selectSection, addPage, switchPage, removePage } = useBuilder();
  const [addPageDialogOpen, setAddPageDialogOpen] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  if (!selectedSection) {
    return (
      <div className="w-full h-full border-l bg-card/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center">
            <MousePointer className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/50" />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <p className="font-medium text-sm sm:text-base text-muted-foreground">No section selected</p>
            <p className="text-xs sm:text-sm text-muted-foreground/70">
              Click on a section to edit
            </p>
          </div>
        </div>
      </div>
    );
  }

  const section = sections.find((s) => s.id === selectedSection);
  if (!section) return null;

  const updateField = (field: string, value: any) => {
    updateSection(selectedSection, { [field]: value });
  };

  const updateButton = (index: number, field: string, value: any) => {
    const buttons = [...(section.data.buttons || [])];
    buttons[index] = { ...buttons[index], [field]: value };
    updateField('buttons', buttons);
  };

  const addButton = () => {
    const buttons = [...(section.data.buttons || [])];
    buttons.push({
      text: 'New Button',
      href: '#',
      variant: 'primary',
      size: 'md',
    });
    updateField('buttons', buttons);
  };

  const removeButton = (index: number) => {
    const buttons = [...(section.data.buttons || [])];
    buttons.splice(index, 1);
    updateField('buttons', buttons);
  };

  const updateStat = (index: number, field: string, value: any) => {
    const stats = [...(section.data.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    updateField('stats', stats);
  };

  const addStat = () => {
    const stats = [...(section.data.stats || [])];
    stats.push({
      value: '100+',
      label: 'New Stat',
    });
    updateField('stats', stats);
  };

  const removeStat = (index: number) => {
    const stats = [...(section.data.stats || [])];
    stats.splice(index, 1);
    updateField('stats', stats);
  };

  const updateTimelineItem = (index: number, field: string, value: any) => {
    const timeline = [...(section.data.timeline || [])];
    timeline[index] = { ...timeline[index], [field]: value };
    updateField('timeline', timeline);
  };

  const addTimelineItem = () => {
    const timeline = [...(section.data.timeline || [])];
    timeline.push({
      year: '2024',
      title: 'New Milestone',
      description: 'Description of this milestone',
    });
    updateField('timeline', timeline);
  };

  const removeTimelineItem = (index: number) => {
    const timeline = [...(section.data.timeline || [])];
    timeline.splice(index, 1);
    updateField('timeline', timeline);
  };

  const updateCategory = (index: number, field: string, value: any) => {
    const categories = [...(section.data.categories || [])];
    categories[index] = { ...categories[index], [field]: value };
    updateField('categories', categories);
  };

  const addCategory = () => {
    const categories = [...(section.data.categories || [])];
    categories.push({
      id: Date.now().toString(),
      name: 'New Category',
      count: 0,
    });
    updateField('categories', categories);
  };

  const removeCategory = (index: number) => {
    const categories = [...(section.data.categories || [])];
    categories.splice(index, 1);
    updateField('categories', categories);
  };

  const updateItem = (index: number, field: string, value: any) => {
    if (section.type === 'navbar') {
      const links = [...(section.data.links || [])];
      links[index] = { ...links[index], [field]: value };
      updateField('links', links);
    } else {
      const items = [...(section.data.items || [])];
      items[index] = { ...items[index], [field]: value };
      updateField('items', items);
    }
  };

  const updateItemImage = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(API_ENDPOINTS.upload, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          updateItem(index, 'image', {
            src: result.url,
            alt: section.data.items[index]?.image?.alt || section.data.items[index]?.name || 'Item',
          });
        } else {
          // Fallback to base64
          const reader = new FileReader();
          reader.onload = (event) => {
            updateItem(index, 'image', {
              src: event.target?.result as string,
              alt: section.data.items[index]?.image?.alt || section.data.items[index]?.name || 'Item',
            });
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error('Upload failed, using base64:', error);
        // Fallback to base64
        const reader = new FileReader();
        reader.onload = (event) => {
          updateItem(index, 'image', {
            src: event.target?.result as string,
            alt: section.data.items[index]?.image?.alt || section.data.items[index]?.name || 'Item',
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const addItem = () => {
    if (section.type === 'navbar') {
      const links = [...(section.data.links || [])];
      links.push({
        id: Date.now().toString(),
        text: 'New Link',
        href: '#',
      });
      updateField('links', links);
    } else if (section.type === 'footer') {
      const columns = [...(section.data.columns || [])];
      columns.push({
        id: Date.now().toString(),
        title: 'New Column',
        links: [
          { id: Date.now().toString() + '-1', text: 'Link 1', href: '#' },
          { id: Date.now().toString() + '-2', text: 'Link 2', href: '#' },
        ],
      });
      updateField('columns', columns);
    } else {
      const items = [...(section.data.items || [])];
      if (section.type === 'gallery') {
        items.push({
          id: Date.now().toString(),
          image: { src: '', alt: 'Gallery Image' },
          title: 'New Image',
          category: 'General',
        });
      } else if (section.type === 'team') {
        items.push({
          id: Date.now().toString(),
          name: 'New Member',
          role: 'Role',
          bio: 'Bio',
          image: { src: '', alt: 'New Member' },
          email: 'email@company.com',
          linkedin: 'https://linkedin.com/in/username',
        });
      } else if (section.type === 'blog') {
        items.push({
          id: Date.now().toString(),
          title: 'New Blog Post',
          excerpt: 'Write a compelling excerpt for your blog post...',
          image: { src: '', alt: 'Blog Post' },
          author: 'Author Name',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          category: 'Uncategorized',
          readTime: '5 min read',
        });
      } else if (section.type === 'products') {
        items.push({
          id: Date.now().toString(),
          name: 'New Product',
          price: '99.99',
          description: 'Product description goes here...',
          image: { src: '', alt: 'Product' },
          category: 'General',
          inStock: true,
        });
      } else if (section.type === 'faq') {
        items.push({
          id: Date.now().toString(),
          question: 'New Question',
          answer: 'New Answer',
        });
      } else if (section.type === 'testimonials') {
        items.push({
          id: Date.now().toString(),
          quote: 'This is an amazing product! Highly recommended.',
          name: 'Customer Name',
          role: 'Job Title',
          company: 'Company Name',
          rating: 5,
          image: { src: '', alt: 'Customer' },
        });
      } else if (section.type === 'services') {
        items.push({
          id: Date.now().toString(),
          icon: 'Briefcase',
          title: 'New Service',
          description: 'Service description goes here...',
          link: '#',
          step: (items.length + 1).toString().padStart(2, '0'),
        });
      }
      updateField('items', items);
    }
  };

  const removeItem = (index: number) => {
    if (section.type === 'navbar') {
      const links = [...(section.data.links || [])];
      links.splice(index, 1);
      updateField('links', links);
    } else if (section.type === 'footer') {
      const columns = [...(section.data.columns || [])];
      columns.splice(index, 1);
      updateField('columns', columns);
    } else {
      const items = [...(section.data.items || [])];
      items.splice(index, 1);
      updateField('items', items);
    }
  };

  return (
    <div className="w-full h-full border-l bg-card/50 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-5 border-b bg-card/80 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md flex-shrink-0">
            <Settings2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold tracking-tight truncate">Edit Section</h2>
            <Badge variant="secondary" className="text-xs capitalize mt-0.5 w-fit">
              {section.type}
            </Badge>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-muted flex-shrink-0"
          onClick={() => selectSection(null)}
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3 sm:p-5 space-y-4 sm:space-y-6">
          {/* Content Section */}
          {(section.data.heading !== undefined || section.data.subheading !== undefined || section.data.description !== undefined) && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                <Type className="h-4 w-4 flex-shrink-0" />
                <span>Content</span>
              </div>

              {section.data.heading !== undefined && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Heading</Label>
                  <Input
                    value={section.data.heading || ''}
                    onChange={(e) => updateField('heading', e.target.value)}
                    className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                    placeholder="Enter heading..."
                  />
                </div>
              )}

              {section.data.subheading !== undefined && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Subheading</Label>
                  <Input
                    value={section.data.subheading || ''}
                    onChange={(e) => updateField('subheading', e.target.value)}
                    className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                    placeholder="Enter subheading..."
                  />
                </div>
              )}

              {section.data.description !== undefined && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Description</Label>
                  <Textarea
                    value={section.data.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={3}
                    className="bg-background/50 focus:bg-background transition-colors resize-none text-sm"
                    placeholder="Enter description..."
                  />
                </div>
              )}
            </div>
          )}

          {/* Buttons Section */}
          {section.data.buttons !== undefined && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                    <MousePointer className="h-4 w-4 flex-shrink-0" />
                    <span>Buttons</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addButton}
                    className="h-7 sm:h-8 text-xs gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {section.data.buttons.map((btn: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 bg-background/30 hover:bg-background/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          Button {idx + 1}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeButton(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Button text"
                        value={btn.text}
                        onChange={(e) => updateButton(idx, 'text', e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                      <Input
                        placeholder="Link URL"
                        value={btn.href}
                        onChange={(e) => updateButton(idx, 'href', e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          className="px-3 py-2 border rounded-lg bg-background/50 text-sm focus:bg-background transition-colors h-9"
                          value={btn.variant}
                          onChange={(e) => updateButton(idx, 'variant', e.target.value)}
                        >
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="outline">Outline</option>
                          <option value="ghost">Ghost</option>
                        </select>
                        <select
                          className="px-3 py-2 border rounded-lg bg-background/50 text-sm focus:bg-background transition-colors h-9"
                          value={btn.size}
                          onChange={(e) => updateButton(idx, 'size', e.target.value)}
                        >
                          <option value="sm">Small</option>
                          <option value="md">Medium</option>
                          <option value="lg">Large</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Image Section */}
          {section.data.image !== undefined && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                  <Image className="h-4 w-4 flex-shrink-0" />
                  <span>Image</span>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Upload Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const formData = new FormData();
                        formData.append('image', file);

                        try {
                          const response = await fetch(API_ENDPOINTS.upload, {
                            method: 'POST',
                            body: formData,
                          });

                          if (response.ok) {
                            const result = await response.json();
                            updateField('image', {
                              src: result.url,
                              alt: section.data.image?.alt || 'Section Image',
                            });
                          } else {
                            // Fallback to base64 if upload fails
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              updateField('image', {
                                src: event.target?.result as string,
                                alt: section.data.image?.alt || 'Section Image',
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        } catch (error) {
                          console.error('Upload failed, using base64:', error);
                          // Fallback to base64
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            updateField('image', {
                              src: event.target?.result as string,
                              alt: section.data.image?.alt || 'Section Image',
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }
                    }}
                    className="bg-background/50 focus:bg-background transition-colors text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Image URL</Label>
                  <Input
                    value={section.data.image?.src || ''}
                    onChange={(e) =>
                      updateField('image', {
                        ...section.data.image,
                        src: e.target.value,
                      })
                    }
                    className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </>
          )}

          {/* Navbar Branding Section */}
          {section.type === 'navbar' && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                  <Type className="h-4 w-4 flex-shrink-0" />
                  <span>Branding</span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Website Name</Label>
                    <Input
                      value={section.data.websiteName || ''}
                      onChange={(e) => updateField('websiteName', e.target.value)}
                      className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      placeholder="Enter website name..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Upload Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            updateField('logo', event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="bg-background/50 focus:bg-background transition-colors text-xs h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Logo Image URL</Label>
                    <Input
                      value={section.data.logo || ''}
                      onChange={(e) => updateField('logo', e.target.value)}
                      className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Pages Section for Navbar */}
          {section.type === 'navbar' && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                    <Type className="h-4 w-4 flex-shrink-0" />
                    <span>Pages</span>
                  </div>
                  <Dialog open={addPageDialogOpen} onOpenChange={setAddPageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 sm:h-8 text-xs gap-1 flex-shrink-0"
                      >
                        <Plus className="h-3 w-3" />
                        <span className="hidden sm:inline">Add Page</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Page</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Page Name</Label>
                          <Input
                            value={newPageName}
                            onChange={(e) => setNewPageName(e.target.value)}
                            placeholder="Enter page name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Template</Label>
                          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent>
                              {templateSections.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setAddPageDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              if (newPageName && selectedTemplate) {
                                const slug = newPageName.toLowerCase().replace(/\s+/g, '-');
                                addPage(newPageName, slug, selectedTemplate);
                                setNewPageName('');
                                setSelectedTemplate('');
                                setAddPageDialogOpen(false);
                              }
                            }}
                          >
                            Add Page
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {config.pages.map((page) => (
                    <div key={page.id} className="p-3 border rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 bg-background/30 hover:bg-background/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <Badge variant={page.id === config.currentPage ? "default" : "outline"} className="text-xs">
                          {page.name}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => {
                            if (confirm(`Delete page "${page.name}"?`)) {
                              removePage(page.id);
                            }
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => switchPage(page.id)}
                        className="w-full text-xs"
                      >
                        Switch to {page.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* About Stats Section */}
          {section.type === 'about' && section.data.stats !== undefined && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                    <Type className="h-4 w-4 flex-shrink-0" />
                    <span>Stats</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addStat}
                    className="h-7 sm:h-8 text-xs gap-1 flex-shrink-0"
                  >
                    <Plus className="h-3 w-3" />
                    <span className="hidden sm:inline">Add Stat</span>
                  </Button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {section.data.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 bg-background/30 hover:bg-background/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          Stat {idx + 1}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeStat(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Value (e.g., 500+)"
                        value={stat.value || ''}
                        onChange={(e) => updateStat(idx, 'value', e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                      <Input
                        placeholder="Label (e.g., Projects Completed)"
                        value={stat.label || ''}
                        onChange={(e) => updateStat(idx, 'label', e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* About Timeline Section */}
          {section.type === 'about' && section.data.timeline !== undefined && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                    <Type className="h-4 w-4 flex-shrink-0" />
                    <span>Timeline</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addTimelineItem}
                    className="h-7 sm:h-8 text-xs gap-1 flex-shrink-0"
                  >
                    <Plus className="h-3 w-3" />
                    <span className="hidden sm:inline">Add Item</span>
                  </Button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {section.data.timeline.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 bg-background/30 hover:bg-background/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          Timeline {idx + 1}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeTimelineItem(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Year (e.g., 2020)"
                        value={item.year || ''}
                        onChange={(e) => updateTimelineItem(idx, 'year', e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                      <Input
                        placeholder="Title (e.g., Company Founded)"
                        value={item.title || ''}
                        onChange={(e) => updateTimelineItem(idx, 'title', e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                      <Textarea
                        placeholder="Description"
                        value={item.description || ''}
                        onChange={(e) => updateTimelineItem(idx, 'description', e.target.value)}
                        rows={3}
                        className="bg-background/50 focus:bg-background transition-colors resize-none text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Blog Categories Section */}
          {section.type === 'blog' && section.data.categories !== undefined && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                    <Type className="h-4 w-4 flex-shrink-0" />
                    <span>Categories</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addCategory}
                    className="h-7 sm:h-8 text-xs gap-1 flex-shrink-0"
                  >
                    <Plus className="h-3 w-3" />
                    <span className="hidden sm:inline">Add Category</span>
                  </Button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {section.data.categories.map((category: any, idx: number) => (
                    <div key={category.id || idx} className="p-3 border rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 bg-background/30 hover:bg-background/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          Category {idx + 1}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeCategory(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Category Name (e.g., Technology)"
                        value={category.name || ''}
                        onChange={(e) => updateCategory(idx, 'name', e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                      <Input
                        placeholder="Count (e.g., 12)"
                        type="number"
                        value={category.count || 0}
                        onChange={(e) => updateCategory(idx, 'count', parseInt(e.target.value) || 0)}
                        className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Items Section */}
          {((section.type === 'team' || section.type === 'gallery' || section.type === 'features' || section.type === 'services' || section.type === 'pricing' || section.type === 'blog' || section.type === 'products' || section.type === 'faq' || section.type === 'testimonials') && section.data.items !== undefined) || (section.type === 'navbar' && section.data.links !== undefined) || (section.type === 'footer' && section.data.columns !== undefined) ? (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                    <Type className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{section.type === 'navbar' ? 'Links' : section.type === 'team' ? 'Members' : section.type === 'gallery' ? 'Images' : section.type === 'features' ? 'Features' : section.type === 'services' ? 'Services' : section.type === 'pricing' ? 'Plans' : section.type === 'blog' ? 'Posts' : section.type === 'products' ? 'Products' : section.type === 'faq' ? 'Questions' : section.type === 'testimonials' ? 'Testimonials' : section.type === 'footer' ? 'Columns' : 'Items'}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addItem}
                    className="h-7 sm:h-8 text-xs gap-1 flex-shrink-0"
                  >
                    <Plus className="h-3 w-3" />
                    <span className="hidden sm:inline">Add</span>
                  </Button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {(section.type === 'navbar' ? section.data.links : section.type === 'footer' ? section.data.columns : section.data.items).map((item: any, idx: number) => (
                    <div key={item.id || idx} className="p-3 border rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 bg-background/30 hover:bg-background/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {section.type === 'team' ? 'M' : section.type === 'gallery' ? 'I' : section.type === 'features' ? 'F' : section.type === 'services' ? 'S' : section.type === 'pricing' ? 'P' : section.type === 'navbar' ? 'L' : section.type === 'blog' ? 'B' : section.type === 'products' ? 'P' : section.type === 'faq' ? 'Q' : section.type === 'testimonials' ? 'T' : section.type === 'footer' ? 'C' : 'I'} {idx + 1}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeItem(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      {section.type !== 'navbar' && section.type !== 'faq' && (
                        <>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Upload Image</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => updateItemImage(idx, e)}
                              className="bg-background/50 focus:bg-background transition-colors text-xs h-9"
                            />
                          </div>

                          <Input
                            placeholder="Image URL"
                            value={item.image?.src || ''}
                            onChange={(e) => updateItem(idx, 'image', { ...item.image, src: e.target.value })}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                        </>
                      )}

                      {section.type === 'gallery' && (
                        <>
                          <Input
                            placeholder="Title"
                            value={item.title || ''}
                            onChange={(e) => updateItem(idx, 'title', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                          <Input
                            placeholder="Category (for categories variant)"
                            value={item.category || ''}
                            onChange={(e) => updateItem(idx, 'category', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                        </>
                      )}

                      {(section.type === 'features' || section.type === 'services') && (
                        <>
                          <Input
                            placeholder="Icon"
                            value={item.icon || ''}
                            onChange={(e) => updateItem(idx, 'icon', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Title"
                            value={item.title || ''}
                            onChange={(e) => updateItem(idx, 'title', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Textarea
                            placeholder="Description"
                            value={item.description || ''}
                            onChange={(e) => updateItem(idx, 'description', e.target.value)}
                            rows={2}
                            className="bg-background/50 focus:bg-background transition-colors text-sm resize-none"
                          />

                          {section.type === 'services' && (
                            <>
                              <Input
                                placeholder="Link URL"
                                value={item.link || ''}
                                onChange={(e) => updateItem(idx, 'link', e.target.value)}
                                className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                              />
                              <Input
                                placeholder="Step Number (for process variant)"
                                value={item.step || ''}
                                onChange={(e) => updateItem(idx, 'step', e.target.value)}
                                className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                              />
                            </>
                          )}
                        </>
                      )}

                      {section.type === 'pricing' && (
                        <>
                          <Input
                            placeholder="Plan Name"
                            value={item.name || ''}
                            onChange={(e) => updateItem(idx, 'name', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Price"
                            type="number"
                            value={item.price || ''}
                            onChange={(e) => updateItem(idx, 'price', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Billing Period (e.g., month, year)"
                            value={item.period || ''}
                            onChange={(e) => updateItem(idx, 'period', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Textarea
                            placeholder="Description"
                            value={item.description || ''}
                            onChange={(e) => updateItem(idx, 'description', e.target.value)}
                            rows={2}
                            className="bg-background/50 focus:bg-background transition-colors text-sm resize-none"
                          />

                          <Input
                            placeholder="Button Text"
                            value={item.buttonText || ''}
                            onChange={(e) => updateItem(idx, 'buttonText', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`popular-${idx}`}
                              checked={item.popular || false}
                              onChange={(e) => updateItem(idx, 'popular', e.target.checked)}
                              className="w-4 h-4 border rounded cursor-pointer"
                            />
                            <Label htmlFor={`popular-${idx}`} className="text-xs font-medium cursor-pointer">
                              Mark as Most Popular
                            </Label>
                          </div>

                          <div className="space-y-2 sm:space-y-3 p-2 bg-background/20 rounded">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">Features</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const features = [...(item.features || [])];
                                  features.push('New Feature');
                                  updateItem(idx, 'features', features);
                                }}
                                className="h-6 text-xs gap-1"
                              >
                                <Plus className="h-3 w-3" />
                                Add
                              </Button>
                            </div>
                            {item.features?.map((feature: string, fIdx: number) => (
                              <div key={fIdx} className="flex items-center gap-2">
                                <Input
                                  placeholder="Feature"
                                  value={feature}
                                  onChange={(e) => {
                                    const features = [...(item.features || [])];
                                    features[fIdx] = e.target.value;
                                    updateItem(idx, 'features', features);
                                  }}
                                  className="bg-background/50 focus:bg-background transition-colors text-sm h-8 flex-1"
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
                                  onClick={() => {
                                    const features = [...(item.features || [])];
                                    features.splice(fIdx, 1);
                                    updateItem(idx, 'features', features);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {section.type === 'blog' && (
                        <>
                          <Input
                            placeholder="Post Title"
                            value={item.title || ''}
                            onChange={(e) => updateItem(idx, 'title', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Textarea
                            placeholder="Excerpt"
                            value={item.excerpt || ''}
                            onChange={(e) => updateItem(idx, 'excerpt', e.target.value)}
                            rows={3}
                            className="bg-background/50 focus:bg-background transition-colors text-sm resize-none"
                          />

                          <Input
                            placeholder="Author Name"
                            value={item.author || ''}
                            onChange={(e) => updateItem(idx, 'author', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Date (e.g., Dec 1, 2024)"
                            value={item.date || ''}
                            onChange={(e) => updateItem(idx, 'date', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Category"
                            value={item.category || ''}
                            onChange={(e) => updateItem(idx, 'category', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Read Time (e.g., 5 min read)"
                            value={item.readTime || ''}
                            onChange={(e) => updateItem(idx, 'readTime', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                        </>
                      )}

                      {section.type === 'testimonials' && (
                        <>
                          <Textarea
                            placeholder="Testimonial Quote"
                            value={item.quote || ''}
                            onChange={(e) => updateItem(idx, 'quote', e.target.value)}
                            rows={4}
                            className="bg-background/50 focus:bg-background transition-colors text-sm resize-none"
                          />

                          <Input
                            placeholder="Customer Name"
                            value={item.name || ''}
                            onChange={(e) => updateItem(idx, 'name', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Job Title/Role"
                            value={item.role || ''}
                            onChange={(e) => updateItem(idx, 'role', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Company Name (optional)"
                            value={item.company || ''}
                            onChange={(e) => updateItem(idx, 'company', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Rating (1-5, optional)"
                            type="number"
                            min="1"
                            max="5"
                            value={item.rating || ''}
                            onChange={(e) => updateItem(idx, 'rating', parseInt(e.target.value) || 5)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Video URL (for video testimonials)"
                            value={item.videoUrl || ''}
                            onChange={(e) => updateItem(idx, 'videoUrl', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Video Thumbnail URL (optional)"
                            value={item.thumbnail?.src || ''}
                            onChange={(e) => updateItem(idx, 'thumbnail', { src: e.target.value, alt: item.name || 'Video thumbnail' })}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                        </>
                      )}

                      {section.type === 'team' && (
                        <>
                          <Input
                            placeholder="Member Name"
                            value={item.name || ''}
                            onChange={(e) => updateItem(idx, 'name', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Role/Position"
                            value={item.role || ''}
                            onChange={(e) => updateItem(idx, 'role', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Textarea
                            placeholder="Bio/Description"
                            value={item.bio || ''}
                            onChange={(e) => updateItem(idx, 'bio', e.target.value)}
                            rows={3}
                            className="bg-background/50 focus:bg-background transition-colors text-sm resize-none"
                          />

                          <Input
                            placeholder="Email (e.g., name@company.com)"
                            type="email"
                            value={item.email || ''}
                            onChange={(e) => updateItem(idx, 'email', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="LinkedIn URL (e.g., https://linkedin.com/in/username)"
                            value={item.linkedin || ''}
                            onChange={(e) => updateItem(idx, 'linkedin', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Twitter URL (optional)"
                            value={item.twitter || ''}
                            onChange={(e) => updateItem(idx, 'twitter', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                        </>
                      )}

                      {section.type === 'products' && (
                        <>
                          <Input
                            placeholder="Product Name"
                            value={item.name || ''}
                            onChange={(e) => updateItem(idx, 'name', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Price"
                            type="number"
                            value={item.price || ''}
                            onChange={(e) => updateItem(idx, 'price', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Textarea
                            placeholder="Description"
                            value={item.description || ''}
                            onChange={(e) => updateItem(idx, 'description', e.target.value)}
                            rows={2}
                            className="bg-background/50 focus:bg-background transition-colors text-sm resize-none"
                          />

                          <Input
                            placeholder="Category"
                            value={item.category || ''}
                            onChange={(e) => updateItem(idx, 'category', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`inStock-${idx}`}
                              checked={item.inStock || false}
                              onChange={(e) => updateItem(idx, 'inStock', e.target.checked)}
                              className="w-4 h-4 border rounded cursor-pointer"
                            />
                            <Label htmlFor={`inStock-${idx}`} className="text-xs font-medium cursor-pointer">
                              In Stock
                            </Label>
                          </div>
                        </>
                      )}

                      {section.type === 'faq' && (
                        <>
                          <Input
                            placeholder="Question"
                            value={item.question || ''}
                            onChange={(e) => updateItem(idx, 'question', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Textarea
                            placeholder="Answer"
                            value={item.answer || ''}
                            onChange={(e) => updateItem(idx, 'answer', e.target.value)}
                            rows={3}
                            className="bg-background/50 focus:bg-background transition-colors text-sm resize-none"
                          />
                        </>
                      )}

                      {section.type === 'footer' && (
                        <>
                          <Input
                            placeholder="Column Title"
                            value={item.title || ''}
                            onChange={(e) => updateItem(idx, 'title', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Links</Label>
                            {item.links?.map((link: any, linkIdx: number) => (
                              <div key={link.id} className="flex gap-2">
                                <Input
                                  placeholder="Link Text"
                                  value={link.text || ''}
                                  onChange={(e) => {
                                    const columns = [...(section.data.columns || [])];
                                    columns[idx].links[linkIdx].text = e.target.value;
                                    updateField('columns', columns);
                                  }}
                                  className="bg-background/50 focus:bg-background transition-colors text-sm h-8 flex-1"
                                />
                                <Input
                                  placeholder="Link URL"
                                  value={link.href || ''}
                                  onChange={(e) => {
                                    const columns = [...(section.data.columns || [])];
                                    columns[idx].links[linkIdx].href = e.target.value;
                                    updateField('columns', columns);
                                  }}
                                  className="bg-background/50 focus:bg-background transition-colors text-sm h-8 flex-1"
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {section.type === 'navbar' && (
                        <>
                          <Input
                            placeholder="Link Text"
                            value={item.text || ''}
                            onChange={(e) => updateItem(idx, 'text', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />

                          <Input
                            placeholder="Link URL"
                            value={item.href || ''}
                            onChange={(e) => updateItem(idx, 'href', e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors text-sm h-9"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {/* Styling Section */}
          <Separator />
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
              <Palette className="h-4 w-4 flex-shrink-0" />
              <span>Styling</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <ColorPicker
                label="Background Color"
                value={section.data.backgroundColor || ''}
                onChange={(color) => updateField('backgroundColor', color)}
              />
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Background Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        updateField('backgroundImage', {
                          src: event.target?.result as string,
                          alt: section.data.backgroundImage?.alt || 'Background Image',
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="bg-background/50 focus:bg-background transition-colors text-xs h-9"
                />
                <Input
                  value={section.data.backgroundImage?.src || ''}
                  onChange={(e) => updateField('backgroundImage', {
                    src: e.target.value,
                    alt: section.data.backgroundImage?.alt || 'Background Image',
                  })}
                  placeholder="https://example.com/bg.jpg"
                  className="bg-background/50 focus:bg-background transition-colors font-mono text-xs h-9"
                />
              </div>
              <ColorPicker
                label="Text Color"
                value={section.data.textColor || ''}
                onChange={(color) => updateField('textColor', color)}
              />
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Padding</Label>
                <Input
                  value={section.data.padding || ''}
                  onChange={(e) => updateField('padding', e.target.value)}
                  placeholder="80px 24px"
                  className="bg-background/50 focus:bg-background transition-colors font-mono text-xs h-9"
                />
              </div>
              {section.type === 'faq' && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Variant</Label>
                  <Select
                    value={section.data.variant || 'accordion'}
                    onValueChange={(value) => updateField('variant', value)}
                  >
                    <SelectTrigger className="bg-background/50 focus:bg-background transition-colors text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accordion">Accordion</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {section.type === 'footer' && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Variant</Label>
                  <Select
                    value={section.data.variant || 'simple'}
                    onValueChange={(value) => updateField('variant', value)}
                  >
                    <SelectTrigger className="bg-background/50 focus:bg-background transition-colors text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="multi-column">Multi-Column</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="centered">Centered</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
