import React, { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";

const AddItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, SetOption] = useState(null);
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleDropdown = (e) => {
    e.preventDefault();
    SetOption(e.target.innerHTML);
  };
  useEffect(() => {
    console.log(option);
  }, [option]);
  return (
    <div className="w-full md:w-[90%] lg:w-[90%] m-auto">
      <div className="flex flex-col gap-5  md:w-[650px] w-full md:pl-10 p-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg text-slate-500">Upload Image</h1>
          <div className="w-16 h-16 border-2 border-slate-400 rounded cursor-pointer">
            <img
              className="w-full h-full object-cover rounded"
              src={assets.upload_area}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg text-slate-500">Product Name</h1>
          <input
            type="text"
            className="w-full md:w-96 text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5 "
            placeholder="Product Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg text-slate-500">Product Description</h1>
          <textarea
            name=""
            id=""
            cols="20"
            rows="5"
            className="w-full md:w-96 text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5 "
            placeholder="Product Name"
          ></textarea>
        </div>
        <div className="w-full flex flex-col md:w-[450px] gap-4 md:flex md:flex-row items-start justify-between ">
          <div className="w-full md:w-52 flex flex-col gap-2 bg-white">
            <h1 className="text-lg text-slate-500">Food Category</h1>
            <div
              onClick={toggleDropdown}
              class="relative inline-block text-left"
            >
              <button class="inline-flex justify-between w-full px-4 py-3 text-sm font-medium text-white bg-orange-400 border-2 border-orange-500 rounded-md hover:bg-orange-500 focus:outline-none">
                {option === null ? "Category" : option}
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1" onClick={handleDropdown}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white"
                    >
                      Salad
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white"
                    >
                      Rolls
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white"
                    >
                      Sandwich
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white"
                    >
                      Veg
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-lg text-slate-500">Product Price</h1>
            <input
              type="text"
              className="mt-2 text-[18px] p-2 border-2 rounded border-slate-200 bg-transparent outline-red-500 pl-5 "
              placeholder="Price"
            />{" "}
          </div>
        </div>
        <button className="w-full md:w-64 px-4 py-2 text-md font-medium text-white bg-orange-400 border-2 border-orange-400 rounded-md hover:bg-orange-500">Add</button>
      </div>
    </div>
  );
};

export default AddItem;
