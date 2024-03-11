import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useRef, useState } from "react";
import { SignSuccess,SignFailure, signoutUserFailure, signoutUserSuccess} from "../redux/user/userSlice";
import { useDispatch, useSelector,  } from "react-redux";
import OAuth from "../components/OAuth";

export default function Vendor() {

  const email = useRef(null);
  const password = useRef(null);
  const {error} = useSelector((state) => state.user)
  const {loading} = useSelector((state)=>state.user)
  const [errorvisible ,setErrorVisible] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  async function handleSubmit(e){
    setErrorVisible(false)
    e.preventDefault();
    const formData = {
      email:email.current.value,
      password:password.current.value,
    }    

    try {
      const res = await axios.post("/vendor/loginvendor",formData);
      const data = res.data;
      dispatch(SignSuccess(data))
      
      navigate("/")
      
    } catch (error) {
      dispatch(SignFailure(error.response.data.message))
   
      setErrorVisible(true)
    }

  
  }



  return (
    <div className="flex bg-red-40 items-center md:justify-center  sm:justify-center m:justify-center s:justify-center">
      <div className="w-5/6 flex flex-col gap-5 xl:block lg:block md:block sm:hidden m:hidden s:hidden" >
        <div className="text-center">
          <h1 className="font-bold text-3xl font-sans py-5">
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
        <h1 className="font-bold text-3xl font-sans py-5 self-center">Login Vendor</h1>
          <input type="text" 
          placeholder="Email"
          className=" border px-5 py-4 rounded-lg focus:outline-none "
          ref={email}
          required
          />
          <input type="text" 
          placeholder="Password"
          className="border px-5 py-4 rounded-lg focus:outline-none"
          ref={password}
          required
          />
          <button type="submit"
          className="bg-red-400 font-semibold p-3 rounded-lg text-white hover:opacity-80"
          >Login Vendor</button>
     
        </form>
         <div className="p-3">
          <p > 
          If you have a user account
            <Link to='/login'>
            <span className="text-blue-500 mx-2 "> 
             Login
            </span>
            </Link>
          </p>
          <p className="py-2 text-left">   
            <Link to='/signupVendor'>
            <span className="text-blue-500 pr-1 "> 
             Create 
            </span>
            </Link>

              Vendor account
          </p>
         </div>
        </div>
        <div>
          {errorvisible && 
          <p className="text-red-500 font-semibold">{error}</p>
          }
        </div>
      </div>
    </div>
  )
}
