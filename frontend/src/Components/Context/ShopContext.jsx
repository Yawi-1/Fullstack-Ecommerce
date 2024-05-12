import React, { createContext, useEffect, useState } from "react";
import all_products from "../Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};

  for (let i = 0; i < all_products.length+1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  // const [all_products,setAllProduct]=useState([])
  const [cartItems, setCartItems] = useState(getDefaultCart());

  //  useEffect(()=>{
  //    fetch('http://localhost:4000/allproducts')
  //    .then((res)=>(res.json()))
  //    .then((data)=>{setAllProduct(data)});
  //  },[])


  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body: '',
        })
            .then((res) => res.json())
            .then((data) => {
                setCartItems(data);
            });
    }
}, [])

    
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({'itemId':itemId})
      })
      .then((res)=>res.json())
      .then((data)=>console.log(data))
    }
  };


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({'itemId':itemId})
      })
      .then((res)=>res.json())
      .then((data)=>console.log(data))
    }
  };

   const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo = all_products.find((product)=>product.id === Number(item))
        totalAmount+=itemInfo.new_price*cartItems[item]
      }
    }
    return totalAmount;
   }
   const getTotalItems = ()=>{
    let totalItem = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        totalItem+=cartItems[item];
      }
    }
    return totalItem;
   }
  const contextVal = { getTotalItems,all_products,getTotalCartAmount, cartItems, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextVal}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
