import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import bweboLogo from "../assets/logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#1F2933]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={bweboLogo} 
              alt="BWEBO" 
              className="h-12 w-auto cursor-pointer"
              onClick={() => scrollToSection('hero')}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-[#1F2933] hover:text-[#D4AF37] transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-[#1F2933] hover:text-[#D4AF37] transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-[#1F2933] hover:text-[#D4AF37] transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-[#1F2933] hover:text-[#D4AF37] transition-colors"
            >
              Testimonials
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-[#D4AF37] hover:bg-[#E6C866] text-white transition-colors"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1F2933]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-[#1F2933] hover:text-[#D4AF37] transition-colors py-2"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left text-[#1F2933] hover:text-[#D4AF37] transition-colors py-2"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-[#1F2933] hover:text-[#D4AF37] transition-colors py-2"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left text-[#1F2933] hover:text-[#D4AF37] transition-colors py-2"
            >
              Testimonials
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-[#D4AF37] hover:bg-[#E6C866] text-white transition-colors"
            >
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}