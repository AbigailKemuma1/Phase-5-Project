import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Gradient Background with Grid Pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Glassmorphic Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
            <span className="text-2xl">🌍</span>
            <span className="text-white font-bold text-sm">UN SDG 13: Climate Action</span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Join the Climate Action Movement
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl">
            Our community has already saved{' '}
            <span className="font-black text-yellow-300">2.5 million kWh</span> of energy, preventing{' '}
            <span className="font-black text-yellow-300">1,800 tons of CO₂</span> from entering our atmosphere. 
            Together, we&apos;re making a real impact on climate change, one kilowatt-hour at a time.
          </p>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-black text-white mb-2">-30%</div>
              <div className="text-white/80 font-medium">Average Energy Reduction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-black text-white mb-2">1,800t</div>
              <div className="text-white/80 font-medium">CO₂ Emissions Prevented</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-black text-white mb-2">$500K+</div>
              <div className="text-white/80 font-medium">Community Savings</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Start Saving Today
            </Link>
            <a
              href="https://sdgs.un.org/goals/goal13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              Learn About SDG 13
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

