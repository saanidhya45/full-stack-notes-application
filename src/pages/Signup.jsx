import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { useUserContext } from "../context/ContextProvider";
import axios from 'axios';

const Signup = () => {
   const {Email, setEmail, Password, setPassword, Name, setName} = useUserContext();
    const navigate = useNavigate()
   const handleSignupHandler = async (name, email, password) => {
        try {
          const res = await axios.post("http://localhost:8000/api/users/signup",{
            name,
            email,
            password
          })
          console.log('signup success', res);
          setEmail('');
          setName('');
          setPassword('');
          if(res.data.refreshToken && res.data.accessToken){
            localStorage.setItem('refreshToken', res.data.refreshToken)
            localStorage.setItem('accessToken', res.data.accessToken)
          }
          navigate('/');
        } catch (error) {
          console.log(error)
          console.log("signup failed : ", error.response?.data || error.msg);
        }
   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              onChange={(e)=>{
                setName(e.target.value)
              }}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
             onClick={(e) =>{
              e.preventDefault();
               handleSignupHandler(Name, Email, Password);
             }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to='/signin' className="text-blue-600 cursor-pointer hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;