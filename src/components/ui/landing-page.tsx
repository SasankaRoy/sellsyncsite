import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Menu,
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Github,
  ArrowUpRight,
  Zap,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Shield,
  CreditCard,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Building2,
  Star,
  Monitor,
  Minus,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FeaturesSectionWithCardGradient, Grid } from "@/components/ui/feature-section-with-card-gradient"
import AboutUsSection from "@/components/ui/about-us-section"
import { Pricing } from "@/components/ui/pricing-cards"
import Testimonials from "@/components/ui/testimonials"
import { RetailStoreDemo } from "@/components/ui/retail-store-demo"
import { FAQSection } from "@/components/ui/faqsection"
import { Gallery4 } from "@/components/ui/gallery4"
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects"
import { LoginSidebar } from "@/components/ui/login-sidebar"
import { AuroraBackground } from "@/components/ui/aurora-background"
import FeaturedProductSection from "@/components/ui/featured-product-section"
import { Footer } from "@/components/ui/footer"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function SellSyncPOS() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [demoStep, setDemoStep] = useState(1)
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({
    "Customized Panels": false,
    "Shift Reconciliation": false,
    "Track Inventory": false,
    "Core Reports": false,
    "Core Discounts": false,
    "Accept Credit Cards": false,
    "Multi Store Support": false,
    "Manufacturer Discounts": false,
    "Website template": false,
  })


  const [checkoutStations, setCheckoutStations] = useState(1)
  const [addFtxUplift, setAddFtxUplift] = useState(false)

  const audioRef = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"));

  const toggleFeature = (feature: string) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.error("Audio play failed", e));
    }

    setSelectedFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }))
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Handle hash scrolling on page load
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.getElementById(hash.substring(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20 overflow-x-hidden">
      {/* Header */}
      <header
        className="fixed top-0 z-50 w-full border-b bg-white shadow-md border-gray-200 text-foreground transition-all duration-300 pointer-events-none backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md"
      >
        <div className="container flex h-20 sm:h-24 items-center justify-between px-3 sm:px-4 md:border-x md:border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#hero" className="flex items-center space-x-1 sm:space-x-2 pointer-events-auto">
              <img
                src="/sellsynclogo.png"
                alt="SellSync Logo"
                className="h-12 sm:h-16 md:h-20 w-auto"
              />

            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 pointer-events-auto flex-1 justify-center">
            {["Products", "Hardware", "Pricing", "Industries", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-lg lg:text-xl font-bold transition-colors text-foreground hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 lg:gap-3 ml-auto pointer-events-auto">
            <LoginSidebar
              variant="outline"
              className="rounded-3xl font-bold text-base lg:text-xl"
            />
            <Link to="/demo">
              <Button className="rounded-3xl font-bold text-base lg:text-xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20">
                Get Demo
              </Button>
            </Link>
          </div>
          <button className="flex md:hidden ml-auto pointer-events-auto text-foreground" onClick={toggleMenu}>
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
              <a href="#hero" className="flex items-center space-x-2" onClick={toggleMenu}>
                <img
                  src="/sellsynclogo.png"
                  alt="SellSync Logo"
                  className="h-12 w-auto"
                />

              </a>
            </div>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container grid gap-3 pb-8 pt-6 px-3 sm:px-4"
          >
            {["Products", "Hardware", "Pricing", "Industries", "Contact"].map((item, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center justify-between rounded-3xl px-3 py-2 text-base sm:text-lg font-medium hover:bg-accent"
                  onClick={toggleMenu}
                >
                  {item}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
            <motion.div variants={itemFadeIn} className="flex flex-col gap-3 pt-4">
              <LoginSidebar
                variant="outline"
                className="w-full rounded-3xl"
              />
              <Link to="/demo">
                <Button className="w-full rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20">Get Demo</Button>
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section
          id="hero"
          className="w-full min-h-screen pt-12 pb-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 text-white relative group flex items-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zJTIwc3lzdGVtfGVufDB8fDB8fHww')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="container px-3 sm:px-4 md:px-6 relative z-10 w-full max-w-full">
            <div className="grid gap-4 sm:gap-3 grid-cols-1 lg:gap-8 items-center w-full">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex flex-col justify-center space-y-3 py-2 sm:py-4 md:py-6 w-full max-w-full pl-0 sm:pl-8 md:pl-28 lg:pl-32"
              >
                <div className="space-y-3 sm:space-y-4 mt-0 md:-mt-8 w-full max-w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-3xl bg-white/10 border border-white/20 px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-white backdrop-blur-sm max-w-full"
                  >
                    <Zap className="mr-1 h-3 w-3 text-white flex-shrink-0" />
                    <span className="whitespace-nowrap text-xs sm:text-sm">Cloud-Powered POS for USA Retail</span>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl/none font-bold tracking-tighter w-full max-w-full break-words leading-tight sm:leading-tight"
                  >
                    SellSync – The Smarter POS System for{" "}
                    <span className="text-white underline decoration-white/30 underline-offset-4 sm:underline-offset-8">
                      Modern Retail Stores
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="w-full max-w-full sm:max-w-[600px] text-xs sm:text-base md:text-lg lg:text-xl font-semibold text-white break-words"
                  >
                    Transform Your Retail Operations with Intelligent Point of Sale Technology
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="w-full max-w-full sm:max-w-[600px] text-xs sm:text-sm md:text-base text-white/90 break-words"
                  >
                    Cloud-powered POS software with integrated hardware, built for speed, accuracy, and seamless retail operations.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="w-full max-w-full sm:max-w-[600px] text-xs sm:text-sm md:text-base text-white/80 break-words"
                  >
                    Fast & intuitive checkout. Real-time inventory sync. Retail-ready hardware. Works for multi-store businesses.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center w-full max-w-full sm:max-w-md pt-2"
                >
                  <Link to="/demo" className="w-full sm:flex-1 sm:max-w-[200px] pointer-events-auto">
                    <Button size="lg" className="rounded-3xl group w-full justify-center text-xs sm:text-base px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-7 bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20">
                      Get a Free Demo
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight className="ml-2 h-3.5 sm:h-5 w-3.5 sm:w-5 transition-transform group-hover:translate-x-1" />
                      </motion.span>
                    </Button>
                  </Link>
                  <a href="#features" className="w-full sm:flex-1 sm:max-w-[200px] pointer-events-auto">
                    <Button variant="outline" size="lg" className="rounded-3xl w-full justify-center text-xs sm:text-base px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-7 border-white text-white hover:bg-white/10 hover:text-white bg-transparent">
                      <span className="hidden sm:inline">Explore Features</span>
                      <span className="sm:hidden">Features</span>
                    </Button>
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="text-xs text-white/70"
                >
                  Trusted by retail businesses across the USA.
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <AboutUsSection />

        {/* Featured Hardware Products */}
        <section id="products">
          <FeaturedProductSection />
        </section>

        {/* Features Section */}
        <section id="features">
          <Gallery4
            title="Powerful Features for Modern Retail"
            description="Discover the comprehensive features that make SellSync the ultimate POS solution for retail businesses of all sizes."
            items={[
              {
                id: "fast-checkout",
                title: "Fast & Easy Checkout",
                description:
                  "Lightning-fast billing with barcode scanning, item search, and customizable hotkeys.",
                href: "#",
                image:
                  "https://images.unsplash.com/photo-1726661025462-b0ddd7a363a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RmFzdCUyMCUyNiUyMEVhc3klMjBDaGVja291dHxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                id: "inventory-sync",
                title: "Real-Time Inventory Sync",
                description:
                  "Track stock across all locations with auto-adjustments and low-stock alerts.",
                href: "#",
                image:
                  "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8SW52ZW50b3J5fGVufDB8fDB8fHww",
              },
              {
                id: "hardware-integration",
                title: "Complete Hardware Integration",
                description:
                  "Works flawlessly with SellSync's POS terminal, barcode scanners, receipt printers, and cash drawers.",
                href: "#",
                image:
                  "https://images.unsplash.com/photo-1748932123709-7a340870408c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q29tcGxldGUlMjBIYXJkd2FyZSUyMEludGVncmF0aW9ufGVufDB8fDB8fHww",
              },
              {
                id: "cloud-secure",
                title: "Cloud-Based & Secure",
                description:
                  "Your data is backed up automatically and accessible from any device.",
                href: "#",
                image:
                  "https://images.unsplash.com/photo-1667372283496-893f0b1e7c16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWQlMjBzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                id: "customer-loyalty",
                title: "Customer & Loyalty Management",
                description:
                  "Built-in CRM, purchase history, loyalty points, and promotions.",
                href: "#",
                image:
                  "https://media.istockphoto.com/id/1050280678/photo/close-up-two-businessman-hand-shake-together-for-agreement-successful-on-blur-group-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=MnSxvI8YzWv-Zdki3sV2o_fLuZp6I5ybHSjaILWJwv4=",
              },
              {
                id: "multi-store",
                title: "Multi-Store Management",
                description:
                  "Centralized control panel for pricing, stock transfer, staff roles, and reports across multiple outlets.",
                href: "#",
                image:
                  "https://images.unsplash.com/photo-1688561809321-e51e8a4d6651?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3RvcmUlMjBNYW5hZ2VtZW50fGVufDB8fDB8fHww",
              },
              {
                id: "reporting-analytics",
                title: "Advanced Reporting & Analytics",
                description:
                  "Sales trends, top-selling products, staff performance, profits, taxes, and more—updated in real time.",
                href: "#",
                image:
                  "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JhcGhzfGVufDB8fDB8fHww",
              },
              {
                id: "staff-permissions",
                title: "Staff Permissions & Access Control",
                description:
                  "Assign roles, prevent unauthorized actions, and track staff activities.",
                href: "#",
                image:
                  "https://plus.unsplash.com/premium_photo-1682145887988-7a3712b88510?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3RhZmYlMjBQZXJtaXNzaW9ucyUyMCUyNiUyMEFjY2VzcyUyMENvbnRyb2x8ZW58MHx8MHx8fDA%3D",
              },
            ]}
          />
        </section>

        {/* Hardware Section */}
        <section id="hardware" className="w-full py-4 sm:py-6 md:py-8 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-3 sm:px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-4">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] text-white px-4 py-2 text-base font-medium shadow-lg shadow-[#D87027]/30"
                >
                  Hardware Kit
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
                >
                  Retail-Ready Hardware that Works Seamlessly with Our Software
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-sm sm:text-base text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  SellSync provides a complete POS hardware package that works right out of the box.
                </motion.p>
              </div>
            </div>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              className="mx-auto w-full gap-6 md:gap-6 py-6 sm:py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "Touchscreen POS Terminal",
                  description: "15-inch high-performance touchscreen display with intuitive interface for fast operations and seamless customer checkout experience.",
                  image: "https://plus.unsplash.com/premium_photo-1733317218148-064ba712d7d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
                },
                {
                  title: "Barcode Scanner",
                  description: "Wireless 2D barcode scanner with instant scanning capability, supporting QR codes, UPC, and EAN barcodes for quick and accurate item identification.",
                  image: "https://images.unsplash.com/photo-1726255294277-57c46883bd94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY29kZSUyMHNjYW5uZXJ8ZW58MHx8MHx8fDA%3D",
                },
                {
                  title: "Thermal Receipt Printer",
                  description: "80mm thermal receipt printer with automatic paper cutting, fast printing speeds up to 250mm/sec, and reliable performance for busy retail environments.",
                  image: "https://plus.unsplash.com/premium_photo-1682145489846-081721a9b272?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGhlcm1hbCUyMFJlY2VpcHQlMjBQcmludGVyfGVufDB8fDB8fHww",
                },
                {
                  title: "Cash Drawer",
                  description: "Secure cash drawer with programmable open/close functionality, multiple compartments for organized cash management, and durable construction.",
                  image: "https://plus.unsplash.com/premium_photo-1664191866089-9a1707d524dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FzaCUyMERyYXdlcnxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  title: "Customer-Facing Display (Optional)",
                  description: "15-inch secondary display for customer-facing transactions, showing itemized receipts, promotional messages, and enhancing the checkout experience.",
                  image: "https://images.unsplash.com/photo-1711632308710-f2e5bf722778?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3VzdG9tZXItRmFjaW5nJTIwRGlzcGxheXxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  title: "Payment Terminal",
                  description: "EMV-compliant card reader supporting chip cards, contactless payments (Apple Pay, Google Pay), and traditional magnetic stripe cards for secure transactions.",
                  image: "https://plus.unsplash.com/premium_photo-1681748777324-615769d0270e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGF5bWVudCUyMFRlcm1pbmFsfGVufDB8fDB8fHww",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={{ index, isMobile }}
                  variants={{
                    hidden: ({ index, isMobile }: { index: number; isMobile: boolean }) => {
                      if (isMobile) return { opacity: 0, y: 20 };

                      const remainder = index % 4;
                      switch (remainder) {
                        case 0:
                          return { opacity: 0, x: -100, y: 0 }; // Left
                        case 1:
                          return { opacity: 0, x: 100, y: 0 }; // Right
                        case 2:
                          return { opacity: 0, y: 100, x: 0 }; // Bottom
                        case 3:
                          return { opacity: 0, y: -100, x: 0 }; // Top
                        default:
                          return { opacity: 0, y: 20 };
                      }
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: {
                        type: "tween",
                        ease: [0.25, 0.1, 0.25, 1.0],
                        duration: 1.0,
                        opacity: {
                          duration: 0.8,
                          ease: "easeOut",
                        },
                      },
                    },
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="relative bg-transparent rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 h-full min-h-[350px] flex flex-col"
                >
                  {/* Image Section */}
                  <div className="h-1/2 relative">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute h-full w-full object-cover object-center"
                      />
                    )}
                  </div>

                  {/* Text Section */}
                  <div className="h-1/2 relative bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900 dark:via-gray-900 dark:to-blue-800 hover:from-blue-100 hover:via-blue-50 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:via-blue-700 dark:hover:to-blue-600 flex flex-col justify-center p-6 shadow-[0_0_20px_rgba(59,130,246,0.5),0_0_40px_rgba(59,130,246,0.3),0_0_60px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8),0_0_60px_rgba(59,130,246,0.5),0_0_90px_rgba(59,130,246,0.3)] transition-all duration-300">
                    <div className="space-y-3">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-4">Perfectly optimized for grocery stores, convenience stores, salons, boutiques, liquor stores, and more.</p>
              <p className="text-sm text-muted-foreground">Also supports third-party hardware (Select models).</p>
            </div>

          </motion.div>
        </section>



        {/* Retail Store Products Section */}
        <section id="retail-store" className="w-full py-0">
          <RetailStoreDemo />
        </section>

        {/* Industries Section */}
        <section id="industries">
          <Testimonials />
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" className="w-full py-4 sm:py-6 md:py-8 lg:py-12 bg-[#F9F9F9]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-3 sm:px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] text-white px-4 py-2 text-base font-medium shadow-lg shadow-[#D87027]/30"
                >
                  Why Choose Us
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
                >
                  Why Retailers Across the USA Choose SellSync
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
                >
                  Discover the features that make SellSync the preferred choice for retailers nationwide.
                </motion.p>
              </div>
            </div>
            <FeaturesSectionWithHoverEffects />
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-[#F9F9F9]">
          <Pricing />
        </section>

        {/* Demo Request Section */}
        {/* Book a Demo Section */}
        <section
          id="contact"
          className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 md:px-6 bg-[#F9F9F9]"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container grid items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 grid-cols-1 lg:grid-cols-2"
          >
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700"
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-700 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-700"></span>
                  </span>
                  Schedule Your Demo
                </motion.div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                  Experience SellSync in Action
                </h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg"
              >
                Discover how SellSync can transform your retail operations. Our expert team will walk you through the platform and show you how to streamline billing, inventory management, and grow your revenue.
              </motion.p>

              {/* Benefits Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 pt-4"
              >
                {[
                  { icon: <Calendar className="h-5 w-5" />, label: "Live Product Walkthrough" },
                  { icon: <Users className="h-5 w-5" />, label: "Personalized Consultation" },
                  { icon: <TrendingUp className="h-5 w-5" />, label: "Feature Comparison" },
                  { icon: <Shield className="h-5 w-5" />, label: "Security & Compliance" },
                  { icon: <CreditCard className="h-5 w-5" />, label: "Payment Setup Guide" },
                  { icon: <FileText className="h-5 w-5" />, label: "Custom ROI Analysis" },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-[#D87027] hover:bg-orange-50 transition-all duration-300"
                  >
                    <div className="text-[#D87027]">{benefit.icon}</div>
                    <span className="text-sm font-medium text-gray-700">{benefit.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 pt-4 text-sm text-gray-600"
              >
                <div className="flex -space-x-4">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
                  ].map((src, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative cursor-pointer"
                      whileHover={{ scale: 1.25, zIndex: 20, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ zIndex: i }}
                    >
                      <img src={src} alt="User" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
                <span>Join 500+ retail partners already using SellSync</span>
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Form Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl blur-xl"></div>

              {demoStep === 1 ? (
                <div className="relative rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col justify-center items-center text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-900">Choose Your Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-6 md:gap-y-6 w-full mb-6 sm:mb-8 md:mb-12">
                    {[
                      "Customized Panels",
                      "Shift Reconciliation",
                      "Track Inventory",
                      "Core Reports",
                      "Core Discounts",
                      "Accept Credit Cards",
                      "Multi Store Support",
                      "Manufacturer Discounts",
                      "Website template"
                    ].map((feature) => (
                      <div key={feature} className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 w-full p-3 md:p-0 rounded-xl md:rounded-none bg-gray-50 md:bg-transparent border border-gray-100 md:border-none">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 flex-1 md:flex-none text-left md:text-center md:whitespace-nowrap">{feature}</span>
                        <div
                          onClick={() => toggleFeature(feature)}
                          className="cursor-pointer flex-shrink-0"
                        >
                          <motion.div
                            className={`w-20 sm:w-24 h-9 sm:h-10 rounded-full p-1 flex items-center ${selectedFeatures[feature] ? 'bg-[#D87027]' : 'bg-gray-200'
                              } transition-colors duration-300 relative`}
                            animate={{ backgroundColor: selectedFeatures[feature] ? '#D87027' : '#E5E7EB' }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              layout
                              transition={{ type: "spring", stiffness: 700, damping: 30 }}
                              className={`h-7 sm:h-8 w-7 sm:w-8 rounded-full shadow-md flex items-center justify-center absolute top-1 ${selectedFeatures[feature] ? 'right-1 bg-white' : 'left-1 bg-white'}`}
                            >
                              {selectedFeatures[feature] ? <CheckCircle className="text-[#D87027] w-4 sm:w-5 h-4 sm:h-5" /> : <X className="text-gray-400 w-3 sm:w-4 h-3 sm:h-4" />}
                            </motion.div>
                            <div className={`absolute left-2 sm:left-3 text-[10px] font-bold text-white/90 ${selectedFeatures[feature] ? 'opacity-100' : 'opacity-0'}`}><Check className="w-3 sm:w-4 h-3 sm:h-4" strokeWidth={4} /></div>
                            <div className={`absolute right-2 sm:right-3 text-[10px] font-bold text-gray-500 ${!selectedFeatures[feature] ? 'opacity-100' : 'opacity-0'}`}><X className="w-3 sm:w-4 h-3 sm:h-4" strokeWidth={4} /></div>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setDemoStep(2)}
                    className="rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white font-bold py-4 sm:py-5 md:py-6 px-8 sm:px-12 md:px-16 text-base sm:text-lg shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20 transition-all duration-300 w-full sm:w-auto"
                  >
                    <ArrowRight className="mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Continue to Setup
                  </Button>
                </div>
              ) : demoStep === 2 ? (
                <div className="relative rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Store Configuration</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDemoStep(1)}
                      className="text-[#D87027] hover:text-[#D87027] hover:bg-orange-50 self-start sm:self-auto"
                    >
                      <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" /> <span className="text-sm">Back</span>
                    </Button>
                  </div>

                  <div className="w-full space-y-6 sm:space-y-8 flex-1">
                    {/* Checkout Stations */}
                    <div className="space-y-3 sm:space-y-4">
                      <label htmlFor="stations" className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Monitor className="h-4 sm:h-5 w-4 sm:w-5 text-[#D87027] flex-shrink-0" />
                        <span className="leading-tight">Number of Checkout Stations</span>
                      </label>
                      <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCheckoutStations(Math.max(1, checkoutStations - 1))}
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-gray-300 hover:border-[#D87027] hover:text-[#D87027] flex-shrink-0"
                        >
                          <Minus className="h-3 sm:h-4 w-3 sm:w-4" />
                        </Button>
                        <Input
                          id="stations"
                          type="number"
                          value={checkoutStations}
                          onChange={(e) => setCheckoutStations(parseInt(e.target.value) || 1)}
                          className="h-10 sm:h-12 text-center text-lg sm:text-xl font-bold rounded-xl border-gray-300 focus:border-[#D87027] focus:ring-[#D87027] w-20 sm:w-24 md:max-w-[100px]"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCheckoutStations(checkoutStations + 1)}
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-gray-300 hover:border-[#D87027] hover:text-[#D87027] flex-shrink-0"
                        >
                          <Plus className="h-3 sm:h-4 w-3 sm:w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* FTx Uplift */}
                    <div
                      className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-300 cursor-pointer ${addFtxUplift ? 'border-[#D87027] bg-orange-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setAddFtxUplift(!addFtxUplift)}
                    >
                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-start sm:items-center gap-2 flex-wrap">
                              <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight">Automated Upselling Ad & Script (FTx Uplift)</span>
                              {addFtxUplift && <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-[#D87027] flex-shrink-0" />}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                              Maximize your revenue with our intelligent upselling engine. FTx Uplift automatically suggests relevant add-ons and promotions to your staff during checkout, ensuring you never miss a sale opportunity.
                            </p>
                            <div className="pt-1 sm:pt-2">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2 sm:px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Recommended
                              </span>
                            </div>
                          </div>
                          <div className={`flex-shrink-0 h-6 w-11 rounded-full p-1 transition-colors duration-200 ease-in-out ${addFtxUplift ? 'bg-[#D87027]' : 'bg-gray-200'} self-start sm:self-auto mt-2 sm:mt-0`}>
                            <div className={`h-4 w-4 rounded-full bg-white shadow transform transition duration-200 ease-in-out ${addFtxUplift ? 'translate-x-5' : 'translate-x-0'}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 md:mt-10 w-full flex justify-center">
                    <Button
                      onClick={() => setDemoStep(3)}
                      className="rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white font-bold py-4 sm:py-5 md:py-6 px-8 sm:px-12 md:px-16 text-base sm:text-lg shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20 transition-all duration-300 w-full sm:w-auto"
                    >
                      <CheckCircle className="mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Continue to Details
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4 sm:mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-gray-900">Book Your Free Demo</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Takes just 15 minutes. Our team will be in touch within 2 hours.</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDemoStep(2)}
                      className="text-[#D87027] hover:text-[#D87027] hover:bg-orange-50 self-start sm:self-auto -mt-1 sm:-mt-2 -mr-1 sm:-mr-2"
                    >
                      <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" /> <span className="text-sm">Back</span>
                    </Button>
                  </div>

                  <form className="space-y-3 sm:space-y-4 md:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <motion.div
                        className="space-y-1.5 sm:space-y-2"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label htmlFor="full-name" className="text-xs sm:text-sm font-semibold text-gray-700">Full Name</label>
                        <Input
                          id="full-name"
                          placeholder="John Doe"
                          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10 sm:h-11"
                        />
                      </motion.div>
                      <motion.div
                        className="space-y-1.5 sm:space-y-2"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label htmlFor="store-name" className="text-xs sm:text-sm font-semibold text-gray-700">Store Name</label>
                        <Input
                          id="store-name"
                          placeholder="Your Store Name"
                          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10 sm:h-11"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      className="space-y-1.5 sm:space-y-2"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-700">Business Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10 sm:h-11"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-1.5 sm:space-y-2"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-gray-700">Phone Number</label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10 sm:h-11"
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <motion.div
                        className="space-y-1.5 sm:space-y-2"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label htmlFor="store-type" className="text-xs sm:text-sm font-semibold text-gray-700">Store Type</label>
                        <Select>
                          <SelectTrigger className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10 sm:h-11">
                            <SelectValue placeholder="Select store type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grocery">Grocery & Supermarket</SelectItem>
                            <SelectItem value="convenience">Convenience Store</SelectItem>
                            <SelectItem value="clothing">Clothing & Fashion</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="liquor">Liquor & Tobacco</SelectItem>
                            <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                            <SelectItem value="pet">Pet Store</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="specialty">Specialty Retail</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        className="space-y-1.5 sm:space-y-2"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label htmlFor="locations" className="text-xs sm:text-sm font-semibold text-gray-700">Number of Locations</label>
                        <Input
                          id="locations"
                          type="number"
                          min="1"
                          placeholder="e.g., 1"
                          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10 sm:h-11"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-1 sm:pt-2"
                    >
                      <Button
                        type="submit"
                        className="w-full rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white font-bold py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20 transition-all duration-300"
                      >
                        Schedule My Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>

                    <p className="text-xs text-gray-500 text-center pt-1 sm:pt-2">
                      ✓ No credit card required • ✓ 15 minute session • ✓ Expert consultation
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Product & Account Help"
          description="Get instant answers to the most common questions about SellSync POS system, setup, and support."
          buttonLabel="Browse All FAQs →"
          buttonHref="/faq"
          faqsLeft={[
            {
              question: "Does SellSync work with existing POS hardware?",
              answer: "Yes, SellSync supports many third-party barcode scanners, printers, and cash drawers. Our system is designed to integrate seamlessly with your existing retail equipment.",
            },
            {
              question: "Can I manage multiple stores?",
              answer: "Absolutely. SellSync offers centralized management for multi-location businesses with real-time inventory sync, unified reporting, and location-specific configurations.",
            },
            {
              question: "Is my data safe?",
              answer: "All data is encrypted and backed up using enterprise-grade cloud security. We comply with PCI DSS standards and use bank-level encryption for all transactions.",
            },
            {
              question: "How long does setup take?",
              answer: "Most stores are up and running within 2-4 hours. Our onboarding team provides hands-on training and can migrate your existing data if needed.",
            },
          ]}
          faqsRight={[
            {
              question: "Do you provide onboarding and support?",
              answer: "Yes, our support team helps you with installation, training, and migration. We offer 24/7 technical support and dedicated account managers for enterprise clients.",
            },
            {
              question: "Can I customize the interface?",
              answer: "Yes, SellSync offers extensive customization options including custom receipts, branding, menu layouts, and user permissions to match your store's workflow.",
            },
            {
              question: "What payment methods do you support?",
              answer: "We support all major credit cards, debit cards, mobile payments (Apple Pay, Google Pay), contactless payments, and traditional cash transactions.",
            },
            {
              question: "Is there a mobile app?",
              answer: "Yes, our mobile app allows you to manage your store remotely, view real-time sales data, process refunds, and receive inventory alerts from anywhere.",
            },
          ]}
        />

        {/* Final CTA Section */}
        <section
          className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1693091626117-240323922806?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29udmluaWVuY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-3 sm:px-4 md:px-6 text-center relative z-10"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mb-3 sm:mb-4"
            >
              Ready to Upgrade Your Retail Store?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto"
            >
              Experience the power of modern POS technology with SellSync.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/demo">
                <Button size="lg" className="rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] hover:from-[#D87027]/90 hover:to-[#D87027]/90 text-white shadow-lg shadow-[#D87027]/30 border border-[#D87027]/20 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base">
                  Get a Free Demo Now
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div >
  )
}