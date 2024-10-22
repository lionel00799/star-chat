import "./Signup.css";
import { useState } from "react";
import { register } from "../services/authServices";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notifications = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ email, password });
      console.log(response);

      notifications.show("Registration successful!", {
        severity: "success",
        autoHideDuration: 3000,
      });

      navigate("/login");
      
    } catch (error) {
      console.log(error);

      if (error.status === 401) {
        notifications.show("User already exists!", {
          severity: "info",
          autoHideDuration: 3000,
        });
      }
    }
  };

  return (
    <div>
      <div className="sign-background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form className="sign-field" onSubmit={handleSubmit}>
        <h3>Register Your Account</h3>
        <label htmlFor="username" className="sign-label">
          Username
        </label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          className="sign-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="sign-label">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="sign-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password" className="sign-label">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="password"
          className="sign-input"
        />
        <button className="sign-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;