import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Mail, Phone, User, Send, ArrowRight, Menu, X,
  CheckCircle2, ShieldCheck, Truck, RefreshCcw,
  Package, Zap, Info, ChevronRight,
  Instagram, Twitter, Linkedin, Github,
  Smartphone, Cpu, Wifi, Shield, Battery,
  Box, Cable, BookOpen, FileText, Monitor, Plug,
  Anchor, Archive, CheckSquare, Database, Droplets, Fingerprint, Flag, Focus, Frame,
  Gift, Inbox, Layers, ListChecks, Router, Scan, Scroll, Settings, Signal, Sparkles, Star, Sun, Tag, Touchpad, Umbrella, Headset
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from 'framer-motion';
import FeaturedProductSection from "@/components/ui/featured-product-section";
import { LoginSidebar } from "@/components/ui/login-sidebar";
import { Footer } from "@/components/ui/footer";

interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: string;
  keyFeatures: string[];
  inTheBox: string[];
  specs?: Record<string, string>;
}

// Product Data moved outside for cleaner component body
const ALL_PRODUCTS: Product[] = [
  {
    id: 7,
    images: ["https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web001/tc7x-series-mobile-computers-front-facing-TC78-3x2-3600.jpg", "https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web001/tc78-photography-website-front-right-facing-3x2-3600.jpg"],
    title: 'SellSync TC78 Mobile Computer',
    description: "The ultimate rugged handheld for modern enterprise. Engineered for frontline workers who need reliable data capture and seamless communication in demanding environments.",
    price: "Custom Quote",
    keyFeatures: ["Rugged Android 11 Platform", "Advanced SE4770 2D Scan Engine", "Wi-Fi 6E & 5G Connectivity", "IP65/IP68 Sealing", "Hot-swappable 4680mAh Battery"],
    inTheBox: ["TC78 Terminal", "PowerPrecision+ Battery", "Hand Strap", "Regulatory Guide"],
    specs: { "Display": "6.0 inch Full HD", "OS": "Android 11 (Upgradable)", "Drop Spec": "10ft (3m) to concrete" }
  },
  {
    id: 1,
    images: ["/sellsync1pr.png", "/sellsync2pr.png", "/sellsync3pr.png", "/sellsync4pr.png", "/sellsync5pr.png"],
    title: 'SellSync Pro 15.6" Touchscreen',
    description: "A premium point-of-sale display designed to provide a sleek, modern interface for both staff and customers. Features industrial-grade touch sensitivity.",
    price: "Contact for Pricing",
    keyFeatures: ["Full HD Anti-glare Display", "10-point Multi-touch", "Edge-to-edge Glass Design", "VESA Mount Compatible", "Spill-resistant Housing"],
    inTheBox: ["15.6\" Touch Monitor", "I/O Connectivity Hub", "Power Adapter", "Cleaning Cloth"],
    specs: { "Brightness": "400 nits", "Resolution": "1920 x 1080", "Interface": "USB-C / HDMI" }
  },
  {
    id: 3,
    images: ["/product5.png"],
    title: 'SellSync High-Speed Thermal Printer',
    description: "Quiet, ultra-fast, and remarkably reliable. This thermal printer is designed for high-volume retail environments where speed and uptime are critical.",
    price: "Request Quote",
    keyFeatures: ["350mm/sec Print Speed", "Auto-Cutter (2M cuts)", "Triple Interface (USB/Eth/Serial)", "Drop-in Paper Loading", "Energy Star Certified"],
    inTheBox: ["Thermal Printer", "Starter Paper Roll", "Interface Cable", "Power Supply"],
    specs: { "Print Width": "80mm / 58mm", "Resolution": "203 DPI", "Weight": "1.2kg" }
  },


  // ... other products can be added here following the same structure
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProduct = location.state?.product || ALL_PRODUCTS.find(p => p.id === parseInt(id || '1'));

  // Fallback for legacy product data without images array
  if (currentProduct && !currentProduct.images) {
    currentProduct.images = [currentProduct.image || '/product1.png', '/product2.png'];
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!currentProduct) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/"><Button>Return to Catalog</Button></Link>
        </div>
      </div>
    );
  }

  // Helper for consistent unique icons
  const getUniqueIcon = (text: string, usedSet: Set<any>) => {
    const t = text.toLowerCase();

    // Priority mappings
    const mappings = [
      { keys: ['android', 'os'], icon: Smartphone, color: 'text-green-500' },
      { keys: ['wifi', '5g', 'connect', 'network'], icon: Wifi, color: 'text-blue-500' },
      { keys: ['scan', 'barcode', 'engine'], icon: Scan, color: 'text-purple-500' },
      { keys: ['battery', 'power', 'mah'], icon: Battery, color: 'text-green-600' },
      { keys: ['rugged', 'ip65', 'ip68', 'drop', 'sealing', 'durable', 'construction'], icon: Shield, color: 'text-orange-600' },
      { keys: ['display', 'screen', 'touch', 'monitor', 'panel', 'resolution'], icon: Monitor, color: 'text-indigo-500' },
      { keys: ['processor', 'cpu', 'memory', 'ram'], icon: Cpu, color: 'text-red-500' },
      { keys: ['print', 'thermal', 'speed', 'fast'], icon: Zap, color: 'text-yellow-500' },
      { keys: ['cut', 'cutter'], icon: Layers, color: 'text-orange-500' },
      { keys: ['mount', 'bracket', 'vesa'], icon: Frame, color: 'text-slate-500' },
      { keys: ['interface', 'usb', 'port', 'serial', 'ethernet', 'cable'], icon: Cable, color: 'text-cyan-600' },
      { keys: ['certified', 'energy', 'star'], icon: CheckCircle2, color: 'text-emerald-500' },
      { keys: ['glare', 'glass'], icon: Sun, color: 'text-amber-500' },
      { keys: ['spill', 'water', 'resistant'], icon: Droplets, color: 'text-blue-400' },
      { keys: ['terminal', 'unit', 'device', 'computer'], icon: Smartphone, color: 'text-slate-700' },
      { keys: ['guide', 'manual'], icon: BookOpen, color: 'text-blue-400' },
      { keys: ['adapter', 'supply', 'charger', 'cord'], icon: Plug, color: 'text-orange-500' },
      { keys: ['roll', 'paper', 'ribbon'], icon: Scroll, color: 'text-stone-400' },
      { keys: ['strap', 'cloth'], icon: Sparkles, color: 'text-teal-500' },
      { keys: ['hub'], icon: Router, color: 'text-indigo-600' }
    ];

    const selected = mappings.find(m => m.keys.some(k => t.includes(k)) && !usedSet.has(m.icon));

    if (selected) {
      usedSet.add(selected.icon);
      return { Icon: selected.icon, color: selected.color };
    }

    // Fallbacks
    const fallbacks = [
      { icon: Star, color: 'text-amber-500' },
      { icon: Focus, color: 'text-indigo-500' },
      { icon: Fingerprint, color: 'text-rose-500' },
      { icon: Signal, color: 'text-blue-600' },
      { icon: Database, color: 'text-emerald-600' },
      { icon: Gift, color: 'text-pink-500' },
      { icon: Tag, color: 'text-slate-400' },
      { icon: Archive, color: 'text-amber-600' },
      { icon: CheckSquare, color: 'text-green-600' },
      { icon: Anchor, color: 'text-navy-500' },
      { icon: Settings, color: 'text-gray-600' },
      { icon: Umbrella, color: 'text-indigo-400' },
      { icon: Touchpad, color: 'text-violet-500' },
      { icon: ListChecks, color: 'text-teal-600' },
      { icon: Inbox, color: 'text-blue-300' },
      { icon: Flag, color: 'text-red-400' }
    ];

    for (const fb of fallbacks) {
      if (!usedSet.has(fb.icon)) {
        usedSet.add(fb.icon);
        return { Icon: fb.icon, color: fb.color };
      }
    }

    // Final fallback
    return { Icon: Zap, color: 'text-gray-400' };
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      {/* --- PROFESSIONAL NAVBAR --- */}
      <header className="fixed top-0 z-50 w-full border-b bg-white shadow-md border-gray-200 text-foreground transition-all duration-300 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md">
        <div className="container flex h-20 sm:h-24 items-center justify-between px-3 sm:px-4 md:border-x md:border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/#hero" className="flex items-center space-x-1 sm:space-x-2">
              <img
                src="/sellsynclogo.png"
                alt="SellSync Logo"
                className="h-12 sm:h-16 md:h-20 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
            {["Products", "Hardware", "Pricing", "Industries", "Contact"].map((item) => (
              item === "Contact" ? (
                <Link
                  key={item}
                  to="/#contact"
                  className="relative text-lg lg:text-xl font-bold transition-colors text-foreground hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </Link>
              ) : (
                <button
                  key={item}
                  onClick={() => navigate(`/#${item.toLowerCase()}`)}
                  className="relative text-lg lg:text-xl font-bold transition-colors text-foreground hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </button>
              )
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 lg:gap-3 ml-auto">
            <LoginSidebar
              variant="outline"
              className="rounded-3xl font-bold text-base lg:text-xl"
            />
            <Link to="/#contact">
              <Button className="rounded-3xl font-bold text-base lg:text-xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20">
                Contact Us
              </Button>
            </Link>
          </div>
          <button className="flex md:hidden ml-auto text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background md:hidden overflow-y-auto"
        >
          <div className="container flex h-20 items-center justify-between px-3 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <img
                  src="/sellsynclogo.png"
                  alt="SellSync Logo"
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="container grid gap-3 pb-8 pt-6 px-3 sm:px-4">
            {["Products", "Hardware", "Pricing", "Industries", "Contact"].map((item, index) => (
              <div key={index}>
                {item === "Contact" ? (
                  <Link
                    to="/#contact"
                    className="flex items-center justify-between rounded-3xl px-3 py-2 text-base sm:text-lg font-medium hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/#${item.toLowerCase()}`);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-between rounded-3xl px-3 py-2 text-base sm:text-lg font-medium hover:bg-accent w-full text-left"
                  >
                    {item}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <LoginSidebar
                variant="outline"
                className="w-full rounded-3xl"
              />
              <Link to="/#contact">
                <Button className="w-full rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20">Contact Us</Button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-[#D87027]">Home</Link>
            <span>/</span>
            <Link to="/#hardware" className="hover:text-[#D87027]">Hardware Catalog</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{currentProduct.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT: IMAGE GALLERY */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[500px]"
              >
                <img
                  src={currentProduct.images[currentImageIndex]}
                  alt={currentProduct.title}
                  className="max-h-[450px] w-auto object-contain hover:scale-105 transition-transform duration-500"
                />

                {/* Image Thumbnails */}
                <div className="flex gap-2 mt-8 justify-center">
                  {currentProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-12 h-12 object-cover rounded cursor-pointer border-2 transition-all ${currentImageIndex === index
                        ? 'border-[#D87027] scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                      alt={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Zap className="text-[#D87027] w-5 h-5" /> Key Features
                  </h3>
                  <ul className="space-y-4">
                    {(() => {
                      const usedIcons = new Set();
                      return currentProduct.keyFeatures.map((f, i) => {
                        const { Icon, color } = getUniqueIcon(f, usedIcons);
                        return (
                          <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                            <Icon className={`w-4 h-4 ${color} mt-0.5 shrink-0`} />
                            {f}
                          </li>
                        );
                      });
                    })()}
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Package className="text-[#D87027] w-5 h-5" /> What's Included
                  </h3>
                  <ul className="space-y-4">
                    {(() => {
                      const usedIcons = new Set();
                      return currentProduct.inTheBox.map((item, i) => {
                        const { Icon, color } = getUniqueIcon(item, usedIcons);
                        return (
                          <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                            <Icon className={`w-4 h-4 ${color} shrink-0`} />
                            {item}
                          </li>
                        );
                      });
                    })()}
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT: PURCHASE INFO (Sticky) */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-[#D87027] text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
                    In Stock & Ready to Ship
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
                    {currentProduct.title}
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {currentProduct.description}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-black text-[#1C244B]">{currentProduct.price}</span>
                    <span className="text-slate-400 text-sm font-medium">USD (MSRP)</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Quantity</label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-slate-100 transition-colors">-</button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className="w-12 text-center bg-transparent font-bold focus:outline-none"
                        />
                        <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-slate-100 transition-colors">+</button>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Bulk discounts available for 10+ units</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      size="lg"
                      className="h-14 text-lg font-bold bg-[#D87027] hover:bg-[#c26522] rounded-xl shadow-lg shadow-orange-200"
                    >
                      Request Enterprise Quote <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <ShieldCheck className="text-slate-400 w-8 h-8 mb-2 stroke-[1.5]" />
                    <span className="text-base font-black text-slate-900 leading-tight">2-Year Warranty</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Enterprise Grade</span>
                  </div>
                  <div className="flex flex-col gap-1 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <Truck className="text-slate-400 w-8 h-8 mb-2 stroke-[1.5]" />
                    <span className="text-base font-black text-slate-900 leading-tight">Global Logistics</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority Shipping</span>
                  </div>
                  <div className="flex flex-col gap-1 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <RefreshCcw className="text-slate-400 w-8 h-8 mb-2 stroke-[1.5]" />
                    <span className="text-base font-black text-slate-900 leading-tight">Lifecycle Mgmt</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Device Refresh</span>
                  </div>
                  <div className="flex flex-col gap-1 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <Headset className="text-slate-400 w-8 h-8 mb-2 stroke-[1.5]" />
                    <span className="text-base font-black text-slate-900 leading-tight">24/7 Support</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dedicated Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- OTHER PRODUCTS SECTION --- */}
      <section id="other-products" className="w-full">
        <FeaturedProductSection />
      </section>

      {/* --- REFINED FOOTER --- */}
      <Footer />

      {/* --- QUOTE MODAL --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-[#1C244B] p-10 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-black mb-4 leading-tight">Request a Custom Quote</h2>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                  Get specialized pricing for your multi-location business or enterprise deployment.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                  <img src={currentProduct.images[0]} className="w-12 h-12 object-contain bg-white rounded-lg p-1" alt="" />
                  <div>
                    <p className="text-[10px] font-bold text-[#D87027] uppercase tracking-tighter">Requesting</p>
                    <p className="text-xs font-bold line-clamp-1">{currentProduct.title}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#D87027]" /> +1 (800) SYNC-POS</div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#D87027]" /> enterprise@sellsync.com</div>
              </div>
            </div>
            <div className="md:w-3/5 p-10">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                    <Input className="h-12 bg-slate-50 border-slate-100 focus:ring-2 ring-orange-100" placeholder="John Carter" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Work Email</label>
                    <Input className="h-12 bg-slate-50 border-slate-100 focus:ring-2 ring-orange-100" type="email" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Company Name</label>
                  <Input className="h-12 bg-slate-50 border-slate-100" placeholder="Retail Group LLC" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Deployment Details</label>
                  <Textarea className="min-h-[120px] bg-slate-50 border-slate-100 resize-none" placeholder="Tell us about your requirements..." />
                </div>
                <Button className="w-full h-14 bg-[#D87027] hover:bg-[#c26522] text-white font-bold text-lg rounded-2xl">
                  Submit Request <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;