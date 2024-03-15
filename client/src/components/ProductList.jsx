import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Addproduct} from '../redux/user/userSlice'
const ProductList = () => {
 const {sellerproductlist} = useSelector((state)=>state.user);
 const dispatch = useDispatch();

 function addproduct(){
   dispatch(Addproduct())
 }

 async function deleteProduct(index,id){
   console.log(index,id);
 }
  return (
   <div>
    {sellerproductlist !=="No product found"? 
    (
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="flex flex-col gap-5 ">
        {sellerproductlist.map((product,index) => (
          <li key={product.id} 
          className="p-2 border rounded-lg cursor-pointer hover:text-slate-500 hover:border-slate-400   ">
            
            <div className="flex w-full justify-between items-center  xl:flex-row lg:flex-row md:flex-row sm:flex-row m:flex-row s:flex-col">
            <div className='self-end inline xl:hidden lg:hidden md:hidden sm:hidden m:hidden s:block ' ><button className='text-red-500 font-semibold  '>X</button></div>
              <div className="flex-shrink-0 w-36 h-48 z-10 rounded-lg mx-4 bg-gray-200  overflow-hidden">
                <img src={product.posterimage[0]} alt={product.brand} className="w-full h-full object-cover" />
              </div>
              <div className=' self-start xl:w-96 lg:w-96 md:w-48 sm:w-full'>
              <h3 className="text-lg font-medium ">{product.brand}</h3>
                <h3 className="text-sm  text-gray-400 font-semibold">Sold by : {product.companyname}</h3>
                <h3 className="text-sm font-sm text-gray-400 ">{product.title}</h3>
                <p className="text-gray-700 mt-2 font-semibold">Price: ${product.regualarPrice}</p>
                <p className="text-gray-600 mt-2 font-semibold">Stock : {product.quantity}</p>
              </div>
              <div 
              className='self-start xl:block lg:block md:block sm:block m:block s:hidden' >
                <button onClick={()=>deleteProduct(index,product._id)}
                className='text-red-500 font-semibold  '>X</button></div>
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
    <h2 className="text-xl  text-gray-500 ">You not add product for selling 😢</h2>
    <div className='text-center py-5'><button onClick={addproduct} className='border-2 border-slate-500 p-3 px-5 text-slate-500 font-semibold rounded-lg hover:bg-slate-500 hover:text-white transition-all ease-in'>Add Product</button></div>
    </div>
    </div>
    )
    }
   </div>
  );
};

export default ProductList;