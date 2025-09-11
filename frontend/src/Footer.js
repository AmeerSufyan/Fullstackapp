import React from 'react';
import {Link} from 'react-router-dom';
import image from './shopping-cart_5566360.png';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaTiktok } from 'react-icons/fa';
const Footer =() => {
    return(
      <footer className='bg-black text-white py-6 w-full font-sans overflow-x-hidden'>
        <div className='flex px-6 md:px-20  justify-start flex-col text-xl mt-5'>
         <img src={image} alt="Logo" className='w-32 h-15  rounded ' />
         <p className='ml-4 font-header'>The FreshCart</p>
         </div>
        <div className='grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3   gap-7   px-6 md:px-24 xl:px-24'>
        <div className='w-full space-y-3   md:space-y-4 '>
          <h2 className='text-xl mt-7'>About Us</h2>
          <p>At <span className="font-semibold">The FreshCart</span>, we believe shopping should be stress-free, joyful, and rewarding.
            Our platform connects you to the fres hest groceries and quality products while saving your valuable time. 
           </p>
            <p className='flex items-center gap-2 '><FaMapMarkerAlt className=' mb-5 md:mb-0 lg:mb-7'/>Address: 123 Market Road, Bahria Town, Islamabad</p>
            <p className='flex items-center gap-2 '><FaPhoneAlt/>Mobile:  +92 300 1234567</p>
            <p className='flex items-center gap-2 '><FaWhatsapp/>WhatsApp:    +92 333 1234567</p>
            <p className='flex items-center gap-2 '><FaEnvelope/>Email:  support@freshcart.pk</p>
            <div className='flex gap-4 text-2xl'>
               <FaFacebook />  
              <FaInstagram />  
              <FaTwitter />
              <FaTiktok/>
              </div>
        </div>
        <div className='w-full  mt-7 md:space-y-6 lg:ml-24 xl:ml-28'>
          <h2 className='text-xl mb-2'>Popular Categories</h2>
          <div className='space-y-3' >
         <p><Link to="/category/Breakfast">Breakfast Essentials</Link></p> 
          <p><Link to="/category/Dairy">Milk & Dairy Products</Link></p>
          <p><Link to="/category/Oil_Ghee">Oil & Ghee Products</Link></p>
          <p><Link to="/category/Sauces">Sauces & Pastes</Link></p>
         <p><Link to="/category/Frozen">Frozen Products</Link></p> 
          <p><Link to="/category/Home_Need">Home Need Essentials</Link></p>
          <p><Link to="/category/Cleaning">Cleaning Essentials</Link></p>
          <p><Link to="/category/Personal_Care">Personal Care Products</Link></p> 
          </div>
        </div>
  
        <div className='w-full  mt-7  md:space-y-3 lg:ml-24 xl:ml-20'>
          <h2 className='text-xl mb-2'>Customer Support</h2>
          <div className='space-y-3'>
          <p>Contact Us</p>
          <p>Customer Feedback</p>
          <p>FAQs</p>
          <p>Customer Reviews</p>
          </div>
        </div>
        </div>
        <div className='flex flex-col ml-6 md:justify-between md:flex-row gap-2 mt-10  md:px-16 xl:px-20'>
         <p>{new Date().getFullYear()} All rights reserved </p>  
         <p className='xl:mr-6 lg:mr-10'>Powered by: AmeerSufyan</p>
      </div> 
       </footer>
    )
}
export default Footer