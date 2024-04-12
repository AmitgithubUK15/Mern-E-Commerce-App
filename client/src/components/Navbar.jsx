import { FaSearch, FaUser, FaShoppingBag, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { RiHeartFill } from 'react-icons/ri';
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Sidenav from './SideNav';
import { getcartproductlist, setProfiledetail } from '../redux/user/userSlice';
import axios from 'axios';
import { GetWishListproduct } from '../redux/user/userSlice';




export default function Navbar() {
  
  const {currentUser,ProfileDetailsVisible} = useSelector((state)=>state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm,setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hideCartBag,setHideCartbag] = useState(true);
  const [searchForm ,setSearchForm] = useState(false);

  
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  async function getWishlistproduct(){
    try {
      let res = await axios.get(`/api/getWishlist/${currentUser._id}`);
      let result = res.data;
      dispatch(GetWishListproduct(result))
      navigate("/liked")
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getCartProduct(){
    try {
      let req = await axios.get(`/api/getCartproduct/${currentUser._id}`);
      let res = req.data;
      dispatch(getcartproductlist(res));
      navigate("/cart")
    } catch (error) {
      console.log(error)
    }
  }

  function handleSubmit(e){
   e.preventDefault();
   const urlParams = new URLSearchParams(window.location.search);
   urlParams.set('searchTerm',searchTerm);
   const searchQuery = urlParams.toString();
   navigate(`/search?${searchQuery}`);
  }


  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchtermFromURL = urlParams.get('searchTerm')
  
    if(searchtermFromURL){
      setSearchTerm(searchtermFromURL);
    }
  },[location.search])


  function handleSearchClick(){
    setHideCartbag(false);
    setSearchForm(true);
  }

  function hideSearchBox(){
    setSearchForm(false);
    setHideCartbag(true);
  }


  return (
    <header className='shadow-md z-10 xl:w-1536px  lg:w-full md:w-full sm:w-full   m:w-full s:w-full mx-auto bg-white flex sticky top-0 xl:justify-around lg:justify-around md:justify-around sm:justify-around m:justify-around s:justify-around' 
    style={{
      // backgroundImage:"linear-gradient(to right,#7ccbef, #b7e5fb)"
    }}
    >

      <div className=' py-8 px-3 xl:hidden lg:hidden md:hidden sm:block m:block s:block  '>
        <FaBars   onClick={toggleSidenav}   className='w-5 h-7 cursor-pointer' />
      </div>

     {hideCartBag &&  <div className='flex  items-center  mx-w-6xl  xl:p-4 lg:p-4 md:p-4 sm:p-4 m:p-4 s:p-4   sm:w-48   m:w-48 s:w-32  '>
        <Link
          to='/'
        >
           <h1 className='font-bold w-48  xl:text-3xl lg:text-xl sm:text-1xl flex flex-wrap m:text-1xl '>
            <span className="text-slate-500 ">Shopy</span>
            <span className="text-slate-700">Book</span>
          </h1>
          
         
        </Link>
      </div >}

      {searchForm &&  
      <div className='flex justify-around items-center mx-w-6xl  p-4 w-[550px] '>
        <form onSubmit={handleSubmit} className='w-full  flex items-center  p-3 border-b border-black'>
          <input
            type="text"
            placeholder="Search..."
            className='bg-transparent focus:outline-none text-black w-full '
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button type="submit" >
          <FaSearch className='w-10 h-5' />
          </button>
          <button type='button' className='strok-2 font-semibold' onClick={hideSearchBox}>
          <CgClose className='w-10 h-5 '/>
          </button>
        </form>
        
      </div>
      }

      <div className='flex justify-around items-center mx-w-6xl  p-4 xl:block lg:block md:block sm:hidden m:hidden s:hidden '>
        <form onSubmit={handleSubmit} className='lg:w-96 sm:w-80  flex items-center  p-3 border-b border-black'>
          <input
            type="text"
            placeholder="Search..."
            className='bg-transparent focus:outline-none text-black lg:w-full sm:w-64 '
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button type="submit" className=''>
          <FaSearch />
          </button>
        </form>
      </div>

      <div className='flex justify-around items-center mx-w-6xl '>
        <ul className='flex items-center h-px-78px  xl:gap-6 sm:gap-1 m:gap-1 s:gap-1 '>

          {hideCartBag && 
          <div className=' py-8 px-3 xl:hidden lg:hidden md:hidden sm:block  m:block s:block'>
          <button onClick={handleSearchClick}>
            <FaSearch className='hover:text-red-500 strok-2 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-7 sm:h-6 m:w-7 m:h-6 s:w-7 s:h-6' />
          </button>
        </div>}

          {currentUser ? (
            <Link
              to='/account'>
              <li onClick={()=>dispatch( setProfiledetail())} className={`text-center  h-px-78px py-4   text-slate-700 hover:text-red-500 font-semibold xl:block lg:block md:block sm:hidden m:hidden s:hidden`}>
                <img className='rounded-full h-9 w-9 object-cover' src={currentUser.avatar} alt="" />
              </li>
            </Link>
          ) :
            (
              <Link
                to='/signup'
              >
                <li className={`text-center  h-px-78px py-4   text-slate-700 hover:text-red-500  font-semibold xl:block lg:block md:block sm:hidden m:hidden s:hidden`}>
                  <span className='block px-3'>
                    <FaUser />
                  </span>
                  <span >Signup</span>
                </li>
              </Link>
            )
          }
 
         {currentUser  ? 
         (currentUser && currentUser.type !=="Seller" ?
         (hideCartBag &&  <Link onClick={getWishlistproduct} >
          <li className='  h-px-78px py-4  text-center text-slate-700 hover:text-red-500 font-semibold'>
            <span className='block px-5'>
              <RiHeartFill className=' strok-2 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-7 sm:h-8 m:w-7 m:h-8 s:w-7 s:h-8' />
            </span>
            <span className='xl:block lg:block md:block sm:hidden m:hidden s:hidden'>Wishlist</span>
          </li>
        </Link>) :(null))
         :
         (hideCartBag&& <Link to="/liked" >
          <li className='  h-px-78px py-4  text-center text-slate-700 hover:text-red-500 font-semibold'>
            <span className='block px-5'>
              <RiHeartFill className=' strok-2 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-7 sm:h-8 m:w-7 m:h-8 s:w-7 s:h-8' />
            </span>
            <span className='xl:block lg:block md:block sm:hidden m:hidden s:hidden'>Wishlist</span>
          </li>
        </Link>)
         }
         
          {currentUser && currentUser.type === "Seller" ? 
          (null)
          :
        
          (currentUser ? 
        
        ( hideCartBag &&
          <li onClick={getCartProduct} className=' cursor-pointer h-px-78px py-4 text-center text-slate-700 hover:text-red-500 font-semibold'>
            <span className='block px-3'>
              <FaShoppingBag className=' strok-2 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-7 sm:h-7 m:w-7 m:h-7 s:w-7 s:h-7' />
            </span>
            <span className=' xl:block lg:block md:block sm:hidden m:hidden s:hidden'>Cart</span>
          </li>)
        :
          (hideCartBag && <Link to='/cart'>
          <li className='  h-px-78px py-4 text-center text-slate-700 hover:text-red-500 font-semibold'>
            <span className='block px-3'>
              <FaShoppingBag className=' strok-2 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-7 sm:h-7 m:w-7 m:h-7 s:w-7 s:h-7' />
            </span>
            <span className=' xl:block lg:block md:block sm:hidden m:hidden s:hidden'>Cart</span>
          </li>
        </Link>))
          }
        </ul>
      </div>
      {/* {sidenav &&   <div   className={`w-64 h-full bg-white absolute top-0 left-0 xl:hidden lg:hidden md:hidden`}>SideNav
    </div>} */}
    <Sidenav  isOpen={isOpen} onClose={toggleSidenav} />
    </header>
  )
}
