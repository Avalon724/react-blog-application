import { Link } from "react-router-dom";
import { useState } from "react";
import "./topbar.css";
import fire from "../../fire";

export default function Topbar() {
  const [ham, setHam] = useState("hamburger");
  const [topList, setTopList] = useState("topList");
  const [topListItem, setTopListItem] = useState("topListItem");
  const [state, setState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuHandler = () => {
    if (state) setState(false);
    else setState(true);
    menuCorrectionHandler();
  };

  const menuCorrectionHandler = () => {
    if (state) {
      setHam("hamburger active");
      setTopList("topList active");
      setTopListItem("topListItem active");
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      setHam("hamburger");
      setTopList("topList");
      setTopListItem("topListItem");
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
    }
  };

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  const user = isLoggedIn;

  const signOut = () => {
    fire.auth().signOut();
    window.location.replace("/");
  };

  return (
    <div className="top">
      <button className={ham} onClick={menuHandler}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className="topLeft">
        <Link className="link" to="/">
          LOGO
        </Link>
      </div>
      <div className="topCenter">
        <ul className={topList}>
          <li className={topListItem} onClick={menuHandler}>
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className={topListItem} onClick={menuHandler}>
            ABOUT
          </li>
          <li className={topListItem} onClick={menuHandler}>
            CONTACT
          </li>
          <li className={topListItem} onClick={menuHandler}>
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li className={topListItem} onClick={signOut}>
              LOGOUT
            </li>
          )}
          {!user && (
            <li className={topListItem} onClick={menuHandler}>
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
          )}
          {!user && (
            <li className={topListItem} onClick={menuHandler}>
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : // <ul className="topList">
        //   <li className="topListItem">
        //     <Link className="link" to="/login">
        //       LOGIN
        //     </Link>
        //   </li>
        //   <li className="topListItem">
        //     <Link className="link" to="/register">
        //       REGISTER
        //     </Link>
        //   </li>
        // </ul>
        null}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
