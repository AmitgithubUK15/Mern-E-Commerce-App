import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { userUpdateStart, keysuccess,keyfaile } from '../redux/user/userSlice';
import { useState } from "react";

export default function ApplyVendor() {

    const {currentUser,loading} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const [update,setUpdate] = useState(false)
    const [key,setkey] = useState('');
    const [error,seterror] =useState('')
    const [errorvisible,seterrorvis] = useState(false)


    async function getkey(e){
      e.preventDefault();
      let form = e.target;
      let formdata = new FormData(form);
      let formobj = Object.fromEntries(formdata.entries());
      
      try {
        dispatch(userUpdateStart())
        let req = await axios.post(`/api/vendor/${currentUser._id}`,formobj)
        
        let res = req.data;
        dispatch(keysuccess())
        dispatch(keyfaile())
         setkey(res);
        setUpdate(true)
        seterrorvis(false)
        
      } catch (error) {
        dispatch(keyfaile())
        seterrorvis(true)
        setUpdate(false)
        seterror(error.response.data.message)
      }
    }


  return (
    <div className='w-3/4 '>
    <h1 className='p-4 border-b text-slate-700 font-bold text-xl'>Apply for Vendor Account</h1>
    <div className="py-3">
    If you want to apply for a vendor account, you will have to enter your user account password for verification.
    Then you will get a key which you can use to create your vendor account.
    </div>
     <form onSubmit={getkey} className="flex flex-col gap-4 text-sm font-sans py-3 w-48">
     <label className="text-slate-400">Password</label>
     <input type="tex" name="password" required placeholder="Enter Your Password" className=" py-2 border-b  border-slate-400 outline-none" />
     <button
              type="submit"
              className="bg-blue-500 mt-3  font-semibold p-3 rounded-lg text-white hover:opacity-80"
            >
             {loading ? "loading..." : "Apply"} </button>
     </form>
     <div className='text-left p-3 '>
         {errorvisible && <p className='text-red-500 font-semibold'>{error}</p> } 
         {update && <p className=' font-semibold'>Your vendor Key : <span className="text-green-600"> {key}</span> </p> } 
          
        </div>
    </div>
  )
}
