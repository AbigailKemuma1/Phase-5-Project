import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";

const API_BASE_URL = "http://127.0.0.1:5000";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saveStatus, setSaveStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view settings");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
        });
      } else {
        setError("Failed to load profile");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaveStatus("saving");
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Failed to save profile");
        setSaveStatus("");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Error connecting to server");
      setSaveStatus("");
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/auth/password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setSaveStatus("password_updated");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Failed to update password");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Error connecting to server");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  if (loading) {
    return (
      <DashboardLayout title="Settings">
        <div className="text-center py-20 text-gray-400">Loading settings...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")}>✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-700">
          {["profile", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 border-b-2 ${
                activeTab === tab
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-800 text-white p-3 rounded-lg w-full"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 text-white p-3 rounded-lg w-full"
              placeholder="Email"
            />
            <button
              onClick={handleSaveProfile}
              className="bg-emerald-600 text-white px-5 py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              {saveStatus === "saving" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-4">
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordInputChange}
              className="bg-gray-800 text-white p-3 rounded-lg w-full"
              placeholder="Current Password"
            />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordInputChange}
              className="bg-gray-800 text-white p-3 rounded-lg w-full"
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordInputChange}
              className="bg-gray-800 text-white p-3 rounded-lg w-full"
              placeholder="Confirm New Password"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-emerald-600 text-white px-5 py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
