import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900 to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-5 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30 mb-6">
            <span className="text-2xl">🌍</span>
            <span className="text-emerald-300 font-bold text-sm">UN SDG 13: Climate Action</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Making a Real Environmental Impact
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users worldwide who are reducing their carbon footprint and saving money through smarter energy consumption.
          </p>
        </div>

        {/* Big Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 hover:scale-105 transition-all duration-300">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <div className="text-5xl font-black text-white mb-2">2.5M</div>
            <div className="text-emerald-300 font-semibold text-lg">kWh Energy Saved</div>
            <div className="mt-3 text-sm text-gray-400">Enough to power 250 homes for a year</div>
          </div>

          <div className="group bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 hover:border-blue-400/40 hover:scale-105 transition-all duration-300">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🌍</div>
            <div className="text-5xl font-black text-white mb-2">1,800t</div>
            <div className="text-blue-300 font-semibold text-lg">CO₂ Prevented</div>
            <div className="mt-3 text-sm text-gray-400">Equivalent to 10,000+ trees planted</div>
          </div>

          <div className="group bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-400/40 hover:scale-105 transition-all duration-300">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💰</div>
            <div className="text-5xl font-black text-white mb-2">$500K+</div>
            <div className="text-purple-300 font-semibold text-lg">Community Savings</div>
            <div className="mt-3 text-sm text-gray-400">Average $50/month per household</div>
          </div>

          <div className="group bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500/20 hover:border-yellow-400/40 hover:scale-105 transition-all duration-300">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">👥</div>
            <div className="text-5xl font-black text-white mb-2">10K+</div>
            <div className="text-yellow-300 font-semibold text-lg">Active Users</div>
            <div className="mt-3 text-sm text-gray-400">Growing by 500+ monthly</div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-emerald-500/30">
              📊
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Track Usage</h3>
            <p className="text-gray-300 leading-relaxed">
              Monitor your energy consumption in real-time with detailed breakdowns by appliance and time of day.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-500/30">
              🤖
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Get AI Insights</h3>
            <p className="text-gray-300 leading-relaxed">
              Receive personalized recommendations to optimize your energy usage and maximize savings.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-purple-500/30">
              🌱
            </div>
            <h3 className="text-2xl font-black text-white mb-3">See Impact</h3>
            <p className="text-gray-300 leading-relaxed">
              Visualize your environmental impact with detailed carbon footprint reports and sustainability metrics.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-lg">Start Your Climate Action Journey</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://sdgs.un.org/goals/goal13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border-2 border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-lg">Learn About SDG 13</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

