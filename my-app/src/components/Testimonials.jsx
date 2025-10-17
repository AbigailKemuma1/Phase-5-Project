const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      title: 'Homeowner',
      quote: 'This app is incredible! I reduced my electricity bill by 35% in just 2 months. The AI recommendations are spot-on.',
      rating: 5,
      initials: 'JD',
      bgColor: 'from-emerald-400 to-emerald-600',
    },
    {
      name: 'Sarah Miller',
      title: 'Small Business Owner',
      quote: 'The dashboard is beautiful and intuitive. I love seeing my carbon footprint decrease week by week. Highly recommend!',
      rating: 5,
      initials: 'SM',
      bgColor: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Alex Park',
      title: 'Environmental Advocate',
      quote: 'Finally, a tool that makes sustainability easy and actionable. Love tracking my impact on climate change!',
      rating: 5,
      initials: 'AP',
      bgColor: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Trusted by eco-conscious users worldwide
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

