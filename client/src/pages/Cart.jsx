import {useSelector} from 'react-redux'

export default function Cart() {
  const {currentUser} = useSelector((state)=>state.user)

  return (
    <div className="  h-full flex  justify-center items-center">
      {currentUser ? 
      (
        <div>
        user
      </div>
      )
      :
      (

      <div className='flex flex-col  self-center py-24'>
        <div className='w-64'>
          <img 
          // 
          src='https://constant.myntassets.com/checkout/assets/img/empty-bag.webp'
           alt="" 
           />
        </div>
       <h1 className='pt-5 font-bold text-slate-700 text-center text-2xl self-center w-80'>Hey, it feels so light!</h1>
       <p className='py-1  text-slate-400 text-center text-sm  self-center w-80'>There is nothing in your bag. Let`s add some items.</p>
        <div className='py-5 w-80 '> 
          <button className='p-3 mx-10 text-pink-500 border-2 border-pink-500 font-semibold'>ADD ITEMS FROM WISHLIST</button>
        </div>
      </div>
      )
      }
    </div>
  )
}
