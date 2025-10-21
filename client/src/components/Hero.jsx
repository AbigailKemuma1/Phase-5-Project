import { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [hoveredBar, setHoveredBar] = useState(null);
  
  const chartData = [
    { day: 'Mon', value: 14.2, label: '14.2 kWh' },
    { day: 'Tue', value: 15.8, label: '15.8 kWh' },
    { day: 'Wed', value: 13.1, label: '13.1 kWh' },
    { day: 'Thu', value: 12.4, label: '12.4 kWh', highlight: true },
    { day: 'Fri', value: 14.7, label: '14.7 kWh' },
  ];
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 pt-20 pb-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-400 opacity-30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-teal-300 to-cyan-300 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Now Live Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-emerald-700">Now Live</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Track your{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                  energy
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></span>
              </span>
              . Save money. Save the planet.
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              AI-powered insights to help you monitor and reduce your electricity consumption in real-time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold rounded-xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative">Get Started Free</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button
                onClick={() => scrollToSection('features')}
                className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                <span>See How It Works</span>
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="group text-center p-4 rounded-2xl hover:bg-white/80 transition-all">
                <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">10K+</div>
                <div className="text-sm text-gray-600 mt-1 font-semibold">Active Users</div>
              </div>
              <div className="group text-center p-4 rounded-2xl hover:bg-white/80 transition-all">
                <div className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">30%</div>
                <div className="text-sm text-gray-600 mt-1 font-semibold">Avg. Savings</div>
              </div>
              <div className="group text-center p-4 rounded-2xl hover:bg-white/80 transition-all">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">2.5M</div>
                <div className="text-sm text-gray-600 mt-1 font-semibold">kWh Saved</div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview (Desktop only) */}
          <div className="hidden lg:block relative">
            {/* Main Dashboard Card */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Today&apos;s Usage</div>
                  <div className="text-3xl font-black text-gray-900">12.4 kWh</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              {/* Chart */}
              <div className="space-y-3 mb-6">
                <div className="flex items-end justify-between h-48 gap-4">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center group relative">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer ${
                          item.highlight
                            ? 'bg-gradient-to-t from-blue-500 to-blue-400'
                            : 'bg-gradient-to-t from-emerald-500 to-emerald-400 group-hover:from-emerald-600 group-hover:to-emerald-500'
                        }`}
                        style={{ height: `${(item.value / 16) * 100}%` }}
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Tooltip */}
                        {hoveredBar === index && (
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap">
                            {item.label}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 font-medium mt-2">{item.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Status */}
              <div className="flex items-center space-x-2 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-emerald-700">Great job! 15% less than yesterday</span>
              </div>
            </div>

            {/* Floating AI Card */}
            <div className="absolute -bottom-6 -left-6 max-w-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <div className="font-bold text-sm mb-1">AI Recommendation</div>
                  <div className="text-xs opacity-95">Turn off AC during 2-4 PM to save $8/day</div>
                </div>
              </div>
            </div>

            {/* Floating Achievement Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-3 rounded-xl shadow-xl transform rotate-12 hover:rotate-0 transition-transform">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏆</span>
                <span className="font-black text-sm">Top 10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

