import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
const Navbar = () => {
  const [state,SetState] = useState(false);
  const toggleDropdown = () => {
    SetState(!state);
  }
  useEffect(()=>{
    console.log(state);
  },[state]);
  return (
    <div className=" pt-5 pb-5 flex justify-between items-center w-[100%] md:w-[90%] xl:w-[100%] m-auto border-b border-slate-400 p-5">
        <div className='flex items-center justify-between w-full'> 
        <div className="w-24 ">
          <img className="w-full" src={assets.logo} alt="logo" />
        </div> 
        <div className="w-12 rounded-full ">
          <img onClick={toggleDropdown} className=" cursor-pointer w-full " src={assets.profile_image} alt="profile" />
          {
            state && <div className='w-max absolute flex flex-col gap-2 border-slate-200 bg-zinc-50 px-5 py-5 border-2 right-4 rounded'>
            <button className='bg-orange-400 border-2 border-orange-500 cursor-pointer px-5 py-2 rounded text-white text-lg font-medium hover:bg-orange-500 transition-colors'>Login</button>
            <button className='bg-orange-400 border-2 border-orange-500 cursor-pointer px-5 py-2 rounded text-white text-lg font-medium hover:bg-orange-500 transition-colors'>Signup</button>
          </div>
          }
          
        </div> 
        </div>
      </div>
  )
}

export default Navbar
