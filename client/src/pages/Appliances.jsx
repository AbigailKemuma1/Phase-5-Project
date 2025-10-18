import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Appliances = () => {
  const [appliances] = useState([
    { id: 1, name: 'Refrigerator', icon: '🧊', wattage: 150, dailyUse: 24, monthlyCost: 15.84, status: 'on', category: 'Kitchen' },
    { id: 2, name: 'Air Conditioner', icon: '❄️', wattage: 2000, dailyUse: 8, monthlyCost: 45.00, status: 'on', category: 'Cooling' },
    { id: 3, name: 'Living Room TV', icon: '📺', wattage: 120, dailyUse: 4, monthlyCost: 4.22, status: 'off', category: 'Entertainment' },
    { id: 4, name: 'Microwave', icon: '🍽️', wattage: 1200, dailyUse: 0.5, monthlyCost: 5.28, status: 'off', category: 'Kitchen' },
    { id: 5, name: 'Laptop Charger', icon: '💻', wattage: 65, dailyUse: 8, monthlyCost: 4.57, status: 'on', category: 'Electronics' },
    { id: 6, name: 'Water Heater', icon: '🔥', wattage: 3000, dailyUse: 2, monthlyCost: 20.88, status: 'on', category: 'Heating' },
    { id: 7, name: 'Washing Machine', icon: '🧺', wattage: 500, dailyUse: 1, monthlyCost: 5.50, status: 'off', category: 'Appliances' },
    { id: 8, name: 'LED Lights', icon: '💡', wattage: 10, dailyUse: 6, monthlyCost: 0.66, status: 'on', category: 'Lighting' },
  ]);

  return (
    <DashboardLayout title="Appliances">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Manage Your Appliances</h2>
            <p className="text-gray-400">Add, edit, or remove your appliances to get a more accurate view of your energy consumption.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <span className="text-xl">+</span>
            <span>Add New Appliance</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search for an appliance"
                className="bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 w-80"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <span>☰</span>
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <span>↕️</span>
              <span>Sort</span>
            </button>
          </div>
        </div>

        {/* Appliances Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">APPLIANCE NAME</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">WATTAGE</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">AVG. DAILY USE</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">MONTHLY COST</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">STATUS</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance) => (
                <tr key={appliance.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{appliance.icon}</span>
                      <div>
                        <span className="font-medium block">{appliance.name}</span>
                        <span className="text-xs text-gray-400">{appliance.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{appliance.wattage}W</td>
                  <td className="px-6 py-4 text-gray-300">{appliance.dailyUse}h</td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400 font-medium">${appliance.monthlyCost.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appliance.status === 'on' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-gray-600/50 text-gray-400'
                      }`}>
                        {appliance.status.toUpperCase()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors">
                        <span className="text-lg">✏️</span>
                      </button>
                      <button className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors">
                        <span className="text-lg">🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-400">Showing 1 to 8 of 8 appliances</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled>←</button>
            <button className="px-3 py-2 bg-emerald-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled>→</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Appliances</span>
              <span className="text-2xl">🔌</span>
            </div>
            <p className="text-3xl font-bold">{appliances.length}</p>
            <p className="text-emerald-400 text-sm mt-1">{appliances.filter(a => a.status === 'on').length} active now</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Monthly Cost</span>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold">${appliances.reduce((sum, a) => sum + a.monthlyCost, 0).toFixed(2)}</p>
            <p className="text-gray-400 text-sm mt-1">estimated</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Highest Consumer</span>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold">{appliances.sort((a, b) => b.monthlyCost - a.monthlyCost)[0].name}</p>
            <p className="text-orange-400 text-sm mt-1">${appliances.sort((a, b) => b.monthlyCost - a.monthlyCost)[0].monthlyCost.toFixed(2)}/month</p>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default Appliances;
