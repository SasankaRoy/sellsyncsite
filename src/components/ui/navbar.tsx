import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginSidebar } from "@/components/ui/login-sidebar"

// Animation variants
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

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { label: "Products", href: "/#products" },
    { label: "Hardware", href: "/#hardware" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Industries", href: "/#industries" },
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full border-b bg-white shadow-md border-gray-200 text-foreground transition-all duration-300 pointer-events-none backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md"
      >
        <div className="container flex h-20 sm:h-24 items-center justify-between px-3 sm:px-4 md:border-x md:border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex items-center space-x-1 sm:space-x-2 pointer-events-auto">
              <img
                src="/sellsynclogo.png"
                alt="SellSync Logo"
                className="h-12 sm:h-16 md:h-20 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 pointer-events-auto flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative text-lg lg:text-xl font-bold transition-colors text-foreground hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
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
              <Link to="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                <img
                  src="/sellsynclogo.png"
                  alt="SellSync Logo"
                  className="h-12 w-auto"
                />
              </Link>
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
            {navItems.map((item, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <Link
                  to={item.href}
                  className="flex items-center justify-between rounded-3xl px-3 py-2 text-base sm:text-lg font-medium hover:bg-accent"
                  onClick={toggleMenu}
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4" />
                </Link>
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
    </>
  )
}
