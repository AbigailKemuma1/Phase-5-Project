import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <DashboardLayout title="Dashboard">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">Welcome back, John!</h2>
            <p className="text-gray-400 text-lg">Here's your energy consumption overview for today.</p>
          </div>

          {/* Time Period Selector */}
          <div className="flex space-x-2 mb-8">
            {['Today', 'This Week', 'This Month', 'This Year'].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  period === 'Today'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-emerald-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="text-emerald-400 text-sm font-medium">+5.2%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Energy Usage</h3>
              <p className="text-3xl font-bold">1,247 kWh</p>
              <p className="text-gray-500 text-sm mt-1">vs last month</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-red-400 text-sm font-medium">+$12</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Estimated Cost</h3>
              <p className="text-3xl font-bold">$187</p>
              <p className="text-gray-500 text-sm mt-1">this month</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-orange-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <span className="text-orange-400 text-sm font-medium">+3.1%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Carbon Footprint</h3>
              <p className="text-3xl font-bold">876 kg</p>
              <p className="text-gray-500 text-sm mt-1">CO₂ emissions</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-emerald-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💚</span>
                </div>
                <span className="text-emerald-400 text-sm font-medium">+$8</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Savings Achieved</h3>
              <p className="text-3xl font-bold text-emerald-400">$33</p>
              <p className="text-gray-500 text-sm mt-1">this month</p>
            </div>
          </div>

          {/* Energy Usage Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 mb-8 border border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Energy Usage Overview</h3>
                <p className="text-gray-400">Last 7 days</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold">1,247 kWh</p>
                  <p className="text-emerald-400 text-sm">↓5.2% vs last week</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg text-sm transition-colors">
                  Export Data
                </button>
              </div>
            </div>
            
            {/* Interactive Chart */}
            <div className="h-64 bg-gray-700/50 rounded-lg p-4">
              <div className="h-full flex items-end justify-between space-x-2">
                {[65, 78, 82, 75, 88, 92, 85].map((height, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="text-xs text-gray-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</div>
                    <div 
                      className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-400 hover:to-emerald-300 transition-all cursor-pointer relative group"
                      style={{ height: `${height}%`, width: '40px' }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {Math.round(height * 15)} kWh
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Energy Consumers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Top Energy Consumers</h3>
                <Link to="/appliances" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Air Conditioner', icon: '❄️', usage: '540 kWh', percentage: '45%', status: 'on' },
                  { name: 'Refrigerator', icon: '🧊', usage: '240 kWh', percentage: '20%', status: 'on' },
                  { name: 'Water Heater', icon: '🔥', usage: '180 kWh', percentage: '15%', status: 'off' },
                  { name: 'Lighting', icon: '💡', usage: '120 kWh', percentage: '10%', status: 'on' },
                ].map((appliance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{appliance.icon}</span>
                      <div>
                        <p className="font-medium">{appliance.name}</p>
                        <p className="text-gray-400 text-sm">{appliance.percentage} of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{appliance.usage}</p>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${appliance.status === 'on' ? 'bg-emerald-400' : 'bg-gray-500'}`}></div>
                        <span className="text-xs text-gray-400">{appliance.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Usage */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Real-time Usage</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Live</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-gray-200 text-sm">Current</p>
                        <p className="text-2xl font-bold">1.5 kW</p>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-gray-400 text-sm">Peak Today</p>
                      <p className="font-bold">2.1 kW</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Avg Today</p>
                      <p className="font-bold">1.3 kW</p>
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
    </DashboardLayout>
  );
};

export default Dashboard;
