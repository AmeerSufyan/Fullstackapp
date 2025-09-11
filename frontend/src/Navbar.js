import React, { useRef, useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import image from './shopping-cart_5566360.png';
import { FaBars, FaTimes, FaShoppingCart,FaChevronUp, FaChevronDown, FaSearch, FaUser } from 'react-icons/fa';
import Faqs from './FaqPopup';

const Navbar = ({ searchTerm, setSearchTerm, cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSeleted] = useState(null);
  const [searchBar, setSearchBar] = useState(false);
  const [categories, setCategoryData] = useState([]);

useEffect(() => {
  fetch('http://localhost:8000/api/categories/')
  .then(response => response.json())
  .then(data => setCategoryData(data))
  .catch(error => console.error(error))
}, [])  
  const dropDown = useRef(null);
  // For Faqs
  const [showFaq, setShowFaq] = useState(false);
  const faqButtonRef = useRef(null); // Reference for the FAQ button
  const [faqPosition, setFaqPosition] = useState({ top: 0, left: 0 });
  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleOptionClick = () => {
    setSeleted();
    setIsOpen(false); //closes dropdown on click
  };
  const handleFaqClick = () => {
    // closes drop down menu
    setMenuOpen(false)
    const rect = faqButtonRef.current.getBoundingClientRect();
    setFaqPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowFaq(true); // Show the FAQ popup
  };
  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropDown.current && !dropDown.current.contains(event.target)){
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return  () => document.removeEventListener('mousedown', handleClickOutside); 
  }, []);

  return (
    <>
    <header className="flex  bg-black text-white items-center justify-between font-sans fixed w-full z-50 px-4  md:py-0 md:px-10">
 <div className="flex items-center space-x-2 ml-1 md:ml-11">
  <img src={image} alt="Logo" className="w-12 h-16 object-contain" />
  <div className="leading-tight font-header">
    <p className="text-xs text-white mb-[-6px] ">The</p>
    <p className="text-lg font-semibold text-white">FreshCart</p>
  </div>
</div>

  {/* Nav Links Container */}
  <div
  className={`${
    menuOpen
      ? 'flex flex-col space-y-4 px-6 py-4 bg-black w-full absolute top-full left-0 z-40 lg:static lg:flex-row lg:space-y-0 lg:p-0'
      : 'hidden lg:flex'
  } flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-6 lg:mx-10`}>

     <div  className='flex flex-col md:ml-16 lg:flex-row lg:space-x-5 xl:ml-40'>

    <NavLink exact to="/" onClick={() => setMenuOpen(false)} activeClassName="text-red-500">
      Home
    </NavLink>
    <NavLink to="/aboutus" onClick={() => setMenuOpen(false)} activeClassName="text-red-500">
      About
    </NavLink>
    {/* Categories Dropdown */}
    <div ref={dropDown} className="relative">
      <button onClick={toggleDropDown} className="flex gap-1 items-center">
        {selected || 'Categories'}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <ul className="absolute text-white bg-black rounded-md mt-2 shadow-lg p-2 w-48 z-50">
          {categories.map((category) => (
            <li key={category.id} className="p-1 cursor-pointer rounded">
              <NavLink
                to={`/products/${category.slug}`}
                onClick={handleOptionClick}
                activeClassName="text-red-500"
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* FAQ Button */}
    <button
      ref={faqButtonRef}
      onClick={handleFaqClick}
      className=" text-left"
    >
      FAQ
    </button>
     <NavLink to="/contactus" onClick={() => setMenuOpen(false)} activeClassName="text-red-500">
      Contact
    </NavLink>
    </div>
    </div>  
  {/* FAQ Modal */}
  <Faqs isOpen={showFaq} onClose={() => setShowFaq(false)} position={faqPosition} />
    <div className='flex gap-4 ml-24 md:mr-[-24px] md:space-x-3 '>   
       {searchBar ? <FaTimes className='text-white mt-2 md:mt-3 text-xl ' onClick={() => setSearchBar(false)}/>: 
       <FaSearch className='text-white mt-2 md:mt-3 text-xl' onClick={() => setSearchBar(!searchBar)}/>}
      <NavLink to="/cart" className="text-white  text-xl flex items-center gap-1">
      <FaShoppingCart />
      <sup>{cartCount}</sup>
      </NavLink>
      <button className="lg:hidden text-2xl text-white ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
       <NavLink
      to="/login"
      onClick={() => setMenuOpen(false)}
      className="py-2 w-24 text-xl "
    >
      <FaUser/>
    </NavLink>
    
  </div>
</header>
 
  {searchBar && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center ">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-[70vw] px-4 py-6 rounded-full    bg-white  focus:outline-none"
      autoFocus
    />
    </div>
  )}
    </>
    
  );
}

export default Navbar;
