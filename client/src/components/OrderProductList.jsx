
import { useSelector } from 'react-redux';

import {Link} from 'react-router-dom'

const OrderProductList = () => {
 const {sellerproductlist} = useSelector((state)=>state.user);

  return (
   <div>
    {sellerproductlist.length !==0? 
    (
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="flex flex-col gap-5 ">
        {sellerproductlist && sellerproductlist.map((product) => (
          <li key={product._id} 
          className="p-2 border rounded-lg cursor-pointer hover:text-slate-500 hover:border-slate-400   ">
         
           
           <div className="flex w-full justify-between items-center  xl:flex-row lg:flex-row md:flex-row sm:flex-row m:flex-row s:flex-col">
         
              <Link to={`/itemDetails/${encodeURIComponent(product._id)}`}>
              <div className="flex-shrink-0 w-36 h-48  rounded-lg mx-4 bg-gradient-to-tr from-gray-100 to-gray-200  overflow-hidden">
                <img src={product.posterimage[0]} alt={product.brand} className="w-full h-full object-cover" />
              </div></Link>
              
              <Link to={`/itemDetails/${encodeURIComponent(product._id)}`}>
              <div className=' self-start xl:w-96 lg:w-96 md:w-48 sm:w-full'>
                <h3 className=" text-blue-500 font-semibold">{product.title }</h3>
                <p className="text-gray-700 mt-2 font-semibold">Price: ₹{product.regualarPrice - product.discountPrice}
                <span className=' line-through text-gray-400 mx-2 '>₹{ product &&product.regualarPrice }</span>
                <span className=' text-green-500 font-semibold '>{ product &&Math.floor( product.discountPrice/product.regualarPrice *100)}% Off</span>
                 </p>
           
              </div></Link>
              
            
            </div>
          
          </li>
        ))}
      </ul>
    </div>
    ):
    ( 
    <div className="py-10 flex flex-col justify-center items-center gap-10">
    <div className='  w-96 h-72 '>
      <img src="/logo/prodcutadd.avif" className='w-full h-full object-cover' alt="" />
    </div>
    <div className='py-3'>
    <h2 className="text-xl  text-gray-500 ">You not buy product 😢</h2>
    <div className='text-center py-5'>
      <Link to="/">
      <button 
    className='border-2 border-slate-500 p-3 px-5 text-slate-500 font-semibold rounded-lg hover:bg-slate-500 hover:text-white transition-all ease-in'>
      Buy Product
      </button>
      </Link>
      </div>
    </div>
    </div>
    )
    }
   </div>
  );
};

export default OrderProductList;