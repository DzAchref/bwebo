import { Award, Users, Target, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Industry-leading standards in every project we deliver",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Seasoned professionals with years of experience",
  },
  {
    icon: Target,
    title: "Result-Driven",
    description: "Focused on achieving your business goals",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "Cutting-edge technologies and creative approaches",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-5xl text-[#1F2933] mb-6">
              Why Choose BWEBO?
            </h2>
            <p className="text-lg text-[#1F2933]/70 mb-8 leading-relaxed">
              We are a premium web design and development agency dedicated to transforming your digital vision into reality. With a focus on quality, innovation, and client satisfaction, we create websites that not only look stunning but also drive real business results.
            </p>
            <p className="text-lg text-[#1F2933]/70 mb-8 leading-relaxed">
              Our team combines technical expertise with creative excellence to deliver web solutions that stand out in today's competitive digital landscape. From concept to launch, we're with you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                <span className="text-[#1F2933]">Proven Track Record</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                <span className="text-[#1F2933]">Timely Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                <span className="text-[#1F2933]">Ongoing Support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-[#F4F4F4] rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg text-[#1F2933] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#1F2933]/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
