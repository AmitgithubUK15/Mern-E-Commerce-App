import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { productDeleteStart,productDeleteFailure,  productList } from '../redux/user/userSlice';

export default function ProductDetailsPage() {
    const {productid} = useParams()
    const {currentUser,loading,sellerproductlist} = useSelector((state)=>state.user);
    const [productdetails,setProductDetails]= useState();
    const [image,setImage] = useState("");
    const dispatch = useDispatch();
    const navigate= useNavigate();
    

    useEffect(()=>{
        for(let i in sellerproductlist){
            if(productid === sellerproductlist[i]._id){
                setProductDetails(sellerproductlist[i])
              
                break;
            }
            else{
                continue;
            }
            // console.log(sellerproductlist[i])
            
        }
    },[productid])

    function changeImage(img){
        setImage(img)
    }

   async function DeleteProduct(){
     
        try {
          dispatch(productDeleteStart())
          let req = await axios.delete(`/listing/DeleteProduct/${productdetails._id}/${currentUser._id}`);

          let data = req.data
          dispatch(productList(data))
          alert('Product Deleted successfulyy')
          navigate("/account")
        } catch (error) {
            dispatch(productDeleteFailure());
            alert(error.message);
        }
    }
  return (
    <div className='flex justify-center w-full  '>
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
                          <img src={img} onClick={()=>changeImage(img)} onMouseEnter={()=>changeImage(img)} alt="" />
                        </li>
                    ))}
                   
                </ul>
            </div>
            <div className='py-3 mx-auto'>
                <div 
                className='bg-gradient-to-tr from-gray-100 to-gray-200  
                xl:h-557px lg:h-450px md:h-450px sm:h-full m:h-full  s:h-64
                xl:w-411px lg:w-80 md:w-64 sm:w-80 m:w-64  s:w-48 '>
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
                <h1 className='text-3xl font-bold text-gray-500' >{productdetails && productdetails.brand}</h1>
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
                  <div className='py-3 flex flex-col gap-3'>
                    <div className='w-48 flex justify-between'>
                    <label className='text-md font-semibold text-slate-700' >Size S: </label>
                    <input disabled type='text' className='outline-none border p-2 w-20 text-center mx-2 cursor-default'
                     value={productdetails && productdetails.productVarious.sizes.sizeS} />
                    </div>
                    <div className='w-48 flex justify-between'>
                    <label className='text-md font-semibold text-slate-700' >Size M: </label>
                    <input disabled type='text' className='outline-none border p-2 w-20 text-center mx-2 cursor-default'
                     value={productdetails && productdetails.productVarious.sizes.sizeM} />
                    </div>
                    <div className='w-48 flex justify-between'>
                    <label className='text-md font-semibold text-slate-700' >Size L: </label>
                    <input disabled type='text' className='outline-none border p-2 w-20 text-center mx-2 cursor-default'
                     value={productdetails && productdetails.productVarious.sizes.sizeL} />
                    </div>
                    <div className='w-48 flex justify-between'>
                    <label className='text-md font-semibold text-slate-700' >Size XL: </label>
                    <input disabled type='text' className='outline-none border p-2 w-20 text-center mx-2 cursor-default'
                     value={productdetails && productdetails.productVarious.sizes.sizeXL} />
                    </div>
                  </div>
                </div>
                
                <div>
                    <p className='text-2xl font-semibold'>Curretly Stock avilable:  {productdetails && productdetails.quantity}</p>
                </div>

                <div>
                    <p className='text-1xl text-gray-500 text-justify'>
                        {productdetails && productdetails.description}
                    </p>
                </div>

                 <div className='flex my-5 '>
                   <Link to={`/productupdate/${encodeURIComponent(productdetails && productdetails._id)}`} >
                   <button className='py-3 px-8 bg-green-600 text-white font-semibold rounded-lg mx-2 my-2 '>Update</button>
                   </Link>
                   <Link to="/" onClick={DeleteProduct}>
                   <button disabled={loading}
                    className='py-3 px-8 bg-red-400 text-white font-semibold rounded-lg mx-2 my-2'>
                    {loading ? "Deleting":"Delete"}</button>
                   </Link>
                </div>
            </div>
           </div>
        </div>
    </div>
  )
}
