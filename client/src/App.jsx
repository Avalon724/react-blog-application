import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import fire from "./fire";
// import { useState } from "react";
import { Context } from "./context/context";
import { useContext } from "react";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // fire.auth().onAuthStateChanged((user) => {
  //   return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  // });

  const { user } = useContext(Context);
  const current_user = user;
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/register">
          {current_user ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">{current_user ? <Homepage /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{current_user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {current_user ? <Settings /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
