import React, {useState, useEffect} from 'react';
import { FaCheckCircle, FaCamera } from 'react-icons/fa';

const CheckoutBill = () => {
    const [checkoutDetail, setCheckoutDetail] = useState(null);
    const [orderDate, setOrderDate] = useState('');
  
    useEffect(() => {
        fetch('http://localhost:8000/api/checkout_list/')
        .then(response => response.json())
        .then(data => setCheckoutDetail(data))
        .catch(error => console.error('Error to show checkout details', error))

        // show date and time
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        setOrderDate(`${date} ${time}`)
    }, [])

    if(!checkoutDetail) return <p>Loading...</p>

    return(
        <>
      <div className=' mt-28 mb-16 md:mb-24 md:mt-32 mx-4 md:mx-20'>
       <div className='font-sans flex bg-black text-white p-2 w-full lg:w-1/2 md:items-center gap-2 justify-center'>
        <FaCheckCircle className='mt-1 md:mt-0'/>
        <p>Thank You! Your order has been placed successfully</p>
       </div>
       <div className='font-sans flex bg-black text-white p-2 w-full lg:w-1/2 md:items-center gap-2 justify-center mt-2'>
        <FaCamera className='mt-1 md:mt-0'/>
        <p>Kindly screenshot this details for your records</p>
       </div>
            <div  className='font-header mt-4 space-y-3'>
                <h1 className='text-xl md:text-2xl font-bold'>Order Details</h1>
                <p className='text-sm'>{orderDate}</p>
                <br/>
                <p><strong>Name:</strong> {checkoutDetail.name}</p>
                <p><strong>Phone:</strong> {checkoutDetail.phone}</p>
                <p><strong>Email:</strong> {checkoutDetail.email}</p>
                <p><strong>Address:</strong> {checkoutDetail.address}</p>
                <p><strong>City:</strong> {checkoutDetail.city}</p>
                <p><strong>Zipcode:</strong> {checkoutDetail.zipcode}</p>
                <p><strong>Payment Method:</strong> {checkoutDetail.payment_method}</p>
                <p><strong>Sub Total:</strong> {checkoutDetail.subtotal}</p>
                <p><strong>Shipping Charges:</strong> {checkoutDetail.shippingcharges}</p>
                <p><strong>Total Amount:</strong> {checkoutDetail.totalamount}</p>
                 <p><strong>Products:</strong> {checkoutDetail.products}</p>

            </div>
      </div>
        </>
    )
}
export default CheckoutBill;