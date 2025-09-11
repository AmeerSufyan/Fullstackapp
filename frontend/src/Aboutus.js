import React from 'react';
import { Link} from 'react-router-dom';
import { motion } from 'framer-motion';
import aboutpic from './aboutus.avif';
import ceo1 from './ceo1.jpeg';
import ceo2 from './ceo2.jpeg';
import ceo3 from './ceo3.jpeg';
import vision from './vision.jpeg';
import mission from './mission.jpeg';
import commitment from './commitment.jpeg';
import chooseus from './chooseus.jpeg';
import {FaSmile, FaLightbulb, FaShoppingBasket, FaUsers, FaShieldAlt, FaBolt} from 'react-icons/fa';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Ahmad', role: 'Founder & CEO', img: ceo1 },
    { name: 'Arham', role: 'Head of Operations', img: ceo2 },
    { name: 'Elon Musk', role: 'Customer Success Manager', img: ceo3 },
    { name: 'Rahim', role: 'Marketing Director', img: ceo2 },
  ];

  return (
    <div className="w-full mt-16">
      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 relative">
        <img src={aboutpic} alt="About Us" className="w-full h-full object-cover   md:mt-16" />
        <div className='absolute inset-0 bg-black/30'>
        <h1 className='absolute flex inset-0 items-center justify-center font-semibold md:font-bold text-white font-header text-2xl md:text-4xl lg:text-6xl'>About Us</h1>
      </div>
      </div>

      {/* About Section */}
      <div className="md:px-10 lg:px-12 py-16 mx-5 md:mx-10 ">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold   font-header">Who We Are</h2>
          <p className="font-sans  leading-8 mb-12 mt-2">
            At <span className="font-semibold">The FreshCart</span>, we believe shopping should be stress-free, joyful, and rewarding.
            Our platform connects you to the freshest groceries and quality products while saving your valuable time. 
            Since our founding, we have dedicated ourselves to customer-centric service, innovation, and building a brand people love and trust.
            What makes us different is our unwavering focus on freshness, convenience, and community. 
           We partner with local suppliers and farmers to bring you handpicked produce and premium goods that align
            with your lifestyle and values. 
           Whether you're a busy parent, a health-conscious shopper, or someone who just loves quality food,
           The FreshCart  is designed to meet your needs.
          </p>
        </motion.div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-sans">
      {[{text: 'To deliver exceptional products and personalized service that enrich every household, making daily living simpler, healthier, and more fulfilling.',
      img: mission},
      { text: 'To revolutionize online grocery shopping by fostering trust, transparency, and innovation — creating a seamless and enjoyable customer experience from click to doorstep.',
       img: vision },
     { text: 'We are committed to sustainability, supporting local farmers and communities, and ensuring every delivery reflects our promise of quality, care, and reliability.',
      img: commitment }].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
                <img src={item.img}
                alt={item.name}
                className='w-full h-40  rounded-2xl mb-5'/>
              <p className="leading-7 ">{item.text}</p>
            </motion.div>
          ))}
        </div>
        </div>
        {/* Why choose us */}
        <div>
        <motion.div  
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="mt-10  text-xl bg-stone-200 px-6 py-10 md:px-24"
>
  <div className='grid grid-cols-1 md:grid-cols-2 gap-10 bg-stone-200'>
    <img src={chooseus} alt="chooseus" className='w-full  h-60 md:h-96 lg:h-[470px] xl:h-[400px] md:mx-auto  mb-5 rounded-2xl '/>
    <div className='space-y-3'>
    <h1 className='font-header font-bold text-2xl'>Why Choose Us</h1>
  <p className="text-xl  mb-12 leading-8">
    At <span className="font-semibold  ">The FreshCart</span>, we’re more than just an online grocery store — we’re your partners in convenience, quality, and trust.
    Here’s why our customers choose us time and time again:Shopping with FreshCart is not only easy but also cost-
    effective. Our prices are competitive, and we frequently offer deals and promotions to help you save more on your weekly groceries. Behind the scenes, our dedicated team works
     tirelessly to provide excellent customer service, making sure every order is accurate, timely, and satisfying.
  </p>
  </div>
</div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8">
    {[
      {
        title: 'Satisfaction',
        text: 'We prioritize your satisfaction by delivering premium quality products and exceptional customer service.',
        icon: <FaSmile className="text-green-600 text-4xl mb-4" />
      },
      {
        title: 'Innovation',
      text: 'Our platform is built on innovation — from user-friendly design to fast delivery logistics.',
      icon: <FaLightbulb className="text-yellow-500 text-4xl mb-4" />
      },
      {
        title: 'Selection',
      text: 'Enjoy a wide selection of curated items from trusted brands and fresh local produce.',
      icon: <FaShoppingBasket className="text-blue-500 text-4xl mb-4" />
      },
      {
        title: 'Connection',
        text: 'We foster strong community ties by working closely with local farmers and suppliers.',
        icon: <FaUsers className="text-purple-600 text-4xl mb-4" />
      },
      {
        title: 'Commitment',
        text: 'Our commitment to excellence drives us to exceed expectations at every touchpoint.',
        icon: <FaShieldAlt className="text-red-500 text-4xl mb-4" />
      },
      {
        title: 'Efficiency',
        text: 'Our streamlined operations ensure you receive your orders swiftly and without hassle.',
        icon: <FaBolt className="text-orange-500 text-4xl mb-4" />
      }
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="bg-white p-2 rounded-lg shadow-lg"
      >
        {item.icon}
        <h3 className="text-xl font-header font-semibold mb-3">{item.title}</h3>
        <p className="leading-7">{item.text}</p>
      </motion.div>
    ))}
  </div>
</motion.div>

        {/* Team Members */}
        <motion.div 
          className="mt-10 px-8 md:p-20 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl  font-semibold font-header  mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-7">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center "
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-60  h-60 md:w-70 rounded-full object-cover mb-6 shadow-lg"
                />
                <h3 className="text-xl font-semibold font-header">{member.name}</h3>
                <p className="mt-2 text-xl font-sans">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-10 bg-stone-200 p-6 md:px-24 md:py-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl  md:text-4xl   font-semibold font-header  mb-6">Join Our Family Today!</h2>
          <p className="text-xl  leading-8 mb-6">
            Start your journey towards fresher, faster, and better shopping experiences with FreshCart.
            At <span className="font-semibold"> The FreshCart</span>, we’re more than just an online grocery store — 
            we’re your partners in convenience, quality, and trust. Our mission is to make your grocery shopping 
            experience as effortless and enjoyable as possible. That’s why we go above and beyond to bring you the
             freshest produce, top-quality pantry staples, and specialty items that cater to every dietary need — 
             all delivered straight to your door.
          </p>
          <Link to="/">
            <button className="mt-4  px-8 py-3 bg-red-600 hover:bg-black text-white text-lg rounded-full transition duration-300">
              Start Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
       
  );
};

export default AboutUs;
