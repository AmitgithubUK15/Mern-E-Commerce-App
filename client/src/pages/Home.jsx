import { useEffect, useState } from "react";
import axios from "axios";
import ScrollBars from "../components/Scrollbars";



export default function Home() {
  const [items,setitems] = useState();
  useEffect(()=>{
    async function GetProduct(){
      try {
        const res = await axios.get("/listing/getproduct");
        const data = res.data;
        let filter = data.filter((value)=> value.productVarious.ClotheType === "T-Shirt")

        setitems(filter);
      } catch (error) {
        console.log(error.message);
      }
    }
    GetProduct();
  },[])


  return (
   <div  className='flex justify-center flex-col w-full  ' >
    
    <div  className='flex justify-between flex-col gap-5 mx-auto
   xl:w-1536px lg:w-full md:w-full sm:w-full m:w-full s:w-full
   
  '>
   

      {/* Hero Section */}
      <section className="w-full py-10 sm:py-20"
      style={{background:"url('https://img.freepik.com/free-photo/excited-young-woman-scream-joy-say-yes-make-fist-pump-satisfied-buying-gifts-with-discounts-triumphing-holding-shopping-bags-standing-blue-background_1258-128563.jpg?t=st=1711015997~exp=1711019597~hmac=cc7a2fe4391df0fd515a8e8e93c54f97f7ca02891484ebbe345131c16964d76f&w=1380')",backgroundPosition:"center",backgroundSize:"100% 100%",backgroundRepeat:"no-repeat"}}>
        <div className="flex justify-between flex-col sm:flex-row ">
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
          {/* <div className="w-full md:w-1/2  hidden">
            <div>
              <img src="/logo/ecommerce.avif" alt="" />
            </div>
          </div> */}
        </div>
      </section>
       
       <section className="w-full ">
         <ScrollBars items={items}/>
       </section>
       <section className="w-full ">
         <ScrollBars items={items}/>
       </section>
    </div>
   </div>
  )
}
