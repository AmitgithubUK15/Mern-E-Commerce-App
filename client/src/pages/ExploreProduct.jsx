import  { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import SearchProductList from '../components/SearchProductList';
import { CgClose, CgZoomIn } from 'react-icons/cg';
import {getExploreproducts} from '../redux/user/userSlice'
import { useDispatch, useSelector } from "react-redux";

export default function ExploreProduct() {
  const [sideFilterSearch,setsidefilter] = useState({
    searchTerm:"",
    gender:"all",
    minPrice:0,
    maxPrice:0,
    namedevice:"",
    category:"",
    clothescategorys:""
  })
  // const [products,setProdcuts] = useState();
  const navigate = useNavigate();
  const minfirst = useRef();
  const minSecond = useRef();
  const minthird = useRef();
  const minfort = useRef();
  const menRef = useRef();
  const womenRef = useRef();
  const [typeofProducts,setTypeProduct] = useState();
  const redmiref = useRef();
  const appleref = useRef();
  const samsungref = useRef();
  const realmeref = useRef();
  const opporef = useRef();
  const vivoref = useRef();
  const motoref = useRef();
  const [filterBox,setFilterBox] = useState(false);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const {products} = useSelector((state)=>state.user)
  const clothesCategory= useRef();
  const electronicCategory = useRef();
  const [showCategory,setShowCategory] =useState(false);
  const [showMobileCategory, setShowmobilecategory]  = useState(false);
  const TshirtRef = useRef();
  const JeansRef = useRef();
  const hoodieRef = useRef();
  
  function handlechange(e){

    if(e.target.id ==='clothe_category' || e.target.id === 'electronic_category'){
      if(clothesCategory.current.checked || electronicCategory.current.checked){
        if(e.target.value ==="Clothes"){
          setShowCategory(true);
          setShowmobilecategory(false);
          setsidefilter({...sideFilterSearch,category:e.target.value})
        }
        else if(e.target.value ==="Electronic"){
          setShowCategory(false);
          setShowmobilecategory(true);
          setsidefilter({...sideFilterSearch,category:e.target.value})  
        }
      }
      else{
        if(clothesCategory.current.checked === false || electronicCategory.current.checked === false){
            setShowCategory(false);
            setShowmobilecategory(false);
        }
        
      }
    }

    if(e.target.id==='Tshirt' || e.target.id==="jeans" || e.target.id==='hoodie'){
      if(TshirtRef.current.checked || JeansRef.current.checked || hoodieRef.current.checked){
        setsidefilter({...sideFilterSearch,clothescategorys:e.target.value})
      }
    }
   
    
    if(e.target.id === "Men" || e.target.id === "Women" || e.target.id === "all"){
      if(menRef.current.checked || womenRef.current.checked){
        setsidefilter({...sideFilterSearch,gender:e.target.value})
      }
      else{
        setsidefilter({...sideFilterSearch,gender:'all'})
      }
    }

    if(e.target.id==='500>&&<1000' || e.target.id==='1000>&&<1500' || e.target.id==='1500>&&<2000'|| e.target.id==='2000>&&<2500'){
 

      if(minfirst.current.checked || minSecond.current.checked || minthird.current.checked || minfort.current.checked){

        let split = e.target.value.split(" ");
         let minprice = parseInt(split[0]);
         let maxprice = parseInt(split[1]);
         
         setsidefilter({...sideFilterSearch,minPrice:minprice,maxPrice:maxprice})
      }
      else{
        setsidefilter({...sideFilterSearch,minPrice:null,maxPrice:Infinity})        
      }
    }

    if(e.target.id === 'searchTerm'){
      setsidefilter({...sideFilterSearch,searchTerm: e.target.value})
   }

   if(e.target.id ==="Apple"||e.target.id ==="Oppo"||e.target.id ==="Vivo"|| 
       e.target.id ==="Redmi"||
       e.target.id==="Realme"||
       e.target.id==="Samsung"||
       e.target.id === "Oneplus"||
       e.target.id ==="moto"){
     if(redmiref.current.checked ||appleref.current.checked || samsungref.current.checked || realmeref.current.checked
      ||opporef.current.checked || vivoref.current.checked || motoref.current.checked){
      setsidefilter({...sideFilterSearch,namedevice:e.target.value})
    }
    else{
       setsidefilter({...sideFilterSearch,namedevice:""})
     }
   }
   
  }


  useEffect(()=>{
    setLoading(true);
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('searchTerm');
    const genderFromURL = urlParams.get('genders')
    const minPriceFromURL = urlParams.get('minPrice')
    const maxPriceFromURL = urlParams.get('maxPrice')
    const deviceNameFromURL = urlParams.get("mobilecategory")
    const categoryFromURL = urlParams.get("productcategory")
    const clothescategoryFromURL = urlParams.get("clothescategory")

    if(searchTermFromURL|| genderFromURL || minPriceFromURL || maxPriceFromURL || categoryFromURL || clothescategoryFromURL ){
      setsidefilter({
        searchTerm:searchTermFromURL|| "" ,
        gender:genderFromURL || 'all',
        category:categoryFromURL || "",
        clothescategorys:clothescategoryFromURL !== "" ? clothescategoryFromURL: "all",
        minPrice:minPriceFromURL,
        maxPrice:maxPriceFromURL ,
        namedevice:deviceNameFromURL || "",
       
      })
    }
   
    async function fetchData(){
    try {
      const searchQuerys = urlParams.toString();
      
      const req = await axios.get(`/listing/getExplore?${searchQuerys}`)
      const res = req.data;
      dispatch(getExploreproducts(res));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
    }

    fetchData();
  },[location.search])


  function handlesubmit(e){
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('productcategory', sideFilterSearch.category);
    urlParams.set('genders', sideFilterSearch.gender);
    urlParams.set("minPrice", sideFilterSearch.minPrice);
    urlParams.set("maxPrice", sideFilterSearch.maxPrice);
    urlParams.set('mobilecategory',sideFilterSearch.namedevice);
    urlParams.set("clothescategory",sideFilterSearch.clothescategorys)
    const query = urlParams.toString();
    navigate(`/exporeProduct?${query}`);
    setFilterBox(false);
  }

  function ShowFilterBox(){
    setFilterBox(true);
  }

  function hideFilterBox(){
    setFilterBox(false);
  }

 async function clearFitler(){
  const urlParams = new URLSearchParams();
   urlParams.set('productcategory', sideFilterSearch.category = "");
   urlParams.set('productcategory', sideFilterSearch.category ="");
   urlParams.set('genders', sideFilterSearch.gender = "");
   urlParams.set("minPrice", sideFilterSearch.minPrice = "");
   urlParams.set("maxPrice", sideFilterSearch.maxPrice = "");
   urlParams.set('mobilecategory',sideFilterSearch.namedevice = "");
   urlParams.set("clothescategory",sideFilterSearch.clothescategorys = "")

    const req = await axios.get(`/listing/getExplore`)
    const res = req.data;
    dispatch(getExploreproducts(res));
    setLoading(false);
    navigate(`/exporeProduct`);
  }
  return (
    <div>
    {loading === true ? 
    (<div className='flex  justify-center items-center h-screen'>
      <div className='text-3xl text-slate-700 font-semibold'>
      Loading...
      </div>
    </div>)
    :
    ( <div  className='flex justify-center flex-col w-full  ' >
    
    <div  className='flex justify-between flex-col gap-2 mx-auto
   xl:w-1536px lg:w-full md:w-full sm:w-full m:w-full s:w-full'>
    
     {products && products.length !== 0 ?
     (<div className='flex  flex-col sm:flex-row  m-0 sm:mx-7 sm:mt-5 '>
     <div className='border w-72 hidden sm:block'>
       <div>
         <h1 className='text-2xl p-3 text-center border-b'>Filter</h1>
       </div>
       <div className='flex flex-col'>
         <form onSubmit={handlesubmit} className='flex flex-col gap-3 p-2'>
       


         <label className='font-semibold'>Products Type</label>
            <div className='flex flex-col gap-2'>
            <div >
                 <input type="checkbox" id='clothe_category'
                 ref={clothesCategory}
                 onChange={handlechange}
                 value={"Clothes"}/>
                 <span>  Clothes</span>
             </div>
             <div>
                 <input type="checkbox" id='electronic_category'
                 ref={electronicCategory}
                 onChange={handlechange}
                 value={"Electronic"}/>
                 <span> Mobile</span>
             </div>
            </div>
            
          
          {showCategory && 
         
           (<div className='flex flex-col gap-2'>
            <label className='font-semibold'>Filter Gender</label>
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
           }

           {showMobileCategory && (<div className='flex flex-col gap-2'>
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


          {showCategory &&
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Category</label>
            <div>
                <input type="checkbox" id='Tshirt'
                ref={TshirtRef}
                onChange={handlechange}
                value={"T-Shirt"}
                />
                <span> T-Shirt</span>
            </div>            
            <div>
                <input type="checkbox" id='jeans'
                ref={JeansRef}
                onChange={handlechange}
                value={"Jeans"}
                />
                <span> Jeans</span>
            </div>            
            <div>
                <input type="checkbox" id='hoodie'
                ref={hoodieRef}
                onChange={handlechange}
                value={"Hoodies"}
                />
                <span> Hoodies</span>
            </div>            
          </div> }


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

           <button type='submit' className='p-2 bg-slate-700 text-white font-semibold'
           >Apply</button>


         </form>

         <button type='button' onClick={clearFitler}
          className='p-2 m-2 bg-gray-400 text-white font-semibold'
           >Clear filter</button>
       </div>
     </div>


     <div className='w-full sm:w-9/12  h-[640px] overflow-x-hidden overflow-y-scroll  ' style={{scrollbarWidth:"none", }}>
     <div className='flex border-b justify-between sticky top-[0px] sm:static bg-white z-5'>
        <h1 className='text-2xl p-3  '>Products List</h1>

        <div className=' block sm:hidden p-3 text-center'>
       <button onClick={ShowFilterBox} className='px-9 py-1 bg-gray-200 rounded-full'>Filter</button>
        </div>
      </div>
        
        {/*Responsive Filter box */}

       {filterBox && <div className='absolute left-0 right-0 bg-white shadow-lg'>
       <div className='border'>
       <div 
       className='  flex justify-between border-b  ' > 
         <h1 className='text-2xl p-3 text-center '>Filter</h1>
         <button type='button' className='strok-2 font-semibold' onClick={hideFilterBox}>
          <CgClose className='w-10 h-5 '/>
          </button>
       </div>
       <div className='flex flex-col '>
       <form onSubmit={handlesubmit} className='flex flex-col gap-3 p-2'>
       


       <label className='font-semibold'>Products Type</label>
          <div className='flex flex-col gap-2'>
          <div >
               <input type="checkbox" id='clothe_category'
               ref={clothesCategory}
               onChange={handlechange}
               value={"Clothes"}/>
               <span>  Clothes</span>
           </div>
           <div>
               <input type="checkbox" id='electronic_category'
               ref={electronicCategory}
               onChange={handlechange}
               value={"Electronic"}/>
               <span> Mobile</span>
           </div>
          </div>
          
        
        {showCategory && 
       
         (<div className='flex flex-col gap-2'>
          <label className='font-semibold'>Filter Gender</label>
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
         }

         {showMobileCategory && (<div className='flex flex-col gap-2'>
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


        {showCategory &&
        <div className='flex flex-col gap-2'>
          <label className='font-semibold'>Category</label>
          <div>
              <input type="checkbox" id='Tshirt'
              ref={TshirtRef}
              onChange={handlechange}
              value={"T-Shirt"}
              />
              <span> T-Shirt</span>
          </div>            
          <div>
              <input type="checkbox" id='jeans'
              ref={JeansRef}
              onChange={handlechange}
              value={"Jeans"}
              />
              <span> Jeans</span>
          </div>            
          <div>
              <input type="checkbox" id='hoodie'
              ref={hoodieRef}
              onChange={handlechange}
              value={"Hoodies"}
              />
              <span> Hoodies</span>
          </div>            
        </div> }


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

         <button type='submit' className='p-2 bg-slate-700 text-white font-semibold'
         >Apply</button>


       </form>
         <button type='button' onClick={clearFitler}
          className='p-2 m-2 bg-gray-400 text-white font-semibold'
           >Clear filter</button>
       </div>
     </div>
      </div>}

     <div>
     <SearchProductList productDetails={products}/>
     </div>
</div>
 </div>)
     :
     (<div>no found</div>)}
    </div>
    </div>)
    }
    </div>
  )
}
