import React, {useState, useEffect} from 'react';
import video2 from './cartvideo.mp4';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = ({refreshCart}) => {
    const [addedItem, setAddedItem] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/show-cart/', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setAddedItem(data.cart))
        .catch(error => console.error(error));
    }, [])
    const totalPrice = addedItem.reduce((total, item) => total + item.subtotal, 0);

    
   const getCsrfToken = () => {
   const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
   return match ? match[2] : null;
   };
    const handleRemove = (itemId) => {
        const csrfToken = getCsrfToken();
  fetch(`http://localhost:8000/api/cart/remove/${itemId}/`, {
    method: 'DELETE',
    credentials: 'include',
     headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
  })
    .then(() => {
        setAddedItem(prevItems => prevItems.filter(item => item.id !== itemId))
      refreshCart();
      toast.error("Item removed successfully");
    });
};

const updateCart = (itemId, newQuantity) => {
  const csrfToken = getCsrfToken();

  fetch(`http://localhost:8000/api/cart/update/`, { 
    method: 'POST',  
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({
      product_id: itemId,
      quantity: newQuantity,
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update cart");
      return res.json();
    })
    .then(data => {
      if (data.cart) {
        setAddedItem(data.cart);  // Update cart state with new data from backend
      }
      refreshCart();
      toast.success("Cart updated");
    })
    .catch(error => {
      toast.error("Failed to update cart");
      console.error(error);
    });
};

  const clearCart = () => {
        const csrfToken = getCsrfToken();
  fetch(`http://localhost:8000/api/cart/clear/`, {
    method: 'POST',
    credentials: 'include',
     headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
  })
  .then(response => response.json())
    .then((data) => {
        setAddedItem(data.cart || [])
        refreshCart();
        toast.success(data.message || "Cart cleared");
    })
     .catch((err) => {
      console.error("Failed to clear cart", err);
      toast.error("Something went wrong.");
    });
};


    return(
        <>
        <div className='w-full h-64'>
        <video className="w-full h-64 mt-10 md:mt-20 "   src={video2} autoPlay muted loop></video>
        </div>
        <p className='text-2xl md:text-4xl font-header font-bold text-center'>Your Cart</p>
        <div >
        {addedItem.length === 0 ? (
            <p className='text-xl text-center mt-10 mb-20'>Your cart is empty</p>
            
        ): (
            <div className='mx-4 md:mx-20 lg:mx-16 md:w-[80%] lg:w-[90%]'>
            <table className='overflow-x-auto text-center mt-10 xl:w-full '>
                 <thead>
                          <tr className='md:text-2xl'>
                           <th className='lg:px-3'>Product Image</th>
                           <th className='lg:px-3'>Product Name</th>
                           <th className='lg:px-3'>Product Price</th>
                           <th className='lg:px-3'>Product Quantity</th>
                           <th className='lg:px-3'>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                {addedItem.map((item) => (
                     <tr key={item.id} className='text-xl'>
                        <td className=' mt-5 text-sm md:text-xl'>
                            <div className='flex justify-center'>
                           <img src={`http://localhost:8000${item.image}`} alt={item.name} className='w-20 md:w-40 h-20 md:h-40'/></div></td>
                           <td>{item.name}</td>
                            <td>RS: {item.price}</td>
                            <td><input type="number" value={item.quantity} className='border border-black w-10 md:w-20 h-10 rounded-lg md:px-2' onChange={(e) => updateCart(item.id, parseInt(e.target.value))}/></td>
                            <td><button className="bg-red-500 text-white rounded-lg w-sm text-sm md:w-full  p-2 md:h-10"onClick={() => handleRemove(item.id)}>Remove</button></td>
                        </tr>
                ))}
                <tr>
                   <td colSpan='5' className='text-center  font-bold text-xl py-3'> 
                    Total: RS: {totalPrice.toFixed(2)}</td>
                </tr>              
            </tbody>
            </table>
            <div className='w-full md:w-1/2 mx-auto flex justify-center gap-10  mt-10'>
            <button className="bg-red-500 text-white rounded-lg w-sm text-sm md:text-lg md:w-1/3 p-2 md:h-10 mb-10"onClick={() => clearCart()}>Clear Cart</button> 
            <button  className="bg-red-500 text-white rounded-lg w-lg text-sm md:text-lg md:w-1/3 p-2 md:h-10 mb-10"> <Link to="/checkout">Checkout</Link></button> 
            </div>
            </div>
        )}
       </div>
      
        </>
    )
} 
export default Cart