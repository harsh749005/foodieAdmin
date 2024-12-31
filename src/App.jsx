import { useState } from "react";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import ListItem from "./pages/ListItem";
import AddItem from "./pages/AddItem";
import { Routes,Route } from "react-router-dom";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
