import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useRef, useState } from "react";
import { SignSuccess,SignFailure, signoutUserFailure, signoutUserSuccess} from "../redux/user/userSlice";
import { useDispatch, useSelector,  } from "react-redux";
import OAuth from "../components/OAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Signin() {

  const email = useRef(null);
  const password = useRef(null);
  const {error} = useSelector((state) => state.user)
  const {loading} = useSelector((state)=>state.user)
  const [errorvisible ,setErrorVisible] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Showpassword,setShowPassword] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    const formData = {
      email:email.current.value,
      password:password.current.value,
    }    

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`,formData);
      const data = res.data;
      dispatch(SignSuccess(data))
      
      navigate("/")
      
    } catch (error) {
      dispatch(SignFailure(error.response.data.message))
   
      setErrorVisible(true)
    }

  
  }


  function showPassword(){
     setShowPassword(true);
  }

  function hidePassword(){
    setShowPassword(false);
  }

  return (
    <div className="flex bg-red-40 items-center md:justify-center  sm:justify-center m:justify-center s:justify-center">
      <div className="w-5/6 flex flex-col gap-5 xl:block lg:block md:block sm:hidden m:hidden s:hidden" >
        <div className="text-center">
          <h1 className="font-bold text-3xl font-sans py-5">
            Welcome to the world
            <span className="text-red-300 "> Shophy</span>
            <span className="text-red-400">Book</span>
            </h1>
        </div>
        <div className="flex justify-center py-8">
        <img  
        src="https://images.bewakoof.com/web/group-19-1617704502.png"
        className="w-5/6 "
         alt="" 
         />
        </div>
      </div>
      <div className="w-5/6  flex flex-col justify-center items-center ">
        
        <div className="flex flex-col gap-4 p-5  rounded-xl">

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl font-sans py-5 self-center">Login</h1>
          <input type="text" 
          placeholder="Email"
          className=" border px-5 py-4 rounded-lg focus:outline-none "
          ref={email}
          />
          <div className="flex border rounded-lg">
          <input type={Showpassword === true ? "text" : "password"} 
          placeholder="Password"
          className=" px-5 py-4 rounded-lg focus:outline-none"
          ref={password}
          />
           <div className="mx-auto my-3" onMouseEnter={showPassword} onMouseLeave={hidePassword}>
           <FontAwesomeIcon  icon={Showpassword ? faEyeSlash : faEye} />
           </div>
          </div>
          <button type="submit"
          className="bg-red-400 font-semibold p-3 rounded-lg text-white hover:opacity-80"
          >Login</button>
     
          <OAuth />
        </form>
         <div className="p-3">
          <p >If you dont have a account  
            <Link to='/signup'>
            <span className="text-blue-500 mx-2 "> 
             Signup
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
