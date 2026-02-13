import React, { useState } from 'react';
import { ChevronUp, Mail, Phone, User, Send, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Interface for Product Data
interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  isTitleBlue?: boolean;
  keyFeatures?: string[];
  inTheBox?: string[];
  price?: string;
}

const FeaturedProductSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (id: number, qty: number) => {
    setQuantities(prev => ({ ...prev, [id]: qty }));
  };

  // Data derived from the screenshot
  const products: Product[] = [
    {
      id: 5,
      images: ["/product3.png"],
      title: 'SellSync Cash Drawer',
      description: "Compact footprint, dual media slots, and durable construction for your point-of-sale.",
      isTitleBlue: false,
      price: "Contact for Quote",
      keyFeatures: [
        "Secure cash storage",
        "Dual media slots",
        "Programmable open/close",
        "Durable steel construction",
        "Compact design",
        "Multiple compartments for organization"
      ],
      inTheBox: [
        "Cash drawer unit",
        "Lock and key",
        "Power cable",
        "RJ-11 connector",
        "Installation hardware",
        "Quick setup guide"
      ]
    },
    {
      id: 8,
      images: ["/product1.png", "/product2.png"],
      title: 'SellSync Zebra ZD411 Advanced Desktop 2-inch Wide',
      description: "High-speed desktop thermal transfer printer for labels and receipts, offering exceptional print quality and reliability for busy retail settings.",
      isTitleBlue: false,
      price: "Contact for Quote",
      keyFeatures: [
        "Desktop thermal transfer printer",
        "2-inch wide printing capability",
        "Fast print speed (up to 250mm/sec)",
        "High-resolution printing",
        "Durable industrial construction",
        "Network connectivity support"
      ],
      inTheBox: [
        "Printer unit",
        "Power supply and cord",
        "USB cable",
        "Quick start guide",
        "Empty ribbon take-up core (thermal transfer only)",
        "Mounting bracket"
      ]
    },
    {
      id: 1,
      images: ["/sellsync3pr.png", "/sellsync4pr.png", "/sellsync1pr.png", "/sellsync2pr.png", "/sellsync5pr.png"],
      title: 'SellSync Pro 15.6" Touchscreen Display',
      description: "A smooth and powerful display to elevate your customer experience.",
      isTitleBlue: false,
      price: "Contact for Quote",
      keyFeatures: [
        "15.6-inch high-definition display",
        "Multi-touch capability",
        "Fast response time",
        "Wide viewing angles",
        "Sleek modern design",
        "Integration with all POS systems"
      ],
      inTheBox: [
        "Touchscreen display",
        "Power cord",
        "USB cable",
        "HDMI cable",
        "Stand",
        "Quick setup guide"
      ]
    },

    {
      id: 3,
      images: ["/product5.png"],
      title: 'SellSync Thermal Receipt Printer and Cable',
      description: "A reliable device that delivers clear, fast, and professional receipts for your business.",
      isTitleBlue: false,
      price: "Contact for Quote",
      keyFeatures: [
        "High-speed thermal printing",
        "Clear, professional receipts",
        "Automatic paper cutting",
        "Quiet operation",
        "Wide paper roll compatibility",
        "Reliable long-term performance"
      ],
      inTheBox: [
        "Thermal receipt printer",
        "USB cable",
        "Power adapter",
        "Receipt paper roll",
        "Quick start guide",
        "Installation bracket"
      ]
    },
    {
      id: 4,
      images: ["/barcode.png"],
      title: 'SellSync Wireless 2D Barcode Scanner',
      description: "Instant scanning capability, supporting QR codes, UPC, and EAN barcodes for quick and accurate item identification. Used for age verification also.",
      isTitleBlue: false,
      price: "Contact for Quote",
      keyFeatures: [
        "Instant scanning capability",
        "Supports QR, UPC, and EAN barcodes",
        "Quick and accurate identification",
        "Used for age verification",
        "Wireless connectivity",
        "Durable design"
      ],
      inTheBox: [
        "Barcode scanner",
        "Charging dock",
        "USB cable",
        "Power adapter",
        "User manual",
        "Quick reference guide"
      ]
    },
    {
      id: 7,
      images: ["https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web001/tc7x-series-mobile-computers-front-facing-TC78-3x2-3600.jpg", "https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web001/tc78-photography-website-front-right-facing-3x2-3600.jpg"],
      title: 'SellSync TC78 Mobile Computer',
      description: "Rugged handheld mobile computer with advanced scanning capabilities, perfect for inventory management and on-the-go operations in retail environments.",
      isTitleBlue: false,
      price: "Contact for Quote",
      keyFeatures: [
        "Rugged Android-based mobile computer",
        "Advanced 2D barcode scanning capabilities",
        "Real-time inventory management",
        "On-the-go operations support",
        "Enterprise-grade durability",
        "Long battery life (up to 12 hours)"
      ],
      inTheBox: [
        "Mobile computer unit",
        "Battery",
        "Charger",
        "USB cable",
        "Quick start guide",
        "Screen protector"
      ]
    },



  ];

  const handleContactClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="w-full bg-[#FEFEFF] font-sans relative min-h-screen flex items-center">

      {/* Main Grid Container */}
      <div className="w-full px-6 py-12 lg:px-12 flex flex-col items-center">

        {/* Section Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Get a Comprehensive POS System <br className="hidden md:block" />
            <span className="text-[#D87027]"> – Including Accessories – </span> <br className="hidden md:block" />
            With Our Hardware
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full w-full">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              onQuantityChange={(qty) => handleQuantityChange(product.id, qty)}
              onViewDetails={() => handleViewDetails(product)}
              onContactClick={() => handleContactClick(product)}
            />
          ))}
        </div>
      </div>

      {/* Product Inquiry Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-2xl border-2 border-[#D87027] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
            {/* Sidebar (Visual) */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#F08A4B] to-[#C45E18] p-6 text-white flex flex-col justify-between hidden md:flex">
              <div>
                <h4 className="text-xl font-bold mb-2">Get in Touch</h4>
                <p className="text-orange-100 text-sm mb-6">We'd love to help you find the perfect hardware for your business.</p>
                {selectedProduct && (
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 mb-4">
                    <img src={selectedProduct.images[0]} alt="Product" className="w-16 h-16 object-contain mb-2 bg-white rounded-lg p-1" />
                    <p className="font-semibold text-xs opacity-90 line-clamp-2">{selectedProduct.title}</p>
                    <p className="text-xs mt-1">Quantity: <span className="font-bold">{quantities[selectedProduct.id] || 1}</span></p>
                  </div>
                )}
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 mb-6">
                  <p className="text-xs opacity-80">Total Unique Products in Catalog: <span className="font-bold text-white">{products.length}</span></p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 opacity-90">
                  <Phone size={16} /> <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 opacity-90">
                  <Mail size={16} /> <span>sales@sellsync.com</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:col-span-3 p-6 md:p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-gray-900">Request Details</DialogTitle>
                <DialogDescription className="text-gray-500">
                  Fill out the form below to inquire about <span className="font-semibold text-[#D87027]">{quantities[selectedProduct?.id || 0] || 1}x {selectedProduct?.title}</span>.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input id="name" placeholder="John Doe" className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input id="email" type="email" placeholder="john@example.com" className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea
                    id="message"
                    placeholder="I'm interested in..."
                    className="min-h-[100px] bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#D87027] hover:bg-[#c26522] text-white font-bold py-6 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98]">
                  Send Inquiry <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button (Bottom Right) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#D87027] hover:bg-[#c26522] text-white p-3 rounded shadow-lg transition-colors z-50"
      >
        <ChevronUp size={20} strokeWidth={3} />
      </button>



    </div>
  );
};

// Individual Card Component
const ProductCard: React.FC<{
  product: Product,
  quantity: number,
  onQuantityChange: (qty: number) => void,
  onViewDetails: () => void,
  onContactClick: () => void
}> = ({ product, quantity, onQuantityChange, onViewDetails, onContactClick }) => {
  return (
    <div className="col-xs-12 col-sm-6 col-lg-4 col-xl-4 h-full w-full">
      <div className="hard-box bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-12 flex flex-col items-center text-center h-full min-h-[500px] border border-gray-200 hover:border-gray-300 transition-all duration-300" id={`product-${product.id}`}>

        {/* Image Area */}
        <div className="hard-img h-72 w-full flex items-center justify-center mb-8 gap-1">
          {(product.id === 8 || product.id === 1 || product.id === 7) ? (
            product.images.slice(0, 2).map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                className="max-h-full max-w-[55%] object-contain transform hover:scale-110 transition-transform duration-300"
              />
            ))
          ) : (

            <img
              src={product.images[0]}
              alt={product.title}
              className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold mb-4 leading-tight ${product.isTitleBlue ? 'text-[#4A89DC]' : 'text-black'}`}>
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
          {product.description}
        </p>

        {/* Action Area (Quantity + View Details Button) */}
        <div className="w-full mt-auto flex items-center justify-center gap-6">
          {/* Quantity Input */}
          <div className="relative">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
              className="w-14 h-11 border border-gray-200 rounded pl-3 pr-1 text-gray-600 text-sm focus:outline-none focus:border-[#D87027]"
            />
          </div>

          <button
            onClick={onViewDetails}
            className="bg-[#D87027] hover:bg-[#c26522] text-white font-bold py-3 px-6 rounded-full text-base transition-colors shadow-lg shadow-[#D87027]/40 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            View Details <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductSection;
