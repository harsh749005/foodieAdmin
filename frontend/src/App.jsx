import { useState } from "react";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import ListItem from "./pages/ListItem";
import AddItem from "./pages/AddItem";
import { Routes,Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from "./Auth/Logout";

function App() {


  return (
    <>
      <Navbar />
      <div className="w-full  flex items-start">
        <Pagination />
        <Routes>
          <Route exact path="/foodieAdmin/" element={<ListItem />} />
          <Route exact path="/foodieAdmin/orders" element={<Orders />} />
          <Route exact path="/foodieAdmin/add-item" element={<AddItem />} />
          {/* <Route exact path="/edit-item/:id" element={<EditItem />} /> */}
          <Route exact path="/foodieAdmin/login" element={<Login />} />
          <Route exact path="/foodieAdmin/logout" element={<Logout />} />
          <Route exact path="/foodieAdmin/register" element={<Register />} />
        </Routes>
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
