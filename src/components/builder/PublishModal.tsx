import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/lib/api';
import {
  Globe,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  History,
  Trash2,
  AlertCircle,
  Rocket,
  Link2,
  Server,
  RefreshCw,
} from 'lucide-react';

interface Deployment {
  _id: string;
  deployType: 'subpath' | 'subdomain' | 'custom-domain';
  publishedUrl: string;
  status: string;
  subdomain?: string;
  customDomain?: string;
  uniqueId?: string;
  netlifySiteId?: string;
  createdAt: string;
  dnsInstructions?: {
    type: string;
    host: string;
    value: string;
    ttl: number;
  };
}

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const API_BASE = API_ENDPOINTS.publish;

export function PublishModal({ open, onOpenChange }: PublishModalProps) {
  const [activeTab, setActiveTab] = useState('quick');
  const [isPublishing, setIsPublishing] = useState(false);
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  // Load deployment history when modal opens
  useEffect(() => {
    if (open) {
      loadDeploymentHistory();
    }
  }, [open]);

  // Debounced subdomain availability check
  useEffect(() => {
    if (subdomain.length < 3) {
      setSubdomainAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingSubdomain(true);
      try {
        const response = await fetch(`${API_BASE}/check-subdomain?name=${subdomain}`);
        const data = await response.json();
        setSubdomainAvailable(data.available);
      } catch (error) {
        console.error('Error checking subdomain:', error);
        setSubdomainAvailable(null);
      }
      setCheckingSubdomain(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [subdomain]);

  const loadDeploymentHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch(`${API_BASE}/history`);
      const data = await response.json();
      setDeployments(data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
    setLoadingHistory(false);
  };

  const handleQuickPublish = async () => {
    setIsPublishing(true);
    setPublishedUrl(null);
    try {
      const response = await fetch(`${API_BASE}/subpath`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.success) {
        setPublishedUrl(data.url);
        toast.success('Website published successfully!', {
          description: data.url,
        });
        loadDeploymentHistory();
      } else {
        throw new Error(data.error || 'Failed to publish');
      }
    } catch (error: any) {
      toast.error('Publishing failed', {
        description: error.message,
      });
    }
    setIsPublishing(false);
  };

  const handleSubdomainPublish = async () => {
    if (!subdomain || !subdomainAvailable) return;

    setIsPublishing(true);
    setPublishedUrl(null);
    try {
      const response = await fetch(`${API_BASE}/subdomain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomain }),
      });

      const data = await response.json();

      if (data.success) {
        setPublishedUrl(data.url);
        setSubdomain('');
        toast.success('Website published successfully!', {
          description: data.url,
        });
        loadDeploymentHistory();
      } else {
        throw new Error(data.error || 'Failed to publish');
      }
    } catch (error: any) {
      toast.error('Publishing failed', {
        description: error.message,
      });
    }
    setIsPublishing(false);
  };

  const handleCustomDomain = async () => {
    if (!customDomain || !selectedSiteId) return;

    setIsPublishing(true);
    try {
      const response = await fetch(`${API_BASE}/custom-domain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId: selectedSiteId, domain: customDomain }),
      });

      const data = await response.json();

      if (data.success) {
        setCustomDomain('');
        toast.success('Custom domain added!', {
          description: 'Configure DNS settings to complete setup.',
        });
        loadDeploymentHistory();
      } else {
        throw new Error(data.error || 'Failed to attach domain');
      }
    } catch (error: any) {
      toast.error('Failed to attach domain', {
        description: error.message,
      });
    }
    setIsPublishing(false);
  };

  const handleDeleteDeployment = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Deployment deleted');
        loadDeploymentHistory();
      } else {
        throw new Error(data.error || 'Failed to delete');
      }
    } catch (error: any) {
      toast.error('Delete failed', {
        description: error.message,
      });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
    toast.success('URL copied to clipboard!');
  };

  const getDeployTypeBadge = (type: string) => {
    switch (type) {
      case 'subpath':
        return <Badge variant="secondary">Quick Deploy</Badge>;
      case 'subdomain':
        return <Badge variant="default">Subdomain</Badge>;
      case 'custom-domain':
        return <Badge className="bg-purple-600">Custom Domain</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'deployed':
        return <Badge className="bg-green-600">Live</Badge>;
      case 'dns-pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">DNS Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get subdomain deployments for custom domain tab
  const subdomainDeployments = deployments.filter(d => d.deployType === 'subdomain' && d.netlifySiteId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-600" />
            Publish Your Website
          </DialogTitle>
          <DialogDescription>
            Choose how you want to publish your website to the world.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quick" className="text-xs sm:text-sm">
              <Rocket className="h-4 w-4 mr-1 hidden sm:inline" />
              Quick
            </TabsTrigger>
            <TabsTrigger value="subdomain" className="text-xs sm:text-sm">
              <Globe className="h-4 w-4 mr-1 hidden sm:inline" />
              Subdomain
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs sm:text-sm">
              <Link2 className="h-4 w-4 mr-1 hidden sm:inline" />
              Domain
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              <History className="h-4 w-4 mr-1 hidden sm:inline" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Quick Publish Tab */}
          <TabsContent value="quick" className="space-y-4 mt-4">
            <div className="rounded-lg border p-4 bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Server className="h-4 w-4" />
                One-Click Publish
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Instantly publish your website to a unique URL. Perfect for previews and quick sharing.
              </p>

              {publishedUrl && (
                <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-2">🎉 Published Successfully!</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-2 py-1 rounded border truncate">
                      {publishedUrl}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(publishedUrl)}
                    >
                      {copiedUrl === publishedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(publishedUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={handleQuickPublish}
                disabled={isPublishing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Publish Now
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Subdomain Tab */}
          <TabsContent value="subdomain" className="space-y-4 mt-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4" />
                Choose Your Subdomain
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get a memorable URL like <code className="bg-muted px-1 rounded">yoursite.netlify.app</code>
              </p>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain Name</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="subdomain"
                        placeholder="my-awesome-site"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="pr-10"
                      />
                      {subdomain.length >= 3 && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {checkingSubdomain ? (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          ) : subdomainAvailable ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : subdomainAvailable === false ? (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                    <span className="text-muted-foreground">.netlify.app</span>
                  </div>
                  {subdomain.length >= 3 && subdomainAvailable === false && (
                    <p className="text-sm text-red-600">This subdomain is already taken</p>
                  )}
                  {subdomain.length >= 3 && subdomainAvailable === true && (
                    <p className="text-sm text-green-600">Subdomain is available!</p>
                  )}
                </div>

                <Button
                  onClick={handleSubdomainPublish}
                  disabled={isPublishing || !subdomain || !subdomainAvailable}
                  className="w-full"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4 mr-2" />
                      Publish to Subdomain
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Custom Domain Tab */}
          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Link2 className="h-4 w-4" />
                Connect Your Domain
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use your own domain like <code className="bg-muted px-1 rounded">yourbusiness.com</code>
              </p>

              {subdomainDeployments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>First publish to a subdomain, then you can connect your custom domain.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab('subdomain')}
                  >
                    Go to Subdomain Tab
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Site</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border bg-background"
                      value={selectedSiteId}
                      onChange={(e) => setSelectedSiteId(e.target.value)}
                    >
                      <option value="">Choose a deployed site...</option>
                      {subdomainDeployments.map((d) => (
                        <option key={d._id} value={d.netlifySiteId}>
                          {d.subdomain}.netlify.app
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customDomain">Your Domain</Label>
                    <Input
                      id="customDomain"
                      placeholder="yourbusiness.com"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
                    />
                  </div>

                  <Button
                    onClick={handleCustomDomain}
                    disabled={isPublishing || !customDomain || !selectedSiteId}
                    className="w-full"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4 mr-2" />
                        Connect Domain
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* DNS Instructions for custom domain deployments */}
              {deployments.filter(d => d.deployType === 'custom-domain' && d.dnsInstructions).length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">DNS Configuration Required</h4>
                  {deployments
                    .filter(d => d.deployType === 'custom-domain' && d.dnsInstructions)
                    .map(d => (
                      <div key={d._id} className="text-sm">
                        <p className="font-medium">{d.customDomain}</p>
                        <code className="block mt-1 p-2 bg-white rounded border text-xs">
                          Type: {d.dnsInstructions?.type}<br />
                          Host: {d.dnsInstructions?.host}<br />
                          Value: {d.dnsInstructions?.value}
                        </code>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <History className="h-4 w-4" />
                Deployment History
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadDeploymentHistory}
                disabled={loadingHistory}
              >
                <RefreshCw className={`h-4 w-4 ${loadingHistory ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            <ScrollArea className="h-[300px]">
              {loadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : deployments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No deployments yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {deployments.map((deployment) => (
                    <div
                      key={deployment._id}
                      className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            {getDeployTypeBadge(deployment.deployType)}
                            {getStatusBadge(deployment.status)}
                          </div>
                          <p className="text-sm font-medium truncate">{deployment.publishedUrl}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(deployment.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(deployment.publishedUrl)}
                          >
                            {copiedUrl === deployment.publishedUrl ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => window.open(deployment.publishedUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteDeployment(deployment._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
