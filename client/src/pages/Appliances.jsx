import { useState } from 'react';

const Appliances = () => {
  const [appliances] = useState([
    { id: 1, name: 'Refrigerator', wattage: 150, dailyUse: 24, monthlyCost: 15.84 },
    { id: 2, name: 'Living Room TV', wattage: 120, dailyUse: 4, monthlyCost: 4.22 },
    { id: 3, name: 'Microwave', wattage: 1200, dailyUse: 0.5, monthlyCost: 5.28 },
    { id: 4, name: 'Laptop Charger', wattage: 65, dailyUse: 8, monthlyCost: 4.57 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">⚡</span>
            </div>
            <h1 className="text-2xl font-bold">EnergyWatch</h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Reports</a>
            <a href="#" className="text-emerald-400 font-medium">Appliances</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Settings</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors">Help</button>
            <button className="text-gray-400 hover:text-white">
              <span className="text-xl">🔔</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div>
                <p className="text-sm font-medium">Jane Doe</p>
                <p className="text-xs text-gray-400">jane.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">WATTAGE (W)</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">AVG. DAILY USE (HRS)</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">EST. MONTHLY COST</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance) => (
                <tr key={appliance.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {appliance.name === 'Refrigerator' && '🧊'}
                        {appliance.name === 'Living Room TV' && '📺'}
                        {appliance.name === 'Microwave' && '🍽️'}
                        {appliance.name === 'Laptop Charger' && '💻'}
                      </span>
                      <span className="font-medium">{appliance.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{appliance.wattage}</td>
                  <td className="px-6 py-4 text-gray-300">{appliance.dailyUse}</td>
                  <td className="px-6 py-4 text-gray-300">${appliance.monthlyCost}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <span className="text-lg">✏️</span>
                      </button>
                      <button className="text-gray-400 hover:text-red-400 transition-colors">
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
          <p className="text-gray-400">Showing 1 to 4 of 27 results.</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">←</button>
            <button className="px-3 py-2 bg-emerald-600 text-white rounded">1</button>
            <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">2</button>
            <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">3</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">10</button>
            <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">→</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appliances;
