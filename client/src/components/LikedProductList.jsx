import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {Link, useNavigate} from 'react-router-dom'
import { GetWishListproduct } from '../redux/user/userSlice';

const  LikedProductList = () => {
 const {currentUser,wishlistProduct} = useSelector((state)=>state.user);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 async function deleteProduct(index,id){
   
  
  try {
    const res = await axios.post(`/api/deleteWishlist/${currentUser._id}/${id}`);
    let result = res.data;
    dispatch(GetWishListproduct(result))
    alert("Delete Product")
    navigate("/")
  } catch (error) {
    alert(error.message);
  }
 }
  return (
   <div>
    {wishlistProduct !==null? 
    (
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">WishList 💙 Product List</h2>
      <ul className="flex flex-col gap-5 ">
        {wishlistProduct &&  wishlistProduct.map((product,index) => (
          <li key={product._id} 
          className="p-2 shadow-lg  rounded-lg cursor-pointer hover:text-slate-500 hover:shadow-none transition-all ease-out " >
         
           
           <div className="flex w-full justify-between items-center  xl:flex-row lg:flex-row md:flex-row sm:flex-row m:flex-row s:flex-col">
            <div className='self-end inline xl:hidden lg:hidden md:hidden sm:hidden m:hidden s:block ' >
              <button  onClick={()=>deleteProduct(index,product._id)} 
              className='text-red-500 font-semibold text-xl '>X</button>
              </div>
              <Link to={`/itemDetails/${product._id}`}>
              <div className="flex-shrink-0 w-36 h-48  rounded-lg mx-4 bg-gradient-to-tr from-gray-100 to-gray-200  overflow-hidden">
                <img src={product.posterimage[0]} alt={product.brand} className="w-full h-full object-cover" />
              </div></Link>
              
              <Link to={`/itemDetails/${product._id}`}>
              <div className=' self-start xl:w-96 lg:w-96 md:w-48 sm:w-full'>
              <h3 className="text-lg font-medium ">{product.brand ? product.brand : product.productVarious.deviceName}</h3>
                <h3 className="text-sm  font-semibold">Sold by : {product.companyname}</h3>
                <h3 className="  font-semibold">{product.title }</h3>
                <p className="mt-2 font-semibold">Price: ₹{product.regualarPrice - product.discountPrice}
                <span className=' line-through text-gray-400 mx-2 '>₹{ product &&product.regualarPrice }</span>
                <span className=' text-green-500 font-semibold '>{ product &&Math.floor( product.discountPrice/product.regualarPrice *100)}% Off</span>
                 </p>
              </div></Link>
              
              <div 
              className='self-start xl:block lg:block md:block sm:block m:block s:hidden' >
                <button onClick={()=>deleteProduct(index,product._id)}
                className='text-red-500 font-semibold text-xl  '>X</button></div>
            </div>
          
          </li>
        ))}
      </ul>
    </div>
    ):
    ( 
        <div className='flex flex-col  self-center py-20'>

        <h1 className='pt-5 font-bold text-slate-700 text-center text-2xl self-center w-80'>WISHLIST</h1>
        <p className='py-1  text-slate-400 text-center text-sm  self-center w-80'>There is no product in wishlist</p>

        <div className='w-80'>
          <img
            // 
            src='/logo/Onlinewisheslist.gif'
            alt=""
          />
        </div>
        <div className='py-5 w-80 '>
          <Link to="/">
            <button className='px-9 py-3 rounded-xl mx-24 text-blue-500 border-2 border-blue-500 font-semibold hover:opacity-70'>Explore</button>
          </Link>
        </div>
      </div>
    )
    }
   </div>
  );
};

export default LikedProductList;