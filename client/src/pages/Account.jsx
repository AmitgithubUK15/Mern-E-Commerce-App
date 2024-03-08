
import {useSelector} from 'react-redux'
import {Link, useNavigate} from "react-router-dom"


export default function Account() {
 
  const {currentUser} = useSelector((state)=> state.user);
  const navigate = useNavigate() 

  if(currentUser === null){
    return  navigate("/login")
    
  }

  return (
    <div className='w-full h-full flex justify-center items-center '>
      <div className='flex flex-col w-full sm:w-3/5 m '>

        <div className='w-full text-start gap-4 border-b'>
          <h1 className='p-7 sm:py-5'>
            <span className='font-bold block text-2xl'>Account</span>
            <span>{currentUser.username}</span>
          </h1>
        </div> 

        <div className='flex '>
          <div className='w-64 border-r border-t xl:block lg:block md:block sm:hidden m:hidden s:hidden'>
            <div className='p-7'>
              <div className='py-7 border-b text-gray-500 cursor-pointer'>
                Overview
              </div>
              <div className='py-7 border-b text-gray-500 cursor-pointer'>
                Orders
              </div>
              <div className='py-7 border-b text-gray-500 cursor-pointer'>
                Profile
              </div>
              <div className='py-7 border-b text-gray-500 cursor-pointer'>
                Saved Cards
              </div>
            </div>
          </div>

          <div className='w-full border flex  justify-center m-3 p-5'>
            <div className='w-3/4 '>
                <h1 className='p-4 border-b text-slate-700 font-bold text-xl'>Profile Details</h1>
               
                <div className='w-full'>
               <div className='flex py-5'>
                <p className=' w-1/2 text-left py-1 text-slate-800'>Name</p>
                <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.username}</p>
               </div>
               <div className='flex py-5'>
                <p className=' w-1/2 text-left py-1 text-slate-800'>Email Id</p>
                <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.email}</p>
               </div>
               <div className='flex py-5'>
                <p className=' w-1/2 text-left py-1 text-slate-800'>Mobile Number</p>
                <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.phone}</p>
               </div>
               <div className='flex py-5'>
                <p className=' w-1/2 text-left py-1 text-slate-800'>Gender</p>
                <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.gender ? "Gender": "-Not Added-"}</p>
               </div>
               <div className='flex py-5'>
                <p className=' w-1/2 text-left py-1 text-slate-800'>Location</p>
                <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.Loaction ? "Gender": "-Not Added-"}</p>
               </div>
               <div className='flex py-5'>
                <p className=' w-1/2 text-left py-1 text-slate-800'>Date Of Birth</p>
                <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.DOB ? "DOB":"-Not Added-"}</p>
               </div>

              <Link to="/updateProfile">
               <button  
          className="bg-red-400 block w-3/4 p-3 mx-auto my-2 rounded-lg text-white font-semibold  hover:opacity-80"
          >Edit</button>
              </Link>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}
