import PropTypes from 'prop-types';
import  {  useRef, useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function ScrollBars({items}) {
  
  const [Slider,setSlider] =useState();
  const [currentindex,setCurrentIndex] = useState();
  const scrollbar = useRef();


  function ChangeImage(index,images){
      setCurrentIndex(index);
      setSlider(images[0])
  }

  function setDefaultImage(index,images){
    setCurrentIndex(index);
    setSlider(images);
  }


  function LeftScroll(){
    scrollbar.current.scrollLeft = scrollbar.current.scrollLeft - 350*4;
  }
 
  function RigthScroll(){
    scrollbar.current.scrollLeft = scrollbar.current.scrollLeft + 350*4;
  }
  return (
    <div className='flex flex-col gap-8 '>
        <div className='text-3xl text-slate-700 py-5 text-center'>Most Popular T-shirt</div>
         <div className='mx-12 flex justify-between'>
          <button onClick={LeftScroll}><MdKeyboardArrowLeft style={{ fontSize: "28px", padding: "0", margin: "0" }} /></button>
         <div className='overflow-x-scroll overflow-y-hidden mx-5'  ref={scrollbar}
          style={{scrollbarWidth:"none"}} >
         <ul  
          className='flex gap-14 px-2  h-[510px]'>
            {items && items.map((item,index)=>(

               <li key={index} 
               className=' flex flex-col justify-between mx-auto bg-gradient-to-tr from-gray-100 to-gray-200 h-[500px]  border border-gray-400 cursor-pointer'>
               
                 <div className=' w-72 ' onMouseEnter={()=>ChangeImage(index,item.coverimage)} onMouseLeave={()=>setDefaultImage(index,item.posterimage)}>
                  <img  src={currentindex === index ? Slider : item.posterimage} 
                  
                  alt="" className='w-full h-96 object-fit transition-all'/>
                  </div>
                 <div className='p-2 bg-white  '>
                   <h1 className='text-xl font-semibold text-gray-400'>{item.brand}</h1>
                   <h1 className='text-sm '>{item.title}</h1>
                   <h1 className='text-xl text-blue-500 font-semibold'>₹{item.regualarPrice}</h1>
                 </div>
               </li>
            ))}
          </ul>
         </div>
          <button onClick={RigthScroll}><MdKeyboardArrowRight style={{ fontSize: "28px", padding: "0", margin: "0" }} /></button>
         </div>
    </div>
  )
}


ScrollBars.propTypes ={
  items:PropTypes.array,
}