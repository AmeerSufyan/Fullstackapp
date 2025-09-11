  import React, { useState, useEffect } from 'react';
  import { toast } from 'react-toastify';
  import { useHistory } from 'react-router-dom';
  import { useForm } from 'react-hook-form';
  import {FaExclamationCircle} from 'react-icons/fa';
  const Checkout = () => {
    const {register,  handleSubmit, formState: {errors}, reset, setError, setValue, watch} = useForm();
    
    const [subtotal, setSubTotal] = useState('');
    const [shipping, setShippingCharges] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [products, setProducts] =useState([]);
    const [quantity, setQuantity] =useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const paymentMethod = watch('payment_method');

    const history = useHistory();

    const getCsrfToken = () => {
      const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
      return match ? match[2] : null;
    };

    
  useEffect(() => {
    fetch('http://localhost:8000/api/get-latest-order/', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const productNames = data.products.map(p => p.product_name)
        const productQty = data.products.map(p => p.quantity)
        setProducts(productNames)
        setQuantity(productQty)

         // Set values for the registered total fields
        setValue('sub_total', data.sub_total.toString()); 
        setValue('shipping_charges', data.shipping_charges.toString()); 
        setValue('total_amount', data.total_amount.toString()); 
          setSubTotal(data.sub_total.toString());
          setShippingCharges(data.shipping_charges.toString());
          setTotalAmount(data.total_amount.toString());
      })
      .catch((err) => {
        console.error("Failed to load order details", err);
      });

      // prefill checkout form
      fetch('http://localhost:8000/api/previousCheckoutData/',{
        credentials: 'include',
      })
      .then((response) => response.json())
      .then((data) => {
        if(data) {
          setValue('name', data.Name || '')
          setValue('phone', data.Phone || '')
          setValue('email', data.Email || '')
          setValue('address', data.Address || '')
          setValue('city', data.City || '')
          setValue('zipcode', data.Zipcode || '')
          setValue('payment_method', data.payment_method || '')
        }
      })
      .catch((error) => {
        console.error('Something went wrong', error)
      })
  }, [setValue]);
  
    const combinedProductsAndQuantities = () => {
    if (products.length !== quantity.length) return '';
    return products.map((prod, i) => `${prod} x ${quantity[i]}`).join(', ');
  };

    const onSubmit = (formData) => {
      if (isSubmitting) return; // prevent duplicate submit if form already submitted

    setIsSubmitting(true);
      const csrftoken = getCsrfToken();
      const dataToSend = {
        ...formData, // This spreads all the registered form fields (name, phone, sub_total, etc.)
        products: combinedProductsAndQuantities(), // Add the combined products string
    };

      fetch('http://localhost:8000/api/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to submit checkout');
          }
          return response.json();
        })
        .then(data => {
          toast.success('Checkout  successfully!');
          history.push('/checkoutbill')
        reset(); 
    })
      
    .catch(error => {
          console.error('Checkout failed:', error);
          toast.error('Failed to submit checkout');
        })
        .finally(() => setIsSubmitting(false));
    };

    return (
      <>
        <div >
          <form onSubmit={handleSubmit(onSubmit)} noValidate className='bg-black mx-auto md:mx-20 w-[90%] md:w-[80%] lg:mx-auto mt-32 md:mt-36 mb-20 flex flex-col'>
          <h1 className='text-center text-white mt-10 text-4xl'>Checkout Form</h1>
          
          <label className='text-white text-xl ml-5'>Full Name</label>
          <input type='text' placeholder='Enter Your Name'
           className='p-3 rounded-md m-5' 
             {...register("name", {
              required: "Username is required",
              pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Name contain only alpphabets'
              }
             })}/>
            {errors.name && (
            <div className='flex items-center gap-2 ml-5'>
            <FaExclamationCircle className='text-red-500'/>
            <p className='text-red-500 text-[16px]'>{errors.name.message}</p>
            </div>
             )}

               <label className='text-white text-xl ml-5'>Phone Number</label>
             <input
              type='tel'
              placeholder='Enter Phone Number'
              className='p-3 rounded-md m-5'
              {...register("phone", {
              required: "Phone number is required",
              pattern: {
              value: /^[0-9]{11}$/,
              message: "Phone number must be 11 digits"
              }
              })}
              />
              {errors.phone && (
             <div className='flex items-center gap-2 ml-5'>
             <FaExclamationCircle className='text-red-500'/>
             <p className='text-red-500 text-[16px]'>{errors.phone.message}</p>
            </div>
             )}


          <label className='text-white text-xl ml-5'>Email</label>
          <input type='email' placeholder='Enter Your Email'
           className='p-3 rounded-md m-5'
             {...register("email" , {
                required: "Email is required",
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email  must contain  @"
                }
               })} />
                 {errors.email && (
                            <div className='flex items-center gap-2 ml-5'>
                           <FaExclamationCircle className='text-red-500'/>
                           <p className='text-red-500 text-[16px]'>{errors.email.message}</p>
                           </div>
                           )}

          <label className='text-white text-xl ml-5'>Address</label>
          <input type='text' placeholder='Enter Your Address' className='p-3 rounded-md m-5'
            {...register("address" , {
                required: "Address is required",
               
               })} />
                 {errors.address && (
                            <div className='flex items-center gap-2 ml-5'>
                           <FaExclamationCircle className='text-red-500'/>
                           <p className='text-red-500 text-[16px] '>{errors.address.message}</p>
                           </div>
                           )}


          <label className='text-white text-xl ml-5'>City</label>
          <input type='text' placeholder='Enter Your City' className='p-3 rounded-md m-5' 
           {...register("city" , {
                required: "City is required",
          
               })} />
                 {errors.city && (
                            <div className='flex items-center gap-2 ml-5'>
                           <FaExclamationCircle className='text-red-500'/>
                           <p className='text-red-500 text-[16px]'>{errors.city.message}</p>
                           </div>
                           )}


          <label className='text-white text-xl ml-5'>ZipCode</label>
          <input type='text' placeholder='Enter ZipCode' className='p-3 rounded-md m-5'
            {...register("zipcode" , {
                required: "Zipcode  is required",
                pattern: {
                     value: /^[0-9]{5}$/,
                     message: "Zip code must be 5 digits"
                }
               })} />
                 {errors.zipcode && (
                            <div className='flex items-center gap-2 ml-5'>
                           <FaExclamationCircle className='text-red-500'/>
                           <p className='text-red-500 text-[16px]'>{errors.zipcode.message}</p>
                           </div>
                           )}


          <label htmlFor='payment' className='text-white text-xl ml-5'>Payment Method</label>
          <select id='payment'  {...register('payment_method', { required: 'Payment method is required' })}
           className='p-3 rounded-md m-5  w-[60%] md:w-[40%]'>
            <option value="">Select Payment Method</option>
            <option value='COD'>Cash On Delivery</option>
            <option value='Bank Transfer'>Bank Details</option>
          </select>
          {errors.payment_method && (
         <div className='flex items-center gap-2 ml-5'>
         <FaExclamationCircle className='text-red-500'/>
          <p className='text-red-500 text-[16px]'>{errors.payment_method.message}</p>
        </div>
        )}

          {paymentMethod === 'Bank Transfer' && (
            <>
              <div className='m-5 text-xl bg-white p-2 rounded-md'>
                <p><strong>Bank Name:</strong> National Bank of Pakistan</p>
                <p><strong>Account Username:</strong> Ameer Sufyan</p>
                <p><strong>Account Number:</strong> 7543875487583457</p>
                <p><strong>Branch Code:</strong> 8658</p>
              </div>
            
            </>
          )}
          
          <label className='text-white text-xl ml-5'>Products</label>
          <textarea type='text' id='products' className='p-3 rounded-md m-5' value={combinedProductsAndQuantities()} readOnly/>

          <label className='text-white text-xl ml-5'>SubTotal</label>
          <input type='tel' id='sub-total' className='p-3 rounded-md m-5' 
           {...register('sub_total')} 
          readOnly/>

          <label className='text-white text-xl ml-5'>Shipping Charges</label>
          <input type='tel' id='shipping-charges' className='p-3 rounded-md m-5' 
           {...register('shipping_charges')} readOnly/>

          <label className='text-white text-xl ml-5'>Total Amount</label>
          <input type='tel' id='total-amount' className='p-3 rounded-md m-5' 
            {...register('total_amount')}  readOnly/>

        <button type='submit'  className={`mb-10 bg-red-500 text-white p-3 m-5 rounded-md text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {isSubmitting ? 'Processing...' : 'Continue to Checkout'}
        </button>
        </form>
        </div>
      </>
    );
  };

  export default Checkout;
