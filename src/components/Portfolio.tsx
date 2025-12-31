const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc2NjYyODY4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Full-featured online store with secure payments and inventory management",
  },
  {
    title: "Corporate Website",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1677469684186-3b1817bce098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2NjU5MjA0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Modern corporate presence with elegant design and smooth animations",
  },
  {
    title: "Luxury Brand Site",
    category: "Premium Design",
    image: "https://images.unsplash.com/photo-1758633854736-8973bcd84dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFuZCUyMHdlYnNpdGV8ZW58MXx8fHwxNzY2Njc0NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Sophisticated website showcasing premium products with elegance",
    comingSoon: true,
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-[#F4F4F4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-[#1F2933] mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-[#1F2933]/70 max-w-2xl mx-auto">
            Explore our portfolio of successful web projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/20 transition-colors duration-300" />
                {project.comingSoon && (
                  <div className="absolute inset-0 bg-[#1F2933]/80 flex items-center justify-center">
                    <div className="text-white text-2xl">Coming Soon</div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-sm text-[#D4AF37] mb-2">{project.category}</div>
                <h3 className="text-xl text-[#1F2933] mb-2">{project.title}</h3>
                <p className="text-[#1F2933]/70">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
