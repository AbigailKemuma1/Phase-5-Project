import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const API_URL = "http://127.0.0.1:5000/analytics/";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "User";
  const token = localStorage.getItem("token");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("JWT token being sent:", token);
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [token]);

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="text-gray-400 text-center mt-20">Loading analytics...</div>
        <div className="text-red-500 text-center mt-4 font-bold">DEBUG: Dashboard component is rendering!</div>
      </DashboardLayout>
    );
  }

  // Defensive checks for API response
  if (!analytics || analytics.message || !analytics.summary || !analytics.dailyData || !analytics.appliances || !analytics.insights) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="text-gray-400 text-center mt-20">
          No analytics data available or data is incomplete.<br />
          Please check your connection or try again later.
        </div>
      </DashboardLayout>
    );
  }

  const { summary, dailyData, appliances, insights } = analytics;

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Welcome back, {username}!</h2>
        <p className="text-gray-400 text-lg">
          Here's your latest energy consumption overview.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Energy Usage"
          value={`${summary.total_usage} kWh`}
          change="+5.2%"
          color="emerald"
          icon="⚡"
          note="vs last month"
        />
        <MetricCard
          title="Estimated Cost"
          value={`$${summary.total_cost}`}
          change="+$12"
          color="blue"
          icon="💰"
          note="this month"
        />
        <MetricCard
          title="Carbon Footprint"
          value={`${summary.co2_emissions} kg`}
          change="+3.1%"
          color="orange"
          icon="🌍"
          note="CO₂ emissions"
        />
        <MetricCard
          title="Peak Usage"
          value={`${summary.peak_usage.value} kWh`}
          change={summary.peak_usage.time}
          color="emerald"
          icon="💚"
          note="Highest hourly usage"
        />
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
              <p className="text-2xl font-bold">{summary.total_usage} kWh</p>
              <p className="text-emerald-400 text-sm">↓5.2% vs last week</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg text-sm transition-colors">
              Export Data
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 bg-gray-700/50 rounded-lg p-4">
          <div className="h-full flex items-end justify-between space-x-2">
            {dailyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="text-xs text-gray-400">{day.day}</div>
                <div
                  className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-400 hover:to-emerald-300 transition-all cursor-pointer relative group"
                  style={{ height: `${day.usage * 2}%`, width: "40px" }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.usage} kWh
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
            <Link
              to="/appliances"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {appliances.map((appliance, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{appliance.icon || "🔌"}</span>
                  <div>
                    <p className="font-medium">{appliance.name}</p>
                    <p className="text-gray-400 text-sm">
                      {appliance.percentage}% of total
                    </p>
                  </div>
                </div>
                <p className="font-bold">{appliance.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Insights */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
          <h3 className="text-xl font-bold mb-4">Smart Insights</h3>
          <ul className="space-y-3">
            {insights.map((tip, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                💡 <span className="text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

// Reusable metric card
const MetricCard = ({ title, value, change, color, icon, note }) => (
  <div
    className={`bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-${color}-500 transition-colors cursor-pointer`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-${color}-500/20 rounded-lg flex items-center justify-center`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <span className={`text-${color}-400 text-sm font-medium`}>{change}</span>
    </div>
    <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-gray-500 text-sm mt-1">{note}</p>
  </div>
);
