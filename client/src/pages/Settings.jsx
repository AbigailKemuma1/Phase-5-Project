import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function Settings() {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		email: localStorage.getItem("email") || "",
		username: localStorage.getItem("username") || ""
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleInputChange = (field, value) => {
		setCredentials(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleUpdateCredentials = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		// Basic validation
		if (credentials.newPassword !== credentials.confirmPassword) {
			setMessage("New passwords don't match!");
			setLoading(false);
			return;
		}

		if (credentials.newPassword && credentials.newPassword.length < 6) {
			setMessage("Password must be at least 6 characters long!");
			setLoading(false);
			return;
		}

		try {
			// Here you would typically make an API call to update credentials
			// For now, just simulate a successful update
			console.log("Updating credentials:", {
				username: credentials.username,
				email: credentials.email,
				hasNewPassword: !!credentials.newPassword
			});

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Update localStorage
			localStorage.setItem("username", credentials.username);
			localStorage.setItem("email", credentials.email);

			setMessage("Credentials updated successfully!");
			setCredentials(prev => ({
				...prev,
				currentPassword: "",
				newPassword: "",
				confirmPassword: ""
			}));
		} catch (error) {
			setMessage("Failed to update credentials. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		// Clear all stored user data
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("email");
		localStorage.removeItem("user_id");
		
		// Navigate to login page
		navigate("/login");
	};

	return (
		<DashboardLayout title="Settings">
			<div className="max-w-2xl mx-auto space-y-6">
				{/* Account Information Section */}
				<div className="bg-gray-800 rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center">
						👤 Account Information
					</h2>
					
					<form onSubmit={handleUpdateCredentials} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Username
							</label>
							<input
								type="text"
								value={credentials.username}
								onChange={(e) => handleInputChange('username', e.target.value)}
								className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Email
							</label>
							<input
								type="email"
								value={credentials.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
								required
							/>
						</div>

						<div className="pt-4 border-t border-gray-700">
							<h3 className="text-lg font-medium text-gray-300 mb-4">Change Password</h3>
							
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Current Password
									</label>
									<input
										type="password"
										value={credentials.currentPassword}
										onChange={(e) => handleInputChange('currentPassword', e.target.value)}
										className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
										placeholder="Enter current password"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										New Password
									</label>
									<input
										type="password"
										value={credentials.newPassword}
										onChange={(e) => handleInputChange('newPassword', e.target.value)}
										className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
										placeholder="Enter new password"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Confirm New Password
									</label>
									<input
										type="password"
										value={credentials.confirmPassword}
										onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
										className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
										placeholder="Confirm new password"
									/>
								</div>
							</div>
						</div>

						{message && (
							<div className={`p-3 rounded-lg text-sm ${
								message.includes('successfully') 
									? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' 
									: 'bg-red-600/20 text-red-400 border border-red-600/30'
							}`}>
								{message}
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
						>
							{loading ? "Updating..." : "Update Credentials"}
						</button>
					</form>
				</div>

				{/* Account Actions Section */}
				<div className="bg-gray-800 rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center">
						⚙️ Account Actions
					</h2>
					
					<div className="space-y-4">
						<div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
							<h3 className="text-lg font-medium text-gray-300 mb-2">Session Management</h3>
							<p className="text-gray-400 text-sm mb-4">
								Sign out of your account and clear all stored data from this device.
							</p>
							<button
								onClick={handleLogout}
								className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
							>
								🚪 Logout
							</button>
						</div>

						<div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
							<h3 className="text-lg font-medium text-gray-300 mb-2">Account Status</h3>
							<p className="text-gray-400 text-sm">
								Account created: {new Date().toLocaleDateString()}
							</p>
							<p className="text-gray-400 text-sm">
								Last login: {new Date().toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
