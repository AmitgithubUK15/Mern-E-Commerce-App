
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import { signoutUserSuccess,signoutUserFailure, setVendor } from '../redux/user/userSlice';
import axios from 'axios';
import ProfileDetails from '../components/ProfileDetails';

import ApplyVendor from '../components/ApplyVendor';

export default function Account() {
 
  const {currentUser,
    error,
    ProfileDetailsVisible,
    AppylyVendorvisible} = useSelector((state)=> state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate() 
  

 async function signoutuser(){
  try {
    const res = await axios.get("/auth/signout")
    const data= res.data;
  
    if(data.success === false){
      dispatch(signoutUserFailure(error.message));
      return;
    }

    dispatch(signoutUserSuccess(data));
    localStorage.clear();
 
    navigate("/");
   
    
  } catch (error) {
    dispatch(signoutUserFailure(error.message));
    console.error( error); 
  }
 }

function AppylyVendorAccount(){
  dispatch(setVendor())
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
              <div className='py-7 border-b text-gray-500  hover:text-gray-800 cursor-pointer'>
                Overview
              </div>
              <div className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
                Profile
              </div>

              {
                currentUser.type === "Seller" ? 
                (<div className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
                Sell Product
              </div>)
              :
              (<div className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
              Orders
            </div>)
              }

             {
                currentUser.type === "Seller" ? 
                (<div className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
                Product List
              </div>)
              :
             null
              }
          

              {
                currentUser.type === "Seller" ? null :(
           
              <div className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
                Saved Cards
              </div>
                )
              }

              {
                currentUser.type === "Seller" ? null :(
              <div onClick={AppylyVendorAccount} className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
                Apply for Vendor Account
              </div>

                )
              }
              <div onClick={signoutuser} className='py-7 border-b text-gray-500  hover:text-red-500 cursor-pointer'>
                Logout
              </div>
            </div>
          </div>

          <div className='w-full border flex  justify-center m-3 p-5'>
           {ProfileDetailsVisible && <ProfileDetails />}
           {AppylyVendorvisible && <ApplyVendor />}
          </div>
        </div>
      </div>
    </div>
  )
}
