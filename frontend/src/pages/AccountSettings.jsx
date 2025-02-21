import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const AccountSettings = () => {
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

  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.put(
        "http://localhost:3000/user/update-username",
        { username },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      // dispatch(addUser(response.data.user.username));
      setMessage("Username updated successfully!");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.put(
        "http://localhost:3000/user/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete your account?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
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
            <button className="bg-gray-300 px-3 py-1 rounded" onClick={closeToast}>
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleUsernameUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Username
        </button>
      </form>
      
      <form onSubmit={handlePasswordUpdate} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Password
        </button>
      </form>
      
      <button onClick={handleDelete} className="w-full bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-600">
        Delete Account
      </button>
    </div>
  );
};

export default AccountSettings;
