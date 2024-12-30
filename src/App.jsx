import { useState } from "react";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="w-full  flex items-start">
        <Pagination />
        <Orders />
      </div>
    </>
  );
}

export default App;
