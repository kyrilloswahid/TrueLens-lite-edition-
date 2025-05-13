
// import React from 'react'
// import './SignUp.css' ;
// import { FaUser, FaLock  } from "react-icons/fa";
// import { useState } from 'react';
// import { Password } from 'primereact/password';
// import BannerBackground from "../../Assets/home-banner-background4.png";
// import Hero from "../../Assets/robot2.png"
// import {Link} from 'react-scroll';



// const SignUp = () => {

  

//   const [value, setValue] = useState('');

//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     username: '',
//     display_name: '',
//     email: '',
//     password: ''
//   });
    
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value
//         }));
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log('Submitting:', formData);

//         try {
//           const res = await fetch('http://127.0.0.1:5000/register/api/new', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//           });
    
//           const data = await res.json();
//           if (res.ok) {
//             alert(data.message || 'Account created successfully!');
//             // Clear the form
//             setFormData({
//               first_name: '',
//               last_name: '',
//               username: '',
//               email: '',
//               password: ''
//             });
//           } else {
//             alert(data.message || 'Signup failed.');
//           }
//         } catch (error) {
//           console.error(error);
//           alert('Server error. Please try again.');
//         }
//       };



//   return (
   
// <div class="background">
  
//     <div className='topright-bannerImage-container' id='SignUp'>
//                 <img src={BannerBackground} alt="" />
//             </div>
          
   
//     <div className='wrapper' >
 
//         <form onSubmit={handleSubmit}>
//             <h1>Sign Up</h1>

//             <div className="input-box">
//                 <input
//                  type="text" 
//                  name="first_name"
//                  placeholder="First Name"
//                  value={formData.first_name}
//                  onChange={handleChange} /> 
//                 <FaUser  className='icon'/>
//             </div>

//             <div className="input-box">
//                 <input 
//                 type="text" 
//                 name="last_name"
//               placeholder="Last Name"
//               value={formData.last_name}
//               onChange={handleChange} /> 
//                 <FaUser  className='icon'/>
//             </div>


//             <div className="input-box">
//                 <input type="text"
//                  name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}/> 
//                 <FaUser  className='icon'/>
//             </div>


//             <div className="input-box">
//                 <input type="text"
//                  name="display_name"
//               placeholder="display name"
//               value={formData.display_name}
//               onChange={handleChange}/> 
//                 <FaUser  className='icon'/>
//             </div>

//             <div className="input-box">
//                 <input 
//                 type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange} /> 
//             </div>

//             <div className="input-box">
//                 <input  type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange} /> 
//                 <FaLock  className='icon'/>
//             </div>


//             {/* //prime react password  */}
//             {/* 
//             <div className="card flex justify-content-center">
//             <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask  invalid />
//             </div> */}


//             <button type='submit' onClick={handleSubmit}>Create Account</button>

           
//         </form>
      
      
//     </div>        

//     <div className='Robot-banner-container'>
//                 <img src={Hero} alt="" />
//             </div>
//     </div>
    
//   )

// }

// export default SignUp















import React from "react";
import "./SignUp.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { Password } from "primereact/password";
import BannerBackground from "../../Assets/home-banner-background4.png";
import Hero from "../../Assets/robot2.png";
import { Link } from "react-scroll";

const SignUp = () => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    display_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting:", formData);

    try {
      const res = await fetch("http://127.0.0.1:5000/register/api/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data.error);
      if (data.error) alert(data.error);

      if (res.ok) {
        alert("Account created successfully!");
        // Clear the form
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
        });
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div class="background">
      <div className="topright-bannerImage-container" id="SignUp">
        <img src={BannerBackground} alt="" />
      </div>

      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <p style={{ color: "red" }}>{err}</p>

          <div className="input-box">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="display_name"
              placeholder="display name"
              value={formData.display_name}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <FaLock className="icon" />
          </div>

          {/* //prime react password  */}
          {/*
            <div className="card flex justify-content-center">
            <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask  invalid />
            </div> */}

          <button type="submit" onClick={handleSubmit}>
            Create Account
          </button>
        </form>
      </div>

      <div className="Robot-banner-container">
        <img src={Hero} alt="" />
      </div>
    </div>
  );
};

export default SignUp;