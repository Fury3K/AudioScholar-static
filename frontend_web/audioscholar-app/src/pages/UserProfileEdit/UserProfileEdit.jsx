import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEMO_USER } from '../../data/mockData';
import { Header } from '../Home/HomePage';

const UserProfileEdit = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(DEMO_USER.firstName);
  const [lastName, setLastName] = useState(DEMO_USER.lastName);
  const [email, setEmail] = useState(DEMO_USER.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [initialFirstName, setInitialFirstName] = useState(DEMO_USER.firstName);
  const [initialLastName, setInitialLastName] = useState(DEMO_USER.lastName);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(DEMO_USER.profileImageUrl);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please select a JPG, PNG, or GIF image.');
        setAvatarFile(null);
        setAvatarPreview(null);
        e.target.value = null;
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File is too large. Maximum size is 5MB.');
        setAvatarFile(null);
        setAvatarPreview(null);
        e.target.value = null;
        return;
      }

      setError(null);
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage('');

    // Demo mode - simulate save
    setTimeout(() => {
      setInitialFirstName(firstName);
      setInitialLastName(lastName);
      if (avatarFile) {
        setAvatarFile(null);
      }
      setNewPassword('');
      setConfirmPassword('');
      setSaving(false);
      setSuccessMessage('Changes saved successfully! (Demo mode)');
    }, 500);
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">Loading form...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <title>AudioScholar - Edit Profile</title>
      <Header />

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 md:p-10 rounded-lg shadow-xl transition-colors duration-200">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Edit Profile</h1>

            <form onSubmit={handleSaveChanges} className="space-y-5">
              <div className="flex flex-col items-center space-y-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
                <img
                  src={avatarPreview || currentProfileImageUrl || `${import.meta.env.BASE_URL}icon-512.png`}
                  alt="Avatar Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 shadow-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = `${import.meta.env.BASE_URL}icon-512.png`; }}
                />
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={saving}
                />
                <label
                  htmlFor="avatarInput"
                  className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${saving ? 'opacity-50 cursor-not-allowed' : ''} transition-colors duration-200`}
                >
                  Change Picture
                </label>
              </div>

              {successMessage && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{successMessage}</span>
                </div>
              )}

              {error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline"> {error}</span>
                </div>
              )}

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out shadow-sm dark:bg-gray-700 dark:text-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out shadow-sm dark:bg-gray-700 dark:text-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  value={email}
                  required
                  readOnly
                  disabled={saving || loading}
                />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-5 transition-colors duration-200">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Change Password</h2>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out shadow-sm dark:bg-gray-700 dark:text-white"
                    placeholder="Enter new password (min. 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out shadow-sm dark:bg-gray-700 dark:text-white"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-5 mt-5">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition duration-150 ease-in-out disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2D8A8A] hover:bg-[#236b6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D8A8A] transition-colors duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileEdit; 