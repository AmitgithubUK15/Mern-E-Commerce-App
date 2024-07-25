import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { userUpdateStart, userUpdateSuccess, userUpdateFailure, productList } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClotheType from '../components/ClotheType';
import app from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

export default function UpdateProfile() {
    const { productid } = useParams()
    const [productdetails, setProductDetails] = useState();
    const { currentUser, error, loading, sellerproductlist } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false)
    const [errormsg, setErrorMssg] = useState("")
    const [posterButton,setposeterButton] = useState(false);
    const [errormessage,setErrorMsg] = useState(false);
    const [coverButton,setcoverButton] = useState(false);
    const [postererror,setpostererror] = useState(false);
    const [covererror,setcovererror] = useState(false);
    const [posterfile,setPosterfile] = useState([])
    const [coverfile,setCoverfile] = useState([])
    const [formData ,setFormData] = useState({
        posterImage:[],
        coverImage:[],
       });


    
     
    function handleImagesubmit(){
        if(posterfile.length > 0 && posterfile.length + formData.posterImage.length <= 1){
          setposeterButton(true);
          const promise = [];
      
          for(let i =0; i<posterfile.length; i++){
            promise.push(storeImage(posterfile[i]));
          }
          Promise.all(promise).then((urls)=>{
            setFormData({...formData,posterImage:formData.posterImage.concat(urls)})
          
            setposeterButton(false)  
            setpostererror(false);
          })
          .catch((err)=>{
            setErrorMsg(err.message)
            setpostererror(true)
            setposeterButton(false);
         
          })
        }else{ 
          setpostererror(true);
          setposeterButton(true)
          setErrorMssg("Please select image")
          setposeterButton(false);
         
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
            setcoverButton(false)
            setcovererror(false)
          })
          .catch((err)=>{
            setErrorMssg(err.message)
            setcoverButton(false);
            setcovererror(true);

          })
        }
        else{
          setcovererror(true);
          setcoverButton(false);
          setErrorMsg("Please select image")
   
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
       
       
     async function handleUpdate(e) {
        e.preventDefault();

        let form = e.target;
        let formdata = new FormData(form);
        let fromobj = Object.fromEntries(formdata.entries());

      
        try {
            dispatch(userUpdateStart())

            if (fromobj.clotheType === "Jeans") {
                let jeansData = {
                    regualarPrice: fromobj.price,
                    discountPrice: fromobj.discount,
                    productVarious: {
                        ProductType:fromobj.productType,
                        ClotheType:fromobj.clotheType,
                        genders:fromobj.Gender,
                        sizes:{
                            size28:fromobj.size28,
                            size30:fromobj.size30,
                            size32:fromobj.size32,
                            size34:fromobj.size34,
                          }
                    },
                    posterimage:formData.posterImage,
                    coverimage:formData.coverImage
                }
                let res = await axios.post(`https://shopybookapi.onrender.com/listing/updateProduct/${productdetails._id}/${currentUser._id}`, jeansData);
                let data = res.data;
                dispatch(productList(data))

                setUpdate(true)
            }
            else {
                let otherclothe = {
                    regualarPrice: fromobj.price,
                    discountPrice: fromobj.discount,
                    productVarious: {
                        ProductType:fromobj.productType,
                        ClotheType:fromobj.clotheType,
                        genders:fromobj.Gender,
                        sizes:{
                            sizeL:fromobj.sizeL,
                            sizeM:fromobj.sizeM,
                            sizeS:fromobj.sizeS,
                            sizeXL:fromobj.sizeXL,
                          }
                    },
                    posterimage:formData.posterImage,
                    coverimage:formData.coverImage
                }
              
                let res = await axios.post(`https://shopybookapi.onrender.com/listing/updateProduct/${productdetails._id}/${currentUser._id}`, otherclothe);
                let data = res.data;
                dispatch(productList(data))
                
                setUpdate(true)
            }

        } catch (error) {
            setErrorMsg(error.response.data.message)
            dispatch(userUpdateFailure())
            setUpdate(false)

        }
     }

    useEffect(() => {
        for (let i in sellerproductlist) {
            if (productid === sellerproductlist[i]._id) {
                setProductDetails(sellerproductlist[i])
                setFormData({...formData,posterImage:sellerproductlist[i].posterimage,coverImage:sellerproductlist[i].coverimage}) 
                break;
            }
            else {
                continue;
            }
            // console.log(sellerproductlist[i])
          
        }
    
        
    }, [productid])



   

    return (
        <div className="flex flex-col justify-center items-center" >
            <div className=" flex flex-col justify-center gap-3" >
                <h1 className='text-2xl  self-center font-bold w-80 sm:w-96 m:w-80 s:w-64 pt-7 pb-1 border-b  border-red-500'>Update Product Details</h1>



                <div className="py-5 w-80 sm:w-96 m:w-96 s:w-72 self-start sm:self-center m:self-center s:self-center">
                    <form onSubmit={handleUpdate} className="flex flex-col gap-4 text-sm font-sans">
                        <label className="text-slate-800 font-semibold">Product Type</label>
                        <input  type="text" name="productType" defaultValue={productdetails && productdetails.productVarious.ProductType} className=" border-b bg-transparent outline-none" />

                        {currentUser.type === "Seller" ? (<div className='flex flex-col gap-2'>
                            <label className="text-slate-800 font-semibold">Male /Female</label>
                            <input  type="text" name="Gender" defaultValue={productdetails && productdetails.productVarious.genders} className=" border-b bg-transparent outline-none" />
                        </div>) : null
                        }

                        <label className="text-slate-800 font-semibold">Clothe Type</label>
                        <input  name="clotheType" type="text" defaultValue={productdetails && productdetails.productVarious.ClotheType} className=" border-b bg-transparent  outline-none" />


                        <label className="text-slate-800 font-semibold">Enter quantities as per size</label>

                        {productdetails && productdetails.productVarious.ClotheType === "Hoodies" || productdetails && productdetails.productVarious.ClotheType === "T-Shirt" ?
                            (
                                <div className='flex gap-8'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex gap-2 items-center'>
                                            <label className='text-sm'> Size S</label>
                                            <input type="number" placeholder='S Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.sizeS} name="sizeS" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <label className='text-sm'> Size M</label>
                                            <input type="number" placeholder='M Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.sizeM} name="sizeM" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex gap-2 items-center'>
                                            <label className='text-sm'> Size L</label>
                                            <input type="number" placeholder='L Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.sizeL} name="sizeL" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <label className='text-sm'> Size XL</label>
                                            <input type="number" placeholder='XL Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.sizeL} name="sizeXL" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                        </div>
                                    </div>
                                </div>
                            )
                            : null
                        }

                        {productdetails && productdetails.productVarious.ClotheType === "Jeans" ?
                            (<div className='flex gap-8'>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-2 items-center'>
                                        <label> Size 30</label>
                                        <input type="number" placeholder='Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.size28} name="size30" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                    </div>

                                    <div className='flex gap-2 items-center'>
                                        <label> Size 32</label>
                                        <input type="number" placeholder='Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.size32} name="size32" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-2 items-center'>
                                        <label> Size 34</label>
                                        <input type="number" placeholder='Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.size34} name="size34" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <label> Size 36</label>
                                        <input type="number" placeholder='Quantity' defaultValue={productdetails && productdetails.productVarious.sizes.size36} name="size36" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                                    </div>
                                </div>
                            </div>)
                            : null
                        }

                        <label className="text-slate-800 font-semibold">Product Title</label>
                        <input type="text" name="title" defaultValue={productdetails && productdetails.title} className=" border-b border-slate-400 outline-none" />
                        <label className="text-slate-800 font-semibold">Price</label>
                        <input type="text" name="price" defaultValue={productdetails && productdetails.regualarPrice} className=" border-b border-slate-400 outline-none" />
                        <label className="text-slate-800 font-semibold">Discount</label>
                        <input type="text" name="discount" defaultValue={productdetails && productdetails.discountPrice} className=" border-b border-slate-400 outline-none" />

                         
                         <label className="text-slate-800 font-semibold">Poster Image</label>
                        <div className='flex  items-center'>

                            <input onChange={(e)=>setPosterfile(e.target.files)} 
                                type="file" accept='images/*' name='posterImage' multiple />

                            <button onClick={handleImagesubmit} disabled={posterButton}
                                className='border bg-gray-200 p-3 rounded-lg hover:bg-gray-300'>{posterButton === true ? "Uploading..." : "Upload"}</button>
                        </div>

                         <div >
                            { formData&& formData.posterImage.map((imgurl, index) => (
                                <div key={index} className='flex justify-between item-center p-1 border rounded-lg '>
                                    <div ><img src={imgurl} alt="" className='w-24 h-24' /></div>
                                    {/* <p className='font-semibold py-10 hover:underline'>{imgurl[0].name}</p> */}
                                    <button  className='text-red-500 px-2 font-semibold  hover:underline'>Delete</button>
                                </div>
                            ))}
                        </div>
                        {postererror && <p className='text-red-500'>{errormessage}</p>}


                        <label className="text-slate-800 font-semibold">Cover Image</label>
                        <div className='flex  items-center'>

                            <input onChange={(e)=>setCoverfile(e.target.files)}
                                type="file" accept='images/*' name='posterImage' multiple />

                            <button  type="button" onClick={handleCoverimagesubmit}
                                className='border bg-gray-200 p-3 rounded-lg hover:bg-gray-300'>{coverButton === true ? "Uploading..." : "Upload"}</button>
                        </div>

                         <div >
                            { formData&& formData.coverImage.map((imgurl, index) => (
                                <div key={index} className='flex justify-between item-center p-1 border rounded-lg '>
                                    <div ><img src={imgurl} alt="" className='w-24 h-24' /></div>
                                    {/* <p className='font-semibold py-10 hover:underline'>{imgurl[0].name}</p> */}
                                    <button  className='text-red-500 px-2 font-semibold  hover:underline'>Delete</button>
                                </div>
                            ))}
                        </div>
                        {covererror && <p className='text-red-500'>{errormessage}</p>}


                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-green-700 mt-3 font-semibold p-3 rounded-lg text-white hover:opacity-80"
                        >
                            {loading ? "Updateing..." : "Update Profile"} </button>
                    </form>
                </div>

                <div className='text-center p-3'>
                    {!update && <p className='text-red-500 font-semibold'>{errormsg}</p>}
                    {update && <p className='text-green-500 font-semibold'>Profile Update Successfully</p>}

                </div>
            </div>
        </div>
    )
}
