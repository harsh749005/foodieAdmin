import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'
import { assets } from '../assets/admin_assets/assets'
const Pagination = () => {
    
  return (
    <div className='w-60 h-[88vh] border-r border-slate-400'>
      <ul className="w-full flex flex-col gap-5 justify-between items-center lg:text-md  ">
           
            <li  className='hamburgerMenuLi mt-2 w-full flex justify-end items-center gap-2  p-2 hover:bg-orange-500  cursor-pointer'>
              <div className='w-5 h-5'>
                <img src={assets.add_icon} className='w-full h-full' alt="" />
              </div>
              <a
                // onClick={closeMenu}                
                to="/foodie/about"
                 className="hamburgerMenua cursor-pointer  hover:text-white "
              >
                Add Items
              </a>
            </li>
            <li  className='hamburgerMenuLi  w-full flex justify-end items-center gap-2  p-2 text-right hover:bg-orange-500  cursor-pointer'>
            <div className='w-5 h-5'>
                <img src='' className='w-full h-full' alt="" />
              </div>
              <a
                // onClick={closeMenu}
                to="/foodie/contact"
                 className="hamburgerMenua cursor-pointer  hover:text-white"
              >
                List Items
              </a>
            </li>
            <li  className='hamburgerMenuLi w-full flex justify-end items-center gap-2   p-2 text-right hover:bg-orange-500  cursor-pointer'>
              <div className='w-5 h-5'>
                <img src="" className='w-full h-full' alt="" />
              </div>
              <a
                // onClick={closeMenu}
                to="/foodie/Orders"
                 className="hamburgerMenua cursor-pointer hover:text-white"
              >
                Orders
              </a>
            </li>
          </ul>
    </div>
  )
}

export default Pagination
