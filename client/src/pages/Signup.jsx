import { Link } from "react-router-dom";


export default function Signin() {
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
        <form action="" className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl font-sans py-5 self-center">Sign Up</h1>
          <input type="text" 
          placeholder="Username"
          className=" border px-5 py-4 rounded-lg focus:outline-none "
          />
          <input type="text" 
          placeholder="Email"
          className="border px-5 py-4 rounded-lg focus:outline-none"
          />
          <input type="text" 
          placeholder="Phone"
          className="border px-5 py-4 rounded-lg focus:outline-none"
          />
          <input type="text" 
          placeholder="Password"
          className="border px-5 py-4 rounded-lg focus:outline-none"
          />
          <button type="submit"
          className="bg-red-400 p-3 rounded-lg text-white font-semibold"
          >Signup</button>
        </form>
         <div className="p-3">
          <p>If you have a account  
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
