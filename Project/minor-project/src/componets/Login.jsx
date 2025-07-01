import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setShowLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("Farmer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5002/api/auth/login"
      : "http://localhost:5002/api/auth/register";
    const data = isLogin ? formData : { ...formData, role };

    try {
      const response = await axios.post(url, data);

      if (!isLogin) {
        alert("Registration successful! Please login.");
        setIsLogin(true);
        return;
      }

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Navigate based on role
      if (role === "Farmer") {
        navigate("/fsd");
      } else {
        navigate("/product");
      }
    } catch (error) {
      console.error(error.response?.data || "Error");
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button className="close-btn" onClick={() => setShowLogin(false)}>
          ×
        </button>
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <p className="subtitle">
          {isLogin ? "Log in to your account" : "Create a new account"}
        </p>

        {!isLogin && (
          <div className="role-selector">
            <label className={role === "Farmer" ? "active" : ""}>
              <input
                type="radio"
                name="role"
                value="Farmer"
                checked={role === "Farmer"}
                onChange={(e) => setRole(e.target.value)}
              />
              Farmer
            </label>
            <label className={role === "Consumer" ? "active" : ""}>
              <input
                type="radio"
                name="role"
                value="Consumer"
                checked={role === "Consumer"}
                onChange={(e) => setRole(e.target.value)}
              />
              Consumer
            </label>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p className="switch">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;







// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [role, setRole] = useState("Farmer");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isLogin
//       ? "http://localhost:5002/api/auth/login"
//       : "http://localhost:5002/api/auth/register";
//     const data = isLogin ? formData : { ...formData, role };

//     try {
//       const response = await axios.post(url, data);

//       if (!isLogin) {
//         alert("Registration successful! Please login.");
//         setIsLogin(true);
//         return;
//       }

//       const { token, role } = response.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // Navigate based on role
//       if (role === "Farmer") {
//         navigate("/fsd");
//       } else {
//         navigate("/product");
//       }
//     } catch (error) {
//       console.error(error.response?.data || "Error");
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password
//       });
      
//       // Save JWT token to localStorage
//       localStorage.setItem('token', response.data.token);
//       alert('Login successful');
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <img src="/logo.png" alt="Logo" className="logo" />
//         <h2>{isLogin ? "Login" : "Sign Up"}</h2>
//         <p className="subtitle">
//           {isLogin ? "Log in to your account" : "Create a new account"}
//         </p>

//         {!isLogin && (
//           <div className="role-selector">
//             <label className={role === "Farmer" ? "active" : ""}>
//               <input
//                 type="radio"
//                 name="role"
//                 value="Farmer"
//                 checked={role === "Farmer"}
//                 onChange={(e) => setRole(e.target.value)}
//               />
//               Farmer
//             </label>
//             <label className={role === "Consumer" ? "active" : ""}>
//               <input
//                 type="radio"
//                 name="role"
//                 value="Consumer"
//                 checked={role === "Consumer"}
//                 onChange={(e) => setRole(e.target.value)}
//               />
//               Consumer
//             </label>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Name"
//               required
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Email address"
//             required
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//           />
//           <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
//         </form>

//         <p className="switch">
//           {isLogin ? (
//             <>
//               Don't have an account?{" "}
//               <span onClick={() => setIsLogin(false)}>Sign up</span>
//             </>
//           ) : (
//             <>
//               Already have an account?{" "}
//               <span onClick={() => setIsLogin(true)}>Login</span>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
