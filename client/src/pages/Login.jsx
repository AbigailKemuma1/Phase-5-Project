import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Smart Energy Tracker</h1>
          <p className="text-gray-300">Take control of your energy consumption.</p>
        </div>

        {/* Login/Register Form */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                isLogin ? 'text-white border-b-2 border-emerald-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                !isLogin ? 'text-white border-b-2 border-emerald-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
              <input
                type="email"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="text-emerald-600 rounded" />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot your password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 transition-colors">
              <span className="text-xl">🔍</span>
              <span className="text-gray-300">Google</span>
            </button>
            
            <button className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 transition-colors">
              <span className="text-xl">🍎</span>
              <span className="text-gray-300">Apple</span>
            </button>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

