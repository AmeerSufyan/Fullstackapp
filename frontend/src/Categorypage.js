import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from './axiosconfig'; 
import { toast } from 'react-toastify';

const CategoryPage = ({ searchTerm, refreshCart }) => {
  const { category_slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${category_slug}/`)
    .then(response => response.json())
    .then(data => { setCategoryName(data.category_name || '') 
      setProducts(data.products || [])})
    .catch(error => console.error('Error Fetching products', error) )
  }, [category_slug])

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

   const getCsrfToken = () => {
   const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
   return match ? match[2] : null;
   };
const handleAddToCart = async (product) => {
  const csrftoken = getCsrfToken();
  try {
    const response = await axios.post(
      'http://localhost:8000/add-to-cart/',
      {
        product_id: product.id,
        quantity: 1,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        
        },
      }
    );
    if(response.data.success){
      toast.success("Item added to cart!");
       refreshCart();
    }
    else {
      toast.error(response.data.message || "Product already in cart");
    }
  } catch (err) {
    console.error("Error adding to cart:", err.response?.data || err.message);
    toast.error("Error adding product to cart.");
  }
};


  if (!filteredProducts.length) {
    return <h2 className="text-center mt-64 mb-10 md:mt-40 text-xl">No matching products found.</h2>;
  }
  if (!products.length) {
    return <h2>No products found for this category.</h2>;
  }

  return (
    <div>
      <h2 className="text-3xl text-center mt-24">
       {categoryName}
      </h2>
      <div className="flex flex-wrap justify-center gap-7 md:gap-3 lg:gap-0 mt-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex flex-col items-center border border-black rounded-xl bg-stone-200 mx-6 pb-5 pt-1 mb-10 w-full md:w-1/3 lg:w-1/4 h-104">
            <div className="w-full h-3/4 overflow-hidden mix-blend-multiply">
              <img src={`http://localhost:8000${product.image}`} alt={product.name} className="w-full h-64 object-cover" />
            </div>
            <p>{product.name}</p>
            <p>RS: {product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className='bg-black mt-2 text-white p-3 rounded-3xl text-lg'
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
