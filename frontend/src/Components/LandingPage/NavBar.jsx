import React, { useState } from 'react';
import Logo1 from "../../Assets/Logo1.svg";
// shopping cart
// import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";

// It provides a comprehensive collection of pre-built, customizable, 
// and reusable components to help developers build modern, responsive, and visually appealing user interfaces quickly.

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { colors } from '@mui/material';
import {Link} from 'react-scroll';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    // const navigate = useNavigate(); 
    // const goToLogin = () => {
    //   navigate('/login'); // This matches your route path
    // };
    const navigate = useNavigate(); 
    const goToLogin = () => {
      navigate('/login'); // This matches your route path
    };


  
    const [openMenu,setOpenMenu]= useState(false);
    const menuOptions=[
        {
            text:"Home",
            icon:<HomeIcon/>,
        },
        {
            text:"About",
           
            icon:<InfoIcon/>
        },
        {
            text:"Testimonals",
            icon:<CommentRoundedIcon/>,
        },
        {
            text:"Contact",
            icon:<PhoneRoundedIcon/>,
        },
        {
            text:"Cart",
            icon:<ShoppingCartRoundedIcon/>,
        },
    ];



  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo1} alt="" />
      </div>  

      
      <div className="navbar-links-container">
       
      {/* <Link
          to="Home"         // ID of the element to scroll to
          smooth={true}        // Enables smooth scrolling
          duration={500}       // Optional: Duration of scroll in ms
          spy={true}           // Optional: Adds active class when target is in view
        >
        <a href="" >Home</a>
      </Link> */}

      <Link
          to="About"         // ID of the element to scroll to
          smooth={true}        // Enables smooth scrolling
          duration={500}       // Optional: Duration of scroll in ms
          spy={true}           // Optional: Adds active class when target is in view
        >
        <a href="">About</a>
        </Link>

        <Link
          to="Image"         // ID of the element to scroll to
          smooth={true}        // Enables smooth scrolling
          duration={500}       // Optional: Duration of scroll in ms
          spy={true}           // Optional: Adds active class when target is in view
        >
          <a href="">Image</a> 
        </Link>



        <Link
          to="Testimonials"         // ID of the element to scroll to
          smooth={true}        // Enables smooth scrolling
          duration={500}       // Optional: Duration of scroll in ms
          spy={true}           // Optional: Adds active class when target is in view
        >
        <a href="">Testimonals</a>
        </Link>

        <Link
          to="Contact"         // ID of the element to scroll to
          smooth={true}        // Enables smooth scrolling
          duration={500}       // Optional: Duration of scroll in ms
          spy={true}           // Optional: Adds active class when target is in view
        >
          <a href="">Contact</a> 
        </Link>
       

       

        <a href="">
            {/* <BsCart2 className="navbar-cart-icon" /> */}
        </a>
        <button className='primary-button' onClick={goToLogin}>Login</button>
      </div>




      <div className="navbar-menu-container">
      {/* used to indicate a navigation menu or dropdown in user interfaces. */}
        <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
      </div>



    {/* responsive navbar for small screen */}


      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
        //   role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {/* for iteration over items */}
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>  
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default NavBar











