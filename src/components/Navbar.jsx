import React from 'react'
import { assets } from '../assets/admin_assets/assets'
const Navbar = () => {
  return (
    <div className=" pt-5 pb-5 flex justify-between items-center w-[90%] xl:w-[100%] m-auto border-b border-slate-400 p-5">
        <div className='flex items-center justify-between w-full'> 
        <div className="w-24 ">
          <img className="w-full" src={assets.logo} alt="logo" />
        </div> 
        <div className="w-12 rounded-full">
          <img className="w-full " src={assets.profile_image} alt="profile" />
        </div> 
        </div>
      </div>
  )
}

export default Navbar
