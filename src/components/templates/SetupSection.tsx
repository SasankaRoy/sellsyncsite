import { SectionData } from '@/types/builder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { API_ENDPOINTS } from '@/lib/api';

interface SetupSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
  onSetupComplete?: (data: { websiteName: string; logo: string }) => void;
}

export function SetupSection({ data, variant = 'default', isPreview, onSetupComplete }: SetupSectionProps) {
  const { updateSection, selectedSection } = useBuilder();
  const { websiteName = '', logo = '', logoFile = null } = data;
  const [isOpen, setIsOpen] = useState(!isPreview);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    websiteName: websiteName || '',
    logo: logo || '',
    logoFile: logoFile || null as any,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(logo || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logoFile: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setFormData({ ...formData, logoFile: null, logo: '' });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsUploading(true);
      let logoUrl = formData.logo;

      // Upload logo if a new file was selected
      if (formData.logoFile) {
        const formDataObj = new FormData();
        formDataObj.append('image', formData.logoFile);

        const uploadResponse = await fetch(API_ENDPOINTS.upload, {
          method: 'POST',
          body: formDataObj,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          logoUrl = uploadResult.url;
        } else {
          // Fallback to base64 if upload fails
          logoUrl = preview || '';
        }
      }

      const setupData = {
        websiteName: formData.websiteName || 'My Website',
        logo: logoUrl,
      };

      // Update through BuilderContext - this will trigger auto-save to backend
      // Find the navbar section and update its data
      const sections = document.querySelectorAll('[data-section-type="navbar"]');
      if (sections.length > 0) {
        // Get the first navbar section ID from the config (would be better to pass this)
        // For now, we'll dispatch a custom event that the builder can listen to
        window.dispatchEvent(new CustomEvent('websiteSetupUpdate', {
          detail: {
            websiteName: setupData.websiteName,
            logo: setupData.logo
          }
        }));
      }

      // Call callback if provided
      if (onSetupComplete) {
        onSetupComplete(setupData);
      }

      // Close the dialog
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving setup data:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="space-y-2 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl sm:text-3xl">Welcome! Let's Set Up Your Website</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Tell us your website name and add a logo to get started
              </CardDescription>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Website Name Field */}
            <div className="space-y-3">
              <Label htmlFor="website-name" className="text-base font-semibold">
                Website Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="website-name"
                type="text"
                placeholder="Enter your website name (e.g., My Awesome Business)"
                value={formData.websiteName}
                onChange={(e) =>
                  setFormData({ ...formData, websiteName: e.target.value })
                }
                className="h-11 text-base"
                required
              />
              <p className="text-xs sm:text-sm text-muted-foreground">
                This will appear as the logo text in your navbar
              </p>
            </div>

            {/* Logo Upload Field */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Website Logo <span className="text-muted-foreground">(Optional)</span>
              </Label>

              {!preview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors bg-muted/20 hover:bg-muted/40"
                >
                  <Upload className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm sm:text-base font-medium text-foreground mb-1">
                    Click to upload logo
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    PNG, JPG, SVG up to 5MB
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg p-4 sm:p-6 bg-muted/20 space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Logo preview"
                        className="max-h-24 sm:max-h-32 max-w-xs rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90 transition-colors shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    Change Logo
                  </Button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-xs sm:text-sm text-muted-foreground">
                If no logo is provided, your website name will be displayed as a default logo
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-8 pt-6 border-t space-y-3">
            <h4 className="font-semibold text-sm sm:text-base">How it works:</h4>
            <ol className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Enter your website name - this will appear in the navbar</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Upload your logo (optional) - it will be displayed in the navbar</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Click Continue to proceed with building your website</span>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
