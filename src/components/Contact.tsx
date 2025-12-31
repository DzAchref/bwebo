import { useState } from "react";
import { Mail, Phone, Send, CheckCircle, AlertCircle, Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    websitePackage: "",
    domain: "",
    message: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create FormData to send files + text
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("businessType", formData.businessType);
      formDataToSend.append("websitePackage", formData.websitePackage);
      formDataToSend.append("domain", formData.domain);
      formDataToSend.append("message", formData.message);

      // Append files
      uploadedFiles.forEach((file) => {
        formDataToSend.append("files", file);
      });

      // Send to Supabase Edge Function
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-af2d9ffb/contact`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            // NOTE: Do NOT set Content-Type here. 
            // The browser will automatically set it to multipart/form-data with the correct boundary.
          },
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      console.log("Form submitted successfully:", result);
      setSubmitStatus("success");

      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          businessType: "",
          websitePackage: "",
          domain: "",
          message: "",
        });
        setUploadedFiles([]);
        setSubmitStatus("idle");
      }, 5000);

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Package prices
  const packagePrices: { [key: string]: number } = {
    standard: 52000,
    premium: 89000,
  };

  // Domain prices
  const domainPrices: { [key: string]: number } = {
    ".com": 8000,
    ".dz": 31200,
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!formData.websitePackage || !formData.domain) return 0;
    const packagePrice = packagePrices[formData.websitePackage] || 0;
    const domainPrice = domainPrices[formData.domain] || 0;
    return packagePrice + domainPrice;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US") + " DZD";
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  // Remove uploaded file
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-[#1F2933] mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-lg text-[#1F2933]/70 max-w-2xl mx-auto">
            Ready to take your web presence to the next level? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-[#1F2933] mb-6">Get In Touch</h3>
              <p className="text-[#1F2933]/70 leading-relaxed mb-8">
                Have a project in mind? We'd love to hear about it. Fill out the form and we'll contact you to discuss your requirements.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-sm text-[#1F2933]/60 mb-1">Email</div>
                  <a href="mailto:bwebo.dz@gmail.com" className="text-[#1F2933] hover:text-[#D4AF37] transition-colors">
                    bwebo.dz@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-sm text-[#1F2933]/60 mb-1">Phone</div>
                  <a href="tel:+2130781008103" className="text-[#1F2933] hover:text-[#D4AF37] transition-colors">
                    +213 07 81 00 81 03
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#1F2933]/10">
              <div className="text-sm text-[#1F2933]/60 mb-2">Business Hours</div>
              <div className="text-[#1F2933]">Sunday - Thursday: 8:00 AM - 5:00 PM</div>
              <div className="text-[#1F2933]">Friday - Saturday: Closed</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#F4F4F4] rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-[#1F2933] mb-2 text-sm">
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-white border-[#1F2933]/10 focus:border-[#D4AF37] h-12"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[#1F2933] mb-2 text-sm">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border-[#1F2933]/10 focus:border-[#D4AF37] h-12"
                  placeholder="john@company.com"
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-[#1F2933] mb-2 text-sm">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white border-[#1F2933]/10 focus:border-[#D4AF37] h-12"
                  placeholder="+213 XXX XX XX XX"
                  disabled={isSubmitting}
                />
              </div>

              {/* Business Type */}
              <div>
                <label htmlFor="businessType" className="block text-[#1F2933] mb-2 text-sm">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-white border border-[#1F2933]/10 rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#1F2933] transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="">Select your business type</option>
                  <option value="hotel">Hotel</option>
                  <option value="company">Company</option>
                  <option value="supermarket">Supermarket</option>
                  <option value="startup">Startup</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Website Package */}
              <div>
                <label htmlFor="websitePackage" className="block text-[#1F2933] mb-2 text-sm">
                  Website Package *
                </label>
                <select
                  id="websitePackage"
                  name="websitePackage"
                  required
                  value={formData.websitePackage}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-white border border-[#1F2933]/10 rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#1F2933] transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="">Select a package</option>
                  <option value="standard">Standard Website</option>
                  <option value="premium">Premium Website</option>
                </select>
              </div>

              {/* Domain */}
              <div>
                <label htmlFor="domain" className="block text-[#1F2933] mb-2 text-sm">
                  Domain *
                </label>
                <select
                  id="domain"
                  name="domain"
                  required
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-white border border-[#1F2933]/10 rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#1F2933] transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="">Select a domain</option>
                  <option value=".com">.com</option>
                  <option value=".dz">.dz</option>
                </select>
              </div>

              {/* Message / Notes */}
              <div>
                <label htmlFor="message" className="block text-[#1F2933] mb-2 text-sm">
                  Message / Notes *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white border-[#1F2933]/10 focus:border-[#D4AF37] min-h-[120px] resize-none"
                  placeholder="Tell us about your project requirements..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Upload Files */}
              <div>
                <label htmlFor="files" className="block text-[#1F2933] mb-2 text-sm">
                  Upload Files
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    id="files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    className="bg-[#D4AF37] hover:bg-[#E6C866] text-white py-2 px-4 group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    onClick={() => document.getElementById("files")?.click()}
                    disabled={isSubmitting}
                  >
                    <Upload className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Upload
                  </Button>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-2">
                    <ul className="list-disc pl-5">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-sm text-[#1F2933]">{file.name}</span>
                          <Button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              {formData.websitePackage && formData.domain && (
                <div className="bg-white rounded-xl p-5 border border-[#D4AF37]/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#1F2933]/70">
                      {formData.websitePackage === "standard" ? "Standard Website" : "Premium Website"}:
                    </span>
                    <span className="text-[#1F2933]">
                      {formatPrice(packagePrices[formData.websitePackage])}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#1F2933]/70">Domain ({formData.domain}):</span>
                    <span className="text-[#1F2933]">
                      {formatPrice(domainPrices[formData.domain])}
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

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-green-800">Request sent successfully!</div>
                    <div className="text-xs text-green-700 mt-1">
                      We'll contact you within 24 hours.
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-red-800">There was an issue, please try again.</div>
                    <div className="text-xs text-red-700 mt-1">
                      Or contact us directly at bwebo.dz@gmail.com
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] hover:bg-[#E6C866] text-white py-6 group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Sending to Supabase Backend...
                  </>
                ) : (
                  <>
                    Book Appointment
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-[#1F2933]/50 leading-relaxed">
                By submitting this form, your information will be securely stored in our database and you'll receive a confirmation email.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}