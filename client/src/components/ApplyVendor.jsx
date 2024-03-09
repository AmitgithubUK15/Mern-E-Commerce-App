import { useSelector } from "react-redux"


export default function ApplyVendor() {

    const {currentUser,error,loading} = useSelector((state)=>state.user)
  return (
    <div className='w-3/4 '>
    <h1 className='p-4 border-b text-slate-700 font-bold text-xl'>Apply for Vendor Account</h1>
    <div className="py-3">
    If you want to apply for a vendor account, you will have to enter your user account password for verification.
    Then you will get a key which you can use to create your vendor account.
    </div>
     <form action="" className="flex flex-col gap-4 text-sm font-sans py-3 w-48">
     <label className="text-slate-400">Password</label>
     <input type="tex" name="username"  placeholder="Enter Your Password" className=" py-2 border-b  border-slate-400 outline-none" />
     <button
              type="submit"
              className="bg-blue-500 mt-3  font-semibold p-3 rounded-lg text-white hover:opacity-80"
            >
             {loading ? "loading..." : "Apply"} </button>
     </form>
    </div>
  )
}
