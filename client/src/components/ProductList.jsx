import React from 'react';
import { useSelector } from 'react-redux';

const ProductList = () => {
 const {sellerproductlist} = useSelector((state)=>state.user);


  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="divide-y divide-gray-200">
        {sellerproductlist.map((product) => (
          <li key={product.id} className="py-2">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 mr-4 bg-gray-200 rounded-full overflow-hidden">
                <img src={product.posterimage[0]} alt={product.brand} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{product.title}</h3>
                {/* <p className="text-gray-600">{product.description}</p> */}
                <p className="text-gray-800 mt-2">${product.regualarPrice}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;