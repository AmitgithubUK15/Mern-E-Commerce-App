import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LikedProductList from '../components/LikedProductList'

export default function Cart() {
  const { currentUser} = useSelector((state) => state.user)

  return (
    <div className="  h-full flex  justify-center items-start overflow-x-hidden overflow-y-scroll" 
    style={{scrollbarWidth:"none"}}>
      {currentUser ?
        (
         <LikedProductList />
        )
        :
        (

          <div className='flex flex-col  self-center py-20'>

            <h1 className='pt-5 font-bold text-slate-700 text-center text-2xl self-center w-80'>PLEASE LOG IN</h1>
            <p className='py-1  text-slate-400 text-center text-sm  self-center w-80'>Login to view items in your wishlist.</p>

            <div className='w-80'>
              <img
                // 
                src='/logo/sign-concept-illustration_114360-125.jpg'
                alt=""
              />
            </div>
            <div className='py-5 w-80 '>
              <Link to="/login">
                <button className='px-9 py-3 rounded-xl mx-24 text-blue-500 border-2 border-blue-500 font-semibold hover:opacity-70'>LOGIN</button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}
