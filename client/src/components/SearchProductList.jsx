import axios from 'axios';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
export default function SearchProductList({productDetails}) { 

  const {currentUser} = useSelector((state)=>state.user)
  
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
    <div className='flex flex-wrap xl:gap-10  p-5 
    lg:justify-between md:justify-around sm:justify-around'>
      {productDetails && productDetails.map((value,index)=>(
        <div key={index} 
         className=' xl:h-[350px] lg:h-[310px] md:h-[280px] sm:h-[240px] m:h-[410px] s:h-[410px] m:mx-auto s:mx-auto overflow-hidden mt-6 rounded-lg border shadow-lg'>
         <Link   to={`/itemDetails/${value._id}`}>
         <div className='overflow-hidden'>
              <img src={value.posterimage[0]} alt=""  
              className='xl:w-[180px] xl:h-[280px]  lg:w-[160px] lg:h-[240px]  md:w-[160px] md:h-[210px] sm:w-[110px] sm:h-[170px] m:w-[288px] m:h-[330px]   s:w-[288px] s:h-[330px]
              hover:scale-110 hover:opacity-70 transition-all duration-500 ease-in-out'/>
            </div>
            </Link>
            <div>
              {/* name and like */}
         
              <div  className='flex'>
                {/* name */}
                <Link   to={`/itemDetails/${value._id}`}>
                <div className=' xl:w-32 lg:w-28 md:w-28 sm:w-20 m:w-64  s:w-64 px-1 '>
                  <div>
                    <span className=' font-semibold text-slate-500'>{value.brand}</span>
                  </div>
                  <div className='xl:w-32 lg:w-28 md:w-28 sm:w-20 m:w-64 s:w-52
                   text-sm overflow-hidden truncate'>
                    <span className='block xl:w-32 lg:w-28 md:w-28 sm:w-20 m:w-64 s:w-52 text-[10px] font-semibold overflow-hidden truncate'>{value.title}</span>
                  </div>
                </div>
                </Link>
                {/* like */}

                <div className='xl:p-2 lg:p-2 md:p-2 sm:p-0  s:p-0 cursor-pointer'  onClick={()=>addWishList(value._id)}>
                  <img src="https://images.bewakoof.com/web/Wishlist.svg" alt="" />
                </div>
              </div>

              <Link   to={`/itemDetails/${value._id}`}>
              <div className='px-1'>
              <h1  className='text-[14px] sm:text-[12px] text-blue-500 font-semibold'>
                      ₹{value.regualarPrice }  
                      <span className=' xl:text-[10px] lg:text-[10px]  md:text-[10px] sm:text-[5px] m:text-[12px] 
                      line-through text-gray-400'>  {value.regualarPrice + value.discountPrice}</span>
                       <span className='text-green-500 xl:text-[10px] lg:text-[10px]  md:text-[10px] sm:text-[5px] 
                       m:text-[12px]'>   {Math.floor(value.discountPrice /value.regualarPrice * 100)}%Off</span>
                       </h1>
              </div>
              </Link>
            </div>
     
        </div>
      ))}
    </div>
  )
}

SearchProductList.propTypes = {
  productDetails: PropsType.array,
};

