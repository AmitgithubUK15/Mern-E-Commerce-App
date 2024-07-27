import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const ShowAllvistor = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const [products,setProducts] = useState();

  useEffect(()=>{
    async function getVisitors_according_product(){
      try {
        let req = await axios.get(`/vendor/getVisitorsByProducts/${currentUser._id}`);
        setProducts(req.data);
      } catch (error) {
        console.log(error)
      }
    }
  
    getVisitors_according_product()
  },[currentUser])

  
  return (
    <div className="container mx-auto p-4">
      <h1 className=" w-64 sm:w-2/3 mx-auto text-2xl font-semibold mb-4">Product Visitor Counts</h1>
      <div className=" w-72 sm:w-2/3 mx-auto grid gap-4 grid-rows-1 md:grid-cols-1 sm:grid-cols-2 ">
        {products && products.map((product, index) => (
          <div
            key={index}
            className="grid gap-2 grid-cols-1  sm:grid-cols-3  md:grid-cols-3
             p-4 bg-white rounded-md shadow-md hover:bg-gray-100 transition"
          >
            <img src={product.poster} alt={product.name} className="w-72 h-48 object-content rounded-md mb-4" />
            <div className="font-semibold text-lg">{product.name}</div>
            <div className="text-gray-500"><span className='text-yellow-400  font-bold'>Visitors:</span> {product.visitors}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllvistor;
