import MainContainer from "../../layouts/MainContainer/MainContainer";
import "./SignIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  signInPending,
  signInSuccess,
  signInFailure,
  signInRemember,
} from "./signInSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [auth] = useState(false);
  const [remember, setRemember] = useState(false);
  const { loading, error } = useSelector((state) => state.signIn);
  useEffect(() => {
    if (localStorage.token || sessionStorage.token) {
      navigate("/user");
    }
  }, [navigate]);

  const handelChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInPending());
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        credentials
      );

      if (remember) {
        sessionStorage.setItem("token", response.data.body.token);
        localStorage.setItem("token", response.data.body.token);
        dispatch(signInRemember());
      } else {
        localStorage.removeItem("token");
        sessionStorage.setItem("token", response.data.body.token);
      }
      dispatch(signInSuccess());
      navigate("/user");
    } catch (err) {
      dispatch(signInFailure(err.message || err));
    }
  };

  return (
    <MainContainer className="sign-in">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handelSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="email"
                onChange={handelChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handelChange}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                defaultChecked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          {(loading && <p className="loading-message">Loading...</p>) ||
            (error && <p className="error-message">{error}</p>) ||
            (auth && <p className="success-message">Sign In Success</p>)}
        </section>
      </main>
    </MainContainer>
  );
};

export default SignIn;
