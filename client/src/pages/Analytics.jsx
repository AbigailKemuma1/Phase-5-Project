import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('usage');

  useEffect(() => {
    const token = localStorage.getItem('token'); // replace with your JWT storage

    fetch('http://127.0.0.1:5000/analytics/', {  // ✅ include trailing slash
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('No analytics data found');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching analytics:', err);
        setData(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-400">Loading analytics...</p>;
  if (!data) return <p className="text-gray-400">No analytics data available.</p>;

  const { summary, dailyData, hourlyData, appliances, insights } = data;

  const maxDailyValue = Math.max(
    ...dailyData.map(d =>
      selectedMetric === 'usage' ? d.usage : selectedMetric === 'cost' ? d.cost : d.carbon
    )
  );

  return (
    <DashboardLayout title="Analytics">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Energy Analytics</h2>
            <p className="text-gray-400">
              Detailed insights and trends in your energy consumption patterns
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Usage */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-emerald-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">⚡</div>
                <span className="text-emerald-400 text-sm font-medium">+5.2%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Usage</h3>
              <p className="text-3xl font-bold">{summary.total_usage} kWh</p>
              <p className="text-gray-500 text-sm mt-1">this week</p>
            </div>

            {/* Total Cost */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">💰</div>
                <span className="text-red-400 text-sm font-medium">+3.1%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Cost</h3>
              <p className="text-3xl font-bold">${summary.total_cost.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mt-1">this week</p>
            </div>

            {/* CO₂ Emissions */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-orange-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">🌍</div>
                <span className="text-orange-400 text-sm font-medium">+4.8%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">CO₂ Emissions</h3>
              <p className="text-3xl font-bold">{summary.co2_emissions} kg</p>
              <p className="text-gray-500 text-sm mt-1">this week</p>
            </div>

            {/* Peak Usage */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">⏱️</div>
                <span className="text-purple-400 text-sm">{summary.peak_usage.time}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">Peak Usage</h3>
              <p className="text-3xl font-bold">{summary.peak_usage.value} kWh</p>
              <p className="text-gray-500 text-sm mt-1">yesterday</p>
            </div>
          </div>

          {/* Daily Consumption Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 mb-8 border border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Daily Consumption Trends</h3>
                <p className="text-gray-400 text-sm">
                  Last {dateRange === '7days' ? '7 days' : dateRange === '30days' ? '30 days' : 'month'} breakdown
                </p>
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
              </div>
            </div>

            <div className="h-80 bg-gray-700/50 rounded-lg p-6">
              <div className="h-full flex items-end justify-between space-x-4">
                {dailyData.map((data, index) => {
                  const value =
                    selectedMetric === 'usage'
                      ? data.usage
                      : selectedMetric === 'cost'
                      ? data.cost
                      : data.carbon;
                  const height = (value / maxDailyValue) * 100;

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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Appliance Breakdown */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-6">Appliance Breakdown</h3>
            <div className="space-y-4">
              {appliances.map((appliance, index) => (
                <div key={index} className="group hover:bg-gray-600/30 p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{appliance.icon || '🔌'}</span>
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
                      className={`bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${appliance.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 mt-8">
            <h3 className="text-xl font-bold mb-4">AI Insights</h3>
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-lg">💡</span>
                  <p className="text-sm text-gray-300">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar remains unchanged */}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
