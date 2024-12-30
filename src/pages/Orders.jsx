import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
const Orders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [option,SetOption] = useState(null);
    // Toggle dropdown visibility
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    // Handle dropdown selection
    const handleDropdown = (e) => {
      e.preventDefault();
      SetOption(e.target.innerHTML);
    };
    useEffect(()=>{
        console.log(option);
    },[option])
    // Render dropdown options
  return (
    <div className='w-full mt-5 flex flex-col gap-4'>
      <h1 className='text-2xl font-medium m-auto md:ml-[64px]  '>My Orders</h1>
      <div className=' w-[90%] lg:w-[90%] m-auto flex flex-col gap-5'>
      <div className='h-max  flex flex-col justify-between  md:flex-row md:justify-between pt-5 border-2 border-orange-400 rounded p-2'>
        <div className='w-12 h-12'>
            <img className='w-full h-full object-cover'src={assets.parcel_icon} alt="parcel icon" />
        </div>
        <div className='flex flex-col gap-3 '>
        <p className='w-44 h-6 line-clamp-1 font-medium'> Garlic sandwich </p>
        <div className='flex flex-col gap-2'>
            <h1 className='font-medium'>Harsh Patel</h1>
            <p className='mt-2'>22 Valley , Munchin <br /> California , America , 230977</p>
            <p className='font-medium'>User Number : 9054140322</p>
        </div>
        </div>
        <p className='font-medium mb-2'>Items : 2</p>
        <p className='font-medium mb-2'>$65.00</p>
        <div onClick={toggleDropdown} class="relative inline-block text-left">
    <button class="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-white bg-orange-400 border-2 border-orange-500 rounded-md hover:bg-orange-500 focus:outline-none">
     
     {option === null ? 'Select Status' :option}
      <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    {isOpen && (
        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1" onClick={handleDropdown}>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">
              Order Processing
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">
              Out for Delivery
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">
              Delivered
            </a>
          </div>
        </div>
      )}
  </div>
        
      </div>
    </div>
   
    </div>
  )
}

export default Orders
