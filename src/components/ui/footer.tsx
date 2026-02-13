import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: "#1C244B" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container grid gap-6 sm:gap-8 px-3 sm:px-4 py-8 sm:py-10 md:px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:border-x md:border-blue-300"
      >
        <div className="space-y-3">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <span className="font-bold text-lg sm:text-xl text-white">SELLSYNC</span>
          </Link>
          <p className="text-xs sm:text-sm text-blue-100">
            The smarter POS system for modern USA retail stores. Streamline operations and grow your business.
          </p>
          <div className="flex space-x-3">
            {[
              { icon: <Instagram className="h-4 sm:h-5 w-4 sm:w-5" />, label: "Instagram" },
              { icon: <Twitter className="h-4 sm:h-5 w-4 sm:w-5" />, label: "Twitter" },
              { icon: <Linkedin className="h-4 sm:h-5 w-4 sm:w-5" />, label: "LinkedIn" },
              { icon: <Github className="h-4 sm:h-5 w-4 sm:w-5" />, label: "GitHub" },
            ].map((social, index) => (
              <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <a href="#" className="text-blue-100 hover:text-white">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-white">Navigate</h3>
            <nav className="mt-3 sm:mt-4 flex flex-col space-y-2 text-xs sm:text-sm">
              <a href="/#products" className="text-blue-100 hover:text-white">
                Products
              </a>
              <a href="/#hardware" className="text-blue-100 hover:text-white">
                Hardware
              </a>
              <a href="/#pricing" className="text-blue-100 hover:text-white">
                Pricing
              </a>
              <a href="/#industries" className="text-blue-100 hover:text-white">
                Industries
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium text-white">Support</h3>
            <nav className="mt-3 sm:mt-4 flex flex-col space-y-2 text-xs sm:text-sm">
              <a href="/#contact" className="text-blue-100 hover:text-white">
                Contact Us
              </a>
              <Link to="/faq" className="text-blue-100 hover:text-white">
                FAQ
              </Link>
            </nav>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-white">Legal</h3>
            <nav className="mt-3 sm:mt-4 flex flex-col space-y-2 text-xs sm:text-sm">
              <Link to="/privacy-policy" className="text-blue-100 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-blue-100 hover:text-white">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-blue-100 hover:text-white">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <h3 className="text-base sm:text-lg font-medium text-white">Subscribe to our newsletter</h3>
          <p className="text-xs sm:text-sm text-blue-100">
            Stay updated with POS tips, retail trends, and SellSync news.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-3">
            <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1 rounded-2xl sm:rounded-3xl text-sm" />
            <Button type="submit" className="rounded-2xl sm:rounded-3xl w-full sm:w-auto text-sm">
              Subscribe
            </Button>
          </form>
        </div>
      </motion.div>
      <div className="border-t border-blue-300" style={{ backgroundColor: "#1C244B" }}>
        <div className="container flex flex-col items-center justify-between gap-2 sm:gap-3 py-4 sm:py-6 md:h-16 md:flex-row md:py-0 px-3 sm:px-4">
          <p className="text-xs text-blue-100 text-center md:text-left">
            &copy; {new Date().getFullYear()} SellSync. All rights reserved.
          </p>
          <p className="text-xs text-blue-100 text-center md:text-right">Powered by cloud technology in the USA</p>
        </div>
      </div>
    </footer>
  )
}
