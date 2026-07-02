import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName?: string;
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
  "Germany",
  "France",
  "Brazil",
  "Japan",
  "Singapore",
  "United Arab Emirates",
  "South Africa",
  "New Zealand",
  "Other",
];

const businessTypes = [
  "Retail Store",
  "Restaurant",
  "Grocery Store",
  "Pharmacy",
  "Clothing Boutique",
  "Electronics Store",
  "Furniture Store",
  "Supermarket",
  "Convenience Store",
  "Other",
];

function SignupModal({ open, onOpenChange, planName }: SignupModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    businessRegNumber: "",
    businessType: "",
    businessName: "",
    countryLocation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    onOpenChange(false);
    setFormData({
      fullName: "",
      email: "",
      contactNumber: "",
      businessRegNumber: "",
      businessType: "",
      businessName: "",
      countryLocation: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] lg:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
              {planName ? `Sign Up for ${planName}` : "Get Started Today"}
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-base text-gray-600">
            Fill in your business details and we'll get you up and running.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
                className="border-amber-200 focus-visible:ring-amber-500 bg-white/80"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="border-amber-200 focus-visible:ring-amber-500 bg-white/80"
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                required
                className="border-amber-200 focus-visible:ring-amber-500 bg-white/80"
              />
            </div>

            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                Business Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                required
                className="border-amber-200 focus-visible:ring-amber-500 bg-white/80"
              />
            </div>

            {/* Business Registration Number */}
            <div className="space-y-2">
              <Label htmlFor="businessRegNumber" className="text-sm font-medium text-gray-700">
                Business Registration Number
              </Label>
              <Input
                id="businessRegNumber"
                placeholder="Registration number (optional)"
                value={formData.businessRegNumber}
                onChange={(e) => handleChange("businessRegNumber", e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500 bg-white/80"
              />
            </div>

            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                Business Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleChange("businessType", value)}
                required
              >
                <SelectTrigger className="border-amber-200 focus-visible:ring-amber-500 bg-white/80">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country and Location */}
            <div className="space-y-2">
              <Label htmlFor="countryLocation" className="text-sm font-medium text-gray-700">
                Country & Location <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.countryLocation}
                onValueChange={(value) => handleChange("countryLocation", value)}
                required
              >
                <SelectTrigger className="border-amber-200 focus-visible:ring-amber-500 bg-white/80">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-6 text-base shadow-lg shadow-amber-500/30"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Registration"
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            By submitting, you agree to our{" "}
            <a href="/terms" className="text-amber-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-amber-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { SignupModal };