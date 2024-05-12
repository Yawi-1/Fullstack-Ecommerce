import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navprofile from '../../assets/nav-profile.svg'
const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={navlogo} className='nav-logo' alt="" />
            <img src={navprofile} className='nav-profile' alt="" />
        </div>
    )
}

export default Navbar
