import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function ProfileDetails() {
    const {currentUser}  = useSelector((state)=>state.user);
  return (
    <div className='w-3/4 '>
    <h1 className='p-4 border-b text-slate-700 font-bold text-xl'>Profile Details</h1>
   
    <div className='w-full'>
   <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Name</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.type === "Seller" ? currentUser.sellername : currentUser.username}</p>
   </div>

   {
    currentUser.type === "Seller" ? 
    (  <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Company Name</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.company}</p>
   </div>)
   :
   null
   }  
   <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Email Id</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.email}</p>
   </div>
   <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Mobile Number</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{ currentUser.phone ? currentUser.phone : "-Not Added-"}</p>
   </div>
   <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Gender</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.gender ? currentUser.gender: "-Not Added-"}</p>
   </div>
   <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Location</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.address ? currentUser.address : "-Not Added-"}</p>
   </div>

   {
    currentUser.type === "Seller" ? 
    (  <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Vendor code</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.vendor}</p>
   </div>)
   :
    (  <div className='flex py-5'>
    <p className=' w-1/2 text-left py-1 text-slate-800'>Date Of Birth</p>
    <p className=' w-1/2 text-left py-1 text-slate-800'>{currentUser.dob ? currentUser.dob:"-Not Added-"}</p>
   </div>)
   }   
 
  <Link to="/updateProfile">
   <button  
className="bg-red-400 block w-full p-3 mx-auto my-2 rounded-lg text-white font-semibold  hover:opacity-80"
>Edit</button>
  </Link>
  </div>
</div>
  )
}
