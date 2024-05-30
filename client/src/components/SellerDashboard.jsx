import {Link} from "react-router-dom"


import {  useState } from "react";

import Dashboard from "./Dashboard";
import Mystore from "../pages/Mystore";


const SellerDashboard = () => {
  const [mystore,setMystore] = useState(false);

  function showMystore(){
    setMystore(true)
  }

function showDashboard(){
  setMystore(false);
}

  return (
    <div className="flex flex-col h-screen">
    
      <div className="flex flex-1">
        <aside className=" w-44 sm:w-64  bg-gray-800 text-white">
          <ul>
            <Link >
            <li onClick={showDashboard} className="p-4 hover:bg-gray-700">Dashboard</li>
            </Link>
            <Link>
            <li onClick={showMystore} className="p-4 hover:bg-gray-700">My Store</li>
            </Link>
          </ul>
        </aside>
        <main className="flex-1 p-4">
         
         {mystore !== true ? (<Dashboard />):(<Mystore />)}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
