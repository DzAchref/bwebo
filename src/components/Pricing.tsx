import { useState } from "react";
import { Check, X } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Package {
  name: string;
  badge: string;
  description: string;
  deliveryTime: string;
  price: string;
  features: string[];
  domainOptions: { type: string; price: string }[];
}

const packages: Package[] = [
  {
    name: "Standard Website",
    badge: "Best for Small Businesses",
    description: "Professional website to get your business online",
    deliveryTime: "Up to 14 Days",
    price: "52,000 DZD",
    features: [
      "Up to 5 pages",
      "Responsive design (mobile & desktop)",
      "Clean professional layout",
      "Contact form",
      "Basic SEO setup",
      "Fast and reliable delivery",
    ],
    domainOptions: [
      { type: ".com", price: "2,500 DZD" },
      { type: ".dz", price: "11,250 DZD" },
    ],
  },
  {
    name: "Premium Website",
    badge: "Best Value",
    description: "High-end custom website for growing businesses",
    deliveryTime: "Up to 10 Days",
    price: "89,000 DZD",
    features: [
      "Everything in Standard",
      "Custom UI/UX design",
      "Advanced animations",
      "Online booking or store",
      "Payment integration",
      "Advanced SEO optimization",
      "Speed & security optimization",
      "Priority support",
    ],
    domainOptions: [
      { type: ".com", price: "2,500 DZD" },
      { type: ".dz", price: "11,250 DZD" },
    ],
  },
];

export function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    domain: "",
    message: "",
  });


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
    const { fullName, email, phone, businessType, domain, message } = formData;
    const packageId = selectedPackage?.name || "";

    supabase
      .from("clients")
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          business_type: businessType,
          website_package: packageId,
          domain,
          message_notes: message,
        },
      ])
      .then((response) => {
        if (response.error) {
          console.error("Error saving booking:", response.error);
          setIsError(true);
          setErrorMessage(response.error.message);
        } else {
          setIsSuccess(true);
          setTimeout(() => {
            handleCloseModal();
          }, 3000);
        }
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedPackage || !formData.domain) return 0;
    
    // Parse package price (remove "DZD" and commas, then convert to number)
    const packagePrice = parseInt(selectedPackage.price.replace(/[^0-9]/g, ""));
    
    // Find domain price
    const selectedDomain = selectedPackage.domainOptions.find(
      (d) => d.type === formData.domain
    );
    const domainPrice = selectedDomain
      ? parseInt(selectedDomain.price.replace(/[^0-9]/g, ""))
      : 0;
    
    return packagePrice + domainPrice;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US") + " DZD";
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-[#1F2933] mb-4">
            Choose Your Website Package
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-[#F4F4F4] rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#D4AF37]"
            >
              <div className="inline-block bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm mb-4">
                {pkg.badge}
              </div>
              
              <h3 className="text-2xl text-[#1F2933] mb-2">{pkg.name}</h3>
              <p className="text-[#1F2933]/70 mb-4">{pkg.description}</p>
              
              <div className="mb-6">
                <div className="text-4xl text-[#D4AF37] mb-1">{pkg.price}</div>
                <div className="text-sm text-[#1F2933]/60 mb-4">Website Package</div>
                
                <div className="text-sm text-[#1F2933]/60 mb-2">Domain Options:</div>
                <div className="space-y-2 mb-4">
                  {pkg.domainOptions.map((domain, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/50 px-3 py-2 rounded-lg">
                      <span className="text-[#1F2933]/80">{domain.type} domain</span>
                      <span className="text-[#D4AF37]">{domain.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-[#1F2933]/60">Delivery Time</div>
                <div className="text-lg text-[#D4AF37]">{pkg.deliveryTime}</div>
              </div>

              <div className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1F2933]/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl text-[#1F2933] mb-1">
                    Book Your Website
                  </h3>
                  <p className="text-[#1F2933]/60">
                    Fill in your details and we'll contact you
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-[#1F2933]/40 hover:text-[#1F2933] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h4 className="text-xl text-[#1F2933] mb-2">Thank you!</h4>
                  <p className="text-[#1F2933]/70">
                    Our team will contact you shortly.
                  </p>
                </div>
              ) : isError ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h4 className="text-xl text-red-500 mb-2">Error!</h4>
                  <p className="text-red-500">{errorMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#F4F4F4] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#F4F4F4] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#F4F4F4] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="+213 XXX XX XX XX"
                    />
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#F4F4F4] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="">Select your business type</option>
                      <option value="hotel">Hotel</option>
                      <option value="company">Company</option>
                      <option value="supermarket">Supermarket</option>
                      <option value="startup">Startup</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Selected Package */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Website Package
                    </label>
                    <input
                      type="text"
                      value={selectedPackage?.name || ""}
                      readOnly
                      className="w-full px-4 py-3 bg-[#F4F4F4]/50 border border-[#F4F4F4] rounded-xl text-[#1F2933]/60"
                    />
                  </div>

                  {/* Domain */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Choose Domain
                    </label>
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#F4F4F4] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="">Select your domain</option>
                      {selectedPackage?.domainOptions.map((domain) => (
                        <option key={domain.type} value={domain.type}>
                          {domain.type} domain - {domain.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Message / Notes
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#F4F4F4] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                      placeholder="Any additional information?"
                    />
                  </div>

                  {/* Price Breakdown */}
                  {formData.domain && (
                    <div className="bg-[#F4F4F4] rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[#1F2933]/70">Website Package:</span>
                        <span className="text-[#1F2933]">{selectedPackage?.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#1F2933]/70">Domain ({formData.domain}):</span>
                        <span className="text-[#1F2933]">
                          {selectedPackage?.domainOptions.find((d) => d.type === formData.domain)?.price}
                        </span>
                      </div>
                      <div className="border-t border-[#1F2933]/10 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[#D4AF37]">Total Price:</span>
                          <span className="text-2xl text-[#D4AF37]">{formatPrice(calculateTotal())}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Delivery Time */}
                  <div>
                    <label className="block text-sm text-[#1F2933] mb-2">
                      Delivery Time
                    </label>
                    <input
                      type="text"
                      value={selectedPackage?.deliveryTime || ""}
                      readOnly
                      className="w-full px-4 py-3 bg-[#F4F4F4]/50 border border-[#F4F4F4] rounded-xl text-[#1F2933]/60"
                    />
                  </div>

                  {/* Note */}
                  <p className="text-sm text-[#1F2933]/50 italic">
                    No payment required at this step.
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-3 border-2 border-[#1F2933]/20 text-[#1F2933] rounded-xl hover:border-[#1F2933]/40 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#E6C866] transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}