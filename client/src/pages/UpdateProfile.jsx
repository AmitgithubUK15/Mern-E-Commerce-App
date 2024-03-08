import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import { userUpdateStart,userUpdateSuccess,userUpdateFailure } from '../redux/user/userSlice';
import { useState } from 'react';

export default function UpdateProfile() {
   
  const {currentUser,error,loading} = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const [update,setUpdate] = useState(false)
  
  async function handleUpdate(e){
   e.preventDefault();
   
   let form = e.target;
   let formdata=  new FormData(form);
   let fromobj = Object.fromEntries(formdata.entries());

   try {
     dispatch(userUpdateStart())
     let res =  await axios.post(`/api/update/${currentUser._id}`,fromobj);
     let data = res.data;
     dispatch(userUpdateSuccess(data));
     setUpdate(true)
   } catch (error) {
     dispatch(userUpdateFailure(error.response.data.message))
     setUpdate(false)
     console.log(error);
   }
  }

  return (
    <div className="flex flex-col justify-center items-center" >
      <div className="w-1/2 flex flex-col justify-center" >
        <h1 className='text-2xl  self-center font-bold w-32 pt-7 pb-1 border-b border-red-500'>My Profile</h1>
         
         <div className='w-48 self-center py-3'>
          <img src={currentUser.avatar} alt="" />
         </div>

        <div className="py-5 w-80 sm:w-95 m:w-95 s:w-95 self-start sm:self-center m:self-center s:self-center">
          <form onSubmit={handleUpdate} className="flex flex-col gap-4 text-sm font-sans">
            <label className="text-slate-400">Name</label>
            <input type="tex" name="username"  defaultValue={currentUser.username} className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Email</label>
            <input  name="email" value={currentUser.email} className=" border-b border-slate-400 outline-none opacity-40 cursor-default" />
            <label className="text-slate-400">Mobile Number</label>
            <input type="text" name="phone" defaultValue={currentUser.phone} className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Gender</label>
            <input type="text" name="gender" defaultValue={currentUser.gender ? currentUser.gender : ""} className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Address</label>
            <input type="text" name="address" defaultValue={currentUser.address ? currentUser.address : ""} className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Date Of Birth</label>
            <input type="date" name="dob" defaultValue={currentUser.dob ? currentUser.dob : ""} className=" border-b border-slate-400 outline-none" />
            <button
              type="submit"
              className="bg-green-700 mt-3 font-semibold p-3 rounded-lg text-white hover:opacity-80"
            >
             {loading ? "Updateing..." : "Update Profile"} </button>
          </form>
        </div>

        <div className='text-center p-3'>
         {error && <p className='text-red-500 font-semibold'>{error}</p> } 
         {update && <p className='text-green-500 font-semibold'>Profile Update Successfully</p> } 
          
        </div>
      </div>
    </div>
  )
}
