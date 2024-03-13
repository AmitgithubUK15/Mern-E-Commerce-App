import React, { useState } from 'react'
import ClotheType from '../components/ClotheType';
import app from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

export default function ProductListing() {
 const [Clothes,setClothes] = useState(false);
 const [Electronic,setElectronic] = useState(false);
 const [Male,setMale] = useState(false);
 const [Female,setFemale] = useState(false);
 const [posterfile,setPosterfile] = useState([])
 const [coverfile,setCoverfile] = useState([]) 
 const [formData ,setFormData] = useState({
  posterimage:[],
  coverimage:[],
 })
 

 console.log(formData);

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

 function handleImagesubmit(){
  if(posterfile.length > 0 && posterfile.length + formData.posterimage.length <= 1){
     
    const promise = [];

    for(let i =0; i<posterfile.length; i++){
      promise.push(storeImage(posterfile[i]));
    }
    Promise.all(promise).then((urls)=>{
      setFormData({...formData,posterimage:formData.posterimage.concat(urls)})
    })
    .catch((err)=>{
        console.log(err);
    })
  }else{ 
    console.log("image not upload")
  }
 }

 function handleCoverimagesubmit(){
  if(coverfile.length >0 && coverfile.length + formData.coverimage.length < 5){
    const promise = [];

    for(let i =0; i<coverfile.length; i++){
      promise.push(storeImage(coverfile[i]));
    }
    Promise.all(promise).then((urls)=>{
      setFormData({...formData,coverimage:formData.coverimage.concat(urls)})
    })
    .catch((err)=>{
      console.log(err);
    })
  }
 }
 async function storeImage(file){
  return new Promise((resole,reject)=>{
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on(
      "state_changed",
      (snapshot)=>{
       const progress  = (snapshot.bytesTransferred / snapshot.totalBytes ) *100
      console.log(`upload is ${progress} done`)
      },
      (error)=>{
      reject(error);
      },
      ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        resole(downloadURL)
      })
      },
    )
  })
 }

//  function handleformsubmit(e){
//   e.preventDefault();
//   let form = e.target;
//   let formData = new FormData(form);
//   let obj = Object.fromEntries(formData.entries());

//   console.log(obj);
//  }

  return (
    <div className='w-full'>
        <div className=' flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl' >Add Product for Selling</h1>
            </div>

            <div className='p-3 rounded-lg'>
              <form  className='flex flex-col gap-4'>

               <div className='flex flex-col gap-3'>
                 <label>Choose Product type</label>
                 <select onChange={HandlechangeSelect}
                 className='border p-3 outline-none rounded-lg' name="Producttype" id="">
                  <option value="null">Choose type</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronic">Electronic</option>
                 </select>
               
               {Clothes && 
               <div className='flex flex-col gap-3'>
                  <label>Male / Female</label>
                  <select onChange={handle_he_she}
                 className='border p-3 outline-none rounded-lg' name="genders" id="">
                  <option  value="null">Choose</option>
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
                name="brandname"
                className='border outline-none p-3 rounded-lg'
                />
                <label >Product Title</label>
                <input type="text" 
                name='producttile'
                className='border outline-none p-3 rounded-lg'
                />
                <label >Product Description</label>
                <textarea type="text" 
                name='description'
                minLength="10"
                maxLength="70"
                className='border outline-none p-3 rounded-lg'
                />
                <label >Price</label>
                <input type="number" 
                name='price'
                minLength="10"
                maxLength="70"
                defaultValue={0}
                className='appearance-none border outline-none p-3 rounded-lg'
                />
                {/* <label>Offers</label>
                <div className='flex gap-2 border p-3 rounded-lg'>
                  
                  <input type="checkbox" value="Offer" name='offer'/>
                  <label >Offer</label>
                </div> */}
                <label >Discount Price</label>
                <input type="number"
                name='discountPrice' 
                minLength="10"
                maxLength="70"
                defaultValue={0}
                className='appearance-none border outline-none p-3 rounded-lg'
                />
                <label >Product Quantity</label>
                <input type="number" 
                name='quantity'
                minLength="10"
                maxLength="70"
                defaultValue={0}
                className='appearance-none border outline-none p-3 rounded-lg'
                />
               </div>

                <label htmlFor="">Upload Poster Image</label>
               <div className='flex  items-center'>

               <input onChange={(e)=>setPosterfile(e.target.files)}
                type="file" accept='images/*' name='posterImage' multiple/>

               <button onClick={handleImagesubmit}
               type="button"
               className='border bg-gray-200 p-3 rounded-lg hover:bg-gray-300'>Upload</button>
               </div>

               <label htmlFor="">The first image will be the cover (max 5)</label>
               <div className='flex '>
               <input onChange={(e)=>setCoverfile(e.target.files)}
               type="file" name='coverImage' accept='images/*' multiple/>   

               <button type='button' onClick={handleCoverimagesubmit}
                className='border bg-gray-200 p-3 rounded-lg hover:bg-gray-300'>Upload</button>             
               </div>

               <button type='submit'
               className='bg-slate-700 text-white p-2 rounded-lg font-semibold my-2'
               >Create Product</button>
              </form>
            </div>
        </div>
    </div>
  )
}
