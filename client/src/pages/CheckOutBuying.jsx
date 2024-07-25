import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CheckOutBuying() {
  const {productId,sizeValues} = useParams();
  const {currentUser} = useSelector((state)=>state.user);
  const [productdetails,setProductDetail] =useState();
  const [quantity,setquantity] = useState(1);
  const navigate = useNavigate();
  
  
  useEffect(()=>{
    async function getProduct(){
      try {
        const req = await axios.get(`https://shopybookapi.onrender.com/listing/getsingleProduct/${productId}`);
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


async function BuyProduct(){
 
  try {

    if(quantity === 0){
      alert("Please enter quantity")
    }
    else{
      let req = await axios.post(`https://shopybookapi.onrender.com/api/buyCartproduct/${currentUser._id}/${productId}/${sizeValues}/${quantity}`);
      let result = req.data;
      alert(`${result.message}`)
      navigate("/")
    }

  } catch (error) {
    console.log(error);
  }
}


  return (
    <div className='flex  flex-col gap-2 mx-auto
    xl:w-1536px lg:w-full md:w-full sm:w-full m:w-full s:w-full'>
    
    <div className='mx-auto my-7 w-5/6'>
      <div className='flex  justify-between  xl:flex-row lg:flex-row md:flex-row sm:flex-col m:flex-col s:flex-col'>
        <div className=' flex flex-col gap-8 xl:w-2/3 lg:w-2/3 md:w-1/2'>

          {/* 1 */}
          <div className='p-2 flex flex-col shadow-md'>
             
             <div className='flex justify-between  p-2'>
               <div className='w-32 md:w-24 py-2 sm:py-6 '>
                <h1 className='mx-auto w-4 '>
                  <span className='bg-gray-200 text-blue-500  px-2 py-1 md:px-1 text-sm'>
                  1
                  </span>
                </h1>
               </div>
               <div className='w-full flex flex-col  py-2'>
                  <div><h1 className='font-bold text-xl md:text-sm sm text-gray-400'>LOGIN</h1></div>
                  <div className='flex'>
                    <p>
                      <span className='font-semibold md:text-sm'>ShopyBook Customer</span> +91<span>{currentUser.phone}</span></p>
                  </div>
               </div>
               <div className='w-48 md:w-24 '>
                <Link to="/updateProfile">
                <button className='m-4 py-2 px-5 md:px-2 border border-gray-300 text-blue-500 font-semibold'>Change</button>
                </Link>
               </div>
             
             </div>
          
          </div>

          {/* 2 */}
          <div className='p-2 flex flex-col shadow-md'>
             
             <div className='flex justify-between  p-2'>
               <div className='w-32  md:w-24 py-6'>
                <h1 className='mx-auto w-4 '>
                  <span className='bg-gray-200 text-blue-500  px-2 py-1 md:px-1 text-sm'>
                  2
                  </span>
                </h1>
               </div>
               <div className='w-full flex flex-col  py-2'>
                  <div><h1 className='font-bold text-xl  md:text-sm text-gray-400'>DELIVERY ADDRESS</h1></div>
                  <div className='flex'>
                    <p>
                      <span className='font-semibold'>{currentUser.username} </span> <span> {currentUser.address}</span></p>
                  </div>
               </div>
               <div className='w-48 md:w-24 '>
                <Link to="/updateProfile">
                <button className='m-4 py-2 px-5 md:px-2  border border-gray-300 text-blue-500 font-semibold'>Change</button>
                
                </Link>
               </div>
             
             </div>
          
          </div>

          {/* 3 */}

          <div className=' flex flex-col  shadow-md'>
          <div className='flex justify-between  p-2 bg-blue-500'>
               <div className='w-[100px] md:w-20 py-3'>
                <h1 className='mx-auto w-4 '>
                  <span className='bg-gray-200 text-blue-500  px-2 py-1 md:px-1 text-sm'>
                  3
                  </span>
                </h1>
               </div>
               <div className='w-full flex flex-col py-3'>
                  <div><h1 className='font-bold text-xl md:text-sm text-gray-100'>SUMMARY</h1></div>
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
               <div className='w-full flex flex-col py-3  sm:py-5'>
                  <div className='flex'>
                    <p className='md:text-sm sm:text[8px]'>
                    <span> Order confirmation email will be sent to </span> 
                    <span className='font-semibold'>{currentUser.email}</span></p>
                  </div>
               </div>
               <div className='xl:w-72 md:w-48 sm:w-36  m:w-36 s:w-36 text-center'>
                <button onClick={BuyProduct}
                className='
                xl:my-3  xl:py-2 xl:px-9 md:py-2  md:px-3 sm:p-3 m:p-2 s:p-1 bg-orange-400 outline-none  text-white font-semibold'>Place Order</button>
               </div>
             
             </div>
          
          </div>

        </div>
        <div className='w-full sm:w-1/2  p-2 '>
          <div className='flex flex-col  shadow-md xl:w-96 lg:w-80 md:w-72 sm:w-full xl:mx-10 lg:mx-5 md:mx-auto'>
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
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
