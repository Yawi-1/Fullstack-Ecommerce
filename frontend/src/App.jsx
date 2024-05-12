import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignUp from "./Pages/LoginSignUp";
import Footer from "./Components/Footer/Footer";
import kids_banner from "./Components/Assets/banner_kids.png";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kids_banner} category="kid" />}
        />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
