import React, { useState } from "react";
import "./Css/LoginSignup.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const LoginSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState("Log In");
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Log in ", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
      console.log(responseData);
      if(responseData.success){
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      }
      else{
        alert(responseData.errors);
      }
  };
  const signup = async () => {
    console.log("Sign in ", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
      console.log(responseData);
      if(responseData.success){
        localStorage.setItem("auth-token", responseData.authToken);
        window.location.replace("/");
      }
      else{
        alert(responseData.errors);
      }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              value={formData.username}
              onChange={changeHandler}
              name="username"
              id=""
              placeholder="Your Name"
            />
          ) : (
            ""
          )}
          <input
            type="email"
            name="email"
            id=""
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id=""
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
          />
          <div
            className="showPassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <input
            id="loginbutton"
            type="submit"
            value="Continue"
            onClick={state === "Sign Up" ? signup : login}
          />
        </div>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span
              onClick={() => {
                setState("Log In");
              }}
            >
              {" "}
              Log In
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Don't have an account?
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              {" "}
              Sign Up
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
