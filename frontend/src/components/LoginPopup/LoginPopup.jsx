// import React, { useContext, useState } from "react";
// import "./LoginPopup.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// // import * as jwt_decode from "jwt-decode";
// // import { decode } from "jwt-decode";

// const LoginPopup = ({ setShowLogin }) => {
//   const { url, setToken } = useContext(StoreContext);
//   const [currState, setCurrState] = useState("Login");
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const onLogin = async (event) => {
//     event.preventDefault();
//     let newUrl = url;
//     if (currState === "Login") {
//       newUrl += "/api/user/login";
//     } else {
//       newUrl += "/api/user/register";
//     }
//     const response = await axios.post(newUrl, data);
//     console.log(response.data);
//     if (response.data.success) {
//       const { token } = response.data;
//       setToken(token);
//       localStorage.setItem("token", token);
//       // const decoded = jwt_decode(token);
//       // const userId = decoded.userId || decoded.id || decoded._id;
//       // localStorage.setItem("userId", user.userId);
//       setShowLogin(false);
//     } else {
//       alert(response.data.message);
//     }
//   };

//   return (
//     <div className="login-popup">
//       <form onSubmit={onLogin} action="" className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img
//             onClick={() => setShowLogin(false)}
//             src={assets.cross_icon}
//           ></img>
//         </div>
//         <div className="login-popup-inputs">
//           {currState === "Login" ? (
//             <></>
//           ) : (
//             <input
//               name="name"
//               onChange={onChangeHandler}
//               value={data.name}
//               type="text"
//               placeholder="Enter your name"
//               required
//             />
//           )}

//           <input
//             name="email"
//             onChange={onChangeHandler}
//             value={data.email}
//             type="email"
//             placeholder="Enter your email"
//             required
//           />
//           <input
//             name="password"
//             onChange={onChangeHandler}
//             value={data.password}
//             type="password"
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <button type="submit">
//           {currState === "Sign Up" ? " Create account" : "Login"}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, i agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState === "Login" ? (
//           <p>
//             Create a new account?
//             <span onClick={() => setCurrState("Sign Up")}> Click here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?
//             <span onClick={() => setCurrState("Login")}> Login here</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;

import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Helper function to decode the JWT token manually
  const decodeToken = (token) => {
    const payload = token.split(".")[1]; // Get the payload part (middle part)
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/")); // Base64 decode
    return JSON.parse(decoded); // Convert from string to JSON
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    console.log(response.data);

    if (response.data.success) {
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);

      // Decode the token manually
      try {
        const decoded = decodeToken(token); // Decode manually
        const userId = decoded.userId || decoded.id || decoded._id; // Ensure you use the correct field
        localStorage.setItem("userId", userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }

      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
          ></img>
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? " Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
