import { Code, Palette, Smartphone, Zap, Search, ShoppingCart } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom-coded websites built with cutting-edge technologies for optimal performance and scalability.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed to engage users and deliver exceptional experiences.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Pixel-perfect designs that look stunning on every device, from mobile to desktop.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Powerful online stores with secure payment integration and seamless checkout experiences.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Strategic optimization to boost your search rankings and drive organic traffic to your site.",
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    description: "Lightning-fast load times and optimized performance for better user engagement and conversions.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-[#1F2933] mb-4">
            Our Services
          </h2>
          <p className="text-lg text-[#1F2933]/70 max-w-2xl mx-auto">
            Comprehensive web solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-[#F4F4F4] hover:bg-white border border-transparent hover:border-[#D4AF37]/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-[#D4AF37]/10 group-hover:bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-7 h-7 text-[#D4AF37] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl text-[#1F2933] mb-3">{service.title}</h3>
                <p className="text-[#1F2933]/70 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
