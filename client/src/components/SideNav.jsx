
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Addproduct, productList, setProfiledetail, setVendor, showproductlistTab, signoutUserFailure, signoutUserSuccess } from '../redux/user/userSlice';
import axios from 'axios';

const Sidenav = ({ isOpen, onClose }) => {
 
  const {currentUser,error,ProfileDetailsVisible} = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // function goProductlisting(){
  //  dispatch(showproductlistTab())
  // }

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
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-slate-800 text-slate-700 shadow-xl z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center p-4">
         <div className='flex flex-col'>
         <div className={`text-center  h-px-78px py-4   text-slate-700`}>
           {currentUser ? (
             <img className='rounded-full h-9 w-9 object-cover' src={`${currentUser.avatar}`} alt="" />
           ):(
             <div className='text-left flex flex-col '>
               <h1 className='text-slate-600 font-semibold text-xl'>Welcome</h1>
               <p className='text-slate-400 py-1 text-sm'>To access account and manage orders</p>
             </div> 
             )}
           </div>
           <div className='text-slate-400 '>
            {currentUser ? (
               <h1 className=' text-xl'>{currentUser.type === "Seller"? currentUser.sellername : currentUser.username}</h1>
            ):(
              <Link to="/login">
              <button className=' rounded-lg hover:opacity-85 '>Login / Signup</button>
              </Link>
            )}
           </div>
         </div>
        <button onClick={onClose} className="text-slate-400 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul className="px-4 py-5 h-full bg-white">
        
       {currentUser ?
       ( ProfileDetailsVisible === true ?
        (
          <Link to="/account">
          <li onClick={()=>dispatch(setProfiledetail())} className={ 'mb-2 py-2 text-slate-400 hover:text-slate-500 cursor-pointer'}>
          Account
          </li>
          </Link>
        )
        :
        (<li onClick={()=>dispatch(setProfiledetail())} className={ 'mb-2 py-2 text-slate-400 hover:text-slate-500 cursor-pointer'}>
        Account
      </li>) 
       )
      :null}

        {currentUser ? 
        (<li className="mb-2 py-2"><Link to="/" className="text-slate-400 hover:text-slate-500">Overview</Link></li>
       )
        :null}
        
        {currentUser ? 
        ( <li className="mb-2 py-2"><Link to="/" className="text-slate-400 hover:text-slate-500">Profile</Link></li>
       )
        :null}
        
        {currentUser ? 
        (<li className="mb-2 py-2">
        {currentUser.type === "Seller" ? 
        (<div onClick={setAddProduct} className='text-slate-400 hover:text-slate-500 cursor-pointer'>
        Sell Product
      </div>)
        :
        (<Link to="/" className="text-slate-400 hover:text-slate-500">Order</Link>)
        }
      </li>)
        :null
      }
        
       
       {currentUser ? 
       (  <li className="mb-2 py-2">
       {currentUser.type === "Seller" ? 
       (<div onClick={showproductlist} className='text-slate-400 hover:text-slate-500 cursor-pointer'>
       Product List
     </div>)
     :
       (<Link to="/" className="text-slate-400 hover:text-slate-500">Saved cards</Link>)}</li>)
      :null
      }


      {currentUser ? 
      (
        currentUser.type === "Seller" ? null : (
          <li onClick={AppylyVendorAccount} className='mb-2 py-2 text-slate-400 hover:text-slate-500 cursor-pointer'>
            Apply for Vendor Account
          </li>

        )
      )
      :null  
    }

          
      {currentUser ? 
      (
        <li onClick={signoutuser} className="mb-2 py-2"><Link to="/" className="text-slate-400 hover:text-red-500">Logout</Link>
        </li>
      )
      : null}
      
      </ul>
    </div>
  );
};

export default Sidenav;
