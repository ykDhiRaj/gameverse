import { useState } from 'react';
import { Shield, Mail, KeyRound, GamepadIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gow2 from "../assets/gow2.jpg" 
import axios from 'axios';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { addUser } from '../redux/userSlice';


function LoginPage() {
  const [email, setEmail] =  useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/user/login', {
      email,
      password
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      
      toast.success("Successfully logged in", { theme: 'dark', type:'success' });

      const userData = {email}
      dispatch(addUser(userData));
      
      setEmail('');
      setPassword('');
      navigate('/');
    })
    .catch((error) => {
      toast.error(error.response?.data?.msg || "Something went wrong", { theme: 'dark', type:'error' });
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${gow2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 " />

      <div className="max-w-md w-full space-y-8 bg-zinc-800/50 p-8 rounded-2xl shadow-lg relative border border-zinc-700 backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <GamepadIcon className="w-16 h-16 text-zinc-300 hover:scale-110 transition-transform duration-300" />
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-zinc-200">
            Welcome Back
          </h2>
          <p className="mt-2 text-zinc-400">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="email" className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 w-full bg-zinc-700 text-zinc-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all duration-300 border border-zinc-600"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative group">
              <label htmlFor="password" className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 w-full bg-zinc-700 text-zinc-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all duration-300 border border-zinc-600"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-zinc-500" />
              <span className="ml-2 text-sm text-zinc-400">Secured by encryption</span>
            </div>
          </div>

          <button
            type="submit"
            className="group w-full bg-gradient-to-br from-gray-900 to-gray-800 text-zinc-200 rounded-lg px-4 py-3 font-medium hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Sign in
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-zinc-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium cursor-pointer">
              Sign up
            </Link>
          </p>
          <p className="text-zinc-400">
            Wanna go to homepage?{' '}
            <Link to="/" className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium cursor-pointer">
              Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;