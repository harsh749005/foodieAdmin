import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios';
import Login from '../Auth/Login';
import { toast } from 'react-toastify';
const Orders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [option,setOption] = useState(null);
    const [userAuthDetails,setUserAuthDetails] = useState(null);
    // check user is logged in or not
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(()=>{
      axios.get('http://localhost:8081/')
      .then((response)=>{
        console.log("Order page "+response.data.email);
        setUserAuthDetails(response.data.email); // email is recived from server and sent back to server for inser`
        setIsAuthorized(true);
        // setOrders(response.data);
      }).catch((error)=>{
        console.log(error);
        setIsAuthorized(false);
      })
    },[])

    if (!isAuthorized) {
      return <Login/> // Show unauthorized message if the user is not authorized
    }
    // Toggle dropdown visibility
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    // Handle dropdown selection and call order function 
    const handleDropdown = (e) => {
      e.preventDefault();
      const selectedOption = e.target.innerHTML;
      setOption(selectedOption);
      // console.log(option)
      handleOrder(selectedOption);
    };

    // handle dropdown selection and send it to server
    const handleOrder = (selectedOption) => {
      axios.post('http://localhost:8081/orders', {selectedOption,authsDetails:userAuthDetails})
     .then((response)=>{
        console.log(response.data);
        // setOrders(response.data);
        toast.success("Order status updated")
      }).catch((error)=>{
        console.log(error);
        toast.error("error updating order");
      })
    }
 
  return (
    <div className='w-full mt-5 flex flex-col gap-4  md:w-[90%] lg:w-[90%]'>
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
        <p className='font-medium mb-2'>{option === null ? "Order Processing": option }</p>
        <div onClick={toggleDropdown} className="relative inline-block text-left">
    <button className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-white bg-orange-400 border-2 border-orange-500 rounded-md hover:bg-orange-500 focus:outline-none">
     
     {option === null ? 'Select Status' :option}
      <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'  d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    {isOpen && (
        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1" onClick={handleDropdown} >
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
