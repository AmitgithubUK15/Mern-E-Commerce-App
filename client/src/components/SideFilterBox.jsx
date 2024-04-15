import React from 'react'

export default function SideFilterBox({products}) {
  return (
    <div className='border w-72 hidden sm:block'>
    <div>
      <h1 className='text-2xl p-3 text-center border-b'>Filter</h1>
    </div>
    <div>
      <form onSubmit={handlesubmit} className='flex flex-col gap-3 p-2'>
      <input type="text" id='searchTerm'
              onChange={handlechange} 
              placeholder='search...'
              className='p-2 border'
              
              value={sideFilterSearch.searchTerm}/>
         
        {typeofProducts === "Clothes" ?
         (<div className='flex flex-col gap-2'>
        
         <div >
              <input type="checkbox" id='Men'
              ref={menRef}
              onChange={handlechange} 
              value={"Male"}
              />
              <span> Men</span>
          </div>
          <div>
              <input type="checkbox" id='Women'
              ref={womenRef}
              onChange={handlechange}
              value={"Female"}
              />
              <span> Women</span>
          </div>
         </div>)
         :

         (<div className='flex flex-col gap-2'>
            <label className='font-semibold'>Filter Phones</label>
         <div >
              <input type="checkbox" id='Redmi'
              onChange={handlechange} 
              ref={redmiref}
              value={"Redmi"}/>
              <span> Redmi</span>
          </div>
          <div>
              <input type="checkbox" id='Apple'
              onChange={handlechange}
              ref={appleref}
              value={"Apple"}/>
              <span> Apple</span>
          </div>
           <div>
             <input type="checkbox" id='Samsung'
              onChange={handlechange}
              ref={samsungref}
              value={"Samsung"}/>
              <span> Samsung</span>
              </div>

              <div>
              <input type="checkbox" id='Realme'
              onChange={handlechange}
              ref={realmeref}
              value={"Realme"}/>
              <span> Realme</span>
               </div>   
              
              <div>
              <input type="checkbox" id='Oppo'
              onChange={handlechange}
              ref={opporef}
              value={"Oppo"}/>
              <span> Oppo</span>
              </div>
              
              <div>
              <input type="checkbox" id='Vivo'
              onChange={handlechange}
              ref={vivoref}
              value={"Vivo"}/>
              <span> Vivo</span>
              </div>
             
              <div>
              <input type="checkbox" id='moto'
              onChange={handlechange}
              ref={motoref}
              value={"moto"}/>
              <span> Moto</span>
              </div>
         </div>)}


         <label className='font-semibold'>Price</label>
         <div className='flex flex-col gap-2'>
         {products && products[0].productVarious.ProductType === "Electronic" ? (
            <div>
            <input type="checkbox" id='2000>&&<2500' 
            onChange={handlechange}
            ref={minfort}
            value={ products&&products[0].productVarious.ProductType==="Electronic" ?`1000 10000` :null }/>
            <span> { products&&products[0].productVarious.ProductType==="Electronic" ?"10000 Less" :"2000 2500" }</span>
        </div>
          ):null}
         <div >
              <input type="checkbox" id='500>&&<1000' 
              onChange={handlechange}
              ref={minfirst}
              value={ products&&products[0].productVarious.ProductType==="Electronic" ?"10000 15000" :"500 1000" }/>
              <span>  {products &&products[0].productVarious.ProductType==="Electronic" ?"10000-15000" :"500 1000" }</span>
          </div>
          <div>
              <input type="checkbox" id='1000>&&<1500' 
              onChange={handlechange}
              ref={minSecond}
              value={ products&&products[0].productVarious.ProductType==="Electronic" ?"15000 20000" :"1000 1500" }/>
              <span> { products&&products[0].productVarious.ProductType==="Electronic" ?"15000-20000" :"1000 1500" }</span>
          </div>
          <div>
              <input type="checkbox" id='1500>&&<2000' 
              onChange={handlechange}
              ref={minthird}
              value={ products&&products[0].productVarious.ProductType==="Electronic" ?"20000 25000" :"1500 2000" }/>
              <span> { products&&products[0].productVarious.ProductType==="Electronic" ?"20000-25000" :"1500 2000" }</span>
          </div>
          <div>
              <input type="checkbox" id='2000>&&<2500' 
              onChange={handlechange}
              ref={minfort}
              value={ products&&products[0].productVarious.ProductType==="Electronic" ?"25000 40000" :"2000 2500" }/>
              <span> { products&&products[0].productVarious.ProductType==="Electronic" ?"25000-40000" :"2000 2500" }</span>
          </div>

          {products && products[0].productVarious.ProductType === "Electronic" ? (
            <div>
            <input type="checkbox" id='2000>&&<2500' 
            onChange={handlechange}
            ref={minfort}
            value={ products&&products[0].productVarious.ProductType==="Electronic" ?`40000 ${Infinity}` :null }/>
            <span> { products&&products[0].productVarious.ProductType==="Electronic" ?"40000 Greator" :"2000 2500" }</span>
        </div>
          ):null}
         </div>


         {/* <label className='font-semibold'>Products Type</label>
         <div className='flex flex-col gap-2'>
         <div >
              <input type="checkbox" id='Men'/>
              <span>  Clothes</span>
          </div>
          <div>
              <input type="checkbox" id='Women'/>
              <span> Mobile</span>
          </div>
         </div> */}


        <button type='submit' className='p-2 bg-slate-700 text-white font-semibold'
        >Apply</button>


      </form>
    </div>
  </div>
  )
}
