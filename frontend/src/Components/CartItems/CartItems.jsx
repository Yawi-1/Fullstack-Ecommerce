import React from "react";
import "./CartItems.css";
import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import {toast} from 'react-toastify'
const CartItems = () => {
  const { getTotalCartAmount,all_products,addToCart, cartItems, removeFromCart } = useContext(ShopContext);

  
  const checkout = ()=>{
    if(!localStorage.getItem('auth-token')){
      toast.info('Login to place your order......')
      return;
    }
    if(getTotalCartAmount() === 0){
      toast.warn('Your cart is empty......');
      return;
    }
    toast.success("Order Placed Successfully.......");
  }
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
        <p>Add</p>
      </div>
      <hr />
  {all_products && all_products.map((e)=>{
    if(cartItems[e.id]>0){
        return     <div key={e.id}>
        <div className="cartitems-format">
          <img src={e.image} alt="" className="carticon-product-icon"></img>
          <p>{e.name}</p>
          <p>${e.new_price}</p>
          <button className="cartitems-quantity">{cartItems[e.id]}</button>
          <p>${e.new_price*cartItems[e.id]}</p>
          <p onClick={() => {
                removeFromCart(e.id);
              }}
              className="cartItemsbuttonCart">-</p>
              <p 
              onClick={()=>{addToCart(e.id)}}
              className="cartItemsbuttonCart">+</p>
              </div>
          <hr />
        </div>
    }
    return null;  
  })}
  <div className="cartItemsDown">
    <div className="cartItemsTotal">
       <h1>Cart Totals</h1>
       <div>
        <div className="cartItemsTotal-Item">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
       </div>
       <div className="cartItemsTotal-Item">
        <p>Shipping Fee</p>
        <p>Free</p>
        <hr />
       </div>
       <div className="cartItemsTotaI-Item">
        <h3>Total</h3>
        <h3>${getTotalCartAmount()}</h3>
       </div>
    </div>
    <button onClick={checkout}>Proceed To Checkout</button>
  </div>
  <div className="cartItemsPromocode">
    <p>If you have a promo code, Enter i here</p>
    <div className="cartItemsPromobox">
      <input type="text" placeholder="Promo Code" name="" id="" />
      <button>Submit</button>
    </div>
  </div>
    </div>
  );
};

export default CartItems;
