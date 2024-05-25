import React from 'react';

const products = [
  {
    name: 'Product 1',
    image: 'https://via.placeholder.com/150',
    visitors: 120,
  },
  {
    name: 'Product 2',
    image: 'https://via.placeholder.com/150',
    visitors: 75,
  },
  {
    name: 'Product 3',
    image: 'https://via.placeholder.com/150',
    visitors: 200,
  },
];

const ShowAllvistor = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className=" sw-full sm:w-2/3 mx-auto text-2xl font-semibold mb-4">Product Visitor Counts</h1>
      <div className=" sw-full sm:w-2/3 mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
        {products.map((product, index) => (
          <div
            key={index}
            className="grid gap-2 grid-cols-1  sm:grid-cols-3  md:grid-cols-3
             p-4 bg-white rounded-md shadow-md hover:bg-gray-100 transition"
          >
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
            <div className="font-semibold text-lg">{product.name}</div>
            <div className="text-gray-500">Visitors: {product.visitors}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllvistor;
