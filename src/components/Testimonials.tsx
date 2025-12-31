import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Benali",
    content: "BWEBO delivered a clean and modern website that fits our business perfectly. Communication was smooth and professional.",
    rating: 9.4,
  },
  {
    name: "Sarah M.",
    content: "Our hotel website looks premium and loads fast. The booking flow is simple and customers find it easy to use.",
    rating: 8.9,
  },
  {
    name: "Youssef Karim",
    content: "Very good experience overall. The team understood our needs and delivered what we expected.",
    rating: 8.2,
  },
  {
    name: "Nadia Lounes",
    content: "The premium package was worth it. Design quality and performance exceeded our expectations.",
    rating: 9.6,
  },
  {
    name: "Omar Haddad",
    content: "Professional team and clear process from start to finish. Everything was delivered on time.",
    rating: 8.7,
  },
  {
    name: "Lina B.",
    content: "The website works well on mobile and desktop. Support was helpful whenever we needed changes.",
    rating: 7.9,
  },
  {
    name: "Karim Ait Ali",
    content: "BWEBO helped us build a strong online presence. The structure and design are very effective.",
    rating: 9.1,
  },
  {
    name: "Samira K.",
    content: "Creative team with good attention to detail. Overall, a solid and reliable service.",
    rating: 8.5,
  },
];

export function Testimonials() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-br from-[#1F2933] to-[#2D3E50] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xl">{testimonial.rating} / 10</span>
              </div>

              <p className="text-white/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="border-t border-white/10 pt-4">
                <div className="text-white">{testimonial.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}