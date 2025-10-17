const Features = () => {
  return (
    <section id="features" className="relative py-24 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full mb-4">
            <span className="text-emerald-700 font-bold text-sm">🚀 Powerful Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              go green
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools to track, analyze, and optimize your energy consumption
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Real-time Tracking */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-emerald-300 hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-emerald-500/30 group-hover:shadow-emerald-500/60 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                💡
              </div>
              <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Real-time Tracking</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Monitor your energy consumption live with second-by-second updates. Know exactly what&apos;s using power right now.
            </p>
            <a href="#" className="inline-flex items-center text-emerald-600 font-bold group-hover:translate-x-2 transition-transform">
              Learn more
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* AI Insights */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-blue-300 hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/60 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🤖
              </div>
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">AI Insights</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get personalized recommendations powered by machine learning. Our AI finds savings opportunities you&apos;d never spot.
            </p>
            <a href="#" className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
              Learn more
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Sustainability Reports */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-teal-300 hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-600 rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-teal-500/30 group-hover:shadow-teal-500/60 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🌿
              </div>
              <div className="absolute -inset-2 bg-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Sustainability Reports</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Track your carbon footprint reduction and environmental impact. See how you&apos;re making a real difference.
            </p>
            <a href="#" className="inline-flex items-center text-teal-600 font-bold group-hover:translate-x-2 transition-transform">
              Learn more
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Additional Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Advanced Analytics */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl shadow-2xl p-10 text-white group hover:shadow-3xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-8 -translate-y-4 group-hover:scale-110 transition-transform">
              📊
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4">PREMIUM</div>
              <h3 className="text-3xl font-black mb-4">Advanced Analytics</h3>
              <p className="text-emerald-50 text-lg mb-6 leading-relaxed">
                Dive deep into your energy patterns with detailed charts, trends, and forecasts. Export reports and compare month-to-month performance.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">Hourly breakdown</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">Cost predictions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-3xl shadow-2xl p-10 text-white group hover:shadow-3xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-8 -translate-y-4 group-hover:scale-110 transition-transform">
              📱
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4">COMING SOON</div>
              <h3 className="text-3xl font-black mb-4">Mobile App</h3>
              <p className="text-blue-50 text-lg mb-6 leading-relaxed">
                Stay connected on the go with our native iOS and Android apps. Get push notifications for unusual usage spikes.
              </p>
              <div className="flex items-center space-x-3">
                <button className="group/btn px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-lg">
                  <span className="flex items-center space-x-2">
                    <span>🍎</span>
                    <span>iOS</span>
                  </span>
                </button>
                <button className="group/btn px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-lg">
                  <span className="flex items-center space-x-2">
                    <span>🤖</span>
                    <span>Android</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

