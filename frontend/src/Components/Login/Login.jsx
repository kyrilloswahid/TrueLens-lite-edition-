
// import React from 'react'
// import './Login.css' ;
// import { FaUser, FaLock  } from "react-icons/fa";
// import BannerBackground from "../../Assets/home-banner-background4.png";
// import Hero from "../../Assets/robot2.png"
// import {Link} from 'react-router-dom';



// const Login = () => {

  
//   return (
   
// <div class="background" id='login'>
    
// <div className='topright-bannerImage-container'>
//                 <img src={BannerBackground} alt="" />
//             </div>

//     <div className='wrapper' >

//         <form action="">
//             <h1>Login</h1>

//             <div className="input-box">
//                 <input type="text" placeholder='UserName' /> 
//                 <FaUser  className='icon'/>
//             </div>

//             <div className="input-box">
//                 <input type="password" placeholder='Password' /> 
//                 <FaLock  className='icon'/>
//             </div>

//             <div className="remember-forget">
              
//               <label htmlFor="">
//               <input type="checkbox" />

//                 Remember Me
               
//               </label>
//               <a href="#">Forgot Password?</a>
//             </div>

//             <button type='submit'>Login</button>

//             <div className="registration-link">
//                 <p>Don't have an account?
//                     {/* <a href="#">Register</a> */}
//                      <Link
//                         to="/login/SignUp"         // ID of the element to scroll to
//                         smooth={true}        // Enables smooth scrolling
//                         duration={500}       // Optional: Duration of scroll in ms
//                         spy={true}           // Optional: Adds active class when target is in view
//                       >
//                         Register
//                       </Link>
//                 </p>
//             </div>
//         </form>
      
//     </div>

//     <div className='Robot-banner-container'>
//                 <img src={Hero} alt="" />
//             </div>
            
//     </div>
    
//   )

// }

// export default Login






import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import BannerBackground from "../../Assets/home-banner-background4.png";
import Hero from "../../Assets/robot2.png";
import { Link } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      identifier,
      password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/login/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Login successful!');
        console.log('Response:', data);

        // Optionally store token or redirect
        // localStorage.setItem('token', data.token);
        // navigate('/dashboard');
      } else {
        alert(`❌ Login failed: ${data.error || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert( '⚠️ Server error. Please try again later.',error);
    }
  };

  return (
    <div className="background" id='login'>
      <div className='topright-bannerImage-container'>
        <img src={BannerBackground} alt="" />
      </div>

      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder='Username or Email'
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>

          <div className="remember-forget">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type='submit'>Login</button>

          <div className="registration-link">
            <p>Don't have an account? <Link to="/login/SignUp">Register</Link></p>
          </div>
        </form>
      </div>

      <div className='Robot-banner-container'>
        <img src={Hero} alt="" />
      </div>
    </div>
  );
};

export default Login;




