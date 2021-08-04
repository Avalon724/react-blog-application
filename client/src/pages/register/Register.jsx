import "./register.css";
import { Link } from "react-router-dom";
import fire from "../../fire";
import { useState, useContext } from "react";
import { Context } from "../../context/context";
import axios from "axios";
import { url } from "../../service";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    await fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        try {
          const response = await axios.post(url + "/auth/register", {
            username,
            email,
          });
          console.log(response.data);
          dispatch({
            type: "REGISTER_SUCCESS",
            payload: { username: username, email: email },
          });
          // response.data && window.location.replace("/login");
        } catch (err) {
          console.log(err + "\n Error in posting to server!");
          // dispatch({ type: "REGISTER_FAIL" });
        }
        console.log(res?.user);
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("An account with this username already exists");
          console.log(error);
        } else {
          setError("We're having trouble signing you up. Please try again.");
          console.log(error);
        }
      });
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={registerHandler}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={({ target }) => setUsername(target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          onChange={({ target }) => setEmail(target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={({ target }) => setPassword(target.value)}
        />
        <button className="registerButton" type="submit" disabled={isFetching}>
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
