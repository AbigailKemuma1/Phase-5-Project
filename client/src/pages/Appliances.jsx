import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const API_URL = "http://127.0.0.1:5000/appliances/"; // make sure trailing slash matches Flask route

const Appliances = () => {
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAppliance, setEditingAppliance] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    power_rating: "",
    hours_per_day: "",
  });
  const token = localStorage.getItem("token"); // ensure consistent key

  // Fetch appliances for logged-in user
  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setAppliances(data);
        else console.error("Failed to fetch appliances:", data);
      } catch (err) {
        console.error("Error fetching appliances:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliances();
  }, [token]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update appliance
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingAppliance ? "PATCH" : "POST";
    const url = editingAppliance
      ? `${API_URL}${editingAppliance.id}`
      : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          power_rating: Number(formData.power_rating),
          hours_per_day: Number(formData.hours_per_day || 0),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (editingAppliance) {
          setAppliances((prev) =>
            prev.map((a) => (a.id === editingAppliance.id ? data : a))
          );
        } else {
          setAppliances((prev) => [...prev, data]);
        }

        // Reset form
        setFormData({ name: "", power_rating: "", hours_per_day: "" });
        setEditingAppliance(null);
        setShowForm(false);
      } else {
        alert(data.error || "Failed to save appliance");
      }
    } catch (err) {
      console.error("Error saving appliance:", err);
    }
  };

  // Delete appliance
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appliance?")) return;

    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) setAppliances((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting appliance:", err);
    }
  };

  // Start editing
  const handleEdit = (appliance) => {
    setEditingAppliance(appliance);
    setFormData({
      name: appliance.name,
      power_rating: appliance.power_rating,
      hours_per_day: appliance.hours_per_day,
    });
    setShowForm(true);
  };

  if (loading) return <DashboardLayout title="Appliances"><p>Loading...</p></DashboardLayout>;

  return (
    <DashboardLayout title="Appliances">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Manage Your Appliances</h2>
          <p className="text-gray-400">
            Add, edit, or remove appliances for accurate energy tracking.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingAppliance(null);
            setFormData({ name: "", power_rating: "", hours_per_day: "" });
          }}
          className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span className="text-xl">+</span>
          <span>{showForm ? "Cancel" : "Add Appliance"}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {editingAppliance ? "Edit Appliance" : "Add Appliance"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Appliance Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              name="power_rating"
              placeholder="Power Rating (W)"
              value={formData.power_rating}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              name="hours_per_day"
              placeholder="Hours per Day"
              value={formData.hours_per_day}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {editingAppliance ? "Update" : "Add Appliance"}
          </button>
        </form>
      )}

      {/* Appliances Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">NAME</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">POWER (W)</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">HOURS/DAY</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {appliances.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No appliances found.
                </td>
              </tr>
            ) : (
              appliances.map((a) => (
                <tr key={a.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">{a.name}</td>
                  <td className="px-6 py-4 text-gray-300">{a.power_rating}W</td>
                  <td className="px-6 py-4 text-gray-300">{a.hours_per_day}h</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(a)} className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 mr-2">✏️</button>
                    <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Appliances;
