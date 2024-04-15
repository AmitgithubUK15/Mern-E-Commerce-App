
import {useDispatch, useSelector} from 'react-redux'
import {Link, Navigate, useNavigate} from "react-router-dom"
import { signoutUserSuccess,signoutUserFailure, setVendor,setProfiledetail,Addproduct, productList,showproductlistTab, showOrderProductlist } from '../redux/user/userSlice';
import axios from 'axios';
import ProfileDetails from '../components/ProfileDetails';

import ApplyVendor from '../components/ApplyVendor';
import ProductListing from './ProductListing';
import ProductList from '../components/ProductList';
import OrderProductList from '../components/OrderProductList';


export default function Account() {
 
  const {currentUser,
    error,
    ProfileDetailsVisible,
    AppylyVendorvisible,
    addproduct,
    prodcutlistTab,
    orderProductListtab} = useSelector((state)=> state.user);

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

function setAddProduct(){
  dispatch(Addproduct());
}

async function showproductlist(){
  try {
    let res = await axios.get(`/vendor/productList/${currentUser.type === "Seller"? currentUser._id : null}`);
    if(res.success===false){
      dispatch(productList(false));
      dispatch(showproductlistTab())
    
    }
    console.log(res);
    let result = res.data;
  
    dispatch(productList(result));
    dispatch(showproductlistTab())
  } catch (error) {
    if(error.response.data.message === "Please Login again"){
      alert(`Authorization failed ${error.response.data.message}`)
    }
    else{
      dispatch(productList(error.response.data.message));
      dispatch(showproductlistTab())
    }
   
  }
}

async function getOrderProductList(){
    
  try {
    let res = await axios.get(`/api/getBuyproductList/${currentUser._id}`);
    if(res.success===false){
      dispatch(productList(false));
      dispatch(showproductlistTab())
    
    }
  
    let result = res.data;
    dispatch(productList(result));
    dispatch(showOrderProductlist())
  } catch (error) {
    if(error.response.data.message === "Please Login again"){
      alert(`Authorization failed ${error.response.data.message}`)
    }
    else{
      dispatch(productList(error.response.data.message));
      dispatch(showOrderProductlist())
    }
   
  }
}
  return (
    <div className=' h-full flex justify-center items-center '>
      <div className='flex flex-col xl:w-8/12 lg:w-5/6 md:w-5/6 sm:w-full m:w-full s:w-full'>

        <div className='w-full text-start gap-4 border-b'>
          <h1 className='p-7 sm:py-5'>
            <span className='font-bold block text-2xl'>Account</span>
            <span>{currentUser.type === "Seller"? currentUser.sellername : currentUser.username}</span>
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
                (<div onClick={setAddProduct} className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
                Sell Product
              </div>)
              :
              (<div onClick={getOrderProductList} className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
              Orders
            </div>)
              }

             {
                currentUser.type === "Seller" ? 
                (<div onClick={showproductlist} className='py-7 border-b text-gray-500 hover:text-gray-800  cursor-pointer'>
                Product List
              </div>)
              :
             null
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

          <div className='w-full h-557px overflow-hidden overflow-y-scroll border-r border-l border-t flex  justify-center m-3 p-5 '
           style={{scrollbarWidth:"none"}}>
           {ProfileDetailsVisible && <ProfileDetails />}
           {AppylyVendorvisible && <ApplyVendor />}
           {addproduct && <ProductListing />}
           {prodcutlistTab && <ProductList />}
           {orderProductListtab && <OrderProductList />}
          </div>
        </div>
      </div>
    </div>
  )
}
