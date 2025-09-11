import React, {useState} from 'react';
const ForgetPwd = () => {
    const [formData, setFormData] = useState({email: ""});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
   <div>
    <div className="w-[90%] md:w-[450px] lg:w-[550px] mx-4 md:mx-auto mt-32 md:mt-40 p-10 mb-20 bg-black rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold text-center mb-6">Forget Password</h2>    
          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
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
                placeholder="Enter your registered email"
                required
              />
            </div>
    
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white rounded-md
                 hover:bg-red-700 focus:outline-none focus:ring-2"
              >
                Send Reset Link
              </button>
        </div>   
</form>
</div>
   </div>
    )
}
export default ForgetPwd;