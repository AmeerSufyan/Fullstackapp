import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Cart from './cart';
import Home from './Home'
import Login from "./Login";
import Register from "./Register";
import CategoryPage from "./Categorypage";
import AboutUs from './Aboutus';
import ContactUs from './ContactUs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutBill from "./Checkoutbill";
import Checkout from "./checkout";
import Faqs from "./FaqPopup";
import ScrollToTop from "./scrollToTop";
import ForgetPwd from "./ForgetPwd";

function App(){
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const refreshCart = () => {
  fetch('http://localhost:8000/show-cart/', { credentials: 'include' })
    .then(res => res.json())
    .then(data => setCart(data.cart))
    .catch(err => console.error('Error refreshing cart:', err));
};
  useEffect(() => {
   refreshCart();
  }, []);
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
  
  return(
    <>
    <Router basename={process.env.PUBLIC_URL}>
    <ScrollToTop/>
    <div className="min-h-screen flex flex-col">
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}  cartCount={cartCount}/>  
    <div className="flex-grow">
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/aboutus" component={AboutUs}/>
    <Route
    path="/cart"
    render={(props) => (
    <Cart {...props} cart={cart} setCart={setCart} cartCount={cartCount} refreshCart={refreshCart} />
   )}
   />

      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/forgetpwd" component={ForgetPwd}/>
      <Route
      path="/products/:category_slug"
      render={(props) => (
     <CategoryPage {...props} searchTerm={searchTerm} refreshCart={refreshCart} />
      )}
      />
      <Route path="/contactus" component={ContactUs}/>
      <Route path="/checkout" component={Checkout}/>
      <Route path="/faqs" component={Faqs}/>
      <Route path="/checkoutbill" component={CheckoutBill}/>
      </Switch> 
    </div>
    <Footer/>
    </div>
    </Router>
    <ToastContainer/>
    </>
  )
}
export default App;
