import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

export default function CheckOutBuying() {
  const {productId} = useParams();
  const {currentUser} = useSelector((state)=>state.user);
  const [productdetails,setProductDetail] =useState();
  const [quantity,setquantity] = useState(1);
  
  console.log(productdetails);
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

function increamentQty(){
  setquantity(quantity +1);
}
function decreamentQty(){
  setquantity(quantity -1);
}
  return (
    <div className='flex  flex-col gap-2 mx-auto
    xl:w-1536px lg:w-full md:w-full sm:w-full m:w-full s:w-full'>
    
    <div className='mx-auto my-7 w-5/6'>
      <div className='flex  justify-between'>
        <div className='w-2/3 flex flex-col gap-8'>

          {/* 1 */}
          <div className='p-2 flex flex-col shadow-md'>
             
             <div className='flex justify-between  p-2'>
               <div className='w-32  py-6'>
                <h1 className='mx-auto w-4 '>
                  <span className='bg-gray-200 text-blue-500  px-2 py-1 text-sm'>
                  1
                  </span>
                </h1>
               </div>
               <div className='w-full flex flex-col  py-2'>
                  <div><h1 className='font-bold text-xl text-gray-400'>LOGIN</h1></div>
                  <div className='flex'>
                    <p>
                      <span className='font-semibold'>ShopyBook Customer</span> +91<span>{currentUser.phone}</span></p>
                  </div>
               </div>
               <div className='w-48 '>
                <button className='m-4 py-2 px-5 border border-gray-300 text-blue-500 font-semibold'>Change</button>
               </div>
             
             </div>
          
          </div>

          {/* 2 */}
          <div className='p-2 flex flex-col shadow-md'>
             
             <div className='flex justify-between  p-2'>
               <div className='w-32  py-6'>
                <h1 className='mx-auto w-4 '>
                  <span className='bg-gray-200 text-blue-500  px-2 py-1 text-sm'>
                  2
                  </span>
                </h1>
               </div>
               <div className='w-full flex flex-col  py-2'>
                  <div><h1 className='font-bold text-xl text-gray-400'>DELIVERY ADDRESS</h1></div>
                  <div className='flex'>
                    <p>
                      <span className='font-semibold'>{currentUser.username} </span> +<span>{currentUser.address}</span></p>
                  </div>
               </div>
               <div className='w-48'>
                <button className='m-4 py-2 px-5 border border-gray-300 text-blue-500 font-semibold'>Change</button>
               </div>
             
             </div>
          
          </div>

          {/* 3 */}

          <div className=' flex flex-col  shadow-md'>
          <div className='flex justify-between  p-2 bg-blue-500'>
               <div className='w-[100px]  py-3'>
                <h1 className='mx-auto w-4 '>
                  <span className='bg-gray-200 text-blue-500  px-2 py-1 text-sm'>
                  3
                  </span>
                </h1>
               </div>
               <div className='w-full flex flex-col py-3'>
                  <div><h1 className='font-bold text-xl text-gray-100'>SUMMARY</h1></div>
               </div>
             </div>
            
            <div className='px-3 py-3'>
              <div className='flex justify-between'>


                 <div className='flex flex-col gap-2'>
                   <div>
                    <div className='w-36 h-48 py-4 px-3'>
                      <img src={productdetails && productdetails.posterimage[0]} alt="" />
                    </div>
                   </div>

                 <div className='py-1 '>
                   <div className='flex justify-around items-center'>
                     <div >
                      <span onClick={decreamentQty} 
                      className='cursor-pointer rounded-full bg-gray-200 text-gray-500  px-[9px] py-1 text-sm'>-</span>
                     </div>
                     <div className='border border-gray-300 px-7 py-1'>
                      <div>{quantity}</div>
                     </div>
                     <div>
                      <span onClick={increamentQty} 
                      className=' cursor-pointer rounded-full bg-gray-200 text-blue-500  px-2 py-1 text-sm'>+</span>
                      </div>
                   </div>
                 </div>
                 
                 </div>
                
                 <div className='px-3 py-3 w-full'>
                  <div className='mx-auto  text-left flex flex-col gap-3'>
                    <div className='font-semibold'>{productdetails && productdetails.title}</div>
                    <div className='text-gray-400'>Seller Name: {productdetails && productdetails.companyname}</div>
                    <div>
                   <div>
                  <h1 className='text-xl font-bold inline mx-0'>₹{ productdetails && Math.round((productdetails.regualarPrice - productdetails.discountPrice)*quantity)}</h1>
                  <span className=' line-through text-gray-400 mx-2 font-semibold'>₹{ productdetails &&Math.round(productdetails.regualarPrice * quantity) }</span>
                  <span className=' text-green-500 font-semibold text-md'>{ productdetails &&Math.floor((productdetails.discountPrice/productdetails.regualarPrice *100)*quantity )}% Off</span>
                </div>
               </div>
                  </div>
                 </div>
              </div>
            </div>
          </div>

          {/* 4 */}

          <div className='p-2 flex flex-col shadow-md'>
             
             <div className='flex justify-between  p-2'>
               <div className='w-full flex flex-col  py-5'>
                  <div className='flex'>
                    <p>
                      <span> Order confirmation email will be sent to 
                         </span> <span className='font-semibold'>{currentUser.email}</span></p>
                  </div>
               </div>
               <div className='w-72  text-center'>
                <button className='my-3 py-2 px-9  bg-orange-400 outline-none  text-white font-semibold'>Place Order</button>
               </div>
             
             </div>
          
          </div>

        </div>
        <div className=' w-1/2 p-2 '>
          <div className='flex flex-col  shadow-md w-96 mx-10'>
            <div>
            
            <div  className='text-left py-4 px-5 border-b border-gray-400 '>
             <h1 className='text-gray-400 text-xl'>Price Details</h1>
            </div>

            <div className='flex flex-col gap-5 px-5 py-4 border-b border-gray-400'>
               <div className='flex justify-between'>
                  <p>Price ({quantity} item)</p>
                  <h1 className='text-md font-bold inline mx-0'>₹{ productdetails && Math.round((productdetails.regualarPrice - productdetails.discountPrice)*quantity)}</h1>
               </div>
               <div className='flex justify-between'>
                  <p>Delivery Charge</p>
                  <h1 className='text-md font-bold inline mx-0 text-green-500'>Free</h1>
               </div>
            </div>

            <div className='flex flex-col gap-5 px-5 py-4 border-b border-gray-400'>
            <div className='flex justify-between'>
                  <p className='font-semibold text-xl'>Total Payable</p>
                  <h1 className='text-md font-bold inline mx-0'>₹{ productdetails && Math.round((productdetails.regualarPrice - productdetails.discountPrice)*quantity)}</h1>
               </div>
            </div>

            <div className='flex flex-col gap-5 px-5 py-4 border-b border-gray-400'>
            <div className='flex justify-between'>
                  <p className='font-semibold text-xl text-green-500'>
                    Your total saving on this order 
                    <span className=' mx-2 font-semibold'>{ productdetails && Math.floor((productdetails.discountPrice)*quantity) }</span>
                    </p>
               </div>
            </div>

            </div>
            
            <div>
            </div>

            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
