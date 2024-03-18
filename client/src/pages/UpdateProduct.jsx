import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { userUpdateStart, userUpdateSuccess, userUpdateFailure, productList } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClotheType from '../components/ClotheType';

export default function UpdateProfile() {
    const { productid } = useParams()
    const [productdetails, setProductDetails] = useState();
    const { currentUser, error, loading, sellerproductlist } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false)
    const [errormsg, setErrorMsg] = useState("")



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
                    }
                }
                let res = await axios.post(`/listing/updateProduct/${productdetails._id}/${currentUser._id}`, jeansData);
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
                    }
                }
              
                let res = await axios.post(`/listing/updateProduct/${productdetails._id}/${currentUser._id}`, otherclothe);
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
