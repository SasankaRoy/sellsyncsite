import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturedProductSection from "@/components/ui/featured-product-section";

const HardwarePage = () => {
  const navigate = useNavigate();

  const handleSeeHowItWorks = () => {
    navigate("/#contact");
  };

  const handleAddToQuote = () => {
    navigate("/#contact");
    // Also scroll to the demo section if we are on the same page structure or if hash routing is enabled
    // But since we are navigating to a different page (Landing Page presumed at /), the hash should handle it.
    // However, if standard router is used, we might need to handle scrolling after navigation.
    // For now, simple navigation to the hash.
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 pt-12 sm:pt-16 md:pt-20">
        <div className="min-h-screen bg-white">
          {/* First Section - SellSync POS Difference */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-center mb-16">
                The SellSync <span className="text-[#D87027]">POS</span> Difference You'll{" "}
                <span className="text-[#D87027]">Enjoy</span>
              </h1>

              {/* Cards Container */}
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* No Surprise Fees Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100"
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-orange-50 rounded-full p-6 inline-block">
                      <img
                        src="/No-Surprise-Fees.svg"
                        alt="No Surprise Fees"
                        className="w-16 h-16"
                      />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">No Surprise Fees</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    With SellSync, there are no hidden fees or binding contracts.
                    You're free to cancel anytime without incurring any charges.
                  </p>
                </motion.div>

                {/* Warranty Included Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100"
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-orange-50 rounded-full p-6 inline-block">
                      <img
                        src="/Warranty-Included-Updated.svg"
                        alt="Warranty Included"
                        className="w-16 h-16"
                      />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">Warranty Included</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    SellSync POS bundles come with a 3-year warranty (options for 4 or 5 years are available),
                    ensuring peace of mind. This includes next-business-day peripheral replacement and
                    on-site technician support for repairs or replacements.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Second Section - Hardware Partners */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-50">
            <div className="max-w-7xl mx-auto">
              {/* Title */}
              <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
                Our Hardware <span className="text-[#D87027]">Partners</span>
              </h2>

              {/* Partner Logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* HP Logo */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center h-32 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src="/assets/logos/hp-logo.png"
                      alt="HP"
                      className="max-h-16 w-auto"
                    />
                  </div>
                </div>

                {/* PAX Logo */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center h-32 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src="/assets/logos/pax-logo.svg"
                      alt="PAX"
                      className="max-h-16 w-auto"
                    />
                  </div>
                </div>

                {/* BrightSign Logo */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center h-32 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src="/assets/logos/brightsign-logo.svg"
                      alt="BrightSign"
                      className="max-h-16 w-auto"
                    />
                  </div>
                </div>

                {/* Unitech Logo */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center h-32 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src="/assets/logos/unitech-logo.svg"
                      alt="Unitech"
                      className="max-h-16 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third Section - Hardware Products */}
          <section className="bg-[#FEFEFF]">
            <FeaturedProductSection />
          </section>

          {/* Third Section - Affordable Hardware Options */}
          <section className="min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8 bg-[#0046A3]">
            <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Column - Image with Yellow Backing */}
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                {/* Yellow Background Shape */}
                <div className="absolute top-2 left-2 w-full h-full bg-[#F8F146] rounded-[2rem] -z-0"></div>
                {/* Main Image */}
                <div className="relative z-10 rounded-[2rem] overflow-hidden">
                  <img
                    src="https://cdn-jgbln.nitrocdn.com/pGVUzxswVhZZvBNINwSqErPDBHkaqMDe/assets/images/optimized/rev-621b940/goftx.com/wp-content/uploads/2025/01/Hardware-Options.png"
                    alt="Affordable Hardware Options"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="text-white space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F146] leading-tight mb-4">
                    Affordable Hardware Options Available
                  </h2>
                  <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                    Trying to save without sacrificing quality? We've got your back! We offer low rates
                    for leasing hardware with flexible 3- or 4-year plans that fit your needs.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Option 1: Lease new equipment */}
                  <div className="border-[3px] border-white rounded-2xl p-6 bg-transparent">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F8F146] mb-2">
                      Lease new equipment
                    </h3>
                    <p className="text-base sm:text-lg text-white/90">
                      Enjoy a hassle-free, budget-friendly exchange and upgrade to the latest
                      hardware every 3 or 4 years.
                    </p>
                  </div>

                  {/* Option 2: Lease to own */}
                  <div className="border-[3px] border-white rounded-2xl p-6 bg-transparent">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F8F146] mb-2">
                      Lease to own
                    </h3>
                    <p className="text-base sm:text-lg text-white/90">
                      Lease hardware for an affordable rate, and after 3 or 4 years, buy it back for
                      ONLY $1 to own it outright.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm sm:text-base italic text-white/80 mb-8">
                    *3-4 year warranties also available for these options.
                  </p>
                  <button className="bg-white text-[#0055B8] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-lg">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Fourth Section - Redefining Customer Experience (New Section) */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#CBEBF9]">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16 space-y-6">
                <span className="inline-block bg-[#F8F146] text-[#0046A3] font-bold px-6 py-2 rounded-full text-sm sm:text-base tracking-wide uppercase shadow-sm">
                  NOW AVAILABLE - NEW SellSync POS Hardware
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#002B5C] leading-tight max-w-5xl mx-auto">
                  The Complete POS Display <br className="hidden md:block" />
                  That Redefines Customer Experience
                </h2>
              </div>

              {/* Visual Showcase */}
              {/* Visual Showcase */}
              <div className="flex justify-center mb-20">
                <img
                  src="https://cdn-jgbln.nitrocdn.com/pGVUzxswVhZZvBNINwSqErPDBHkaqMDe/assets/images/optimized/rev-621b940/goftx.com/wp-content/uploads/2025/04/Biometric-Fingerprint-Scanner-1.png"
                  alt="SellSync POS Hardware"
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </div>

              {/* Feature Cards Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-16">

                {/* Feature 1 */}
                <div className="bg-white rounded-2xl p-8 border-2 border-[#4175FC] flex items-start gap-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="min-w-20 h-20 text-[#4175FC] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><rect width="10" height="10" x="7" y="7" rx="1" /><path d="m16 21-1.5-1.5" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#002B5C] mb-3 uppercase tracking-wide">2D Barcode Scanner</h3>
                    <p className="text-gray-800 font-semibold text-lg leading-loose">
                      Easily scan licenses and products on the fly with a built-in scanner.
                    </p>
                  </div>
                </div>



                {/* Feature 3 */}
                <div className="bg-white rounded-2xl p-8 border-2 border-[#4175FC] flex items-start gap-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="min-w-20 h-20 text-[#4175FC] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .838-.414V4.232a.5.5 0 0 0-.838-.414L16 7.301V13z" /><path d="M2 7v5.5a2.5 2.5 0 0 0 5 0V7" /><path d="M4.5 7h0" /><path d="M2 7h5" /><rect width="9" height="15" x="2" y="7" rx="2.5" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#002B5C] mb-3 uppercase tracking-wide">Digital Signage Integration</h3>
                    <p className="text-gray-800 font-semibold text-lg leading-loose">
                      Showcase and schedule eye-catching digital displays. No extra hardware needed!
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-2xl p-8 border-2 border-[#4175FC] flex items-start gap-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="min-w-20 h-20 text-[#4175FC] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 6" /><path d="M5 15.5A20.5 20.5 0 0 0 15 22" /><path d="M14 9a5 5 0 0 0-4 6.5" /><path d="M12 5a7 7 0 0 1 4 4" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#002B5C] mb-3 uppercase tracking-wide">Biometric Fingerprint Scanner</h3>
                    <p className="text-gray-800 font-semibold text-lg leading-loose">
                      Improve security of employee logins with personalized permissions and a simple clock-in/out process.
                    </p>
                  </div>
                </div>

              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <button
                  onClick={handleSeeHowItWorks}
                  className="bg-[#4175FC] hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all text-lg min-w-[200px]"
                >
                  See How It Works
                </button>
                <button
                  onClick={handleAddToQuote}
                  className="bg-white hover:bg-gray-50 text-[#4175FC] border-2 border-[#4175FC] font-bold py-3 px-10 rounded-full shadow-lg transition-all text-lg min-w-[200px]"
                >
                  Add To Quote
                </button>
              </div>

            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HardwarePage;
