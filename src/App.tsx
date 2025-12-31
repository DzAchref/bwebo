import { Header } from "D:/BWEBO/src/components/Header";
import { Hero } from "D:/BWEBO/src/components/Hero";
import { Services } from "D:/BWEBO/src/components/Services";
import { Portfolio } from "D:/BWEBO/src/components/Portfolio";
import { About } from "D:/BWEBO/src/components/About";
import { Testimonials } from "D:/BWEBO/src/components/Testimonials";
import { Pricing } from "D:/BWEBO/src/components/Pricing";
import { Contact } from "D:/BWEBO/src/components/Contact";
import { Footer } from "D:/BWEBO/src/components/Footer";
import "D:/BWEBO/src/styles/globals.css";

export default function App() {
  return (
    // Added 'scroll-smooth' for better navigation and 'antialiased' for sharper text
    <div className="min-h-screen bg-white font-sans antialiased scroll-smooth selection:bg-[#D4AF37]/30">
      <Header />
      <main>
        {/* We use flex-col and gap to ensure sections don't 'bleed' into each other */}
        <div className="flex flex-col">
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Testimonials />
          <Pricing />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}