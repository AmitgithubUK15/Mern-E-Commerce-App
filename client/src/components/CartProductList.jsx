import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {Link, useNavigate} from 'react-router-dom'
import { GetWishListproduct } from '../redux/user/userSlice';

const  CartProductList = () => {
 const {currentUser,cartproduct} = useSelector((state)=>state.user);
 const dispatch = useDispatch();
 const navigate = useNavigate();


 async function deleteProduct(id){
   
  try {
    const res = await axios.delete(`/api/deleteCartproduct/${currentUser._id}/${id}`);
    let result = res.data;
    alert(`${result.message}`)
    navigate("/")
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
 }
  return (
   <div>
    {cartproduct.length !==0? 
    (
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="flex flex-col gap-5 ">
        {cartproduct &&  cartproduct.map((product,index) => (
          <li key={index} 
          className="p-2 shadow-lg  rounded-lg cursor-pointer hover:text-slate-500 hover:shadow-none transition-all ease-out " >
         
           
           <div className="flex w-full justify-between items-center  xl:flex-row lg:flex-row md:flex-row sm:flex-row m:flex-row s:flex-col">
            <div className='self-end inline xl:hidden lg:hidden md:hidden sm:hidden m:hidden s:block ' >
              <button  onClick={()=>deleteProduct(product._id)} 
              className='text-red-500 font-semibold text-xl '>X</button>
              </div>
              <Link to={`/itemDetails/${product._id}`}>
              <div className="flex-shrink-0 w-36 h-48  rounded-lg mx-4 bg-gradient-to-tr from-gray-100 to-gray-200  overflow-hidden">
                <img src={product.posterimage[0]} alt={product.brand} className="w-full h-full object-cover" />
              </div></Link>
              
              
              <div className=' self-start xl:w-96 lg:w-96 md:w-48 sm:w-full'>
              <Link to={`/itemDetails/${product._id}`}>
              <div>
              <h3 className="text-lg font-medium ">{product.brand ? product.brand : product.deviceName}</h3>
                <h3 className="text-sm  font-semibold">Sold by : {product.companyname}</h3>
                <h3 className="mt-1 sm:mt-2  font-semibold  text-[14px] sm:text-md  w-48 sm:w-64   h-6  overflow-hidden truncate ">{product.title }</h3>
                <p className="mt-1 font-semibold">Price: ₹{product.regualarPrice - product.discountPrice}
                <span className=' line-through text-gray-400 mx-2 '>₹{ product &&product.regualarPrice }</span>
                <span className=' text-green-500 font-semibold '>{ product &&Math.floor( product.discountPrice/product.regualarPrice *100)}% Off</span>
                 </p>
              </div>
              </Link>
              <div>
               <div>
               <input type="number" defaultValue={product.productQuantity} 
               className='border p-1 text-sm w-20 mr-2'/>
               <button>{product.sizes}</button>
               </div>
               <div>
               <button className='py-1 px-10 mt-2 bg-blue-500 rounded-full text-white hover:opacity-75'>Buy</button>
               </div>
              </div>
              </div>
              
              <div 
              className='self-start xl:block lg:block md:block sm:block m:block s:hidden' >
                <button onClick={()=>deleteProduct(product._id)}
                className='text-red-500 font-semibold text-xl  '>X</button></div>
            </div>
          
          </li>
        ))}
      </ul>
    </div>
    ):
    ( 
     
      <div className='flex flex-col  self-center py-20'>
        <div className='w-80'>
          <img 
          // 
          src='/logo/cards.avif'
           alt="" 
           />
        </div>
       <h1 className='pt-5 font-bold text-slate-700 text-center text-2xl self-center w-80'>Hey, it feels so light!</h1>
       <p className='py-1  text-slate-400 text-center text-sm  self-center w-80'>There is nothing in your bag. Let`s add some items.</p>
        <div className='py-5 w-80 '> 
        <Link to="/liked">
          <button className='p-3 mx-10 rounded-lg text-pink-500 border-2 border-pink-500 font-semibold'>ADD ITEMS FROM WISHLIST</button>
        </Link>
        </div>
      </div>
    )
    }
   </div>
  );
};

export default CartProductList;