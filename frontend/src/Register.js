import axios from './axiosconfig';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {
    const [formData, setFormData] = useState({username : "", email: "", password: ""})
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const {name ,value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
     if(!formData.username  || !formData.email || !formData.password ){
        setError("All fields are required");
        return;
     }
     try {
      const csrftoken = document.cookie.split(';').find(row => row.startsWith('csrftoken'))
      ?.split('=')[1];  
     await axios.post('http://localhost:8000/api/register/', formData, {
      headers: {
        'X-CSRFToken': csrftoken,
      }
     });
     toast.success('Account created successfully ');
       setError("");
     setFormData({
        username: "",
        email: "",
        password: ""  
     })
     }
     catch (err) {
  if (err.response) {
    console.log("Error data:", err.response.data);
    console.log("Status:", err.response.status);
    alert(err.response.data?.error || "Server responded with error.");
  } else {
    console.error("Error:", err.message);
    alert("Could not connect to server");
  }
}
    }
    
    return (
        <div className=" w-[90%] md:w-[450px] lg:w-[550px] mx-auto font-sans mt-32 md:mt-40 p-10 mb-20 bg-black rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold text-center font-header mb-6">Sign Up</h2>

          {error && <p className="text-white text-center mb-4">{error}</p>}
    
          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            <div>
              <label htmlFor="username" className="block text-lg text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 rounded-md focus:outline-none focus:ring-2 text-black"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md focus:outline-none focus:ring-2 text-black"
                placeholder="Enter your Email"
              />
            </div>
    
            <div>
              <label htmlFor="password" className="block text-lg text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3  rounded-md focus:outline-none focus:ring-2 text-black"
                placeholder="Enter your password"
              />
            </div>
    
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white rounded-md
                 hover:bg-red-700 focus:outline-none focus:ring-2"
              >
                Register
              </button>
        </div>
        <div className='text-white'>Already have an account? <Link to="/login">Login</Link></div>
    </form>
   </div>
    )
}
export default Register