import React, {  useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  const handleForm = async (e) =>{
    e.preventDefault();
    const values = {name,email,password}
    const response = await axios.post('http://localhost:8081/register',values);
    if(response.data === "Admin already exists"){
      toast.error("Admin already exists");
    }
    else if(response.status === 200){
      toast.success("Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      
    }
    else{
      toast.error("Failed to create account");
    }
  }
  
  return (
    <div className="flex flex-col gap-10 bg-white w-[90%] xl:w-[70%] p-8 m-[auto] rounded-lg md:border-2 md:border-slate-400 md:mt-10">
       <form  className="flex flex-col gap-4" onSubmit={handleForm}>
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-medium">Create account</h2>
      </div>
      <div className="flex flex-col gap-4">
        <input
        required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-3 "
          placeholder="Your Name"
        />
         <input
         required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-3"
          placeholder="Your Email"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-3 "
          placeholder="Your Password"
        />
        <button className="bg-red-500 h-12 rounded text-white text-[20px] font-medium cursor-pointer">
         Create Account
        </button>
      </div>
      <div className="flex items-baseline gap-2 ">
        <input type="checkbox" name="terms" value="terms" className="cursor-pointer" />
        <p>By clicking you are accepting our Tearms and Conditions</p>
      </div>
      <p>
        Already have an account ?
        <Link to="/foodieAdmin/login" className="ml-2 text-red-600 font-medium">
          Login
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Register;
