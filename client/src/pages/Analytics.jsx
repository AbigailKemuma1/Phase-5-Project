import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Analytics = () => {
  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('usage');

  const dailyData = [
    { day: 'Mon', usage: 42, cost: 6.3, carbon: 29 },
    { day: 'Tue', usage: 38, cost: 5.7, carbon: 27 },
    { day: 'Wed', usage: 45, cost: 6.8, carbon: 32 },
    { day: 'Thu', usage: 40, cost: 6.0, carbon: 28 },
    { day: 'Fri', usage: 48, cost: 7.2, carbon: 34 },
    { day: 'Sat', usage: 52, cost: 7.8, carbon: 37 },
    { day: 'Sun', usage: 50, cost: 7.5, carbon: 35 },
  ];

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    usage: Math.random() * 3 + 0.5,
  }));

  return (
    <DashboardLayout title="Analytics">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Energy Analytics</h2>
            <p className="text-gray-400">Detailed insights and trends in your energy consumption patterns</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-emerald-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="text-emerald-400 text-sm font-medium">+5.2%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Usage</h3>
              <p className="text-3xl font-bold">315 kWh</p>
              <p className="text-gray-500 text-sm mt-1">this week</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-red-400 text-sm font-medium">+3.1%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Cost</h3>
              <p className="text-3xl font-bold">$47.30</p>
              <p className="text-gray-500 text-sm mt-1">this week</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-orange-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <span className="text-orange-400 text-sm font-medium">+4.8%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">CO₂ Emissions</h3>
              <p className="text-3xl font-bold">222 kg</p>
              <p className="text-gray-500 text-sm mt-1">this week</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏱️</span>
                </div>
                <span className="text-purple-400 text-sm font-medium">7:00 PM</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Peak Usage</h3>
              <p className="text-3xl font-bold">2.4 kW</p>
              <p className="text-gray-500 text-sm mt-1">yesterday</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 mb-8 border border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Daily Consumption Trends</h3>
                <p className="text-gray-400 text-sm">Last 7 days breakdown</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="usage">Energy (kWh)</option>
                  <option value="cost">Cost ($)</option>
                  <option value="carbon">Carbon (kg CO₂)</option>
                </select>
                
                <button className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <span>⬇️</span>
                  <span>Export</span>
                </button>
              </div>
            </div>
            
            {/* Interactive Bar Chart */}
            <div className="h-80 bg-gray-700/50 rounded-lg p-6">
              <div className="h-full flex items-end justify-between space-x-4">
                {dailyData.map((data, index) => {
                  const value = selectedMetric === 'usage' ? data.usage : selectedMetric === 'cost' ? data.cost : data.carbon;
                  const maxValue = Math.max(...dailyData.map(d => selectedMetric === 'usage' ? d.usage : selectedMetric === 'cost' ? d.cost : d.carbon));
                  const height = (value / maxValue) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-2 group">
                      <div className="text-xs text-gray-400 font-medium">{data.day}</div>
                      <div className="relative w-full">
                        <div 
                          className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-400 hover:to-emerald-300 transition-all cursor-pointer"
                          style={{ height: `${height * 2.5}px` }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-600">
                            {selectedMetric === 'usage' && `${value} kWh`}
                            {selectedMetric === 'cost' && `$${value.toFixed(2)}`}
                            {selectedMetric === 'carbon' && `${value} kg`}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-emerald-400">
                        {selectedMetric === 'usage' && `${value}`}
                        {selectedMetric === 'cost' && `$${value.toFixed(1)}`}
                        {selectedMetric === 'carbon' && `${value}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hourly Usage Heatmap */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 mb-8 border border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">24-Hour Usage Pattern</h3>
                <p className="text-gray-400 text-sm">Average hourly consumption today</p>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-2">
              {hourlyData.map((data, index) => {
                const intensity = Math.min(data.usage / 3, 1);
                const bgColor = `rgba(16, 185, 129, ${intensity})`;
                
                return (
                  <div
                    key={index}
                    className="aspect-square rounded-lg cursor-pointer hover:scale-110 transition-transform relative group"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-600 z-10">
                      {data.hour}<br/>{data.usage.toFixed(2)} kW
                    </div>
                    {index % 2 === 0 && (
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                        {index}h
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Low</span>
                <div className="w-32 h-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-emerald-500/50 to-emerald-500"></div>
                <span className="text-sm text-gray-400">High</span>
              </div>
              <div className="text-sm text-gray-400">
                Peak: <span className="text-emerald-400 font-bold">{Math.max(...hourlyData.map(d => d.usage)).toFixed(2)} kW at {hourlyData[hourlyData.findIndex(d => d.usage === Math.max(...hourlyData.map(d => d.usage)))].hour}</span>
              </div>
            </div>
          </div>

          {/* Appliance Breakdown */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-6">Appliance Breakdown</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Air Conditioner', icon: '❄️', percentage: 45, usage: '142 kWh', color: 'emerald' },
                { name: 'Water Heater', icon: '🔥', percentage: 20, usage: '63 kWh', color: 'blue' },
                { name: 'Refrigerator', icon: '🧊', percentage: 15, usage: '47 kWh', color: 'purple' },
                { name: 'Lighting', icon: '💡', percentage: 10, usage: '32 kWh', color: 'yellow' },
                { name: 'Other', icon: '🔌', percentage: 10, usage: '31 kWh', color: 'gray' },
              ].map((appliance, index) => (
                <div key={index} className="group hover:bg-gray-600/30 p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{appliance.icon}</span>
                      <div>
                        <p className="font-medium">{appliance.name}</p>
                        <p className="text-sm text-gray-400">{appliance.usage} this week</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{appliance.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r from-${appliance.color}-500 to-${appliance.color}-400 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${appliance.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Filters */}
        <aside className="w-80 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 h-fit sticky top-6">
          <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
            <span>🔍</span>
            <span>Filters</span>
          </h3>
          
          {/* Date Range */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Date Range</h4>
            <div className="space-y-2">
              {[
                { value: '7days', label: 'Last 7 days', icon: '📅' },
                { value: '30days', label: 'Last 30 days', icon: '📆' },
                { value: 'month', label: 'This Month', icon: '🗓️' },
                { value: 'year', label: 'This Year', icon: '📊' },
              ].map((option) => (
                <label key={option.value} className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  dateRange === option.value ? 'bg-emerald-600 text-white' : 'hover:bg-gray-600/50'
                }`}>
                  <input
                    type="radio"
                    name="dateRange"
                    value={option.value}
                    checked={dateRange === option.value}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <span>📊</span>
                <span className="text-sm font-medium">Generate Report</span>
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <span>💾</span>
                <span className="text-sm font-medium">Save Custom View</span>
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <span>🔔</span>
                <span className="text-sm font-medium">Set Alert</span>
              </button>
            </div>
          </div>

          {/* Insights */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-4">AI Insights</h4>
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-lg">💡</span>
                <p className="text-sm text-gray-300">Your usage is 15% higher on weekends</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-lg">⚠️</span>
                <p className="text-sm text-gray-300">Peak usage at 7 PM costs 20% more</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-lg">✅</span>
                <p className="text-sm text-gray-300">You saved $12 this week!</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
