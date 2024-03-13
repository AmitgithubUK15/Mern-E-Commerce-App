import React, { useState } from 'react'

export default function ClotheType() {
    const [jeans,setJeans] = useState(false)
    const [Tshirt,setTshirt] = useState(false)

  function handleClothe(e){
    if(e.target.value === "Jeans"){
        setJeans(true);
        setTshirt(false);
    }
    else if(e.target.value === "T-Shirt"){
        setJeans(false);
        setTshirt(true);
    }
    else if(e.target.value === "Hoodies"){
      setJeans(false);
      setTshirt(true);
  }
    else{
        setJeans(false);
        setTshirt(false);
    }
  }

  return (   
    <div className='flex flex-col gap-3'>
    <label>Choose Clothe type</label>
    <select onChange={handleClothe}
   className='border p-3 outline-none rounded-lg' name="item" id="">
    <option value="null">Choose</option>
    <option value="Jeans">Jeans</option>
    <option value="T-Shirt">T-Shirt</option>
    <option value="Hoodies">Hoodies</option>
   </select>
   
   {Tshirt && 
   <div className='flex flex-col gap-3'>
   <label>Select Sizes</label>
  <div className='flex gap-8'>
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2 items-center'>
       <label className='text-sm'> Size S</label>
       <input type="number" placeholder='S Quantity' name="x" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
   </div>
      <div className='flex gap-2 items-center'>
       <label className='text-sm'> Size M</label>
       <input type="number" placeholder='M Quantity' name="m" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
   </div>
    </div>
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2 items-center'>
       <label className='text-sm'> Size L</label>
       <input type="number" placeholder='L Quantity' name="l" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
   </div>
      <div className='flex gap-2 items-center'>
       <label className='text-sm'> Size XL</label>
       <input type="number" placeholder='XL Quantity' name="xl" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
   </div>
    </div>
  </div>
  </div>
   }

   {jeans && 
    <div className='flex flex-col gap-3'>
    <label>Select Sizes</label>
   <div className='flex gap-8'>
     <div className='flex flex-col gap-3'>
       <div className='flex gap-2 items-center'>
        <label> Size 30</label>
        <input type="number" placeholder='Quantity' name="size_S" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
    </div>

       <div className='flex gap-2 items-center'>
        <label> Size 32</label>
        <input type="number" placeholder='Quantity' name="size_m" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
    </div>
     </div>
     <div className='flex flex-col gap-3'>
       <div className='flex gap-2 items-center'>
        <label> Size 34</label>
        <input type="number" placeholder='Quantity' name="size_L" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
    </div>
       <div className='flex gap-2 items-center'>
        <label> Size 36</label>
        <input type="number" placeholder='Quantity' name="size_xL" className='border w-24 sm:w-full outline-none p-3 rounded-lg'/>
    </div>
     </div>
   </div>
   </div>
   }
 </div>
  )
}
