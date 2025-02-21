import React, { useEffect, useState } from 'react';
import { Settings, User, Mail, Lock, Trash2, Save, CircleDot } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/userSlice';
import { toast } from 'react-toastify';

function AccountSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/account-details", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        
        const data = response.data;
        setUsername(data.username);
        setEmail(data.email);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch account details");
      }
    };
    fetchAccountDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.put(
        "http://localhost:3000/user/update-profile",
        { username, email, currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch(removeUser());
      dispatch(addUser(response.data.user.email));
      setMessage("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handleDelete = () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete your account?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
              onClick={async () => {
                closeToast();
                try {
                  await axios.delete("http://localhost:3000/user/delete", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                  });
                  localStorage.removeItem("token");
                  dispatch(removeUser());
                  navigate("/");
                } catch (err) {
                  setError(err.response?.data?.message || "Failed to delete account");
                }
              }}
            >
              Confirm
            </button>
            <button 
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition duration-300" 
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#161616] mt-10 relative overflow-hidden">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <Settings className="w-10 h-10 text-white animate-spin-slow" />
                <h1 className="text-3xl font-bold text-white">Account Settings</h1>
              </div>

              {/* Status Messages */}
              {message && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-200">
                  {message}
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Username Field */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white transition-all outline-none"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white transition-all outline-none"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  {/* Current Password Field */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white transition-all outline-none"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  {/* New Password Field */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white transition-all outline-none"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-black hover:text-white focus:ring-2 focus:ring-white/50 transition-all duration-300 group"
                  >
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Update Account
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-red-500/90 rounded-lg font-medium hover:bg-red-500/90 hover:text-white focus:ring-2 focus:ring-white/50 transition-all duration-300 group"
                  >
                    <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;