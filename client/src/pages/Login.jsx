import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpoint = isLogin
      ? 'http://127.0.0.1:5000/auth/login'
      : 'http://127.0.0.1:5000/auth/signup';

    const payload = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      console.log('Submitting login to', endpoint, payload);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text || '{}');
      } catch (e) {
        console.error('Failed to parse JSON response', text);
      }

      console.log('Login response', res.status, data);

      if (!res.ok) {
        throw new Error(data.msg || data.error || `HTTP ${res.status}`);
      }

      if (isLogin) {
        localStorage.setItem('token', data.access_token);
        if (data.username) {
          localStorage.setItem('username', data.username);
        }
        if (data.email) {
          localStorage.setItem('email', data.email);
        }
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage('Account created! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Energy Tracker</h1>
          <p className="text-gray-300">Save energy. Save money. Save the planet.</p>
        </div>

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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter your username"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
          )}

          <div className="text-center mt-6">
            <Link to="/" className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
