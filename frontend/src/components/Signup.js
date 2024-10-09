import "./Signup.css";
import { useState } from "react";
import { register } from "../services/authServices";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ email, password });
      console.log(response);
    } catch (error) {
      console.log(error);
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