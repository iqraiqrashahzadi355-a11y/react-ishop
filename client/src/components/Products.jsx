import React from "react";

const products = [
  { name: "iPhone", image: "/images/iphone.jpg" },
  { name: "iPad", image: "/images/ipad.jpg" },
  { name: "Airpods", image: "/images/airpods.jpg" },
  { name: "Macbook", image: "/images/macbook.jpg" },
  { name: "Apple Watch", image: "/images/applewatch.jpg" },
  { name: "iMac", image: "/images/imac.jpg" },
  { name: "Apple TV", image: "/images/appletv.jpg" },
  { name: "Entertainment", image: "/images/entertainment.jpg" },
  { name: "Accessories", image: "/images/accessories.jpg" },
];

const Products = () => {
  return (
    <section id="products" className="py-20 bg-gray-50">
      {/* 🔹 Heading Section */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Products & Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete range of iPhone, iPad, Airpods, Macbook, Apple Watches,
          Apple TV, and Accessories — explore the best from Apple.
        </p>
      </div>

      {/* 🔹 Image Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {product.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
