import React, { useEffect, useState } from 'react'
import axios from "axios";
import Register from '../Auth/Register';
import Login from '../Auth/Login';

const ListItem = () => {
  const [data,setData] = useState([]);
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(()=>{
    axios.defaults.withCredentials = true; // This is required for authenticated requests
    axios.get("http://localhost:8081/")
    .then(response => {
      if (response.status === 200) {
        console.log("list item page "+response.data);
        axios.get('http://localhost:8081/listItems')
        .then((repsonse)=>{
           setData(repsonse.data);
           
           setIsAuthorized(true);
           console.log(repsonse.data);
        }).catch(()=>{
            setIsAuthorized(false);
        })
      } else {
          setIsAuthorized(false)
      }
    }).catch(()=>{
      
      setIsAuthorized(false);
    })
   
  },[])
  

  if (!isAuthorized) {
    return <Login/> // Show unauthorized message if the user is not authorized
  }
  return (
    <div className='w-full md:w-[90%] lg:w-[90%]'>
      
    
        <h1 className='font-medium text-2xl m-4'>All Food List</h1>
      <div className='w-full p-4'>
        <div className='hidden md:flex items-center justify-between p-2 bg-slate-300 border-2 rounded md:border-b-0 border-slate-500 md:rounded-l md:rounded-r'>
            <h1 className='w-max p-2 font-medium'>Image</h1>
            <h1 className='w-max p-2 font-medium'>Home</h1>
            <h1 className='w-max p-2 font-medium'>Category</h1>
            <h1 className='w-max p-2 font-medium'>Price</h1>
            <h1 className='w-max p-2 font-medium'>Action</h1>
        </div>
        {
         
          data.map((item,index)=>(
            <div key={index} className='md:flex items-center justify-between p-2 border-2 rounded md:rounded-none md:border-t-0 border-slate-400'>
            <div className='w-12 h-12'>
                <img className='w-full h-full object-cover' src={`http://localhost:8081/uploads/${item.foodImage}`} alt="food itme" />
            </div>
            <p className='w-max p-2 '>{item.foodName}</p>
            <p className='w-max p-2 '>{item.foodCategory}</p>
            <p className='w-max p-2 '>$ {item.foodPrice}</p>
            <div className='flex gap-2'>
                {/* <button className='bg-orange-500 text-white px-4 py-2 rounded-md'>Edit</button> */}
                <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>
            </div>
        </div>
          ))
        }
       
        
      </div>
      
    </div>
    
    
  )
}

export default ListItem
