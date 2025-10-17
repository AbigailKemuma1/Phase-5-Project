const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      title: 'Homeowner · San Francisco',
      quote: 'This app is incredible! I reduced my electricity bill by 35% in just 2 months. The AI recommendations are spot-on.',
      rating: 5,
      initials: 'JD',
      bgColor: 'from-emerald-400 to-emerald-600',
      verified: true,
      savings: '$120/mo',
    },
    {
      name: 'Sarah Miller',
      title: 'Small Business Owner · Austin',
      quote: 'The dashboard is beautiful and intuitive. I love seeing my carbon footprint decrease week by week. Highly recommend!',
      rating: 5,
      initials: 'SM',
      bgColor: 'from-blue-400 to-cyan-600',
      verified: true,
      savings: '$280/mo',
    },
    {
      name: 'Alex Park',
      title: 'Environmental Advocate · Seattle',
      quote: 'Finally, a tool that makes sustainability easy and actionable. Love tracking my impact on climate change!',
      rating: 5,
      initials: 'AP',
      bgColor: 'from-purple-400 to-pink-600',
      verified: true,
      savings: '$95/mo',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-teal-100 rounded-full mb-4">
            <span className="text-teal-700 font-bold text-sm">💬 Customer Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Trusted by eco-conscious users{' '}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how our users are saving money and making a real environmental impact
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 hover:border-teal-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Verified Badge */}
              {testimonial.verified && (
                <div className="absolute top-6 right-6 flex items-center space-x-1 px-3 py-1 bg-teal-100 rounded-full">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-teal-700">Verified</span>
                </div>
              )}

              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Savings Badge */}
              <div className="mb-6 inline-block px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💰</span>
                  <div>
                    <div className="text-xs text-gray-600 font-semibold">Saving</div>
                    <div className="text-lg font-black text-emerald-600">{testimonial.savings}</div>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-black text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 font-medium">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Social Proof Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 px-8 py-4 bg-white rounded-2xl shadow-lg">
            <div>
              <div className="text-3xl font-black text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600 font-semibold">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div>
              <div className="text-3xl font-black text-gray-900">2,500+</div>
              <div className="text-sm text-gray-600 font-semibold">Happy Users</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div>
              <div className="text-3xl font-black text-gray-900">98%</div>
              <div className="text-sm text-gray-600 font-semibold">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

