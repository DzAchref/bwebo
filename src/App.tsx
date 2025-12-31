import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import "./styles/globals.css";

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
