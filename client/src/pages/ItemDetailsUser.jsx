import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { RiHeartFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import {  FaShoppingCart,FaBolt} from "react-icons/fa";

export default function ItemDetailsUser() {
  const {currentUser} = useSelector((state)=>state.user);
const {productId} = useParams();
const [productdetails,setProductDetail] =useState();
const [image,setImage] = useState("");

useEffect(()=>{
    async function getProduct(){
      try {
        const req = await axios.get(`/listing/getsingleProduct/${productId}`);
        const response = req.data;
        setProductDetail(response);
      } catch (error) {
        console.log(error.message)
      }
    }
    getProduct()
},[productId])

function changeImage(img){
    setImage(img)
}


async function addWishList(productid){
  try {
    let res = await axios.post(`/api/addWishlist/${currentUser._id}/${productid}`);
    let data = res.data;
    alert(data.message);
  } catch (error) {
      alert("Please login you account");
      // console.log(error)
  }
}


    return (
    <div>{
        productdetails &&  productdetails.productVarious.ProductType === "Clothes" ? 
    (
        <div className='flex justify-center flex-col w-full  '>
        <div 
    className='flex justify-between sm:mx-auto gap-2 py-2 bg-white 
    xl:w-1300px lg:w-11/12 md:w-11/12 sm:w-full m:w-full s:w-full
    xl:flex-row    lg:flex-row md:flex-row sm:flex-col m:flex-col s:flex-col'>
            {/* for images */}
           <div className='flex justify-around gap-2 
             xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full m:w-full s:w-full 
            xl:flex-row lg:flex-row md:flex-row sm:flex-col-reverse  m:flex-col-reverse s:flex-col-reverse
           '>
            <div className='py-3 mx-auto'>
                <ul className='flex flex-col gap-5 
                lg:flex-col md:flex-col sm:flex-row m:flex-row s:flex-row'>
                    {productdetails && productdetails.coverimage.map((img,index)=>(
                        <li key={index} 
                        className=' bg-gradient-to-tr from-gray-100 to-gray-200  hover:border  hover:opacity-50
                         xl:w-16 lg:w-14 md:w-12 sm:w-14 m:w-12 s:w-12
                         xl:h-20 lg:h-16 md:h-14 sm:h-12 m:h-12 s:h-14
                         
                        '>
                          <img src={img} onClick={()=>changeImage(img)} onMouseEnter={()=>changeImage(img)} alt="" 
                          className='
                          xl:w-16 lg:w-14 md:w-12 sm:w-14 m:w-12 s:w-12
                          xl:h-20 lg:h-16 md:h-14 sm:h-12 m:h-12 s:h-14'
                          />
                        </li>
                    ))}
                   
                </ul>
            </div>
            <div className='py-3 mx-auto'>
                <div 
                className='bg-gradient-to-tr from-gray-100 to-gray-200  
                xl:h-557px lg:h-450px md:h-450px sm:h-full m:h-full  s:h-64
                xl:w-411px lg:w-80 md:w-64 sm:w-80 m:w-64  s:w-48 '>
                   <div 
                   className=" absolute shadow-xl mt-[6px]  px-[9px] rounded-full cursor-pointer  bg-gray-200 xl:ml-[357px] lg:ml-[270px] md:ml-[210px] sm:ml-[273px] m:ml-[212px] s:ml-[153px]" >
                <RiHeartFill onClick={()=>addWishList(productdetails._id)} className='text-red-400 xl:text-2xl lg:text-2xl md:text-xl sm:text-md my-2  hover:text-red-500 transition-colors'/>
               </div>
                   {productdetails && productdetails.posterimage.map((img,index)=>(
                    <div key={index} className='xl:h-557px lg:h-450px md:h-450px sm:h-96 m:h-96 s:h-64
                    w-full shadow-2xl'>
                        <img src={image ? image : img} alt="" className='w-full h-full'/>
                    </div>
                   ))}
                
                </div>
              
            </div>
           </div>
           
           {/* for detail */}
           <div className=' py-3 px-3 xl:mx-0 lg:mx-0 md:mx-0 sm:mx-auto m:mx-auto s:mx-auto
            xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full m:w-full s:w-full
           '>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold text-gray-500' >{productdetails && productdetails.brand ? productdetails.brand :  productdetails && productdetails.productVarious.deviceName }</h1>
                <div>
                    <p className='text-xl '>{ productdetails && productdetails.title}</p>
                </div>
               <div>
               <h1 className='text-3xl font-bold inline mx-2'>₹{ productdetails && productdetails.regualarPrice - productdetails.discountPrice}</h1>
               <span className=' line-through text-gray-400 mx-2 font-semibold'>₹{ productdetails &&productdetails.regualarPrice }</span>
               <span className=' text-green-500 font-semibold text-xl'>{ productdetails &&Math.floor( productdetails.discountPrice/productdetails.regualarPrice *100)}% Off</span>
               </div>

             
                    <div >
                    <p className='text-xl'>Sizes</p>
                  <div className='py-3 flex gap-1 item-start'>
                    <div className=' '>
                       <button onClick={sizeS} value={productdetails.productVarious.ClotheType === "T-Shirt" || productdetails.productVarious.ClotheType === "Hoodie" ? "S": "28"}
                       className="px-4 py-2 rounded-full border border-slate-600 text-slate-600 focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200">
      {productdetails.productVarious.ClotheType === "T-Shirt" || productdetails.productVarious.ClotheType === "Hoodie" ? "S": "28"}</button>
                    </div>
                    <div className=' '>
                    <button className="px-[13px] py-2 rounded-full border border-slate-600 text-slate-600 focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200">
                    {productdetails.productVarious.ClotheType === "T-Shirt" || productdetails.productVarious.ClotheType === "Hoodie" ? "M": "30"}
                      </button>
                    </div>
                    <div className=''>
                    <button className="px-4 py-2 rounded-full border border-slate-600 text-slate-600 focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200">
                    {productdetails.productVarious.ClotheType === "T-Shirt" || productdetails.productVarious.ClotheType === "Hoodie" ? "L": "32"}
                      </button>
                    </div>
                    <div className=' '>
                    <button className="px-3 py-2 rounded-full border border-slate-600 text-slate-600   focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200" >
                    {productdetails.productVarious.ClotheType === "T-Shirt" || productdetails.productVarious.ClotheType === "Hoodie" ? "XL": "34"}
                      </button>
                    </div>
                  </div>
                </div>   
              

                <div className='flex my-5 '>
                   <Link to={`/productupdate`} >
                   <button className='py-3 px-12 bg-sky-500 text-white font-semibold rounded-3xl mx-2 my-2 '>Buy</button>
                   </Link>
                   <Link to="/" >
                   <button 
                    className='py-3 px-8 bg-yellow-300 text-white font-semibold rounded-3xl mx-2 my-2'>
                   Add Cart</button>
                   </Link>
                </div>
                <div>
                    <p className='text-1xl text-gray-500 text-justify'>
                        {productdetails && productdetails.description}
                    </p>
                </div>

                 
            </div>
           </div>
           
        </div>

        
    </div>
    )
    :
    (<div className='flex justify-center flex-col w-full  '>
    <div 
className='flex justify-between sm:mx-auto gap-2 py-2 bg-white 
xl:w-1300px lg:w-11/12 md:w-11/12 sm:w-full m:w-full s:w-full
xl:flex-row    lg:flex-row md:flex-row sm:flex-col m:flex-col s:flex-col'>
        {/* for images */}
       <div className='flex justify-around gap-2 
         xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full m:w-full s:w-full 
        xl:flex-row lg:flex-row md:flex-row sm:flex-col-reverse  m:flex-col-reverse s:flex-col-reverse
       '>
        <div className='py-3 mx-auto'>
            <ul className='flex flex-col gap-5 
            lg:flex-col md:flex-col sm:flex-row m:flex-row s:flex-row'>
                {productdetails && productdetails.coverimage.map((img,index)=>(
                    <li key={index} 
                    className=' bg-gradient-to-tr from-gray-100 to-gray-200  hover:border  hover:opacity-50
                     xl:w-16 lg:w-14 md:w-12 sm:w-14 m:w-12 s:w-12
                     xl:h-20 lg:h-16 md:h-14 sm:h-12 m:h-12 s:h-14
                     
                    '>
                      <img src={img} onClick={()=>changeImage(img)} onMouseEnter={()=>changeImage(img)} alt="" 
                      className='
                      xl:w-16 lg:w-14 md:w-12 sm:w-14 m:w-12 s:w-12
                      xl:h-20 lg:h-16 md:h-14 sm:h-12 m:h-12 s:h-14'
                      />
                    </li>
                ))}
               
            </ul>
        </div>
        <div className='py-3 mx-auto'>
            <div 
            className='bg-gradient-to-tr from-gray-100 to-gray-200  
            xl:h-557px lg:h-450px md:h-450px sm:h-full m:h-full  s:h-64
            xl:w-411px lg:w-80 md:w-64 sm:w-80 m:w-64  s:w-48 '>
               <div 
               className=" absolute shadow-xl mt-[6px]  px-[9px] rounded-full cursor-pointer  bg-gray-100 xl:ml-[357px] lg:ml-[270px] md:ml-[210px] sm:ml-[372px] m:ml-[292px] s:ml-[240px]" >
            <RiHeartFill onClick={()=>addWishList(productdetails._id)} className='text-gray-300 xl:text-2xl lg:text-2xl md:text-xl sm:text-md my-2  hover:text-red-400 transition-colors'/>
           </div>
               {productdetails && productdetails.posterimage.map((img,index)=>(
                <div key={index} className='xl:h-557px lg:h-450px md:h-450px sm:h-96 m:h-96 s:h-64
                w-full shadow-2xl'>
                    <img src={image ? image : img} alt="" className='w-full h-full'/>
                </div>
               ))}
            
            </div>
          
        </div>
       </div>
       
       {/* for detail */}
       <div className=' py-3 px-3 xl:mx-0 lg:mx-0 md:mx-0 sm:mx-auto m:mx-auto s:mx-auto
        xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full m:w-full s:w-full
       '>
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold text-gray-500' >{productdetails &&  productdetails.productVarious.deviceName }</h1>
            <div>
                <p className='text-xl '>{ productdetails && productdetails.title}</p>
            </div>
           <div>
           <h1 className='text-3xl font-bold inline mx-2'>₹{ productdetails && productdetails.regualarPrice - productdetails.discountPrice}</h1>
           <span className=' line-through text-gray-400 mx-2 font-semibold'>₹{ productdetails &&productdetails.regualarPrice }</span>
           <span className=' text-green-500 font-semibold text-xl'>{ productdetails &&Math.floor( productdetails.discountPrice/productdetails.regualarPrice *100)}% Off</span>
           </div>

         
                 <div >
                <p className='text-xl'>Storage</p>
              <div className='py-3 flex gap-1 flex-col sm:flex-row item-start'>
                <div className=' '>
                   <button 
                   className="px-4 py-2 rounded-full border border-slate-600 text-slate-600 focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200">
                    6GB-128GB</button>
                </div>
                <div className=' '>
                <button className="px-[13px] py-2 rounded-full border border-slate-600 text-slate-600 focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200">
                  8GB-128GB</button>
                </div>
                <div className=''>
                <button className="px-4 py-2 rounded-full border border-slate-600 text-slate-600 focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200">
                  8GB-256GB</button>
                </div>
                <div className=' '>
                <button className="px-3 py-2 rounded-full border border-slate-600 text-slate-600   focus:border-blue-500 focus:text-blue-500 focus:bg-gray-200" >
                  12GB-256GB</button>
                </div>
              </div>
            </div>   
          

            <div className='flex my-5 '>
               <Link to={`/productupdate`} >
               <button className=' flex py-3 px-12 bg-sky-500 text-white font-semibold rounded-3xl mx-2 my-2 '>
               <span>Buy</span>
                 <span className='block px-3'>
                 <FaBolt className=' strok-2 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-5 sm:h-3 m:w-4 m:h-6 s:w-4 s:h-6' />
                </span>
               </button>
               </Link>
               <Link to="/" >
               <button 
                className='flex py-3 px-8 bg-yellow-300 text-white font-semibold rounded-3xl mx-2 my-2'>
                  <span>Cart</span>
                 <span className='block px-3'>
                 <FaShoppingCart className=' strok-2 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-5 sm:h-3 m:w-4 m:h-6 s:w-4 s:h-6' />
                </span>
                 </button>
               </Link>
            </div>
            <div>
                <p className='text-xl'>Description</p>
                <p className='text-1xl py-2 text-gray-500 text-justify'>
                    {productdetails && productdetails.description}
                </p>
            </div>

             
        </div>
       </div>
       
    </div>

    
</div>)
    }</div>
  )
}
