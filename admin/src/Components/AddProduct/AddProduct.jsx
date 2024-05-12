import React, { useState } from "react";
import "./AddProduct.css";
import uploadArea from "../../assets/upload_area.svg";
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    let responseData;
    let product = productDetails;
    console.log(productDetails);
    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success?alert("Product Added Successfully"):alert("Product Not Added");
        });
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          placeholder="Type Here"
          id=""
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type Here"
            id=""
            value={productDetails.old_price}
            onChange={changeHandler}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type Here"
            id=""
            value={productDetails.new_price}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="addproduct-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : uploadArea}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          type="file"
          onChange={imageHandler}
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        className="addproduct-button"
        onClick={() => {
          addProduct();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddProduct;
