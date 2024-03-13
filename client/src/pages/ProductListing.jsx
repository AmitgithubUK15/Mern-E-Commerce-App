import React, { useState } from 'react'
import ClotheType from '../components/ClotheType';

export default function ProductListing() {
 const [Clothes,setClothes] = useState(false);
 const [Electronic,setElectronic] = useState(false);
 const [Male,setMale] = useState(false);
 const [Female,setFemale] = useState(false);


 

 function HandlechangeSelect(e){
  if(e.target.value==='Clothes'){
    setClothes(true);
    setElectronic(false)
  }
  else if(e.target.value === "Electronic"){
    setClothes(false);
    setElectronic(true);
  }
  else{
    setClothes(false);
    setElectronic(false);
  }
 }

 function handle_he_she(e){
  if(e.target.value==='Male'){
    setMale(true);
    setFemale(false)
  }
  else if(e.target.value === 'Female'){
    setMale(false);
    setFemale(true);
  }
  else {
    setMale(false)
    setFemale(false);
  }
  
 }

  return (
    <div className='w-full'>
        <div className=' flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl ' >Add Product for Selling</h1>
            </div>

            <div className='border p-3 rounded-lg shadow-lg'>
              <form className='flex flex-col gap-4'>

               <div className='flex flex-col gap-3'>
                 <label>Choose Product type</label>
                 <select onChange={HandlechangeSelect}
                 className='border p-3 outline-none rounded-lg' name="" id="">
                  <option value="null">Choose type</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronic">Electronic</option>
                 </select>
               
               {Clothes && 
               <div className='flex flex-col gap-3'>
                  <label>Male / Female</label>
                  <select onChange={handle_he_she}
                 className='border p-3 outline-none rounded-lg' name="" id="">
                  <option value="null">Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                 </select>

                {Female || Male ? (<ClotheType />):null}
               </div>
               }
               </div>
               <div className='flex flex-col gap-3'>
                <label >Brand Name</label>
                <input type="text" 
                className='border outline-none p-3 rounded-lg'
                />
                <label >Product Title</label>
                <input type="text" 
                className='border outline-none p-3 rounded-lg'
                />
                <label >Product Description</label>
                <textarea type="text" 
                minLength="10"
                maxLength="70"
                className='border outline-none p-3 rounded-lg'
                />
                <label >Price</label>
                <input type="number" 
                minLength="10"
                maxLength="70"
                defaultValue={0}
                className='appearance-none border outline-none p-3 rounded-lg'
                />
                <label>Offers</label>
                <div className='flex gap-2 border p-3 rounded-lg'>
                  
                  <input type="checkbox" />
                  <label >Offer</label>
                </div>
                <label >Discount Price</label>
                <input type="number" 
                minLength="10"
                maxLength="70"
                defaultValue={0}
                className='appearance-none border outline-none p-3 rounded-lg'
                />
                <label >Product Quantity</label>
                <input type="number" 
                minLength="10"
                maxLength="70"
                defaultValue={0}
                className='appearance-none border outline-none p-3 rounded-lg'
                />
               </div>

               <label htmlFor="">Upload Poster Image</label>
               <input type="file" />

               <div className='flex flex-col gap-3'>
               <label htmlFor="">The first image will be the cover (max 5)</label>
               <input type="file" />                
               </div>

               <button 
               className='bg-slate-700 text-white p-2 rounded-lg font-semibold my-2'
               >Create Product</button>
              </form>
            </div>
        </div>
    </div>
  )
}
