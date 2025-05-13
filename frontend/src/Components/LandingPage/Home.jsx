import React from 'react'
import NavBar from './NavBar'
import BannerBackground from "../../Assets/home-banner-background3.png";
// import BannerImage from "../Assets/home-banner-image.png";
import Hero from "../../Assets/robot2.png"
import {FiArrowRight} from "react-icons/fi"
import './LandingPage.css'


const Home = () => {
  return (
    
    <div className='home-container' id="Home">
      <NavBar/>

        <div className='home-banner-container'>

            <div className='home-bannerImage-container'>
                <img src={BannerBackground} alt="" />
            </div>


            <div className='home-text-section'>
                <h1 className='primary-heading'>
                    Hi
                </h1>
               

                <div className='safe'>
                </div>
                <p className='primary-text'>
                Unleash the power of authenticity with our cutting-edge AI content detection tool.
                </p>

                <p className='primary-text'>
                Whether you're verifying originality, ensuring academic integrity, or maintaining trust in your brand, our platform uses advanced algorithms to accurately identify AI-generated text.
                </p>

                <p className='primary-text'>
                Fast, reliable, and user-friendly,it's your go-to solution for spotting the difference between human creativity and machine-generated content.
                </p>

                


                <button className='secondary-button'>
                    Try Now <FiArrowRight/>
                </button>
            </div>

            <div className='home-image-container'>
                <img src={Hero} alt="" />
            </div>


        </div>




    </div>



    
    

  );
};

export default Home
