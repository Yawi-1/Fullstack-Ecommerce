import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalItems} = useContext(ShopContext);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>setMenu('shop')}><Link to='/'>Shop</Link> {menu==='shop'? <hr/>:''}</li>
        <li onClick={()=>setMenu('mens')}><Link to='/mens'>Mens</Link> {menu==='mens'?<hr/>:''}</li>
        <li onClick={()=>setMenu('womens')}><Link to='/womens'>Womens</Link> {menu==='womens'?<hr/>:''}</li>
        <li onClick={()=>setMenu('kids')}><Link to='/kids'>Kids</Link> {menu==='kids'?<hr/>:''}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token'),window.location.replace('/')}}>Logout</button>: <Link to='/login'> <button onClick={()=>setMenu('')}>Login</button></Link>}
     
        <Link onClick={()=>setMenu('')} to='/cart'><img src={cart_icon} /> </Link>
        <div className="nav-car-count">{getTotalItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
