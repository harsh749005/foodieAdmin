import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e)=>{
    e.preventDefault();
    //call login api here
    const values = {password: password, email: email}
    const response = await axios.post('http://localhost:8081/login',values);
    if(response.data === "Invalid credentials"){
      toast.error("Invalid email or password");
      
    }
    else if (response.status === 200) {
       toast.success("Logdin successfully");
            setEmail("");
            setPassword("");
          
    }
    

    // navigate to dashboard
    // history.push("/dashboard");
  }

  return (
    <div className="flex flex-col gap-10 bg-white w-[90%] xl:w-[70%] p-8 m-[auto] rounded-lg md:border-2 md:border-slate-400 md:mt-10">
     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-medium">Login</h2>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5"
          placeholder="Your Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5"
          placeholder="Your Password"
        />
        <button
          type="submit"
          className="bg-red-500 h-12 rounded text-white text-[20px] font-medium cursor-pointer"
        >
          Login
        </button>
      </form>
      <div className="flex items-baseline gap-2">
        <input type="checkbox" name="terms" value="terms" className="cursor-pointer" />
        <p>By clicking you are accepting our Terms and Conditions</p>
      </div>
      <p>
        Create a New account?{" "}
        <Link to="/foodieAdmin/register" className="text-red-600 font-medium">
          Click here
        </Link>
      </p>
    </div>
  );
};

export default Login;
