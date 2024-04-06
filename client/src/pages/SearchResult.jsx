import React from 'react'

export default function SearchResult() {
  return (
    <div  className='flex justify-center flex-col w-full  ' >
    
    <div  className='flex justify-between flex-col gap-2 mx-auto
   xl:w-1536px lg:w-full md:w-full sm:w-full m:w-full s:w-full'>
    
    <div className='flex  h-screen flex-col sm:flex-row  m-0 sm:mx-7 sm:mt-5'>
        <div className='border w-72 hidden sm:block'>
          <div>
            <h1 className='text-2xl p-3 text-center border-b'>Filter</h1>
          </div>
          <div>
            <form className='flex flex-col gap-3 p-2'>
               <div className='flex flex-col gap-2'>
               <div >
                    <input type="checkbox" id='Men'/>
                    <span> Men</span>
                </div>
                <div>
                    <input type="checkbox" id='Women'/>
                    <span> Women</span>
                </div>
               </div>

               <label className='font-semibold'>Price</label>
               <div className='flex flex-col gap-2'>
               <div >
                    <input type="checkbox" id='Men'/>
                    <span>  500-1000</span>
                </div>
                <div>
                    <input type="checkbox" id='Women'/>
                    <span> 1000-1500</span>
                </div>
                <div>
                    <input type="checkbox" id='Women'/>
                    <span> 1500-2000</span>
                </div>
                <div>
                    <input type="checkbox" id='Women'/>
                    <span> 2000-2500</span>
                </div>
               </div>


               <label className='font-semibold'>Products Type</label>
               <div className='flex flex-col gap-2'>
               <div >
                    <input type="checkbox" id='Men'/>
                    <span>  Clothes</span>
                </div>
                <div>
                    <input type="checkbox" id='Women'/>
                    <span> Mobile</span>
                </div>
               </div>

            </form>
          </div>
        </div>
        <div className='w-full sm:w-9/12 border'>
             <div>
                <h1 className='text-2xl p-3  border-b'>Products List</h1>
             </div>
        </div>
    </div>
    </div>
    </div>
  )
}
