import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiHeartFill } from 'react-icons/ri';
import {useSelector} from 'react-redux'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ScrollBars({ items }) {
  const {currentUser} = useSelector((state)=>state.user);
  const [Slider, setSlider] = useState();
  const [currentindex, setCurrentIndex] = useState();
  const scrollbar = useRef();


  function ChangeImage(index, images) {
    setCurrentIndex(index);
    setSlider(images[0])
  }

  function setDefaultImage(index, images) {
    setCurrentIndex(index);
    setSlider(images);
  }


  function LeftScroll() {
    scrollbar.current.scrollLeft = scrollbar.current.scrollLeft - 350 * 4;
  }

  function RigthScroll() {
    scrollbar.current.scrollLeft = scrollbar.current.scrollLeft + 350 * 4;
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
    <div className='flex flex-col gap-5'>
      
      <div className='xl:mx-12  l:mx-12 ll:mx-6 lll:mx-4 lg:mx-3 flex justify-between'>
        <button onClick={LeftScroll}><MdKeyboardArrowLeft style={{ fontSize: "28px", padding: "0", margin: "0" }} /></button>
        <div className='overflow-x-scroll overflow-y-hidden xl:mx-5 l:mx-5 ll:mx-5 lll:mx-5 lx:mx-5 lg:mx-4 lg1:mx-4 lg2:mx-3 lg3:mx-3 lg4:mx-2 md:mx-2
          '  ref={scrollbar}
          style={{ scrollbarWidth: "none" }} >
          <div
            className='flex justify-between   xl:h-[510px] l:h-[400px] ll:h-[400px] lll:h-[380px] lx:h-[350px] lg:h-[340px] lg1:h-[340px] lg2:h-[340px] lg3:h-[340px] lg4:h-[340px] md:h-[250px]'>
            {items && items.map((item, index) => (

              <div key={index}
                className='   
               flex flex-col justify-between mx-auto  cursor-pointer 
               xl:h-[500px]  l:h-[390px] ll:h-[390px] lll:h-[360px] lx:h-[330px] lg:h-[320px] lg1:h-[320px] lg2:h-[320px] lg3:h-[320px] lg4:h-[320px] md:h-[240px]'>
                {/* bg-gradient-to-tr from-gray-100 to-gray-200 */}
                 <Link to={`/itemDetails/${item._id}`} >
                <div onMouseEnter={() => ChangeImage(index, item.coverimage)} onMouseLeave={() => setDefaultImage(index, item.posterimage)}
                className='hover:text-gray-600 xl:px-7 l:px-9 ll:px-9 lll:px-8 lx:px-8 lg:px-10 lg1:px-7 lg2:px-6 lg3:px-[26px] lg4:px-[29px] md:px-[26px] sm1:px-[10px] sm2:px-[7px] sm:px-[10px] m:px-[6px] s:px-[8px]'>
                  
                  <div className=' shadow-xl bg-gradient-to-tr from-gray-100 to-gray-200   xl:w-72  l:w-48 ll:w-48 lll:w-38 lx:w-48 lg:w-36 lg1:w-32 lg2:w-32 lg3:w-28 lg4:w-24 md:w-24 sm1:w-36 sm2:w-36 sm:w-32 m:w-32 s:w-28 hover:shadow-xl'
                   >
             
                    <img src={currentindex === index ? Slider : item.posterimage}

                      alt="" className='xl:w-full l:w-auto ll:w-auto lll:w-auto lx:w-[191px] lg:w-full lg1:w-full lg2:w-full lg3:w-full lg4:w-full md:w-full sm:w-full m:w-full s:w-full
                  xl:h-96 l:h-72 ll:h-72 lll:h-64 lx:h-56 lg:h-56 lg1:h-56 lg2:h-52 lg3:h-52  lg4:h-52 md:h-36 sm:h-36 m:h-36 s:h-32
                   '/>
                 
                  </div>
                  <div className=' py-1 flex justify-between  bg-white  '>
               <div>
               <h1 className='text-sm  lg:text-xl font-semibold text-gray-400 '>{item.brand}</h1>
                    <h1 className=' text-[12px] sm:text-md  w-24 xl:w-48 lg:w-36  h-6  overflow-hidden  ' >{item.title}</h1>

                    <h1 
                    className='text-[14px] sm:text-[16px] text-blue-500 font-semibold'>
                      ₹{item.regualarPrice - item.discountPrice}  
                      <span className='text-[10px] sm:text-sm line-through text-gray-400'>  {item.regualarPrice}</span>
                       <span className='text-green-500 text-[10px] lg:text-sm'> {Math.round(item.discountPrice /item.regualarPrice * 100)}%Off</span>
                       </h1>
               </div>
               <div>
                <RiHeartFill onClick={()=>addWishList(item._id)} className='text-gray-400 xl:text-2xl lg:text-2xl md:text-xl sm:text-md my-2 hover:text-red-500 transition-colors'/>
               </div>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button onClick={RigthScroll}><MdKeyboardArrowRight  style={{ fontSize: "28px", padding: "0", margin: "0" }} /></button>
      </div>
    </div>
  )
}


ScrollBars.propTypes = {
  items: PropTypes.array,
}