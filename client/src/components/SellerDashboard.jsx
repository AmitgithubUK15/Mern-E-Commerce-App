import {Link} from "react-router-dom"
import { FaBox, FaUsers, FaDollarSign } from 'react-icons/fa';
import { useSelector } from "react-redux";
import {  useState } from "react";
import axios from "axios";

const SellerDashboard = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const [Totalvisitor,setTotalVistor] = useState();
  const [TotalOrders,setTotalOrders] = useState();

  // console.log(currentUser);

  async function getTotalvisitor(){
    try {
      
      const req = await axios.get(`/vendor/getTotalVistor/${currentUser._id}`);

      setTotalVistor(req.data);
    } catch (error) {
      console.log(error);
    }
  }
  getTotalvisitor();
  
  async function getTotalOrders(){
    try {
      const req = await axios.get(`/vendor/getTotalOrder/${currentUser._id}`);

      setTotalOrders(req.data);
    } catch (error) {
      console.log(error);
    }
  }

  getTotalOrders();

  return (
    <div className="flex flex-col h-screen">
    
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white">
          <ul>
            <Link to="/">
            <li className="p-4 hover:bg-gray-700">Dashboard</li>
            </Link>
            <Link>
            <li className="p-4 hover:bg-gray-700">My Store</li>
            </Link>
            <Link>
            <li className="p-4 hover:bg-gray-700">Analytics</li>
            </Link>
            <Link>
            <li className="p-4 hover:bg-gray-700">Messages</li>
            </Link>
            <Link>
            <li className="p-4 hover:bg-gray-700">Team</li>           
            </Link>
             <Link>
            <li className="p-4 hover:bg-gray-700">Settings</li>
            </Link>
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <div className="flex justify-between">
            <div className="flex flex-col p-4 bg-white rounded-md shadow-md w-1/3 m-2">
              <FaBox className="text-blue-500 text-2xl mb-2" />
              <div className="text-2xl font-semibold">{TotalOrders}</div>
              <div>Total Orders</div>
            </div>
           
          
           <div className="flex flex-col p-4 bg-white rounded-md shadow-md w-1/3 m-2">
           <Link to='/visitor'>
              <FaUsers className="text-yellow-500 text-2xl mb-2" />
              <div className="text-2xl font-semibold">{Totalvisitor}</div>
              <div>Visitors</div>
              </Link>
            </div>
          

            <div className="flex flex-col p-4 bg-white rounded-md shadow-md w-1/3 m-2">
              <FaDollarSign className="text-red-500 text-2xl mb-2" />
              <div className="text-2xl font-semibold">$2543</div>
              <div>Total Sales</div>
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex-1 bg-white p-4 rounded-md shadow-md mr-2">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <div className="flex justify-between border-b py-2">
                <div>John Doe</div>
                <div>01-10-2021</div>
                <div className="text-blue-500">Completed</div>
              </div>
              <div className="flex justify-between border-b py-2">
                <div>John Doe</div>
                <div>01-10-2021</div>
                <div className="text-orange-500">Pending</div>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-md shadow-md ml-2">
              <h2 className="text-xl font-semibold mb-4">Todos</h2>
              <div className="flex justify-between border-b py-2">
                <div>Todo 1</div>
                <div className="text-blue-500">In Progress</div>
              </div>
              <div className="flex justify-between border-b py-2">
                <div>Todo 2</div>
                <div className="text-green-500">Completed</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
