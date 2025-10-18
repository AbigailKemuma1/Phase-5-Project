import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">⚡</span>
            </div>
            <h1 className="text-2xl font-bold">Energy Dashboard</h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Detailed Reports</Link>
            <Link to="/settings" className="text-gray-300 hover:text-white transition-colors">Settings</Link>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <span>👤</span>
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Welcome, User!</h2>
          <p className="text-gray-400 text-lg">Here's your energy consumption at a glance.</p>
        </div>

        {/* Time Period Selector */}
        <div className="flex space-x-2 mb-8">
          {['Daily', 'Weekly', 'Monthly'].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === 'Daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Energy Usage</h3>
            <p className="text-3xl font-bold">1,200 kWh</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Estimated Cost</h3>
            <p className="text-3xl font-bold">$180</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Carbon Footprint</h3>
            <p className="text-3xl font-bold">850 kg CO2</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Savings from Recs</h3>
            <p className="text-3xl font-bold text-emerald-400">$25</p>
          </div>
        </div>

        {/* Energy Usage Chart */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Energy Usage Overview</h3>
              <p className="text-gray-400">Last 7 Days</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">1,200 kWh</p>
              <p className="text-emerald-400 text-sm">↓5%</p>
            </div>
          </div>
          
          {/* Placeholder Chart */}
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">📊 Chart will be implemented here</p>
          </div>
        </div>

        {/* Top Energy Consumers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Top Energy Consumers</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">❄️</span>
                  <div>
                    <p className="font-medium">Air Conditioner</p>
                    <p className="text-gray-400 text-sm">45% of total</p>
                  </div>
                </div>
                <p className="font-bold">540 kWh</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧊</span>
                  <div>
                    <p className="font-medium">Refrigerator</p>
                    <p className="text-gray-400 text-sm">20% of total</p>
                  </div>
                </div>
                <p className="font-bold">240 kWh</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="font-medium">Water Heater</p>
                    <p className="text-gray-400 text-sm">15% of total</p>
                  </div>
                </div>
                <p className="font-bold">180 kWh</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="font-medium">Lighting</p>
                    <p className="text-gray-400 text-sm">10% of total</p>
                  </div>
                </div>
                <p className="font-bold">120 kWh</p>
              </div>
            </div>
          </div>

          {/* Real-time Usage */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Real-time Usage</h3>
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Real-time</p>
                    <p className="text-2xl font-bold">1.5 kW</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Savings Tips */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">Smart Savings Tips</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💡</span>
                <h4 className="font-bold">Switch to LED Bulbs</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">Replace your old incandescent bulbs with energy-efficient LEDs.</p>
              <p className="text-emerald-400 font-bold">~$5/month</p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🔌</span>
                <h4 className="font-bold">Unplug Standby Devices</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">Devices on standby still draw power. Unplug them when not in use.</p>
              <p className="text-emerald-400 font-bold">~$10/month</p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🌡️</span>
                <h4 className="font-bold">Optimize Thermostat</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">Set your thermostat a few degrees higher in summer and lower in winter.</p>
              <p className="text-emerald-400 font-bold">~$15/month</p>
            </div>
          </div>
        </div>

        {/* AI Energy Advisor */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">AI Energy Advisor</h3>
          
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-medium mb-1">AI Energy Advisor</p>
                <p className="text-gray-400">Hello! I'm your AI Energy Advisor. How can I help you save energy today?</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-lg p-4 mb-4 ml-8">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">👤</span>
              <div>
                <p className="font-medium mb-1">You</p>
                <p className="text-gray-200">How can I reduce my AC usage?</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-medium mb-1">AI Energy Advisor</p>
                <p className="text-gray-400">Great question! Try setting your thermostat to 78°F (25°C), using ceiling fans, and ensuring your windows are well-sealed. This could save you up to 10% on cooling costs.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-3 rounded-lg transition-colors">
              <span className="text-xl">✈️</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
