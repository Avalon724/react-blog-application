import "./login.css";
import { Link } from "react-router-dom";
import fire from "../../fire";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    await fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        if (!res.user) {
          setError("We're having trouble logging you in. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/wrong-password") {
          setError("Username or password is invalid");
        } else if (err.code === "auth/user-not-found") {
          setError("No account for this username");
        } else {
          setError("Something went wrong :(");
        }
      });
    console.log(error);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={loginHandler}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          onChange={({ target }) => setEmail(target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          onChange={({ target }) => setPassword(target.value)}
        />
        <button className="loginButton">Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
