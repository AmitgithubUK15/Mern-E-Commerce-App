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
    <div className='flex flex-wrap gap-10  p-5'>
      {productDetails && productDetails.map((value,index)=>(
        <div key={index} 
         className=' h-[350px] overflow-hidden mt-6 rounded-lg border '>
         <Link   to={`/itemDetails/${value._id}`}>
         <div className='overflow-hidden'>
              <img src={value.posterimage[0]} alt="" 
              className='w-[180px] h-[280px]  hover:scale-110 hover:opacity-70 transition-all duration-500 ease-in-out'/>
            </div>
            </Link>
            <div>
              {/* name and like */}
         
              <div  className='flex'>
                {/* name */}
                <Link   to={`/itemDetails/${value._id}`}>
                <div className=' w-32 px-1 '>
                  <div>
                    <span className=' font-semibold text-slate-500'>{value.brand}</span>
                  </div>
                  <div className='w-32 text-sm overflow-hidden truncate'>
                    <span className='block w-32 text-[10px] font-semibold overflow-hidden truncate'>{value.title}</span>
                  </div>
                </div>
                </Link>
                {/* like */}

                <div className='p-2 cursor-pointer'  onClick={()=>addWishList(value._id)}>
                  <img src="https://images.bewakoof.com/web/Wishlist.svg" alt="" />
                </div>
              </div>

              <Link   to={`/itemDetails/${value._id}`}>
              <div className='px-1'>
              <h1 
                    className='text-[14px] sm:text-[12px] text-blue-500 font-semibold'>
                      ₹{value.regualarPrice - value.discountPrice}  
                      <span className='text-[5px] sm:text-[10px] line-through text-gray-400'>  {value.regualarPrice}</span>
                       <span className='text-green-500 text-[5px] lg:text-[10px]'> {Math.round(value.discountPrice /value.regualarPrice * 100)}%Off</span>
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

