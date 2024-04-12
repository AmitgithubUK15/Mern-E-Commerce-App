import React, { useState } from 'react'
import ClotheType from '../components/ClotheType';
import app from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {useSelector,useDispatch} from 'react-redux'
import {productlistingStart,productlistingSuccess,productlistingFailure} from "../redux/user/userSlice"
import MobileProduct from '../components/MobileProduct';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function ProductListing() {
 const {currentUser,loading,error} = useSelector((state)=>state.user);
 const dispatch = useDispatch();
 const [Clothes,setClothes] = useState(false);
 const [Electronic,setElectronic] = useState(false);
 const [Male,setMale] = useState(false);
 const [Female,setFemale] = useState(false);
 const [Mobile,setMobile] = useState(false);
 const [Laptop,setLaptop] = useState(false);
 const [posterfile,setPosterfile] = useState([])
 const [coverfile,setCoverfile] = useState([]) 
 const [formData ,setFormData] = useState({
  posterImage:[],
  coverImage:[],
 });
 const navigate = useNavigate();
 const [errormessage,setErrorMsg] = useState(false);
 const [successmessage,setSuccessMsg] = useState(false); 
 const [posterButton,setposeterButton] = useState(false);
 const [coverButton,setcoverButton] = useState(false);
 const [postererror,setpostererror] = useState(false);
 const [covererror,setcovererror] = useState(false);
 const [showposterimage,setshowPoster] = useState(false);
 const [showcoverimage,setshowcover] = useState(false);
 const [globalError,setGlobalError] = useState(false);
 const [success,setSuccess] = useState();
 



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

 function handleDevice(e){
   if(e.target.value === "Mobile"){
    setMobile(true);
    setLaptop(false);
   }
   else if(e.target.value === "Laptop"){
    setLaptop(true);
    setMobile(false);
   }
   else{
    setMobile(false);
    setLaptop(false);
   }
 }
 function handleImagesubmit(){
  if(posterfile.length > 0 && posterfile.length + formData.posterImage.length <= 1){
    setposeterButton(true);
    const promise = [];

    for(let i =0; i<posterfile.length; i++){
      promise.push(storeImage(posterfile[i]));
    }
    Promise.all(promise).then((urls)=>{
      setFormData({...formData,posterImage:formData.posterImage.concat(urls)})
      setshowPoster(true)
      setposeterButton(false)  
      setpostererror(false);
    })
    .catch((err)=>{
      setErrorMsg(err.message)
      setpostererror(true)
      setposeterButton(false);
      setshowPoster(false)
    })
  }else{ 
    setpostererror(true);
    setposeterButton(true)
    setErrorMsg("Please select image")
    setposeterButton(false);
    setshowPoster(false);
   }
 }

 function handleCoverimagesubmit(){
  if(coverfile.length >0 && coverfile.length + formData.coverImage.length < 8){
    setcoverButton(true)
    const promise = [];

    for(let i =0; i<coverfile.length; i++){
      promise.push(storeImage(coverfile[i]));
    }
    Promise.all(promise).then((urls)=>{
      setFormData({...formData,coverImage:formData.coverImage.concat(urls)})
      setshowcover(true)
      setcoverButton(false)
      setcovererror(false);
    })
    .catch((err)=>{
      setErrorMsg(err.message)
      setcoverButton(false);
      setcovererror(true);
      setshowcover(false)
    })
  }
  else{
    setcovererror(true);
    setcoverButton(false);
    setErrorMsg("Please select image")
    setshowcover(false);
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
 
function deleteposterimage(index){
  setFormData({
    ...formData,
    posterImage:formData.posterImage.filter((_,i)=> i!==index)
  })
}

function deletecoverimage(index){
  setFormData({
    ...formData,
    coverImage:formData.coverImage.filter((_,i)=> i!==index)
  })
}

async function handleformsubmit(e){
  e.preventDefault();
  let form = e.target;
  let formdata = new FormData(form);
  let obj = Object.fromEntries(formdata.entries());
  dispatch(productlistingStart());
  try {
    if(obj.productType === "Clothes"){
      let jeansQuantity = Number(parseInt(obj.size30) + parseInt(obj.size32) + parseInt(obj.size34) + parseInt(obj.size36));
      let t_shirtQuantity = Number(parseInt(obj.sizeS) + parseInt(obj.sizeM) + parseInt(obj.sizeL) + parseInt(obj.sizeXL));
      let price = parseInt(obj.regularprice);
      let discountprice = parseInt(obj.discountPrice)
      
      if( isNaN(jeansQuantity) ? t_shirtQuantity > parseInt(obj.quantity) ||t_shirtQuantity < parseInt(obj.quantity): jeansQuantity > parseInt(obj.quantity) || jeansQuantity < parseInt(obj.quantity)){
        setGlobalError(true);
        setSuccessMsg(false);
        e.preventDefault();
        throw new Error("Sizes quantities should be equal All product quantities")
       
      }
      if(price < discountprice){
        setGlobalError(true);
        setSuccessMsg(false);
        throw new Error("Product Price must be Greathen discountprice")
      
      }
  
      let ClothingObj = {
        companyname: currentUser.company,
        regualarPrice: obj.regularprice,
        discountPrice: obj.discountPrice,
        productVarious:{
          ProductType:obj.productType,
           ClotheType:obj.clotheType,
           genders:obj.Gender,
           sizes:{
             sizeL:obj.sizeL,
             sizeM:obj.sizeM,
             sizeS:obj.sizeS,
             sizeXL:obj.sizeXL,
             size30:obj.size30,
             size32:obj.size32,
             size34:obj.size34,
             size36:obj.size36
           }
        },
        posterimage:formData.posterImage,
        coverimage:formData.coverImage,
        description:obj.description,
        sellerRef:currentUser._id,
        quantity:obj.quantity,
        title:obj.producttile,
        stock:true,
        brand:obj.brandname,
    }


    let res = await axios.post("/listing/addproduct",ClothingObj)
    
    if(res.success === false){
      dispatch(productlistingFailure());
      setGlobalError(true);
      console.log(res);
    }
    let result = res.data.msg;
    
    dispatch(productlistingSuccess());
    setSuccessMsg(true);
    setSuccess(result)

    navigate("/")
    setGlobalError(false);
  
    }
    
    else if(obj.productType === "Electronic"){
      let AsperRamQuantity = Number(parseInt(obj.ram6GB_128GB) + parseInt(obj.ram8GB_128GB) + parseInt(obj.ram8GB_256GB) +  parseInt(obj.ram12GB_256GB));
      
      let price = parseInt(obj.regularprice);
      let discountprice = parseInt(obj.discountPrice)
      
      if(AsperRamQuantity !== parseInt(obj.quantity) ) {
        setGlobalError(true);
        setSuccessMsg(false);
        throw new Error("RAM and ROM Quantity not matched")
      }
      if(AsperRamQuantity >obj.quantity ){
        setGlobalError(true);
        setSuccessMsg(false);
        throw new Error("please enter valid quantity")
      }
      if(price < discountprice){
        setGlobalError(true);
        setSuccessMsg(false);
        throw new Error("Discount price must be  lower then regular price")
      }
     
      let Mobileobj = {
        companyname:currentUser.company,
        regualarPrice:parseInt(obj.regularprice)-parseInt(obj.discountPrice),
        discountPrice:obj.discountPrice,
        productVarious:{
          ProductType:obj.productType,
          DeviceType:obj.deviceType,
          deviceName:obj.DeviceName,
          ModelName:obj.ModelName,
          Processor:obj.ProcessorName,
          OpreatingSystem:obj.OS,
          Batterytype:obj.batterytype,
          storage:{
            ram6_rom128:obj.ram6GB_128GB,
            ram8_rom128:obj.ram8GB_128GB,
            ram8_rom256:obj.ram8GB_256GB,
            ram12_rom256:obj.ram12GB_256GB,
          },
          DisplaySize:obj.displaySize,
          DisplayType:obj.displayType,
          Camera:{
            backSideCamera:{
              backside1:obj.backSide1,
              backside2:obj.backSide2,
              backside3:obj.backSide3,
              backside4:obj.backSide4
            },
            FrontCamera:obj.frontCamera
          },
         simSlot:obj.simSlots,
         Warranty:obj.warranty,
        },
        posterimage:formData.posterImage,
        coverimage:formData.coverImage,
        description:obj.description,
        sellerRef:currentUser._id,
        quantity:obj.quantity,
        title:obj.ModelName,
        stock:true,
      }

      let res = await axios.post("/listing/addproduct",Mobileobj)
    
     if(res.success === false){
      dispatch(productlistingFailure());
      setErrorMsg(res.message);
      setGlobalError(true);
      setSuccess(false);
     }
     
      let result = res.data.msg;
      
      dispatch(productlistingSuccess());

      setSuccessMsg(true);
      setSuccess(result);
      navigate("/")
      setGlobalError(false);
     
    }


    else{
      dispatch(productlistingFailure());
      setGlobalError(false);
      setSuccessMsg(false);
      console.log(null);
    }
    
  } catch (error) {
    dispatch(productlistingFailure());
    setGlobalError(true);
    setSuccessMsg(false);
    setErrorMsg(error.message);
  }
 }
 

  return (
    <div className='w-full'>
        <div className=' flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl' >Add Product for Selling</h1>
            </div>

            <div className='p-3 rounded-lg'>
              <form onSubmit={handleformsubmit}  className='flex flex-col gap-4'>

               <div className='flex flex-col gap-3'>
                 <label>Choose Product type</label>
                 <select onChange={HandlechangeSelect}
                 className='border p-3 outline-none rounded-lg' name='productType' required>
                  <option value="null">Choose type</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronic">Electronic</option>
                 </select>
               
               {Clothes && 
               <div className='flex flex-col gap-3'>
                  <label>Male / Female</label>
                  <select onChange={handle_he_she}
                 className='border p-3 outline-none rounded-lg' name='Gender' required>
                  <option  value="null">Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                 </select>

                {Female || Male ? (<ClotheType />):null}
               </div>
               }

               {Electronic && 
               <div className='flex flex-col gap-3'>
                  <label>Device</label>
                  <select onChange={handleDevice}
                 className='border p-3 outline-none rounded-lg' name='deviceType' required>
                  <option  value="null">Choose</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Laptop">Laptop</option>
                 </select>
              
                 {Mobile && <MobileProduct />}
               </div>
               }
               </div>
               <div className='flex flex-col gap-3'>

                {Clothes && 
                <div className='flex flex-col gap-3'>
                  <label >Brand Name</label>
                <input type="text" 
                name="brandname"
                className='border outline-none p-3 rounded-lg'
                required
                />
                </div>
                }
               {Clothes &&
               <div className='flex flex-col gap-3'>
                 <label >Product Title</label>
                <input type="text" 
                name='producttile'
                className='border outline-none p-3 rounded-lg' required
                />
               </div>
               }
                <label >Product Description</label>
                <textarea type="text" 
                name='description'
                minLength="10"
                maxLength="400"
                className='border outline-none p-3 rounded-lg' required
                />
                <label >Price</label>
                <input type="number" 
                name='regularprice'
                minLength="10"
                maxLength="70"
                defaultValue={0}
                className='appearance-none border outline-none p-3 rounded-lg' required
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
                className='appearance-none border outline-none p-3 rounded-lg' required
                />
               </div>

                <label>Upload Poster Image</label>
               <div className='flex  items-center'>

               <input onChange={(e)=>setPosterfile(e.target.files)} required
                type="file" accept='images/*' name='posterImage' multiple/>

               <button 
               onClick={handleImagesubmit} disabled={posterButton}
               type="button"
               className='border bg-gray-200 p-3 rounded-lg hover:bg-gray-300'>{posterButton === true? "Uploading..." : "Upload"}</button>
               </div>
                
                {showposterimage && <div >
                   {formData.posterImage.map((imgurl,index)=>(
                    <div key={index} className='flex justify-between item-center p-1 border rounded-lg '>
                     <div ><img src={imgurl} alt="" className='w-24 h-24'/></div>
                     <p className='font-semibold py-10 hover:underline'>{posterfile[0].name}</p>
                     <button onClick={()=>deleteposterimage(index)} className='text-red-500 px-2 font-semibold  hover:underline'>Delete</button>
                    </div>
                   ))}
                  </div>}
                {postererror && <p className='text-red-500'>{errormessage}</p>}


               <label htmlFor="">The first image will be the cover (max 5)</label>
               <div className='flex '>
               <input onChange={(e)=>setCoverfile(e.target.files)} required
               type="file" name='coverImage' accept='images/*' multiple/>   

               <button type='button' onClick={handleCoverimagesubmit} disabled={coverButton}
                className='border bg-gray-200 p-3 rounded-lg hover:bg-gray-300'>{coverButton ? "Uploading...":"Upload"}</button>             
               </div>
               {showcoverimage && <div  >
                   {formData.coverImage.map((imgurl,index)=>(
                    <div key={index} className='flex  justify-between my-2 item-center p-1 border rounded-lg'>
                     <div><img src={imgurl} alt="" className='w-24 h-24'/></div>
                     <p className='font-semibold py-10 hover:underline'>{coverfile[index].name}</p>
                     <button onClick={()=>deletecoverimage(index)} className='text-red-500 px-2 font-semibold  hover:underline'>Delete</button>
                    </div>
                   ))}
                  </div>}
               {covererror && <p className='text-red-500'>{errormessage}</p>}
               <button type='submit' disabled={loading}
               className='bg-slate-700 text-white p-2 rounded-lg font-semibold my-2'
               >{loading ? "Product Creating...":"Create Product"}</button>
              </form>
            </div>

            <div>
              {globalError === true && <p className='text-red-500 font-semibold'>{errormessage}</p>}
              {successmessage === true && <p className='text-green-500 font-semibold text-center'>{success}</p>}
            </div>
        </div>
    </div>
  )
}
