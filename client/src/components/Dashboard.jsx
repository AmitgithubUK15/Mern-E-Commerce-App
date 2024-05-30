import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaUsers, FaDollarSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Dashboard() {

    const {currentUser} = useSelector((state)=>state.user);
  const [Totalvisitor,setTotalVistor] = useState();
  const [TotalOrders,setTotalOrders] = useState();
  const [TotalEarnings,setTotalEarnings] = useState();


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
      let result = req.data;
      setTotalOrders(result.allOrders);
      setTotalEarnings(result.allSales)

    } catch (error) {
      console.log(error);
    }
  }

  getTotalOrders();

  return (
    <div>      <div className="flex justify-between flex-col sm:flex-row">
    <div className="flex flex-col p-4 bg-white rounded-md shadow-md w-full sm:w-1/3 m-2">
    <Link>
       <FaBox className="text-blue-500 text-2xl mb-2" />
      <div className="text-2xl font-semibold">{TotalOrders}</div>
      <div>Total Orders</div>
    </Link>
    </div>
   
  
   <div className="flex flex-col p-4 bg-white rounded-md shadow-md w-full sm:w-1/3 m-2">
   <Link to='/visitor'>
      <FaUsers className="text-yellow-500 text-2xl mb-2" />
      <div className="text-2xl font-semibold">{Totalvisitor}</div>
      <div>Visitors</div>
      </Link>
    </div>
  

    <div className="flex flex-col p-4 bg-white rounded-md shadow-md w-full sm:w-1/3 m-2">
      <Link>
      <FaDollarSign className="text-red-500 text-2xl mb-2" />
      <div className="text-2xl font-semibold">${TotalEarnings}</div>
      <div>Total Sales</div>
      </Link>
    </div>
  </div>
   {/* <div className="flex mt-4 flex-col sm:flex-row">
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
          </div> */}
  </div>
  )
}
