import { useState } from 'react';
import { Shield, Mail, KeyRound, GamepadIcon, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import horizon from "../assets/horizon.jpg";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { addUser } from '../redux/userSlice';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
     axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, {
        username: username,
        email: email,
        password: password
      }).then((response)=>{
        if (response.status === 201) {
          toast.success("Account creation successful", {
            theme: 'dark',
            position: "top-right",
          });
          localStorage.setItem('token', response.data.token)

          const userData = {email}
          dispatch(addUser(userData));
  
          setEmail('');
          setUsername('');
          setPassword('');
          navigate('/');
        }
      }).catch((error)=>{
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.msg || "User already exists", {
            theme: 'dark',
            position: "top-right",
          });
        } else {
          toast.error("Something went wrong. Please try again.", {
            theme: 'dark',
            position: "top-right",
          });
        }
      });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${horizon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="max-w-md w-full space-y-8 bg-zinc-800/50 p-8 rounded-2xl shadow-lg relative border border-zinc-700 backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <GamepadIcon className="w-16 h-16 text-zinc-300 hover:scale-110 transition-transform duration-300" />
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-zinc-200">
            Create Account
          </h2>
          <p className="mt-2 text-zinc-400">
            Join Gameverse today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="username" className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="mt-1 w-full bg-zinc-700 text-zinc-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all duration-300 border border-zinc-600"
                placeholder="Enter your username"
              />
            </div>

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
            className="group w-full bg-gradient-to-br from-gray-900 to-gray-800 text-zinc-200 rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Create account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium cursor-pointer">
              Login
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
};

export default SignupPage;
