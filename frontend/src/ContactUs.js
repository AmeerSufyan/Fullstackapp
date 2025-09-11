import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook,  FaExclamationCircle, FaTwitter,FaChevronDown, FaChevronUp, FaTiktok } from 'react-icons/fa';
import contactpic from './contact.jpg';
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form';

const faqs = [
  {
    question: "How soon will I get a reply?",
    answer: "Our team usually responds within 24 hours.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "Yes, you can modify or cancel orders before dispatch. Contact us ASAP.",
  },
  {
    question: "Do you offer delivery outside Islamabad?",
    answer: "Currently, our service is limited to Islamabad only. Expansion is on the way!",
  },
];

const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

   const {register,  handleSubmit, formState, reset, setError} = useForm();
   const {errors} = formState;

    const getCsrfToken = () => {
      const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
      return match ? match[2] : null;
    };
  const onSubmit = (data) => {
    console.log('form submitted')
    const csrftoken = getCsrfToken();
    fetch('http://localhost:8000/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      credentials: 'include',
      body: JSON.stringify(data)                                                                      
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
      toast.success('Message sent successfully')
      reset();
    } else if (data.error === 'This email already registered'){
      setError('email', {
        type: 'manual',
        message: 'This email already registered'
      })
    }
    else {
      toast.error('Something went wrong while contacting')
    }
  })
    .catch(error => {
      console.error(error)
      toast.error('Something went wrong')
    }
    )}
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        className="text-center mb-12 relative"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img src={contactpic} alt="Contact pic" className="w-full h-96  lg:h-[80vh] object-cover mt-14  md:mt-10" />
        <div className='absolute inset-0 bg-black/40'>
        <p className="text-white absolute flex inset-0 items-center justify-center text-2xl md:text-4xl md:px-16 font-bold px-4 text-center">
          We'd love to hear from you. Get in touch with our team today!
        </p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row md:gap-10 lg:mt-20 md:px-12 mx-5 md:mx-10">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className=" text-2xl md:text-4xl font-semibold  font-header mb-6">Reach Us At</h2>
          <div className="space-y-4 text-xl">
            <div className="flex  gap-4">
              <FaPhoneAlt className="text-black" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex gap-4">
              <FaEnvelope className="text-black" />
              <span>support@freshcart.pk</span>
            </div>
            <div className="flex gap-4">
              <FaMapMarkerAlt className="text-black" />
              <span>123 Market Road, Bahria Town, Islamabad</span>
            </div>
             <div className="flex gap-4">
              <FaFacebook className="text-black" />
              <span>www.thefreshcart.com</span>
            </div>
             <div className="flex gap-4">
              <FaTiktok className="text-black" />
              <span>www.thefreshcart.tiktok.com</span>
            </div>
             <div className="flex gap-4">
              <FaTwitter className="text-black" />
              <span>www.thefreshcart.twitter.com</span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="mt-8 text-xl py-4">
            <h3 className="text-2xl md:text-3xl py-2 font-semibold  font-header mb-2">Operating Hours</h3>
            <p>Monday – Saturday: 9:00 AM – 8:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="bg-black p-8 rounded-lg shadow-md  mt-5 font-sans text-xl w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={ handleSubmit(onSubmit)}  noValidate
        >
          <h2 className='text-white text-2xl md:text-4xl  font-bold font-header text-center'>Contact Form</h2>
          <div className="mb-4 ">
            <label className="block  font-medium mb-1 text-white">Name</label>
            <input
              type="text"
              required
              id="username"
             {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Name contain only alpphabets'
              }
             })}
  
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.username && (
            <div className='flex items-center gap-2'>
            <FaExclamationCircle className='text-red-500'/>
            <p className='text-red-500 text-[16px]'>{errors.username.message}</p>
            </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block  font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              required
               id="email"
               {...register("email" , {
                required: "Email is required",
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email  must contain  @"
                }
               })}

              className="w-full border  rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.email && (
             <div className='flex items-center gap-2'>
            <FaExclamationCircle className='text-red-500'/>
            <p className='text-red-500 text-[16px]'>{errors.email.message}</p>
            </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1 text-white">Subject</label>
            <input
              type="text"
              required
                id="subject"
               {...register("subject", {
                required: "Subject is required"
               })}
      
              className="w-full border  rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.subject && (
             <div className='flex items-center gap-2'>
            <FaExclamationCircle className='text-red-500'/>
            <p className='text-red-500 text-[16px]'>{errors.subject.message}</p>
            </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block  font-medium mb-1 text-white">Message</label>
            <textarea
              rows="4"
              required
                id="message"
               {...register("message")}
              className="w-full border  rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Google Map */}
      <div className="mt-16 md:px-12 px-5 md:mx-10">
        <h3 className="text-2xl md:text-4xl font-semibold font-header text-black mt-10">Find Us</h3>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106439.98261790033!2d73.24257515664058!3d33.52089929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed8d90921ea1%3A0x8d73126129e3e2ce!2sSave%20Mart%20Bahria%20Town!5e0!3m2!1sur!2s!4v1745921956882!5m2!1sur!2s"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          className="rounded shadow text-xl mt-10"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 md:px-12 mx-5 md:mx-10 font-sans">
      <h3 className="text-2xl md:text-4xl font-semibold font-header mb-4">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full text-left flex items-center gap-2 md:text-xl  focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
            <span className="md:text-xl">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
              <span>{faq.question}</span>
            </button>
            {openIndex === index && (
              <p className="mt-1 md:text-xl">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>

      {/* Newsletter Signup */}
      <div className="mt-16 p-4 md:p-6 rounded-3xl shadow md:px-12 mx-5 md:mx-24 lg:mx-56 flex flex-col items-center mb-20  bg-red-600 text-white">
        <h3 className="text-2xl md:text-4xl font-semibold  font-header mb-2">Stay Updated</h3>
        <p className=" mb-4 md:text-xl">Subscribe to our newsletter for latest updates and offers.</p>
        <form className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-gray-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="bg-black hover:bg-white text-white hover:text-black font-semibold px-6 py-2 rounded"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
