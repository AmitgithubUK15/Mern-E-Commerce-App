import  { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import SearchProductList from '../components/SearchProductList';

export default function SearchResult() {
  const [sideFilterSearch,setsidefilter] = useState({
    searchTerm:"",
    gender:"all",
    minPrice:0,
    maxPrice:0
  })
  const [products,setProdcuts] = useState();
  const navigate = useNavigate();


  
  function handlechange(e){
    if(e.target.id === "Men" || e.target.id === "Women" || e.target.id === "All"){
      setsidefilter({...sideFilterSearch,gender:e.target.value})
    }

    if(e.target.id==='500>&&<1000' || e.target.id==='1000>&&<1500' || e.target.id==='1500>&&<2000'|| e.target.id==='2000>&&<2500'){
       let split = e.target.value.split(" ");
       let minprice = parseInt(split[0]);
       let maxprice = parseInt(split[1]);
       console.log(minprice,maxprice)
       setsidefilter({...sideFilterSearch,minPrice:minprice,maxPrice:maxprice})
    }

    if(e.target.id === 'searchTerm'){
      setsidefilter({...sideFilterSearch,searchTerm: e.target.value})
   }
  }


  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromURL = urlParams.get('searchTerm');
    const genderFromURL = urlParams.get('gender')
    const minPriceFromURL = urlParams.get('minPrice')
    const maxPriceFromURL = urlParams.get('maxPrice')

    if(searchTermFromURL|| genderFromURL || minPriceFromURL || maxPriceFromURL){
      setsidefilter({
        searchTerm:searchTermFromURL|| "" ,
        gender:genderFromURL || 'all',
        minPrice:minPriceFromURL,
        maxPrice:maxPriceFromURL 
      })
    }
   
    async function fetchData(){
    try {
      const searchQuerys = urlParams.toString();
      console.log(searchQuerys);
      const req = await axios.get(`/listing/getsearch?${searchQuerys}`)
      const res = req.data;
      setProdcuts(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    }

    fetchData();
  },[location.search])


  function handlesubmit(e){
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm',sideFilterSearch.searchTerm);
    urlParams.set('gender', sideFilterSearch.gender);
    urlParams.set("minPrice", sideFilterSearch.minPrice);
    urlParams.set("maxPrice", sideFilterSearch.maxPrice);
  
    const query = urlParams.toString();
    navigate(`/search?${query}`);
  }

  return (
    <div  className='flex justify-center flex-col w-full  ' >
    
    <div  className='flex justify-between flex-col gap-2 mx-auto
   xl:w-1536px lg:w-full md:w-full sm:w-full m:w-full s:w-full'>
    
    <div className='flex  flex-col sm:flex-row  m-0 sm:mx-7 sm:mt-5'>
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
               
               <div className='flex flex-col gap-2'>

               <div >
                    <input type="checkbox" id='Men'
                    onChange={handlechange} 
                    value={"Male"}/>
                    <span> Men</span>
                </div>
                <div>
                    <input type="checkbox" id='Women'
                    onChange={handlechange}
                    value={"Female"}/>
                    <span> Women</span>
                </div>
               </div>

               <label className='font-semibold'>Price</label>
               <div className='flex flex-col gap-2'>
               <div >
                    <input type="checkbox" id='500>&&<1000' 
                    onChange={handlechange}
                    value={"500 1000"}/>
                    <span>  500-1000</span>
                </div>
                <div>
                    <input type="checkbox" id='1000>&&<1500' 
                    onChange={handlechange}
                    value={"1000 1500"}/>
                    <span> 1000-1500</span>
                </div>
                <div>
                    <input type="checkbox" id='1500>&&<2000' 
                    onChange={handlechange}
                    value={"1500 2000"}/>
                    <span> 1500-2000</span>
                </div>
                <div>
                    <input type="checkbox" id='2000>&&<2500' 
                    onChange={handlechange}
                    value={"2000 2500"}/>
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
              <button type='submit' className='p-2 bg-slate-700 text-white font-semibold'
              >Search</button>
            </form>
          </div>
        </div>
        <div className='w-full sm:w-9/12 border'>
             <div>
                <h1 className='text-2xl p-3  border-b'>Products List</h1>
             </div>
             <div>
             <SearchProductList productDetails={products}/>
             </div>
        </div>
    </div>
    </div>
    </div>
  )
}
