import {useSelector} from 'react-redux'

export default function UpdateProfile() {
   
  const {currentUser} = useSelector((state)=>state.user)


  return (
    <div className="flex flex-col justify-center items-center" >
      <div className="w-1/2 flex flex-col justify-center" >
        <h1 className='text-2xl  self-center font-bold w-32 pt-7 pb-1 border-b border-red-500'>My Profile</h1>
         
         <div className='w-48 self-center py-3'>
          <img src={currentUser.avatar} alt="" />
         </div>

        <div className="py-5 w-80 sm:w-95 m:w-95 s:w-95 self-start sm:self-center m:self-center s:self-center">
          <form action="" className="flex flex-col gap-4 text-sm font-sans">
            <label className="text-slate-400">Name</label>
            <input type="text" className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Email</label>
            <input type="text" className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Mobile Number</label>
            <input type="text" className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Gender</label>
            <input type="text" className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Address</label>
            <input type="text" className=" border-b border-slate-400 outline-none" />
            <label className="text-slate-400">Date Of Birth</label>
            <input type="Date" className=" border-b border-slate-400 outline-none" />
            <button
              type="submit"
              className="bg-green-700 mt-3 font-semibold p-3 rounded-lg text-white hover:opacity-80"
            >
              Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  )
}
