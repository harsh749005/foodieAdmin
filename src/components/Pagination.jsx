import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'
import { assets } from '../assets/admin_assets/assets'
const Pagination = () => {
  
  return (
    <div className='w-60 h-[100vh] lg:h-[88vh] border-r border-slate-400'>
      <ul className="w-full flex flex-col gap-5 justify-between items-center lg:text-md  ">
           
            <li  className='hamburgerMenuLi mt-2 w-full flex justify-end items-center gap-2  p-2 hover:bg-orange-500  cursor-pointer'>
              <div className='w-5 h-5'>
                <img src={assets.add_icon} className='w-full h-full' alt="" />
              </div>
              <Link
                // onClick={closeMenu}                
                to="/foodieAdmin/add-item"
                 className="hamburgerMenua cursor-pointer  hover:text-white "
              >
                Add Items
              </Link>
            </li>
            <li  className='hamburgerMenuLi  w-full flex justify-end items-center gap-2  p-2 text-right hover:bg-orange-500  cursor-pointer'>
            <div className='w-5 h-5'>
                <img src='' className='w-full h-full' alt="" />
              </div>
              <Link
                // onClick={closeMenu}
                to="/foodieAdmin/"
                 className="hamburgerMenua cursor-pointer  hover:text-white"
              >
                List Items
              </Link>
            </li>
            <li  className='hamburgerMenuLi w-full flex justify-end items-center gap-2   p-2 text-right hover:bg-orange-500  cursor-pointer'>
              <div className='w-5 h-5'>
                <img src="" className='w-full h-full' alt="" />
              </div>
              <Link
                // onClick={closeMenu}
                to="/foodieAdmin/orders"
                 className="hamburgerMenua cursor-pointer hover:text-white"
              >
                Orders
              </Link>
            </li>
          </ul>
    </div>
  )
}

export default Pagination
