import { useRef, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { Signstart,SignSuccess,SignFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Signin() {
  const {loading,error} =useSelector((state)=>state.user);
  const username= useRef(null);
  const email = useRef(null);
  const password  = useRef(null);
  const address = useRef(null);
  const company = useRef(null);
  const vendor = useRef(null);
  const navigate = useNavigate();
  const [errorr,setError] = useState(false);
  
  const dispatch = useDispatch();


  async function handleSubmit(e){
    e.preventDefault();
    dispatch(Signstart())
    const formData = {
      sellername:username.current.value,
      company:company.current.value,
      email:email.current.value,
      vendor:vendor.current.value,
      address:address.current.value,
      password:password.current.value,
    }    

    try {
      
      const res = await axios.post("/vendor/createseller",formData);
      const data = res.data;
      dispatch(SignSuccess(data));
      navigate("/loginVendor")
    } catch (error) {
      dispatch(SignFailure(error.response.data.message))
      setError(true);
     
      
    }

  
  }

  return (
    <div className="flex bg-red-40 items-center md:justify-center  sm:justify-center m:justify-center s:justify-center p-3">
      <div className="w-5/6 flex flex-col gap-5 xl:block lg:block md:block sm:hidden m:hidden s:hidden" >
        <div className="text-center">
          <h1 className="font-bold text-3xl font-sans py-7">
            Start work with 
            <span className="text-red-300 "> Shophy</span>
            <span className="text-red-400">Book</span>
            </h1>
        </div>
        <div className="flex justify-center py-8">
        <img  
        src="/logo/vendorsignup.avif"
        className="w-8/12"
         alt="" 
         />
        </div>
      </div>
      <div className="w-5/6  flex flex-col justify-center items-center ">
        
        <div className="flex flex-col gap-4 p-5  rounded-xl">

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl font-sans py-5 self-center">Create Vendor Account</h1>
          <input type="text" 
          placeholder="Username"
          required
          className=" border border-gray-400 px-5 py-4 rounded-lg focus:outline-none "
          ref={username}
          />
          <input type="text" 
          placeholder="Company"
          required
          className=" border border-gray-400 px-5 py-4 rounded-lg focus:outline-none "
          ref={company}
          />
          <input type="text" 
          placeholder="Email"
          required
          className="border border-gray-400 px-5 py-4 rounded-lg focus:outline-none"
          ref={email}
          />
          <input type="text" 
          placeholder="Vendor Key"
          required
          className="border border-gray-400 px-5 py-4 rounded-lg focus:outline-none"
          ref={vendor}
          />
          <input type="text" 
          placeholder="Address"
          required
          className="border border-gray-400 px-5 py-4 rounded-lg focus:outline-none"
          ref={address}
          />
          <input type="text" 
          placeholder="Password"
          required
          className="border border-gray-400 px-5 py-4 rounded-lg focus:outline-none"
          ref={password}
          />
          <button type="submit"
          className="bg-red-400 p-3 rounded-lg text-white font-semibold  hover:opacity-80"
          >{loading ? "loading...": "Signup Vendor"}</button>
            <div >
          {errorr && 
          <p className="text-red-500 font-semibold">{error}</p>
          }
        </div>
        </form>
        
         <div className="p-3">
          <p>If you have a vendor account  
            <Link to='/loginvendor'>
            <span className="text-blue-500 mx-2"> 
             Login Vendor
            </span>
            </Link>
          </p>
          <p>User account  
            <Link to='/login'>
            <span className="text-blue-500 mx-2"> 
             Login
            </span>
            </Link>
          </p>
         </div>
        </div>
      
      </div>
    </div>
  )
}
