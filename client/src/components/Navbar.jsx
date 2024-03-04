import {FaSearch,FaUser,FaShoppingBag} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {RiHeartFill} from 'react-icons/ri'


export default function Navbar() {
  return (
    <header className='shadow-md bg-red-50'>
       <div className='flex justify-around items-center mx-w-6xl mx-auto p-4'>
        <Link to='/'>
       <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className="text-red-300 ">Shophy</span>
        <span className="text-red-400">Book</span>
       </h1>
        </Link>
       <form action="" className=' lg:w-96 sm:w-80 flex items-center rounded-lg p-3 bg-white'>
        <input 
        type="text"
         placeholder="serach..."
         className='bg-transparent focus:outline-none  lg:w-full sm:w-64'
         />
        <FaSearch />
       </form>
        
        <ul className='flex xl:gap-6 sm:gap-2 m:gap-1'>
          <Link to='/account'>
          <li className='text-center  text-slate-700  hover:text-red-500 '>
            <span className='block px-3'>
            <FaUser />
            </span>
             <span >Profile</span>
          </li>
          </Link>
          <Link to='/liked'>
          <li className=' xl:block md:block lg:block sm:hidden m:hidden text-center text-slate-700 hover:text-red-500 '>
            <span className='block px-5'>
            <RiHeartFill />
            </span>
             <span className=''>Wishlist</span>
          </li>
          </Link>
          <Link to='/cart'>
          <li className='text-center  text-slate-700 hover:text-red-500 '>
            <span className='block px-3 '>
            <FaShoppingBag />
            </span>
             <span className='pt-2'>Cart</span>
          </li>
          </Link>
        </ul>
       </div>
    </header>
  )
}
