import "./Login.css";
import GoogleIcon from '../assets/icons/google-brands-solid.svg'
import OutlookIcon from '../assets/icons/envelope-open-regular.svg'
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit" className="btn">Log In</button>
        <div className="signup">
          <Link to="/register">Don't have an account? Sign Up</Link>
        </div>
        <div className="social">
          <div className="go">
            <img src={GoogleIcon} alt="google-icon" className="social-icon"/>
            <span className="social-text">Google</span>
          </div>
          <div className="ol">
            <img src={OutlookIcon} alt="outlook-icon" className="social-icon"/>
            <span className="social-text">Outlook</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
