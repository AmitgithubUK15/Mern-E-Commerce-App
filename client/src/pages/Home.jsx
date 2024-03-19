


export default function Home() {
  return (
   <div  className='flex justify-center flex-col w-full  '>
    <div  className='flex justify-between sm:mx-auto gap-2 py-2 bg-white 
    xl:w-1300px lg:w-11/12 md:w-11/12 sm:w-full m:w-full s:w-full
  '>

      {/* Hero Section */}
      <section className="w-full ">
        <div className="flex justify-between flex-col sm:flex-row">
          <div className="w-full md:w-1/2  flex justify-center items-center ">
             <div className="flex flex-col gap-3 md:gap-6 px-3">
              <h1 className=" text-3xl md:text-6xl text-slate-800">Explore</h1>
              <h1 className="font-bold text-3xl md:text-6xl text-slate-500">ShopyBook</h1>
              <h1 className="text-3xl md:text-6xl text-slate-800">Enjoy!</h1>
              <p className="w-full md:w-80 text-left text-slate-400 text-sm sm:text-xl mt-2">
              At ShopyBook, we foster a culture of creativity, precision, and talent. 
              Join forces with our innovative e-commerce team to craft groundbreaking digital shopping experiences!
              </p>
              <button 
              className="p-3 w-48 sm:w-64 border border-blue-400 bg-blue-400 rounded-full text-white font-semibold  transition-all ease-linear hover:bg-white hover:text-slate-800 hover:border hover:border-slate-800 ">
                Get Started
              </button>
             </div>
          </div>
          <div className="w-full md:w-1/2  ">
            <div>
              <img src="/logo/ecommerce.avif" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
   </div>
  )
}
