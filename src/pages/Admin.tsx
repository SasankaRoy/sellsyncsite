import { useBuilder } from '@/contexts/BuilderContext';
import { TemplateSidebar } from '@/components/builder/TemplateSidebar';
import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { PropertyPanel } from '@/components/builder/PropertyPanel';
import { PublishModal } from '@/components/builder/PublishModal';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Save, Eye, Sparkles, Layers, Menu, X, Settings, ExternalLink, Search, Rocket, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { templateSections } from '@/lib/templates';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Admin() {
  const { saveWebsite, hasUnsavedChanges, sections, deployWebsite, addSection } = useBuilder();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const handleSave = async () => {
    try {
      await saveWebsite();
      toast.success('Website saved successfully!');
    } catch (error) {
      toast.error('Failed to save to server. Saved locally as backup.');
    }
  };

  const handleDeploy = () => {
    if (hasUnsavedChanges) {
      toast.error('Please save your changes first before publishing!');
      return;
    }

    if (sections.length === 0) {
      toast.error('Your website layout is empty. Add some sections before publishing!');
      return;
    }

    // Open the publish modal instead of deploying directly
    setPublishModalOpen(true);
  };

  const handlePreview = () => {
    saveWebsite();
    navigate('/dashboard');
  };

  const handleLogout = () => {
    // Clear all authentication cookies
    Cookies.remove('authToken');
    Cookies.remove('u_id');
    Cookies.remove('u_type');
    
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const getDeployButtonTitle = () => {
    if (hasUnsavedChanges) {
      return "Save changes first to deploy";
    }
    if (sections.length === 0) {
      return "Add sections to your layout before deploying";
    }
    return "View your complete website";
  };

  const handleAddTemplate = (template: typeof templateSections[0]) => {
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
    setSearchOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Header */}
      <header className="h-12 sm:h-14 border-b bg-white flex items-center justify-between px-2 sm:px-4 md:px-6 shadow-sm sticky top-0 z-[50]">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0">
          <img
            src="https://sellsync.netlify.app/assets/FullLogo2-BHrAzKAZ.png"
            alt="SellSync"
            className="h-7 sm:h-8 md:h-10 flex-shrink-0"
          />
          <div className="hidden sm:block min-w-0">
            <h1 className="text-sm md:text-base font-semibold text-foreground truncate">SellSync</h1>
            <p className="text-xs text-muted-foreground truncate">Website Builder</p>
          </div>
        </div>

        {/* Search Templates */}
        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={searchOpen}
                className="w-full justify-start text-sm text-muted-foreground hover:text-muted-foreground font-medium h-9 bg-muted/50 hover:bg-muted border-muted-foreground/20 rounded-full"
              >
                <Search className="mr-2 h-4 w-4 shrink-0" />
                Search templates...
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 border-border" align="start">
              <Command className="bg-popover">
                <CommandInput placeholder="Search templates..." className="text-foreground" />
                <CommandList>
                  <CommandEmpty>No templates found.</CommandEmpty>
                  <CommandGroup heading="Templates">
                    {templateSections.map((template) => (
                      <CommandItem
                        key={template.id}
                        value={`${template.name} ${template.type} ${template.variant}`}
                        onSelect={() => handleAddTemplate(template)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{template.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {template.type} • {template.variant}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0">
          {/* Mobile Menu - Templates */}
          <Drawer open={showSidebar} onOpenChange={setShowSidebar}>
            <DrawerTrigger asChild>
              <Button
                size="sm"
                variant={showSidebar ? "default" : "outline"}
                className={`md:hidden gap-1 transition-all px-2 sm:px-3 h-8 text-xs ${showSidebar
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
              >
                <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden xs:inline">Templates</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh] p-0 border-t">
              <div className="h-full overflow-hidden">
                <TemplateSidebar />
              </div>
            </DrawerContent>
          </Drawer>

          {/* Mobile Menu - Properties */}
          <Drawer open={showProperties} onOpenChange={setShowProperties}>
            <DrawerTrigger asChild>
              <Button
                size="sm"
                variant={showProperties ? "default" : "outline"}
                className={`lg:hidden gap-1 transition-all px-2 sm:px-3 h-8 text-xs ${showProperties
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
              >
                <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden xs:inline">Properties</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh] p-0 border-t">
              <div className="h-full overflow-hidden">
                <PropertyPanel />
              </div>
            </DrawerContent>
          </Drawer>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="gap-1 h-8 px-2 sm:px-3 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="hidden sm:inline text-xs">Preview</span>
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            className="gap-1 h-8 px-2 sm:px-3 text-xs"
          >
            <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={hasUnsavedChanges || sections.length === 0}
            size="sm"
            className="gap-1 h-8 px-2 sm:px-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs"
            title={getDeployButtonTitle()}
          >
            <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="hidden sm:inline">Publish</span>
          </Button>
          <Button
            onClick={handleLogout}
            size="sm"
            variant="outline"
            className="gap-1 h-8 px-2 sm:px-3 text-xs border-red-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:flex-col w-80 border-r bg-card/50 backdrop-blur-sm">
          <TemplateSidebar />
        </div>

        {/* Canvas */}
        <BuilderCanvas />

        {/* Property Panel - Desktop Only, Drawer on Tablet */}
        <div className="hidden lg:flex lg:flex-col w-96 border-l bg-card/50 backdrop-blur-sm">
          <PropertyPanel />
        </div>
      </div>

      {/* Publish Modal */}
      <PublishModal open={publishModalOpen} onOpenChange={setPublishModalOpen} />
    </div>
  );
}




//here we 