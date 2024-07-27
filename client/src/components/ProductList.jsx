import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {Addproduct,productList} from '../redux/user/userSlice'
import {Link} from 'react-router-dom'

const ProductList = () => {
 const {sellerproductlist} = useSelector((state)=>state.user);
 const dispatch = useDispatch();

 
 
 function addproduct(){
   dispatch(Addproduct())
 }


 
 async function deleteProduct(index,id,sellerId){
   
  
  try {
    const res = await axios.post(`/vendor/productdelete/${id}/${sellerId}`);
    if(res.data.success === false){
      alert(res.data.message);
      console.log(res);
    }
    let data = res.data.findSeller;
    dispatch(productList(data))
    alert(res.data.msg);
  } catch (error) {
    alert(error.message);
  }
 }
  return (
   <div>
    {sellerproductlist !=="no found orders"? 
    (
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="flex flex-col gap-5 ">
        {sellerproductlist && sellerproductlist.map((product,index) => (
          <li key={product._id} 
          className="p-2 border rounded-lg cursor-pointer hover:text-slate-500 hover:border-slate-400   ">
         
           
           <div className="flex w-full justify-between items-center  xl:flex-row lg:flex-row md:flex-row sm:flex-row m:flex-row s:flex-col">
            <div className='self-end inline xl:hidden lg:hidden md:hidden sm:hidden m:hidden s:block ' >
              <button  onClick={()=>deleteProduct(index,product._id,product.sellerRef)} 
              className='text-red-500 font-semibold text-xl '>X</button>
              </div>
              <Link to={`/productDetails/${encodeURIComponent(product._id)}`}>
              <div className="flex-shrink-0 w-36 h-48  rounded-lg mx-4 bg-gradient-to-tr from-gray-100 to-gray-200  overflow-hidden">
                <img src={product.posterimage[0]} alt={product.brand} className="w-full h-full object-cover" />
              </div></Link>
              
              <Link to={`/productDetails/${encodeURIComponent(product._id)}`}>
              <div className=' self-start xl:w-96 lg:w-96 md:w-48 sm:w-full'>
              <h3 className="text-lg font-medium ">{product.brand ? product.brand : product.productVarious.deviceName}</h3>
                <h3 className="text-sm  text-gray-400 font-semibold">Sold by : {product.companyname}</h3>
                <h3 className=" text-blue-500 font-semibold">{product.title }</h3>
                <p className="text-gray-700 mt-2 font-semibold">Price: ₹{product.regualarPrice - product.discountPrice}
                <span className=' line-through text-gray-400 mx-2 '>₹{ product &&product.regualarPrice }</span>
                <span className=' text-green-500 font-semibold '>{ product &&Math.floor( product.discountPrice/product.regualarPrice *100)}% Off</span>
                 </p>
                <p className="text-gray-600 mt-2 font-semibold">Stock : {product.quantity}</p>
              </div></Link>
              
              <div 
              className='self-start xl:block lg:block md:block sm:block m:block s:hidden' >
                <button onClick={()=>deleteProduct(index,product._id,product.sellerRef)}
                className='text-red-500 font-semibold text-xl  '>X</button></div>
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