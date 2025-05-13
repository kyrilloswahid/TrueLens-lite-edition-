import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




// primereact configurations
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Flex utilities
import 'primeflex/primeflex.css'


// for routing 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/LandingPage/Home';
import About from './Components/LandingPage/About';
import Login  from './Components/Login/Login';
import Signup from './Components/SignUp/SignUp'
import  Image  from './Components/LandingPage/Image';
import Audio from './Components/LandingPage/Audio_test2'
import Contact from './Components/LandingPage/Contact';
import Footer from './Components/LandingPage/Footer';
const router = createBrowserRouter([
  {
    path:'/home',
    element:(
    <>
     <Home/>
     <About/>
     {/* <Signup/> */}
     <Image/>
     <Audio/>
      <Contact/>
     <Footer/>
    </>
     
    ),
    errorElement:<div>Error 404 Not found</div>
  },
  {
    path:'/login',
    element:<Login/>,

  },
  {
    path:'/login/SignUp',
    element:<Signup/>,

  }
]);




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
