import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import video1 from './ecommerce_videos.mp4';
import image1 from './oil.jpeg';
import image2 from './rice.jpeg';
import image3 from './roohafza.jpeg';
import image4 from './organic apple.jpeg';
import image5 from './bread1.jpeg';
import storeImage from './grocerystore.jpg';
import deal2 from './kabab.jpeg';
import deal3 from './oil.jpeg';
import deal4 from './organic apple.jpeg';
import deal5 from './skincare.jpeg';
import deal6 from './spreads.jpeg';
import deal7 from './crockery.jpeg';
import deal8 from './cook-paste.jpeg';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/api/categories/')
    .then(response => response.json())
    .then(data => setCategories(data))
    .catch(error => console.error(error))
  }, [])

  const deals_images = [{img: deal2, name: 'Kabab & Kofta', text: 'Special Deal: 15% Off'},
    {img: deal3,  name: 'Cooking Oil', text: 'Special Deal: 30% Off'},
    {img: deal4, name: 'Organic Apple Jam', text: 'Special Deal; 10% Off'},
    {img: deal5, name: 'Skin Care', text: 'Special Deal; 25% Off'},
    {img: deal6, name: 'Spreads', text: 'Special Deal; 25% Off'},
    {img: deal7, name: 'Crockery', text: 'Special Deal; 15% Off'},
    {img: deal8, name: 'Sauces', text: 'Special Deal; 5% Off'},
  ]

   const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
         responsive: [
    {
      breakpoint: 1024, // For tablets and smaller desktops
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768, // For tablets and large phones
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  autoplay: true,
  autoplaySpeed: 3000
  
       }
    return (
        <>
        <div className='w-full md:h-[70vh] lg:h-[100vh] h-[70vh] mt-10 relative'>
     <video className='w-full h-full object-cover ' src={video1} autoPlay muted loop>
     </video>
     <div className='absolute inset-0 bg-black/40'>
     <p className='absolute flex inset-0 items-center justify-center text-2xl md:text-4xl lg:text-6xl text-white font-bold  px-4'>
  Fresh Groceries Delivered Fast
</p>
</div>
     </div>  
     <h2 className=" text-2xl md:text-4xl font-semibold text-center mb-10 mt-20 font-header">Trending Products</h2>
     <div className=' w-full flex items-center justify-center gap-8 mt-10 overflow-hidden '>
        <div className='moveRight '>
        <div className='w-60 bg-white p-4 rounded flex flex-col items-center'>
    <img src={image1} alt='Oil' className='w-full h-40 object-cover'/>
    <p className='text-lg mt-2 font-semibold'>Sunflower Oil</p>
    <p>RS: 500 / Litre</p>
  </div>
  <div className='w-60 bg-white shadow-md p-4 rounded flex flex-col items-center'>
    <img src={image2} alt='Rice' className='w-full h-40 object-cover'/>
    <p className='text-lg mt-2 font-semibold'>Basmati Rice</p>
    <p>RS: 300 / Kg</p>
  </div>
  <div className='w-60 bg-white shadow-md p-4 rounded flex flex-col items-center'>
    <img src={image3} alt='Rice' className='w-full h-40 object-cover'/>
    <p className='text-lg mt-2 font-semibold'>Rooh Afza</p>
    <p>RS: 450 / Litre</p>
  </div>
  <div className='w-60 bg-white shadow-md p-4 rounded flex flex-col items-center'>
    <img src={image4} alt='Rice' className='w-full h-40 object-cover'/>
    <p className='text-lg mt-2 font-semibold'>Organic Apple Jam</p>
    <p>RS: 500 </p>
  </div>
  <div className='w-60 bg-white shadow-md p-4 rounded flex flex-col items-center'>
    <img src={image5} alt='Rice' className='w-full h-40 object-cover'/>
    <p className='text-lg mt-2 font-semibold'>Bread</p>
    <p>RS: 200</p>
  </div>
     </div>
     </div>
{/* Weekly Deals Section */}
<h2 className="text-2xl md:text-4xl font-semibold text-center mt-20 font-header">Weekly Deals</h2>

 <div className='mt-10  px-8  md:px-24 lg:px-20  bg-black '>
  <div className='relative '>
    <Slider  {...settings} >
    {deals_images.map((img, index) => (
      <div key={index}  className='p-7'>
        <div >
        <img src={img.img} className='w-full md:w-[550px] h-80' alt={`Project ${index}`} />
      <div className='bg-white text-black flex flex-col items-center pb-5'>
        <strong  className='text-xl'>{img.name}</strong>
        <p className='text-xl'>{img.text}</p>
        </div>
        </div>
        </div>
    ))}
    </Slider>
  </div> 
</div>


   <h2 className="text-2xl font-semibold md:text-4xl  text-center mt-20 font-header">Categories</h2>
<h3 className="text-center text-xl mt-4  px-4 md:px-10 font-sans">
  Browse essentials by category and discover new favorites
</h3>

<div className="flex flex-wrap justify-center gap-7 mt-10 px-4 md:px-6 font-sans">
  {categories.map(categ => 
  <Link to={`/products/${categ.slug}`} key={categ.id} className="block  w-[330px]  md:w-[280px] lg:w-[260px] xl:w-[250px] h-[300px] bg-stone-200">
    <div  className="flex flex-col items-center  border border-gray-400 p-5 h-full">
      <div className="w-full  overflow-hidden rounded">
        <img
          src={`http://localhost:8000${categ.image}`}
          alt=""
          className="w-full h-full object-cover mix-blend-multiply aspect-square transition-transform duration-300 hover:scale-105"
        />
      </div>
      <p className="mt-4 text-center ">{categ.name}</p>
    </div>
  </Link>
)}
</div>

<div className="flex flex-col md:flex-row items-center mb-10 mt-20  px-6 md:px-20 lg:px-24 bg-stone-200 py-10">
  <img src={storeImage} alt="" className="w-full md:w-1/2 h-[350px] md:h-[500px] lg:h-[350px] xl:h-[300px] object-cover" />
  <div className="w-full md:w-1/2 px-0 md:px-10 xl:px-12 ">
    <h2 className="text-2xl font-semibold md:text-4xl  mb-3 mt-4 font-header">Your Friendly Grocery Store</h2>
    <p className="font-sans">
      Discover everything you need for your home and family—all in one place.
      From fresh produce and dairy to snacks, frozen foods, personal care products,
      and cleaning essentials, our grocery store offers high-quality products at great prices.
      We’re committed to providing an excellent shopping experience, with fast checkout,
      friendly service, and regular promotions to help you save more.
    </p>
  </div>
</div>

<section className="bg-gray-50 py-6 px-6 md:px-12 mb-10">
  <h2 className=" text-2xl md:text-4xl font-semibold font-header  text-center mb-10">What Our Customers Are Saying</h2>
  <div className="w-full  px-0">
    <div className="flex flex-col md:flex-row  gap-4 px-0 md:px-10">
      
      {/* Review 1 */} 
      <div className="bg-white p-6 rounded-lg shadow-2xl  w-full  ">
        <p className="mb-4">"Amazing products, great quality! I love the organic apple jam. Delivered on time as promised."</p>
        <p className="font-semibold">Sufyan</p>
        <div className="text-yellow-400 mt-2">
          <span>⭐⭐⭐⭐⭐</span>
        </div>
      </div>

      {/* Review 2 */}
      <div className="bg-white p-6 rounded-lg shadow-2xl  w-full ">
        <p className="mb-4">"Quick and easy shopping experience. The bread I ordered was fresh and delicious!"</p>
        <p className="font-semibold">Hifzain</p>
        <div className="text-yellow-400 mt-2">
          <span>⭐⭐⭐⭐⭐</span>
        </div>
      </div>

      {/* Review 3 */}
      <div className="bg-white p-6 rounded-lg shadow-2xl  w-full ">
        <p className="mb-4">"Great prices and friendly customer service. I highly recommend this store!"</p>
        <p className="font-semibold ">Shawaiz</p>
        <div className="text-yellow-400 mt-2">
          <span>⭐⭐⭐⭐</span>
        </div>
      </div>
    </div>
  </div>
</section>

     </>
    )
}
export default Home;