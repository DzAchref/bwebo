import image_93cec494f7b68d2ed0b6dff113b4e5f084f3cb7e from '../assets/logo.png';
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import bweboLogo from "../assets/logo.png";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4F4F4] to-white -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute -left-8 xl:-left-16 top-0 hidden lg:block">
            <img 
              src={image_93cec494f7b68d2ed0b6dff113b4e5f084f3cb7e} 
              alt="BWEBO" 
              className="h-56 xl:h-64 2xl:h-72 w-auto mx-[29px] my-[0px] p-[0px] mt-[90px] mr-[18px] mb-[-1px] ml-[18px]"
            />
          </div>

          <div className="flex justify-center mb-8 lg:hidden">
            <img 
              src={bweboLogo} 
              alt="BWEBO" 
              className="h-40 w-auto"
            />
          </div>

          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white border border-[#D4AF37]/30 rounded-full px-4 py-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm text-[#1F2933]">Premium Web Solutions</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F2933] leading-tight mb-8">
              Build Your Web.
              <br />
              <span className="text-[#D4AF37]">Own Your Domain.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#1F2933]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your vision into a stunning digital presence. Professional web design and development services that drive results and elevate your brand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-[#D4AF37] hover:bg-[#E6C866] text-white px-8 py-6 text-lg group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => scrollToSection('portfolio')}
                variant="outline"
                className="border-[#1F2933]/20 text-[#1F2933] hover:border-[#D4AF37] hover:text-[#D4AF37] px-8 py-6 text-lg"
              >
                View Our Work
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl text-[#D4AF37] mb-2">150+</div>
                <div className="text-sm text-[#1F2933]/60">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-[#D4AF37] mb-2">98%</div>
                <div className="text-sm text-[#1F2933]/60">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-[#D4AF37] mb-2">50+</div>
                <div className="text-sm text-[#1F2933]/60">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-[#D4AF37] mb-2">24/7</div>
                <div className="text-sm text-[#1F2933]/60">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}