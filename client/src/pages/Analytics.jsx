import { useState } from 'react';

const Analytics = () => {
  const [chartType, setChartType] = useState('line');
  const [dateRange, setDateRange] = useState('7days');
  const [selectedAppliances, setSelectedAppliances] = useState(['all']);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-screen p-6">
          {/* User Profile */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-400">john.doe@email.com</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">📊</span>
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-emerald-600 text-white rounded-lg">
              <span className="text-xl">📈</span>
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">👤</span>
              <span>Profile</span>
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <span>Upgrade to Pro</span>
              <span>→</span>
            </button>
            <button className="w-full text-gray-400 hover:text-white flex items-center space-x-2 transition-colors">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Consumption Analytics</h1>
            <p className="text-gray-400">Detailed summaries and trends in your energy consumption.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total kWh Used</h3>
              <p className="text-3xl font-bold mb-1">1,200 kWh</p>
              <p className="text-emerald-400 text-sm">+5%</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Average Daily Cost</h3>
              <p className="text-3xl font-bold mb-1">$15.60</p>
              <p className="text-red-400 text-sm">-2%</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Peak Usage Time</h3>
              <p className="text-3xl font-bold mb-1">7:00 PM</p>
              <p className="text-emerald-400 text-sm">+10%</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'line' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  📈
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'bar' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  📊
                </button>
                <button
                  onClick={() => setChartType('globe')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'globe' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🌍
                </button>
              </div>
              
              <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <span>⬇️</span>
                <span>Export Data</span>
              </button>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-80 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-2">📊 Energy Consumption Chart</p>
                <p className="text-sm text-gray-500">Chart implementation will go here</p>
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-400">Bar Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    <span className="text-sm text-gray-400">Line Data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Raw Data Table */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Raw Data Table</h3>
              <button className="text-gray-400 hover:text-white">
                <span className="text-xl">⬇️</span>
              </button>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-center">Raw data table will be implemented here</p>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Filters */}
        <aside className="w-80 bg-gray-800 p-6">
          <h3 className="text-lg font-bold mb-6">Filters</h3>
          
          {/* Date Range */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Date Range</h4>
            <div className="space-y-2">
              {[
                { value: '7days', label: 'Last 7 days' },
                { value: '30days', label: 'Last 30 days' },
                { value: 'month', label: 'This Month' },
                { value: 'custom', label: 'Custom Range' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dateRange"
                    value={option.value}
                    checked={dateRange === option.value}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="text-emerald-600"
                  />
                  <span className={`text-sm ${dateRange === option.value ? 'text-emerald-400' : 'text-gray-300'}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter by Appliance */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-4">Filter by Appliance</h4>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Appliances' },
                { value: 'hvac', label: 'HVAC System' },
                { value: 'refrigerator', label: 'Refrigerator' },
                { value: 'lighting', label: 'Lighting' },
                { value: 'washing', label: 'Washing Machine' }
              ].map((appliance) => (
                <label key={appliance.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAppliances.includes(appliance.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAppliances([...selectedAppliances, appliance.value]);
                      } else {
                        setSelectedAppliances(selectedAppliances.filter(a => a !== appliance.value));
                      }
                    }}
                    className="text-emerald-600"
                  />
                  <span className="text-sm text-gray-300">{appliance.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Analytics;
