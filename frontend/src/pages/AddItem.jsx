import React, { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import '../styles/AddItem.css';
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "../Auth/Login";
const AddItem = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState(null);
  const [image, setImage] = useState(null);
  
  // Handle form submission
  const handleForm = (e) => {
    e.preventDefault();
    
    // Custom validation for the file input
    if (!image) {
      alert("Please select an image before submitting the form.");
      return;
    }

    const formData = new FormData();
    formData.append('foodName', name);
    formData.append('foodPrice', price);
    formData.append('foodDescription', description);
    formData.append('foodImage', image);
    formData.append('foodCategory', option);
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/addItem',formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response)=>{
      if(response.status === 200){
        toast.success("Item added successfully");
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setIsOpen(false);
        setOption(null);
        console.log(response);
        const imagePreview = document.getElementById('image-preview');
        imagePreview.src = assets.upload_area;
        // window.location.reload(); 
      }
    })
    .catch((err) => {
      console.error(err);
    })
  };

  // Toggle dropdown visibility
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent form submission
    
    setIsOpen(!isOpen);
  };

  const handleDropdown = (e) => {
    e.preventDefault(); // Prevent form submission
    
    setOption(e.target.innerHTML);
  };

  useEffect(() => {
    const imagePreview = document.getElementById('image-preview');
    const fileInput = document.getElementById('file-input');

    imagePreview.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  return (
    <div className="w-[60%] md:w-[90%] m-auto ">
      <div className="md:w-[650px] w-full md:pl-10 p-2">
        <form className="flex flex-col gap-5" onSubmit={handleForm} encType="multipart/form-data">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-slate-500">Upload Image</h1>
            <div className="w-16 h-16 border-2 border-slate-400 rounded cursor-pointer">
              <input
                type="file"
                id="file-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => setImage(e.target.files[0])} // Directly set the file object
              />
              <img
                className="w-full h-full object-cover rounded"
                src={assets.upload_area}
                alt="select"
                id="image-preview"
              />
            </div>
          </div>
          
          {/* Other form fields remain the same */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-slate-500">Product Name</h1>
            <input
              type="text"
              className="w-full md:w-96 text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-slate-500">Product Description</h1>
            <textarea
              cols="20"
              rows="5"
              className="w-full md:w-96 text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col md:w-[450px] gap-4 md:flex md:flex-row items-start justify-between ">
            <div className="w-full md:w-52 flex flex-col gap-2 bg-white">
              <h1 className="text-lg text-slate-500">Food Category</h1>
              <div onClick={toggleDropdown} className="relative inline-block text-left">
                <button className="inline-flex justify-between w-full px-4 py-3 text-sm font-medium text-white bg-orange-400 border-2 border-orange-500 rounded-md hover:bg-orange-500 focus:outline-none">
                  {option === null ? "Category" : option}
                  <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-1" onClick={handleDropdown}>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Salad</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Rolls</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Sandwich</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Pure Veg</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Desserts</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Cake</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Pasta</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white">Noodles</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-lg text-slate-500">Product Price</h1>
              <input
                type="text"
                className="mt-2 text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full md:w-64 px-4 py-2 text-md font-medium text-white bg-orange-400 border-2 border-orange-400 rounded-md hover:bg-orange-500">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
