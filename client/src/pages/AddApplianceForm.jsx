import { useState } from "react";

function AddApplianceForm({ onAdd }) {
  const [name, setName] = useState("");
  const [powerRating, setPowerRating] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:5000/appliances/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          power_rating: powerRating,
          hours_per_day: hoursPerDay,
        }),
      });

      if (response.ok) {
        const newAppliance = await response.json();
        onAdd(newAppliance);
        setName("");
        setPowerRating("");
        setHoursPerDay("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add appliance");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 mb-6 w-full max-w-md mx-auto border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        ➕ Add New Appliance
      </h3>

      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Appliance Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          required
        />

        <input
          type="number"
          placeholder="Power Rating (Watts)"
          value={powerRating}
          onChange={(e) => setPowerRating(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          required
        />

        <input
          type="number"
          placeholder="Hours Per Day"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Appliance"}
        </button>
      </div>
    </form>
  );
}

export default AddApplianceForm;
