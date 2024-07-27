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
  </div>
  )
}
