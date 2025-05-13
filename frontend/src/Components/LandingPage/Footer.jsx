import React from 'react'
import Logo1 from "../Assets/Logo1.svg"
import { SiLinkedin } from 'react-icons/si'
import { BsYoutube } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { GitHub } from '@mui/icons-material'
const Footer = () => {
  return (
    <div className='footer-wrapper'>
        <div className='footer-section-one'>
            <div className='footer-logo-container'>
                <img src={Logo1} alt="" />
            </div>


            <div className='footer-icons'>
                <SiLinkedin/>
                <BsYoutube/>
                <FaFacebookF/>
                <GitHub/>

            </div>
        </div>
        





        <div className='footer-section-two'>
            <div className='footer-section-columns'>
                <span>Quality</span>
                <span>Help</span>
                <span>Share</span>
                <span>Careers</span>
                <span>Testimonials</span>
                <span>Work</span>

            </div>


            <div className='footer-section-columns'>
                <span>0109</span>
                <span>help@gmail.com</span>
                <span>.com</span>
            </div>


            <div className='footer-section-columns'>
                <span>Terms&Conditions</span>
                <span>Privacy and Policy</span>

            </div>

            

        </div>
    </div>
  )
}

export default Footer
