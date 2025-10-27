import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const API_BASE_URL = 'http://localhost:5000';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    energyGoal: '',
    notifications: {
      email: true,
      push: true,
      weekly: true,
      alerts: true,
    },
    preferences: {
      currency: 'USD',
      energyUnit: 'kWh',
      theme: 'dark',
    },
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saveStatus, setSaveStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view settings');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          energyGoal: userData.energy_goal || '',
          notifications: userData.notifications || {
            email: true,
            push: true,
            weekly: true,
            alerts: true,
          },
          preferences: userData.preferences || {
            currency: 'USD',
            energyUnit: 'kWh',
            theme: 'dark',
          },
        });
      } else {
        setError('Failed to load profile');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please log in to save settings');
        setSaveStatus('');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          energy_goal: formData.energyGoal,
          notifications: formData.notifications,
          preferences: formData.preferences,
        }),
      });

      if (response.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Failed to save settings');
        setSaveStatus('');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error saving settings:', err);
      setSaveStatus('');
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please log in to change password');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setSaveStatus('password_updated');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Failed to update password');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error updating password:', err);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please log in to delete account');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Failed to delete account');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error deleting account:', err);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' },
  ];

  if (loading) {
    return (
      <DashboardLayout title="Settings">
        <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
          <div className="text-xl text-gray-400">Loading settings...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-6xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-white hover:text-gray-200">✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  placeholder="johndoe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  placeholder="123 Main St, City, State"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Energy Goal (kWh)
                </label>
                <input
                  type="number"
                  name="energyGoal"
                  value={formData.energyGoal || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  placeholder="500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.notifications.email ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-400">Receive push notifications</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('push')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.notifications.push ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-gray-400">Get weekly energy consumption reports</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('weekly')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.notifications.weekly ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications.weekly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">Usage Alerts</p>
                  <p className="text-sm text-gray-400">Alert when usage exceeds threshold</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('alerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.notifications.alerts ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications.alerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold mb-4">App Preferences</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={formData.preferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Energy Unit
                </label>
                <select
                  value={formData.preferences.energyUnit}
                  onChange={(e) => handlePreferenceChange('energyUnit', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                >
                  <option value="kWh">Kilowatt-hours (kWh)</option>
                  <option value="Wh">Watt-hours (Wh)</option>
                  <option value="MWh">Megawatt-hours (MWh)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Theme
                </label>
                <select
                  value={formData.preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <button 
                    onClick={handlePasswordChange}
                    className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Add an extra layer of security to your account (Coming Soon)
                </p>
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors" disabled>
                  Enable 2FA
                </button>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="font-medium mb-3 text-red-400">Danger Zone</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Permanently delete your account and all associated data
                </p>
                <button 
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 flex items-center justify-between bg-gray-800 rounded-lg p-4">
          <div>
            {saveStatus === 'saving' && (
              <p className="text-gray-400 font-medium">Saving...</p>
            )}
            {saveStatus === 'saved' && (
              <p className="text-emerald-400 font-medium">✓ Settings saved successfully!</p>
            )}
            {saveStatus === 'password_updated' && (
              <p className="text-emerald-400 font-medium">✓ Password updated successfully!</p>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

