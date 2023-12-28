import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { signInOut } from "../../pages/SignIn/signInSlice";
import { setUser } from "../../features/user/userSlice";
import { useState, useEffect } from "react";

import Logo from "../../assets/img/argentBankLogo.png";

const Header = (props) => {
  const { firstName, userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.token) {
      setAuth(true);
      setToken(localStorage.token);
    }
    if (sessionStorage.token) {
      setAuth(true);
      setToken(sessionStorage.token);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    try {
      fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            setUser({
              id: data.body.id,
              firstName: data.body.firstName,
              lastName: data.body.lastName,
              userName: data.body.userName,
            })
          );
        });
    } catch (err) {
      console.log(err);
    }
  }, [token]);
  const handleSignOut = () => {
    dispatch(signInOut());
    delete localStorage.token;
    delete sessionStorage.token;
    setAuth(false);
  };
  return (
    <header>
      <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/" exact="true">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
        </NavLink>
        <div>
          {!auth && (
            <NavLink className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
          {auth && (
            <NavLink className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {userName}
            </NavLink>
          )}
          {auth && (
            <NavLink
              className="main-nav-item"
              onClick={() => handleSignOut()}
              to="/"
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
